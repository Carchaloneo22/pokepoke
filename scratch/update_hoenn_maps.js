const fs = require('fs');

const path = 'data/hoenn_maps.js';
let content = fs.readFileSync(path, 'utf8');

// Modificaciones precisas
// 1. littleroot_town
const lrSearch = '"littleroot_town": {';
const lrIdx = content.indexOf(lrSearch);
if (lrIdx === -1) throw new Error('littleroot_town not found');

const lrEnd = content.indexOf('  "oldale_town": {');
if (lrEnd === -1) throw new Error('oldale_town not found');

const lrNew = `  "littleroot_town": {
    "id": "littleroot_town",
    "name": "Villa Raíz (Littleroot Town)",
    "subtitle": "El inicio de tu viaje Pokémon",
    "image": "assets/maps/littleroot_town.png",
    "width": 625,
    "height": 516,
    "spawn": { "x": 230, "y": 240, "dir": "down" },
    "obstacles": [
      { "x": 64, "y": 32, "w": 192, "h": 128 },
      { "x": 352, "y": 32, "w": 192, "h": 128 },
      { "x": 80, "y": 256, "w": 240, "h": 160 },
      { "x": 0, "y": 0, "w": 48, "h": 516 },
      { "x": 576, "y": 0, "w": 49, "h": 516 },
      { "x": 0, "y": 480, "w": 625, "h": 36 },
      { "x": 0, "y": 0, "w": 256, "h": 32 },
      { "x": 352, "y": 0, "w": 273, "h": 32 }
    ],
    "flowerPatches": [
      { "x": 260, "y": 30, "w": 106, "h": 75 },
      { "x": 335, "y": 365, "w": 106, "h": 75 },
      { "x": 465, "y": 255, "w": 106, "h": 75 }
    ],
    "signs": [
      { "x": 220, "y": 155, "label": "Buzón Casa de Jugador", "text": "Buzón de tu casa: \\"Hogar de un futuro Campeón de Hoenn\\"." },
      { "x": 400, "y": 155, "label": "Buzón Casa del Rival", "text": "Buzón de la casa vecina: \\"En viaje de campo con el Prof. Abedul\\"." },
      { "x": 195, "y": 425, "label": "Laboratorio Pokémon", "text": "Cartel oficial: \\"Laboratorio de Investigación Pokémon del Profesor Abedul\\"." },
      { "x": 300, "y": 25, "label": "Ruta 101 al Norte", "text": "Indicador: Ruta 101 hacia Pueblo Escaso y Ciudad Petalia." }
    ],
    "encounters": {
      "chance": 0.05,
      "pokemon": ["Zigzagoon", "Poochyena"]
    },
    "items": [
      {
        "id": "lr_potion_1",
        "name": "Poción",
        "x": 180,
        "y": 280,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "prof_birch",
        "name": "Profesor Abedul",
        "avatar": "🥼",
        "color": "#27ae60",
        "x": 235,
        "y": 395,
        "originX": 235,
        "originY": 395,
        "range": 0,
        "dir": "down",
        "dialogs": [
          "¡Hola, joven entrenador! Me alegra verte en pie y con energía.",
          "¿Cómo se encuentra tu equipo? ¡Permíteme curar a tus Pokémon de inmediato!"
        ],
        "canHeal": true
      },
      {
        "id": "boy_lr",
        "name": "Chico de Villa Raíz",
        "avatar": "👦",
        "color": "#3498db",
        "x": 440,
        "y": 430,
        "originX": 440,
        "originY": 430,
        "range": 35,
        "dir": "down",
        "dialogs": [
          "¡Bienvenido a Villa Raíz! La tecnología de las Poké Balls es increíble.",
          "Hacia el norte comienza la Ruta 101, que conduce hacia Ciudad Petalia."
        ],
        "canHeal": false
      },
      {
        "id": "fat_man_lr",
        "name": "Vecino de Villa Raíz",
        "avatar": "👨‍💼",
        "color": "#e67e22",
        "x": 390,
        "y": 310,
        "originX": 390,
        "originY": 310,
        "range": 40,
        "dir": "left",
        "dialogs": [
          "El Profesor Abedul siempre está en las rutas investigando el hábitat natural de los Pokémon.",
          "Lleva siempre contigo Pociones y Poké Balls antes de adentrarte en la hierba alta."
        ],
        "canHeal": false
      },
      {
        "id": "girl_lr",
        "name": "Niña con lazo",
        "avatar": "👧",
        "color": "#e91e63",
        "x": 520,
        "y": 215,
        "originX": 520,
        "originY": 215,
        "range": 30,
        "dir": "down",
        "dialogs": [
          "¡Hola! Esa de arriba a la derecha es la casa de tu rival.",
          "¡Las flores de Villa Raíz florecen con gran vitalidad gracias al clima templado de Hoenn!"
        ],
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 270,
        "y": 0,
        "w": 90,
        "h": 25,
        "targetMap": "route_101",
        "targetX": 300,
        "targetY": 460,
        "label": "Ruta 101"
      }
    ],
    "tileset": "OverworldTrainers"
  },
`;

