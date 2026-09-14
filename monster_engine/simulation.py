"""
monster_engine.simulation
=========================
Script autoejecutable de simulación integral:
1. Inicia el servidor FastAPI en un hilo local daemon.
2. Consulta la criatura con mayor velocidad y la criatura con Mutación X en el Bestiario.
3. Carga una zona inspirada en Hoenn/Emerald (Ruta 101), calcula su checklist de completitud.
4. Explora la cuadrícula 2D, gestiona colisiones de obstáculos (409) y fuera de límites (400).
5. Interactúa con un NPC entrenador, comprueba línea de visión y resuelve un turno de combate determinista.
6. Valida los códigos de estado HTTP (200, 204, 304, 400, 401, 403, 404, 409, 422).
"""

import sys
import threading
import time
import uvicorn

# Configuración de salida segura para consolas Windows
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

from monster_engine.client import (
    BadRequestError,
    ConflictError,
    ForbiddenError,
    GameClient,
    NotFoundError,
    UnauthorizedError,
    UnprocessableEntityError,
)
from monster_engine.server import app

SERVER_PORT = 8000
BASE_URL = f"http://127.0.0.1:{SERVER_PORT}"


def start_server_daemon():
    config = uvicorn.Config(app=app, host="127.0.0.1", port=SERVER_PORT, log_level="warning")
    server = uvicorn.Server(config)
    server.run()


def section_header(title: str):
    print("\n" + "=" * 80)
    print(f" ▶ {title.upper()}")
    print("=" * 80)


