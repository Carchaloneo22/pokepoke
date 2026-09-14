/**
 * modules/batalla.js — Motor de Combate Determinista GBA (Gen 3)
 * Incluye:
 * - Tabla completa de efectividad elemental de 10 tipos
 * - Bonificación por Mismo Tipo (STAB 1.5x)
 * - Probabilidad de Crítico auténtica de Gen 3 (6.25% con factor 1.5x)
 * - Factor aleatorio de dispersión (0.85 a 1.00)
 */
(function (window) {
  'use strict';

  const TYPE_CHART = {
    'Normal':   {'Roca':0.5,'Acero':0.5,'Fantasma':0},
    'Fuego':    {'Fuego':0.5,'Agua':0.5,'Planta':2,'Roca':0.5,'Acero':2,'Bicho':2,'Hielo':2},
    'Agua':     {'Fuego':2,'Agua':0.5,'Planta':0.5,'Tierra':2,'Roca':2,'Dragón':0.5},
    'Planta':   {'Fuego':0.5,'Agua':2,'Planta':0.5,'Tierra':2,'Roca':2,'Volador':0.5,'Veneno':0.5},
    'Eléctrico':{'Agua':2,'Planta':0.5,'Eléctrico':0.5,'Tierra':0,'Volador':2,'Dragón':0.5},
    'Hielo':    {'Fuego':0.5,'Agua':0.5,'Planta':2,'Tierra':2,'Volador':2,'Dragón':2,'Acero':0.5},
    'Lucha':    {'Normal':2,'Roca':2,'Acero':2,'Siniestro':2,'Hada':0.5,'Veneno':0.5,'Psíquico':0.5,'Volador':0.5,'Bicho':0.5,'Fantasma':0},
    'Veneno':   {'Planta':2,'Veneno':0.5,'Tierra':0.5,'Roca':0.5,'Fantasma':0.5,'Acero':0},
    'Tierra':   {'Fuego':2,'Eléctrico':2,'Veneno':2,'Roca':2,'Acero':2,'Planta':0.5,'Volador':0},
    'Volador':  {'Planta':2,'Lucha':2,'Bicho':2,'Eléctrico':0.5,'Roca':0.5,'Acero':0.5},
    'Psíquico': {'Lucha':2,'Veneno':2,'Psíquico':0.5,'Siniestro':0,'Acero':0.5},
    'Bicho':    {'Planta':2,'Psíquico':2,'Siniestro':2,'Hada':0.5,'Fuego':0.5,'Lucha':0.5,'Volador':0.5,'Veneno':0.5,'Fantasma':0.5,'Acero':0.5},
    'Roca':     {'Fuego':2,'Hielo':2,'Volador':2,'Bicho':2,'Lucha':0.5,'Tierra':0.5,'Acero':0.5},
    'Fantasma': {'Psíquico':2,'Fantasma':2,'Normal':0,'Siniestro':0.5},
    'Dragón':   {'Dragón':2,'Acero':0.5,'Hada':0},
    'Siniestro':{'Psíquico':2,'Fantasma':2,'Siniestro':0.5,'Lucha':0.5,'Hada':0.5},
    'Acero':    {'Hielo':2,'Roca':2,'Hada':2,'Fuego':0.5,'Agua':0.5,'Eléctrico':0.5,'Acero':0.5},
    'Hada':     {'Lucha':2,'Dragón':2,'Siniestro':2,'Fuego':0.5,'Veneno':0.5,'Acero':0.5}
  };

  function effectiveness(moveType, defenderTypes, table = TYPE_CHART) {
    if (!defenderTypes) return 1;
    const types = Array.isArray(defenderTypes) ? defenderTypes : [defenderTypes];
    return types.reduce((mod, t) => {
      const cleanMove = moveType ? moveType.split('/')[0].trim() : 'Normal';
      const cleanDef = t ? t.split('/')[0].trim() : 'Normal';
      return mod * (table[cleanMove]?.[cleanDef] ?? 1);
    }, 1);
  }

  function calculateDamage({
    level = 5,
    power = 40,
    attack = 20,
    defense = 20,
    sp_attack,
    sp_defense,
    moveType = 'Normal',
    moveCategory = 'fisico',
    attackerType = 'Normal',
    defenderTypes = 'Normal',
    typeTable = TYPE_CHART,
    random = Math.random,
    critical = random() < 0.0625
  }) {
    if (!power) return { damage: 0, modifier: 1, critical: false, stab: 1 };

    const modifier = effectiveness(moveType, defenderTypes, typeTable);
    const stab = (attackerType && attackerType.toLowerCase().includes(moveType.toLowerCase())) ? 1.5 : 1.0;
    const critMult = critical ? 1.5 : 1.0;
    const rng = 0.85 + random() * 0.15;

    let a = attack;
    let d = defense;
    if (moveCategory.toLowerCase() === 'especial' || moveCategory.toLowerCase() === 'special') {
      a = sp_attack || attack;
      d = sp_defense || defense;
    }

    const base = ((2 * level / 5 + 2) * power * (a / Math.max(1, d)) / 50 + 2);
    const damage = Math.max(1, Math.floor(base * modifier * stab * critMult * rng));

    return { damage, modifier, critical, stab };
  }

  function createBattle(player, rival) {
    return {
      player: { ...player, currentHp: player.currentHp ?? player.hp },
      rival: { ...rival, currentHp: rival.currentHp ?? rival.hp },
      turn: 'player',
      log: []
    };
  }

  window.GameBattle = { effectiveness, calculateDamage, createBattle, TYPE_CHART };
})(window);