content = content.substring(0, lrIdx) + lrNew + content.substring(lrEnd);

// 2. oldale_town exits
const otSearch = '"oldale_town": {';
const otIdx = content.indexOf(otSearch);
const otEnd = content.indexOf('  "petalburg_city": {');

const otNew = `  "oldale_town": {
    "id": "oldale_town",
    "name": "Pueblo Escaso (Oldale Town)",
    "subtitle": "Donde los caminos se cruzan",
    "width": 512,
    "height": 512,
    "spawn": { "x": 256, "y": 460, "dir": "up" },
    "obstacles": [
      { "x": 0, "y": 0, "w": 30, "h": 512 },
      { "x": 482, "y": 0, "w": 30, "h": 512 },
      { "x": 0, "y": 0, "w": 512, "h": 30 },
      { "x": 0, "y": 482, "w": 512, "h": 30 },
      { "x": 100, "y": 120, "w": 110, "h": 90 },
      { "x": 300, "y": 120, "w": 110, "h": 90 }
    ],
    "signs": [
      { "x": 230, "y": 160, "label": "Pueblo Escaso", "text": "Pueblo Escaso: Donde los caminos se cruzan y descansan los viajeros." },
      { "x": 100, "y": 220, "label": "Centro Pokémon", "text": "Centro Pokémon de Pueblo Escaso." }
    ],
    "encounters": {
      "chance": 0.05,
      "pokemon": ["Zigzagoon", "Wurmple"]
    },
    "items": [
      {
        "id": "oldale_potion",
        "name": "Poción",
        "x": 150,
        "y": 300,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "nurse_oldale",
        "name": "Enfermera Joy",
        "avatar": "👩‍⚕️",
        "color": "#ff7675",
        "x": 300,
        "y": 200,
        "range": 0,
        "dialogs": [
          "¡Bienvenido al Centro Pokémon de Pueblo Escaso! Te curamos al instante."
        ],
        "canHeal": true
      },
      {
        "id": "clerk_oldale",
        "name": "Empleado Tienda",
        "avatar": "👨‍💼",
        "color": "#0984e3",
        "x": 200,
        "y": 240,
        "range": 10,
        "dialogs": [
          "¡Las Pociones son vitales cuando te alejas de las ciudades!"
        ],
        "givesSupplies": true,
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 210,
        "y": 485,
        "w": 90,
        "h": 27,
        "targetMap": "route_101",
        "targetX": 300,
        "targetY": 35,
        "label": "Ruta 101"
      },
      {
        "x": 0,
        "y": 210,
        "w": 25,
        "h": 80,
        "targetMap": "route_102",
        "targetX": 560,
        "targetY": 250,
        "label": "Ruta 102"
      },
      {
        "x": 210,
        "y": 0,
        "w": 90,
        "h": 25,
        "targetMap": "route_103",
        "targetX": 300,
        "targetY": 460,
        "label": "Ruta 103"
      }
    ],
    "tileset": "OverworldTrainers"
  },
`;

content = content.substring(0, otIdx) + otNew + content.substring(otEnd);

// 3. petalburg_city
const pbSearch = '"petalburg_city": {';
const pbIdx = content.indexOf(pbSearch);
const pbEnd = content.indexOf('  "rustboro_city": {');