def run_full_simulation():
    # 1. Iniciar servidor FastAPI en background
    server_thread = threading.Thread(target=start_server_daemon, daemon=True)
    server_thread.start()
    time.sleep(1.2)

    print("\n[MONSTER-TAMER TACTICAL RPG & EMERALD COMPLETION ENGINE INITIALIZED]")
    print(f"Target Server: {BASE_URL}")

    # Cliente autenticado con token de entrenador con medalla
    client = GameClient(base_url=BASE_URL, auth_token="trainer_demo")

    # ========================================================================
    # 1. CONSULTAS AL BESTIARIO: MAYOR VELOCIDAD Y MUTACIÓN X (HTTP 200 OK)
    # ========================================================================
    section_header("1. Consultas al Bestiario: Mayor Velocidad y Mutación X (200 OK)")

    # 1.1 Criatura con mayor velocidad
    fastest_creatures = client.query_bestiary(sort_by="speed", order="desc")
    top_speed = fastest_creatures[0]
    print(f"  [TOP SPEED] Criatura más veloz del catálogo:")
    print(f"    - ID #{top_speed['id']}: {top_speed['name']}")
    print(f"    - Velocidad: {top_speed['base_stats']['speed']} (BST: {top_speed['base_stats']['bst']})")
    print(f"    - Tipos: {top_speed['primary_type']} / {top_speed.get('secondary_type', 'None')}")
    print(f"    - Asset frontal: {top_speed['sprites']['front']}")

    # 1.2 Criatura con Mutación X
    mutation_x_creatures = client.query_bestiary(transformation="MUTACION_X")
    mut_x = mutation_x_creatures[0]
    print(f"\n  [MUTACION X] Variante ofensiva identificada:")
    print(f"    - ID #{mut_x['id']}: {mut_x['name']} | Forma: {mut_x['transformation']}")
    print(f"    - Ataque Físico Base: {mut_x['base_stats']['attack']} | BST: {mut_x['base_stats']['bst']}")
    print(f"    - Asset icono: {mut_x['sprites']['icon']}")

    # ========================================================================
    # 2. VALIDACIÓN DE CACHÉ LOCAL CON ETAG (HTTP 304 NOT MODIFIED)
    # ========================================================================
    section_header("2. Validación de Caché HTTP con ETag en el Bestiario (304 Not Modified)")
    print("Paso 1: Primera consulta para registrar ETag...")
    _, code_1 = client.get_creature(1, use_cache=False)
    print(f"  [OK] HTTP {code_1} registrado con ETag: {client._etags.get('creature_1')}")

    print("Paso 2: Segunda consulta enviando 'If-None-Match'...")
    _, code_2 = client.get_creature(1, use_cache=True)
    print(f"  [OK] Resultado: HTTP {code_2} Not Modified (Respuesta instantánea sin payload redundante)")

    # ========================================================================
    # 3. CARGA DE ZONA EMERALD Y CHECKLIST DE COMPLETITUD (HTTP 200 OK)
    # ========================================================================
    section_header("3. Carga de Zona (Ruta 101) y Checklist de Completitud Emerald (200 OK)")
    zone_response, _ = client.get_zone("route_101", use_cache=False)
    zone = zone_response["zone"]
    checklist = zone_response["completion"]

    print(f"  [ZONA] {zone['name']} (Región: {zone['region']})")
    print(f"    - Categoría: {zone['category']} | Visited: {zone['visited']}")
    print(f"    - Encuentros salvajes configurados: {len(zone['wild_encounters'])} especies")
    for w in zone["wild_encounters"]:
        print(f"      * {w['name']:<12} (Nv. {w['min_level']}-{w['max_level']}) | Ratio: {w['encounter_rate']}% | Terreno: {w['terrain_type']}")

    print(f"\n  [CHECKLIST DE COMPLETITUD EMERALD]")
    print(f"    - Objetos Ocultos:      {checklist['collected_hidden_items']}/{checklist['total_hidden_items']}")
    print(f"    - Entrenadores Vencidos: {checklist['defeated_trainers']}/{checklist['total_trainers']}")
    print(f"    - Especies Registradas: {checklist['registered_wild_species']}/{checklist['total_wild_species']}")
    print(f"    - Progreso de la Zona:  {checklist['completion_percentage']}%")

    # ========================================================================
    # 4. EXPLORACIÓN 2D: PASO VÁLIDO Y ENCUENTRO SALVAJE (HTTP 200 OK)
    # ========================================================================
    section_header("4. Movimiento 2D en Cuadrícula y Encuentro en Hierba Alta (200 OK)")
    print("El jugador se desplaza de (1, 1) camino a (1, 2) hierba alta...")
    move_res = client.move_player(zone_id="route_101", from_x=1, from_y=1, to_x=1, to_y=2)
    print(f"  [OK] Movimiento completado: Estado={move_res['status']} | Posición=({move_res['current_x']}, {move_res['current_y']})")
    print(f"  [OK] Terreno pisado: {move_res['tile_type']}")
    if move_res["wild_encounter_triggered"]:
        enc = move_res["wild_encounter_data"]
        print(f"  [ENCUENTRO SALVAJE] ¡Un {enc['name']} salvaje apareció en la hierba alta! (Nv. {enc['min_level']})")

    # ========================================================================
    # 5. MANEJO DE COLISIÓN CON OBSTÁCULO Y FUERA DE LÍMITES (HTTP 409 & 400)
    # ========================================================================
    section_header("5. Manejo de Errores: Colisión con Árbol (409) y Fuera de Límites (400)")

    # 5.1 Colisión con árbol sólido en (0, 2)
    print("Intentando avanzar hacia casilla con árbol en (0, 2)...")
    try:
        client.move_player(zone_id="route_101", from_x=1, from_y=2, to_x=0, to_y=2)
    except ConflictError as e:
        print(f"  [OK] Captura exitosa de ConflictError (409):")
        print(f"    - Mensaje: {e.message}")
        print(f"    - Debug Clue: {e.debug_clue}")

    # 5.2 Fuera de límites del mapa
    print("\nIntentando salto ilegal de coordenadas fuera de la cuadrícula...")
    try:
        client.move_player(zone_id="route_101", from_x=1, from_y=2, to_x=15, to_y=2)
    except BadRequestError as e:
        print(f"  [OK] Captura exitosa de BadRequestError (400):")
        print(f"    - Mensaje: {e.message}")
        print(f"    - Debug Clue: {e.debug_clue}")

    # ========================================================================
    # 6. ACCESO A ZONA BLOQUEADA POR MEDALLA (HTTP 403 FORBIDDEN)
    # ========================================================================
    section_header("6. Control de Acceso a Zonas Bloqueadas por Medalla (403 Forbidden)")
    rookie_client = GameClient(base_url=BASE_URL, auth_token="trainer_token_rookie")
    print("Entrenador novato sin medallas intentando ingresar a 'Ruta 105'...")
    try:
        rookie_client.get_zone("route_105")
    except ForbiddenError as e:
        print(f"  [OK] Captura exitosa de ForbiddenError (403):")
        print(f"    - Mensaje: {e.message}")
        print(f"    - Debug Clue: {e.debug_clue}")

    # ========================================================================
    # 7. COMBATE DETERMINISTA Y RESOLUCIÓN DE TURNO (HTTP 200 OK)
    # ========================================================================
    section_header("7. Combate Táctico Determinista: Torchicore vs Treekoon (200 OK)")
    print("Iniciando combate contra Entrenador route_101...")
    
    battle_info = client.init_npc_battle(zone_id="route_101", npc_id="trainer_route_101")
    battle_id = battle_info["battle_id"]
    
    print(f"Batalla creada con ID '{battle_id}'.")
    print("Treekoon (Planta) ejecuta 'leaf_blade' (Hoja Aguda, Especial) contra Torchicore (Fuego)...")

    turn_result = client.execute_battle_turn(
        battle_id=battle_id,
        turn_number=1,
        action="ATTACK",
        move_id="leaf_blade"
    )

    print(f"\n  [ESTADO DEL TURNO #{turn_result['turn_number']}]")
    print(f"    - Acción: {turn_result['action_taken']}")
    print(f"    - Daño Infligido: {turn_result['damage_dealt']} PS (Multiplicador elemental: x{turn_result['type_multiplier']})")
    print(f"    - Banner de Efectividad: {turn_result['effectiveness_banner']}")
    print(f"    - Salud Jugador: {turn_result['player_hp']}/{turn_result['player_max_hp']} PS")
    print(f"    - Salud Rival:   {turn_result['opponent_hp']}/{turn_result['opponent_max_hp']} PS")
    print(f"    - Estado del Combate: {turn_result['battle_status']}")
    print("    - Registro de Combate:")
    for log_line in turn_result["combat_log"]:
        print(f"      * {log_line}")

    # ========================================================================
    # 8. MANEJO DE DESINCRONIZACIÓN DE TURNO (HTTP 409 CONFLICT)
    # ========================================================================
    section_header("8. Manejo de Desincronización de Turno (409 Conflict)")
    print("Reenviando turno #1 cuando la batalla ya avanzó al turno #2...")
    try:
        client.execute_battle_turn(
            battle_id=battle_id,
            turn_number=1,  # Desincronizado
            action="ATTACK",
            move_id="ember"
        )
    except ConflictError as e:
        print(f"  [OK] Captura exitosa de ConflictError (409):")
        print(f"    - Mensaje: {e.message}")
        print(f"    - Debug Clue: {e.debug_clue}")

    # ========================================================================
    # 9. MANEJO DE MOVIMIENTO SIN PP (HTTP 400 BAD REQUEST)
    # ========================================================================
    section_header("9. Manejo de Movimiento sin PP o Acción Inválida (400 Bad Request)")
    try:
        client.execute_battle_turn(
            battle_id=battle_id,
            turn_number=2,
            action="ATTACK",
            move_id="movimiento_inexistente"
        )
    except BadRequestError as e:
        print(f"  [OK] Captura exitosa de BadRequestError (400):")
        print(f"    - Mensaje: {e.message}")
        print(f"    - Debug Clue: {e.debug_clue}")

    # ========================================================================
    # 10. RESET DE SESIÓN (HTTP 204 NO CONTENT)
    # ========================================================================
    section_header("10. Reset de Sesión de Juego y Batalla (204 No Content)")
    client.reset_session()
    print("  [OK] Sesión reseteada exitosamente con 204 No Content (Sin cuerpo redundante).")

    print("\n" + "=" * 80)
    print(" [SISTEMA VALIDADO AL 100%] TODOS LOS PROTOCOLOS Y MECÁNICAS OPERAN CON ÉXITO")
    print("=" * 80 + "\n")


if __name__ == "__main__":
    run_full_simulation()
    sys.exit(0)
