# Cambios realizados: Combate PvP por turnos + Sistema de monedas

Fecha: 2026-09-12 — Proyecto: pokepoke-main (Pokémon Esmeralda / Hoenn MMO)

## Problema reportado
> "Cuando le doy Aceptar al reto no hay respuesta de batalla" / "No salto a la batalla 1vs1 de nuestros pokémon".

Causas raíz encontradas:
1. El manejador `onDuelRequest` estaba registrado dos veces: `modules/lobby_view.js` mostraba un `confirm()` bloqueante y llamaba a `App.startPvPBattle` (que nunca existió), interfiriendo con el flujo real.
2. `App.showNotification` no estaba definido → el handler `onPvpBattleStart` reventaba en silencio.
3. El servidor dependía de `db.get_profile_by_username()` para obtener los equipos, pero el juego guarda el equipo solo en `sessionStorage`, no en BD → nunca se encontraba equipo y no se iniciaba la batalla.
4. El proceso del servidor seguía corriendo **código viejo** (no se reinició tras los cambios), por lo que el navegador hablaba con un backend sin la lógica nueva.
5. `renderInMapBattleHtml` y `onPvpBattleStart` no eran a prueba de fallos: cualquier dato ausente (sin starter, sin imagen, HP faltante) dejaba al jugador congelado en el mundo sin overlay.

## Solución adoptada
Los clientes envían su equipo en los mensajes `CHALLENGE_TRAINER` y `RESPOND_CHALLENGE` (`team:`); el servidor normaliza la información y crea una batalla **autoritativa** (resolución de turnos, velocidad, STAB, efectividad de tipos, críticos), notifica a ambos jugadores y entrega **150 monedas** al ganador (`PVP_REWARD_COINS`).

---

## 1. `monster_engine/server.py`

Helpers nuevos:
- `PVP_REWARD_COINS = 150`
- `_TIPO_ALIASES` + `_norm_tipo_key()`: normaliza nombres de tipo con tildes/español/inglés al enum `ElementalType` (necesario porque `TYPE_EFFECTIVENESS` usa valores `FUEGO`, `AGUA`, …). Verificado: `Fuego→FUEGO`, `Eléctrico→ELECTRICO`, `Psíquico→PSIQUICO`, `Dragón→DRAGON`.
- `_eff_mult()`: multiplicador de efectividad con defensa a la tabla oficial.
- `_normalize_pvp_team()`: sanea cada Pokémon (types por `'/'`, niveles mínimos, movimientos, HP).
- `async _start_pvp_battle():` crea `ACTIVE_PVP_BATTLES[battle_id]` y envía `PVP_BATTLE_START` a ambos jugadores con `battle_id`, `opponent_id`, `opponent_name`, `my_pokemon`, `opponent_pokemon`, `reward_coins`.
- `async _end_pvp_battle():` elimina la batalla, restaura el estado `EXPLORING` de ambos, notifica y envía `PVP_BATTLE_END` con `winner_id`, `winner_name`, `you_won`, `reward_coins`.

Acciones WebSocket reescritas/agregadas (handler ACTIVO, `@app.websocket("/ws/lobby")`, primera definición — hay un segundo handler con la misma ruta más abajo que **es código muerto y no debe editarse**):
- `CHALLENGE_TRAINER`: valida que el objetivo esté conectado, guarda `{ "challenge": DuelChallenge, "p1_team": [...] }`, envía `DUEL_REQUEST_RECEIVED` con claves `id`, `challenge_id`, `challenger_id`, `from_trainer_id`, `target_id`.
- `RESPOND_CHALLENGE`: busca el desafío, usa `p1_team` guardado + `team` del payload (fallback a perfil de BD si falta), inicia la batalla con `_start_pvp_battle`, envía `CHALLENGE_RESPONSE` + `DUEL_RESPONSE` al retador y errores claros si faltan equipos o el desafío expiró.
- `PVP_BATTLE_MOVE` (nueva): motor autoritativo de turno — orden por velocidad, cálculo de daño (fórmula Gen 3), STAB (`elemental_type` vs `primary/secondary_type`), efectividad por `_eff_mult`, crítico 6.25 %. Cuando un Pokémon se debilita usa `_end_pvp_battle`. Envía `PVP_BATTLE_TURN_RESULT` con `my_hp`, `opponent_hp`, `logs`, `status`, `you_won` y `reward_coins`. El primer log del turno anuncia el orden por velocidad: `¡X ataca primero por su mayor velocidad! (A vs B)` o `Empate de velocidad: el azar elige que X ataque primero.`
- `PVP_BATTLE_FORFEIT` (nueva): rendición → el rival gana y recibe las monedas.

## 2. `admin.js`