const pbNew = `  "petalburg_city": {
    "id": "petalburg_city",
    "name": "Ciudad Petalia (Petalburg City)",
    "subtitle": "Donde la gente convive en armonía con la naturaleza",
    "image": "assets/maps/petalburg_city.png",
    "width": 479,
    "height": 482,
    "spawn": { "x": 240, "y": 430, "dir": "up" },
    "obstacles": [
      { "x": 0, "y": 0, "w": 30, "h": 482 },
      { "x": 450, "y": 0, "w": 30, "h": 482 },
      { "x": 0, "y": 0, "w": 479, "h": 30 },
      { "x": 0, "y": 452, "w": 479, "h": 30 },
      { "x": 50, "y": 80, "w": 120, "h": 100 },
      { "x": 280, "y": 220, "w": 110, "h": 90 },
      { "x": 70, "y": 260, "w": 100, "h": 80 }
    ],
    "signs": [
      { "x": 180, "y": 140, "label": "Gimnasio Petalia", "text": "Gimnasio Pokémon de Ciudad Petalia - Líder: Norman." },
      { "x": 260, "y": 270, "label": "Centro Pokémon", "text": "Centro Pokémon: Servicios médicos y curación gratuita." },
      { "x": 60, "y": 310, "label": "Tienda Pokémon", "text": "Tienda Pokémon: Suministros para entrenadores." }
    ],
    "encounters": {
      "chance": 0.05,
      "pokemon": ["Zigzagoon", "Taillow", "Marill"]
    },
    "items": [
      {
        "id": "petalburg_max_revive",
        "name": "Max Revive",
        "x": 450,
        "y": 150,
        "type": "hidden",
        "collected": false
      },
      {
        "id": "petalburg_ether",
        "name": "Ether",
        "x": 120,
        "y": 320,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "norman_leader",
        "name": "Líder Norman",
        "avatar": "🥋",
        "color": "#d63031",
        "x": 245,
        "y": 140,
        "originX": 245,
        "originY": 140,
        "range": 0,
        "dir": "down",
        "dialogs": [
          "¡Bienvenido al Gimnasio de Petalia! Soy Norman, el líder de este gimnasio.",
          "Entreno a mis Pokémon buscando el equilibrio y la fuerza interior.",
          "¡Demuestra tu temple en combate táctico!"
        ],
        "canHeal": false,
        "battleOpponent": {
          "name": "Slaking",
          "type": "Normal",
          "hp": 130,
          "maxHp": 130,
          "attack": 26,
          "level": 16,
          "badgeName": "Medalla Equilibrio"
        }
      },
      {
        "id": "nurse_joy_petalburg",
        "name": "Enfermera Joy",
        "avatar": "👩‍⚕️",
        "color": "#ff7675",
        "x": 340,
        "y": 285,
        "originX": 340,
        "originY": 285,
        "range": 15,
        "dir": "down",
        "dialogs": [
          "¡Hola! Te damos la bienvenida al Centro Pokémon de Ciudad Petalia.",
          "¡Hemos restaurado la salud y todos los movimientos de tu equipo!"
        ],
        "canHeal": true
      },
      {
        "id": "wally_petalburg",
        "name": "Blasco (Wally)",
        "avatar": "🧑‍🦱",
        "color": "#00b894",
        "x": 220,
        "y": 280,
        "originX": 220,
        "originY": 280,
        "range": 20,
        "dialogs": [
          "¡Gracias por ayudarme a atrapar a Ralts!",
          "¡Me esforzaré mucho para ser tan buen entrenador como tú!"
        ],
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 450,
        "y": 220,
        "w": 29,
        "h": 60,
        "targetMap": "route_102",
        "targetX": 30,
        "targetY": 250,
        "label": "Ruta 102"
      },
      {
        "x": 0,
        "y": 220,
        "w": 29,
        "h": 60,
        "targetMap": "route_104",
        "targetX": 460,
        "targetY": 400,
        "label": "Ruta 104"
      }
    ],
    "tileset": "OverworldTrainers"
  },
`;

content = content.substring(0, pbIdx) + pbNew + content.substring(pbEnd);

// 4. rustboro_city
const rbSearch = '"rustboro_city": {';
const rbIdx = content.indexOf(rbSearch);
const rbEnd = content.indexOf('  "dewford_town": {');

const rbNew = `  "rustboro_city": {
    "id": "rustboro_city",
    "name": "Ciudad Férrica (Rustboro City)",
    "subtitle": "La ciudad que une la tradición y la ciencia",
    "image": "assets/maps/rustboro_city.png",
    "width": 637,
    "height": 827,
    "spawn": { "x": 300, "y": 480, "dir": "up" },
    "obstacles": [
      { "x": 0, "y": 0, "w": 35, "h": 827 },
      { "x": 602, "y": 0, "w": 35, "h": 827 },
      { "x": 0, "y": 0, "w": 637, "h": 35 },
      { "x": 0, "y": 792, "w": 637, "h": 35 },
      { "x": 60, "y": 60, "w": 150, "h": 120 },
      { "x": 380, "y": 60, "w": 180, "h": 140 },
      { "x": 240, "y": 240, "w": 100, "h": 80 },
      { "x": 80, "y": 320, "w": 90, "h": 70 }
    ],
    "signs": [
      { "x": 220, "y": 140, "label": "Gimnasio Férrica", "text": "Gimnasio Pokémon de Ciudad Férrica - Líder: Petra." },
      { "x": 360, "y": 150, "label": "Devon Corporation", "text": "Sede Central de Devon Corporation." }
    ],
    "encounters": {
      "chance": 0.05,
      "pokemon": ["Geodude", "Skitty"]
    },
    "items": [
      {
        "id": "rustboro_x_defend",
        "name": "X Defend",
        "x": 180,
        "y": 380,
        "type": "item",
        "collected": false
      },
      {
        "id": "rustboro_tm_rock_tomb",
        "name": "TM39 Rock Tomb",
        "x": 490,
        "y": 220,
        "type": "tm",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "roxanne_leader",
        "name": "Líder Petra",
        "avatar": "👩‍🏫",
        "color": "#6c5ce7",
        "x": 320,
        "y": 210,
        "originX": 320,
        "originY": 210,
        "range": 0,
        "dir": "down",
        "dialogs": [
          "¡Soy Petra, líder de gimnasio tipo Roca! Demuéstrame lo que has aprendido."
        ],
        "canHeal": false,
        "battleOpponent": {
          "name": "Nosepass",
          "type": "Roca",
          "hp": 90,
          "maxHp": 90,
          "attack": 20,
          "level": 15,
          "badgeName": "Piedra"
        }
      },
      {
        "id": "devon_pres",
        "name": "Sr. Peñas (Devon)",
        "avatar": "👔",
        "color": "#2d3436",
        "x": 450,
        "y": 150,
        "originX": 450,
        "originY": 150,
        "range": 0,
        "dir": "down",
        "dialogs": [
          "¡Devon Corporation diseña las mejores Poké Balls de Hoenn!"
        ],
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 280,
        "y": 800,
        "w": 80,
        "h": 27,
        "targetMap": "route_104",
        "targetX": 300,
        "targetY": 40,
        "label": "Ruta 104"
      },
      {
        "x": 280,
        "y": 0,
        "w": 80,
        "h": 25,
        "targetMap": "route_115",
        "targetX": 300,
        "targetY": 460,
        "label": "Ruta 115"
      },
      {
        "x": 610,
        "y": 240,
        "w": 27,
        "h": 80,
        "targetMap": "route_116",
        "targetX": 30,
        "targetY": 250,
        "label": "Ruta 116"
      }
    ],
    "tileset": "OverworldTrainers"
  },
`;

content = content.substring(0, rbIdx) + rbNew + content.substring(rbEnd);

// 5. route_101
const r101Search = '"route_101": {';
const r101Idx = content.indexOf(r101Search);
const r101End = content.indexOf('  "route_102": {');