- `App.showNotification(msg, tipo)`: toast visual (antes inexistente).
- `App.getPvpTeamPayload()`: serializa `trainerState.starter` + `collection` al formato que espera el servidor (tipos por `/`, HP actual, movimientos hasta 4).
- `App.pvpForfeit()`: envía `PVP_BATTLE_FORFEIT`.
- Botón **Retar** (`piBtnDuelAction`): ahora envía `CHALLENGE_TRAINER` con `team: App.getPvpTeamPayload()`.
- `onDuelRequest`: el botón **Aceptar** envía `RESPOND_CHALLENGE` con `{ challenge_id, accept: true, target_id, team }`. Incluye logs de diagnóstico (`[PVP] Desafío recibido…`, `[PVP] Enviando RESPOND_CHALLENGE…`).
- `onChallengeResponse`: muestra `res.error` si el servidor lo envía.
- `onPvpBattleStart` (reescrito y blindado):
  - try/catch con `console.error` claro si algo falla.
  - Siempre construye `inMapBattle` con datos del servidor (`my_pokemon`/`opponent_pokemon`) incluso si `trainerState.starter` falta.
  - Sincroniza el HP del starter local y persiste (`saveTrainerProgress`).
  - Tras `renderView('mundo')` verifica que `.hoenn-battle-overlay` exista y reintenta si no.
- `onPvpBattleTurnResult`: persiste HP, agrega logs, entrega monedas al ganador (`you_won`), aviso de victoria/derrota, cierra la batalla a los 5 s.
- `onPvpBattleEnd`: entrega monedas por rendición, limpia `inMapBattle`.
- Menú principal PvP: clásico de 4 botones **FIGHT · BAG · POKéMON · RENDIRSE** (RENDIRSE en vez de RUN).
- PvP sin captura/reinicio de flujo: en combate PvP `switchPokemon` y `battleUseItem` avisan "No puedes cambiar de Pokémon / usar objetos en un combate PvP." (el servidor PvP es 1v1 autoritativo y no hay item/switch sincronizado).
- La escena de batalla PvP muestra el tag del rival (`trainerName` = nombre del oponente) sobre el Pokémon enemigo.
- `battleFlee`: en PvP deriva a `pvpForfeit()`.
- `renderInMapBattleHtml`: valores por defecto defensivos (hp/maxHp/imagen/nombre/movimientos) + overlay de respaldo con FOLLETOS si algo falla; nunca deja la pantalla congelada.

## 3. `modules/lobby_view.js`
- Eliminado el listener duplicado `onDuelRequest` y el método `showDuelRequestModal` (eran el bloqueo original).

## 4. `modules/game_client.js`
- `sendChallenge()`: incluye el equipo vía `App.getPvpTeamPayload()`.
- `sendAction()`: si el socket no está abierto ahora lo avisa en consola (evita fallos silenciosos).
- Despachadores agregados: `PVP_BATTLE_START → onPvpBattleStart`, `PVP_BATTLE_TURN_RESULT → onPvpBattleTurnResult`, `PVP_BATTLE_END → onPvpBattleEnd`.

## 5. `admin.css`
- Sprite del Pokémon rival invertido (`transform: scaleX(-1)` en `.opponent-podium .battle-pokemon-img`) para que mire hacia el jugador, como en los juegos Gen 3.

---

## Verificaciones
- `node --check` OK en `admin.js`, `modules/game_client.js`, `modules/lobby_view.js`.
- `python -m py_compile` + `import monster_engine.server` OK.
- Pruebas unitarias de helpers: normalización de tipos y efectividad correctas (Fuego vs Planta = 2.0, Agua vs Fuego = 2.0, Planta vs Fuego = 0.5).
- **E2E contra el servidor vivo** (`127.0.0.1:8000`): desafío → aceptar → `PVP_BATTLE_START` a ambos → turno resuelto (`P1_WON/P2_WON`) → `PVP_BATTLE_END` con ganador y **150 monedas** → rendición también entrega 150 monedas al rival. TODOS LOS ASSERT OK.
- **Recompensa única en el cliente**: en el turno final el servidor envía `PVP_BATTLE_TURN_RESULT` (con `you_won` y `reward_coins`) y después `PVP_BATTLE_END` (también con `reward_coins`). El cliente solo suma monedas una vez por `battle` gracias al flag `inMapBattle.rewardPaid` (si el pago vino en el TURN_RESULT, el END no lo repite; en rendición, sin turno final, el pago se hace en el END). Evita que el ganador acumule 150×2 en su monedero local.
- **Regla de velocidad verificada**: con misma velocidad el log dice `Empate de velocidad: el azar elige...`; con Alice a 130 vs Bob a 60 el log dice `¡Alice ataca primero por su mayor velocidad! (130 vs 60)` y su movimiento es el primero del turno.

## Nota operativa
- El servidor se **reinició** con el código nuevo durante la sesión y luego se **apagó** al terminar (como se pidió).
- Para volver a levantarlo:
  ```
  cd C:\Users\jdbpb\Downloads\pokepoke-main\pokepoke-main
  python -m uvicorn monster_engine.server:app --host 127.0.0.1 --port 8000
  ```
- En los navegadores usar **Ctrl+F5** (o ventana de incógnito) porque los JS viejos en caché son la causa más común de que "Aceptar no haga nada". Ambos perfiles deben apuntar al MISMO servidor con la MISMA versión.

## Estado del proyecto
- La reversión de mapas reales (sesión anterior, `admin.html`, `admin.js`, `tilemap_renderer.js`, borrado de `modules/emerald_integration.js`, `data/emerald_gba_maps.js`, `tools/webcheck.html`) permanece completada.
- Artefactos dev en `tools/` conservados; pendiente confirmación del usuario sobre si borrarlos.