const r101New = `  "route_101": {
    "id": "route_101",
    "name": "Ruta 101 (Hoenn)",
    "subtitle": "Conecta Villa Raíz con Pueblo Escaso",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": { "x": 300, "y": 460, "dir": "up" },
    "flowerPatches": [
      { "x": 180, "y": 120, "w": 100, "h": 60 },
      { "x": 320, "y": 200, "w": 120, "h": 70 },
      { "x": 200, "y": 320, "w": 110, "h": 60 }
    ],
    "encounters": {
      "chance": 0.18,
      "pokemon": ["Poochyena", "Zigzagoon", "Wurmple"]
    },
    "items": [
      {
        "id": "route_101_item_1",
        "name": "Poción",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_101_trainer",
        "name": "Entrenador de Ruta 101",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "originX": 300,
        "originY": 250,
        "range": 20,
        "dir": "down",
        "dialogs": [
          "¡Entrenar en la Ruta 101 fortalece a mi Poochyena! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleOpponent": {
          "name": "Poochyena",
          "type": "Normal",
          "hp": 82,
          "maxHp": 82,
          "attack": 18,
          "level": 6,
          "badgeName": "Insignia Ruta 101"
        }
      }
    ],
    "exits": [
      {
        "x": 240,
        "y": 475,
        "w": 120,
        "h": 25,
        "targetMap": "littleroot_town",
        "targetX": 310,
        "targetY": 35,
        "label": "Villa Raíz"
      },
      {
        "x": 240,
        "y": 0,
        "w": 120,
        "h": 25,
        "targetMap": "oldale_town",
        "targetX": 256,
        "targetY": 480,
        "label": "Pueblo Escaso"
      }
    ]
  },
`;

content = content.substring(0, r101Idx) + r101New + content.substring(r101End);

// 6. route_102
const r102Search = '"route_102": {';
const r102Idx = content.indexOf(r102Search);
const r102End = content.indexOf('  "route_103": {');

const r102New = `  "route_102": {
    "id": "route_102",
    "name": "Ruta 102 (Hoenn)",
    "subtitle": "Ruta campestre entre Pueblo Escaso y Petalia",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": { "x": 560, "y": 250, "dir": "left" },
    "flowerPatches": [
      { "x": 150, "y": 150, "w": 140, "h": 80 },
      { "x": 340, "y": 220, "w": 120, "h": 70 }
    ],
    "encounters": {
      "chance": 0.15,
      "pokemon": ["Zigzagoon", "Wurmple", "Lotad", "Seedot", "Ralts"]
    },
    "items": [
      {
        "id": "route_102_item_1",
        "name": "Poción",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_102_item_2",
        "name": "Baya Aranja",
        "x": 310,
        "y": 270,
        "type": "berry",
        "collected": false
      },
      {
        "id": "route_102_item_3",
        "name": "Baya Meloc",
        "x": 470,
        "y": 390,
        "type": "berry",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_102_calvin",
        "name": "Joven Calvino",
        "avatar": "🧢",
        "color": "#e67e22",
        "x": 260,
        "y": 250,
        "originX": 260,
        "originY": 250,
        "range": 25,
        "dir": "right",
        "dialogs": [
          "¡Si te cruzas con la mirada de otro entrenador, el combate es obligatorio!"
        ],
        "canHeal": false,
        "battleOpponent": {
          "name": "Zigzagoon",
          "type": "Normal",
          "hp": 75,
          "maxHp": 75,
          "attack": 16,
          "level": 5,
          "badgeName": "Insignia Joven"
        }
      }
    ],
    "exits": [
      {
        "x": 580,
        "y": 210,
        "w": 20,
        "h": 80,
        "targetMap": "oldale_town",
        "targetX": 30,
        "targetY": 240,
        "label": "Pueblo Escaso"
      },
      {
        "x": 0,
        "y": 210,
        "w": 20,
        "h": 80,
        "targetMap": "petalburg_city",
        "targetX": 440,
        "targetY": 240,
        "label": "Ciudad Petalia"
      }
    ]
  },
`;

content = content.substring(0, r102Idx) + r102New + content.substring(r102End);

// Exportar window.HOENN_MAPS como alias
if (!content.includes('window.HOENN_MAPS = HOENN_FULL_MAPS;')) {
  content = content.replace('window.HOENN_FULL_MAPS = HOENN_FULL_MAPS;', 'window.HOENN_FULL_MAPS = HOENN_FULL_MAPS;\n  window.HOENN_MAPS = HOENN_FULL_MAPS;');
}

fs.writeFileSync(path, content, 'utf8');
console.log('hoenn_maps.js updated successfully!');
