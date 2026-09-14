/**
 * hoenn_maps.js — Mapa Completo de la Región Hoenn (Pokémon Esmeralda)
 * Basado en datos y sprites de pkmnmap.com/Maps/Emerald/
 * Contiene: Todas las Ciudades, Rutas 101-134, Mazmorras, Items, Entrenadores, Encuentros e Inventario
 */
"use strict";

const HOENN_FULL_MAPS = {
  "overworld": {
    "id": "overworld",
    "name": "Región Hoenn (Overworld)",
    "subtitle": "El mapa exterior completo de Pokémon Esmeralda",
    "tileset": "OverworldTrainers",
    "width": 4096,
    "height": 4096,
    "minZoom": 3,
    "maxZoom": 7,
    "spawn": {
      "x": 1024,
      "y": 1024
    },
    "encounters": {
      "chance": 0.1,
      "pokemon": [
        "Zigzagoon",
        "Poochyena",
        "Wingull",
        "Taillow"
      ]
    },
    "items": [
      {
        "id": "ov_potion_1",
        "name": "Potion",
        "x": 950,
        "y": 1100,
        "type": "item",
        "collected": false
      },
      {
        "id": "ov_rare_candy_1",
        "name": "Rare Candy",
        "x": 1200,
        "y": 980,
        "type": "item",
        "collected": false
      },
      {
        "id": "ov_ultra_ball_1",
        "name": "Ultra Ball",
        "x": 1450,
        "y": 1300,
        "type": "item",
        "collected": false
      },
      {
        "id": "ov_nugget_1",
        "name": "Nugget",
        "x": 820,
        "y": 780,
        "type": "item",
        "collected": false
      },
      {
        "id": "ov_tm_toxic",
        "name": "TM06 Toxic",
        "x": 1600,
        "y": 1150,
        "type": "tm",
        "collected": false
      },
      {
        "id": "ov_heart_scale_1",
        "name": "Heart Scale",
        "x": 1750,
        "y": 1500,
        "type": "hidden",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "ov_guide_1",
        "name": "Guía Turístico",
        "avatar": "🧭",
        "color": "#3498db",
        "x": 1050,
        "y": 1040,
        "range": 20,
        "dialogs": [
          "¡Bienvenido a Hoenn! Puedes explorar rutas, ciudades y mares con este mapa interactivo."
        ],
        "canHeal": false
      },
      {
        "id": "ov_nurse_1",
        "name": "Enfermera de Campo",
        "avatar": "👩‍⚕️",
        "color": "#e91e63",
        "x": 1000,
        "y": 1020,
        "range": 0,
        "dialogs": [
          "¡Descansa un momento con tu equipo!"
        ],
        "canHeal": true
      }
    ],
    "exits": [
      {
        "x": 900,
        "y": 1200,
        "w": 80,
        "h": 40,
        "targetMap": "littleroot_town",
        "targetX": 230,
        "targetY": 240,
        "label": "Villa Raíz"
      },
      {
        "x": 1100,
        "y": 950,
        "w": 80,
        "h": 40,
        "targetMap": "mauville_city",
        "targetX": 350,
        "targetY": 300,
        "label": "Ciudad Malvalona"
      },
      {
        "x": 1500,
        "y": 1200,
        "w": 80,
        "h": 40,
        "targetMap": "lilycove_city",
        "targetX": 400,
        "targetY": 350,
        "label": "Ciudad Calagua"
      }
    ]
  },
  "underwater": {
    "id": "underwater",
    "name": "Fondo Marino de Hoenn (Underwater)",
    "subtitle": "Mares profundos de las Rutas 124, 126, 127 y 128",
    "tileset": "Underwater",
    "width": 2048,
    "height": 2048,
    "minZoom": 3,
    "maxZoom": 4,
    "spawn": {
      "x": 1024,
      "y": 1024
    },
    "encounters": {
      "chance": 0.18,
      "pokemon": [
        "Clamperl",
        "Chinchou",
        "Relicanth"
      ]
    },
    "items": [
      {
        "id": "uw_blue_shard",
        "name": "Blue Shard",
        "x": 980,
        "y": 1050,
        "type": "item",
        "collected": false
      },
      {
        "id": "uw_yellow_shard",
        "name": "Yellow Shard",
        "x": 1120,
        "y": 940,
        "type": "item",
        "collected": false
      },
      {
        "id": "uw_red_shard",
        "name": "Red Shard",
        "x": 1250,
        "y": 1150,
        "type": "item",
        "collected": false
      },
      {
        "id": "uw_green_shard",
        "name": "Green Shard",
        "x": 890,
        "y": 1220,
        "type": "item",
        "collected": false
      },
      {
        "id": "uw_pearl",
        "name": "Big Pearl",
        "x": 1050,
        "y": 880,
        "type": "item",
        "collected": false
      },
      {
        "id": "uw_heart_scale",
        "name": "Heart Scale",
        "x": 1300,
        "y": 1000,
        "type": "hidden",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "uw_diver_1",
        "name": "Buzo Nob",
        "avatar": "🤿",
        "color": "#0984e3",
        "x": 1010,
        "y": 980,
        "range": 15,
        "dialogs": [
          "Bajo el agua el mundo es silencioso y misterioso."
        ],
        "canHeal": false,
        "battleOpponent": {
          "name": "Relicanth",
          "type": "Agua",
          "hp": 110,
          "maxHp": 110,
          "attack": 24,
          "level": 34,
          "badgeName": "Mente"
        }
      }
    ],
    "exits": [
      {
        "x": 1024,
        "y": 100,
        "w": 100,
        "h": 40,
        "targetMap": "route_124",
        "targetX": 300,
        "targetY": 200,
        "label": "Superficie (Ruta 124)"
      }
    ]
  },
      "littleroot_town": {
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
      { "x": 220, "y": 155, "label": "Buzón Casa de Jugador", "text": "Buzón de tu casa: \"Hogar de un futuro Campeón de Hoenn\"." },
      { "x": 400, "y": 155, "label": "Buzón Casa del Rival", "text": "Buzón de la casa vecina: \"En viaje de campo con el Prof. Abedul\"." },
      { "x": 195, "y": 425, "label": "Laboratorio Pokémon", "text": "Cartel oficial: \"Laboratorio de Investigación Pokémon del Profesor Abedul\"." },
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
      },
      {
        "x": 200,
        "y": 410,
        "w": 30,
        "h": 30,
        "targetMap": "birch_lab",
        "targetX": 256,
        "targetY": 420,
        "label": "Laboratorio",
        "type": "door"
      }
    ],
    "tileset": "OverworldTrainers"
  },
    "oldale_town": {
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
      },
      {
        "x": 340,
        "y": 210,
        "w": 30,
        "h": 30,
        "targetMap": "pokemon_center",
        "targetX": 512,
        "targetY": 900,
        "label": "Centro Pokémon",
        "type": "door"
      },
      {
        "x": 140,
        "y": 210,
        "w": 30,
        "h": 30,
        "targetMap": "poke_mart",
        "targetX": 512,
        "targetY": 900,
        "label": "Tienda",
        "type": "door"
      }
    ],
    "tileset": "OverworldTrainers"
  },
    "petalburg_city": {
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
      },
      {
        "x": 95,
        "y": 180,
        "w": 30,
        "h": 30,
        "targetMap": "gym_petalburg",
        "targetX": 512,
        "targetY": 900,
        "label": "Gimnasio",
        "type": "door"
      },
      {
        "x": 320,
        "y": 310,
        "w": 30,
        "h": 30,
        "targetMap": "pokemon_center",
        "targetX": 512,
        "targetY": 900,
        "label": "Centro Pokémon",
        "type": "door"
      }
    ],
    "tileset": "OverworldTrainers"
  },
    "rustboro_city": {
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
      },
      {
        "id": "rival_2",
        "name": "Brenda",
        "avatar": "⭐",
        "color": "#00b894",
        "x": 540,
        "y": 420,
        "range": 6,
        "dialogs": [
          "Brenda: ¡Después del Gimnasio de Férrica me he entrenado muchísimo! ¡Segunda cita!"
        ],
        "canHeal": false,
        "battleTrainerId": "rival_2"
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
      },
      {
        "x": 455,
        "y": 200,
        "w": 30,
        "h": 30,
        "targetMap": "gym_rustboro",
        "targetX": 512,
        "targetY": 900,
        "label": "Gimnasio",
        "type": "door"
      },
      {
        "x": 275,
        "y": 320,
        "w": 30,
        "h": 30,
        "targetMap": "pokemon_center",
        "targetX": 512,
        "targetY": 900,
        "label": "Centro Pokémon",
        "type": "door"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "dewford_town": {
    "id": "dewford_town",
    "name": "Pueblo Azuliza (Dewford Town)",
    "subtitle": "Una pequeña isla rodeada de brisa marina",
    "width": 500,
    "height": 450,
    "spawn": {
      "x": 250,
      "y": 380
    },
    "encounters": {
      "chance": 0.08,
      "pokemon": [
        "Tentacool",
        "Wingull",
        "Magikarp"
      ]
    },
    "items": [
      {
        "id": "dewford_silk_scarf",
        "name": "Stardust",
        "x": 120,
        "y": 280,
        "type": "item",
        "collected": false
      },
      {
        "id": "dewford_sludge_bomb",
        "name": "Heart Scale",
        "x": 380,
        "y": 320,
        "type": "hidden",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "brawly_leader",
        "name": "Líder Marcial",
        "avatar": "🏄",
        "color": "#00cec9",
        "x": 250,
        "y": 160,
        "range": 0,
        "dialogs": [
          "¡Una gran ola de fuerza! ¡Lucha contra mi equipo tipo Lucha!"
        ],
        "canHeal": false,
        "battleTrainerId": "gym_marcial"
      },
      {
        "id": "mr_briney_dewford",
        "name": "Sr. Arenque",
        "avatar": "⚓",
        "color": "#74b9ff",
        "x": 400,
        "y": 380,
        "range": 0,
        "dialogs": [
          "¡Mi barco Peeko te llevará a Ciudad Portual cuando gustes!"
        ],
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 0,
        "y": 150,
        "w": 20,
        "h": 80,
        "targetMap": "granite_cave",
        "targetX": 300,
        "targetY": 450,
        "label": "Cueva Granito"
      },
      {
        "x": 250,
        "y": 0,
        "w": 100,
        "h": 20,
        "targetMap": "route_106",
        "targetX": 250,
        "targetY": 450,
        "label": "Ruta 106 (Mar)"
      },
      {
        "x": 480,
        "y": 200,
        "w": 20,
        "h": 80,
        "targetMap": "route_107",
        "targetX": 30,
        "targetY": 200,
        "label": "Ruta 107 (Mar)"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "slateport_city": {
    "id": "slateport_city",
    "name": "Ciudad Portual (Slateport City)",
    "subtitle": "Donde el comercio y el mar se dan la mano",
    "width": 650,
    "height": 600,
    "spawn": {
      "x": 320,
      "y": 550
    },
    "encounters": {
      "chance": 0.05,
      "pokemon": [
        "Wingull",
        "Pelipper",
        "Tentacool"
      ]
    },
    "items": [
      {
        "id": "slateport_hyper_potion",
        "name": "Hyper Potion",
        "x": 180,
        "y": 260,
        "type": "item",
        "collected": false
      },
      {
        "id": "slateport_star_piece",
        "name": "Star Piece",
        "x": 450,
        "y": 380,
        "type": "hidden",
        "collected": false
      },
      {
        "id": "slateport_cleanse_tag",
        "name": "Cleanse Tag",
        "x": 320,
        "y": 140,
        "type": "key",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "capt_stern",
        "name": "Capitán Babor",
        "avatar": "👨‍✈️",
        "color": "#0984e3",
        "x": 350,
        "y": 200,
        "range": 0,
        "dialogs": [
          "¡Estamos preparando la expedición oceanográfica en el Museo Marítimo!"
        ],
        "canHeal": false
      },
      {
        "id": "market_merchant",
        "name": "Comerciante de Mercado",
        "avatar": "🛍️",
        "color": "#e17055",
        "x": 200,
        "y": 420,
        "range": 15,
        "dialogs": [
          "¡Incienso Marino y Muñecos para tu base secreta aquí!"
        ],
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 320,
        "y": 0,
        "w": 100,
        "h": 20,
        "targetMap": "route_110",
        "targetX": 320,
        "targetY": 550,
        "label": "Ruta 110"
      },
      {
        "x": 0,
        "y": 300,
        "w": 20,
        "h": 80,
        "targetMap": "route_109",
        "targetX": 450,
        "targetY": 200,
        "label": "Playa Ruta 109"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "mauville_city": {
    "id": "mauville_city",
    "name": "Ciudad Malvalona (Mauville City)",
    "subtitle": "La metrópolis brillante que nunca duerme",
    "width": 650,
    "height": 550,
    "spawn": {
      "x": 320,
      "y": 500
    },
    "encounters": {
      "chance": 0.05,
      "pokemon": [
        "Voltorb",
        "Magnemite",
        "Electrike"
      ]
    },
    "items": [
      {
        "id": "mauville_x_speed",
        "name": "X Speed",
        "x": 150,
        "y": 320,
        "type": "item",
        "collected": false
      },
      {
        "id": "mauville_super_potion",
        "name": "Super Potion",
        "x": 480,
        "y": 220,
        "type": "item",
        "collected": false
      },
      {
        "id": "mauville_thunder_stone",
        "name": "Thunder Stone",
        "x": 250,
        "y": 180,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "wattson_leader",
        "name": "Líder Erico",
        "avatar": "⚡",
        "color": "#f1c40f",
        "x": 320,
        "y": 180,
        "range": 0,
        "dialogs": [
          "¡Jajaja! ¡La energía eléctrica corre por mis venas! ¡Demuestra tu chispa!"
        ],
        "canHeal": false,
        "battleTrainerId": "gym_erico"
      },
      {
        "id": "rydel_bikes",
        "name": "Anacleto Bicis",
        "avatar": "🚲",
        "color": "#00b894",
        "x": 520,
        "y": 380,
        "range": 0,
        "dialogs": [
          "¿Prefieres la Bici de Carreras o la Bici Acrobática? ¡Toma una!"
        ],
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 0,
        "y": 250,
        "w": 20,
        "h": 80,
        "targetMap": "route_117",
        "targetX": 480,
        "targetY": 250,
        "label": "Ruta 117"
      },
      {
        "x": 630,
        "y": 250,
        "w": 20,
        "h": 80,
        "targetMap": "route_118",
        "targetX": 30,
        "targetY": 250,
        "label": "Ruta 118"
      },
      {
        "x": 320,
        "y": 0,
        "w": 100,
        "h": 20,
        "targetMap": "route_111",
        "targetX": 320,
        "targetY": 550,
        "label": "Ruta 111"
      },
      {
        "x": 320,
        "y": 530,
        "w": 100,
        "h": 20,
        "targetMap": "route_110",
        "targetX": 320,
        "targetY": 30,
        "label": "Ruta 110"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "verdanturf_town": {
    "id": "verdanturf_town",
    "name": "Pueblo Verdegal (Verdanturf Town)",
    "subtitle": "El pueblo con el aire más limpio de Hoenn",
    "width": 500,
    "height": 450,
    "spawn": {
      "x": 250,
      "y": 380
    },
    "encounters": {
      "chance": 0.05,
      "pokemon": [
        "Skitty",
        "Roselia"
      ]
    },
    "items": [
      {
        "id": "verdanturf_nest_ball",
        "name": "Nest Ball",
        "x": 180,
        "y": 260,
        "type": "item",
        "collected": false
      },
      {
        "id": "verdanturf_repel",
        "name": "Repel",
        "x": 360,
        "y": 320,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "wanda_verdanturf",
        "name": "Clara (Wanda)",
        "avatar": "👩",
        "color": "#fd79a8",
        "x": 220,
        "y": 200,
        "range": 15,
        "dialogs": [
          "Mi novio está cavando el Túnel Férrfico desde el otro lado con sus propias manos."
        ],
        "canHeal": false
      },
      {
        "id": "karate_man_tunnel",
        "name": "Karateka Férrfico",
        "avatar": "🥋",
        "color": "#e17055",
        "x": 120,
        "y": 100,
        "range": 10,
        "dialogs": [
          "¡El túnel conecta directamente con Ciudad Férrica!"
        ],
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 480,
        "y": 200,
        "w": 20,
        "h": 80,
        "targetMap": "route_117",
        "targetX": 30,
        "targetY": 200,
        "label": "Ruta 117"
      },
      {
        "x": 100,
        "y": 0,
        "w": 80,
        "h": 20,
        "targetMap": "rusturf_tunnel",
        "targetX": 200,
        "targetY": 380,
        "label": "Túnel Férrfico"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "fallarbor_town": {
    "id": "fallarbor_town",
    "name": "Pueblo Pardal (Fallarbor Town)",
    "subtitle": "Una comunidad agrícola bajo una lluvia de ceniza",
    "width": 550,
    "height": 450,
    "spawn": {
      "x": 270,
      "y": 380
    },
    "encounters": {
      "chance": 0.06,
      "pokemon": [
        "Spinda",
        "Swablu"
      ]
    },
    "items": [
      {
        "id": "fallarbor_nugget",
        "name": "Nugget",
        "x": 420,
        "y": 180,
        "type": "hidden",
        "collected": false
      },
      {
        "id": "fallarbor_moon_stone",
        "name": "Moon Stone",
        "x": 150,
        "y": 240,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "move_tutor_fallarbor",
        "name": "Tutor de Movimientos",
        "avatar": "🧙‍♂️",
        "color": "#a29bfe",
        "x": 320,
        "y": 220,
        "range": 0,
        "dialogs": [
          "Tráeme una Escama Corazón y recordaré cualquier movimiento para tu Pokémon."
        ],
        "canHeal": false
      },
      {
        "id": "cozmo_prof",
        "name": "Profesor Cozmo",
        "avatar": "🔬",
        "color": "#636e72",
        "x": 200,
        "y": 180,
        "range": 0,
        "dialogs": [
          "¡El Meteorito cayó en la Cascada Meteoro! No dejes que los villanos se lo lleven."
        ],
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 0,
        "y": 220,
        "w": 20,
        "h": 80,
        "targetMap": "route_114",
        "targetX": 480,
        "targetY": 100,
        "label": "Ruta 114"
      },
      {
        "x": 530,
        "y": 220,
        "w": 20,
        "h": 80,
        "targetMap": "route_113",
        "targetX": 30,
        "targetY": 220,
        "label": "Ruta 113"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "lavaridge_town": {
    "id": "lavaridge_town",
    "name": "Pueblo Lavacalda (Lavaridge Town)",
    "subtitle": "Famoso por sus aguas termales curativas",
    "width": 500,
    "height": 450,
    "spawn": {
      "x": 250,
      "y": 380
    },
    "encounters": {
      "chance": 0.05,
      "pokemon": [
        "Numel",
        "Slugma",
        "Torkoal"
      ]
    },
    "items": [
      {
        "id": "lavaridge_ice_heal",
        "name": "Ice Heal",
        "x": 380,
        "y": 320,
        "type": "item",
        "collected": false
      },
      {
        "id": "lavaridge_fire_stone",
        "name": "Fire Stone",
        "x": 180,
        "y": 150,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "flannery_leader",
        "name": "Líder Candela",
        "avatar": "🔥",
        "color": "#d63031",
        "x": 250,
        "y": 160,
        "range": 0,
        "dialogs": [
          "¡Candela al mando! ¡Siente el calor abrazador de mi volcán!"
        ],
        "canHeal": false,
        "battleTrainerId": "gym_candela"
      },
      {
        "id": "hot_spring_old_lady",
        "name": "Abuela de las Termas",
        "avatar": "👵",
        "color": "#e17055",
        "x": 340,
        "y": 240,
        "range": 10,
        "dialogs": [
          "¡Báñate en las aguas termales para curar cualquier fatiga!"
        ],
        "canHeal": true
      }
    ],
    "exits": [
      {
        "x": 480,
        "y": 250,
        "w": 20,
        "h": 80,
        "targetMap": "jagged_pass",
        "targetX": 50,
        "targetY": 400,
        "label": "Desfiladero"
      },
      {
        "x": 250,
        "y": 0,
        "w": 100,
        "h": 20,
        "targetMap": "fiery_path",
        "targetX": 250,
        "targetY": 450,
        "label": "Senda Ígnea"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "fortree_city": {
    "id": "fortree_city",
    "name": "Ciudad Arborada (Fortree City)",
    "subtitle": "Construida entre las copas de los árboles",
    "width": 650,
    "height": 500,
    "spawn": {
      "x": 150,
      "y": 380
    },
    "encounters": {
      "chance": 0.05,
      "pokemon": [
        "Kecleon",
        "Swablu",
        "Tropius"
      ]
    },
    "items": [
      {
        "id": "fortree_mental_herb",
        "name": "Revival Herb",
        "x": 420,
        "y": 240,
        "type": "item",
        "collected": false
      },
      {
        "id": "fortree_tm_aerial_ace",
        "name": "TM40 Aerial Ace",
        "x": 540,
        "y": 160,
        "type": "tm",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "winona_leader",
        "name": "Líder Alana",
        "avatar": "🪶",
        "color": "#74b9ff",
        "x": 500,
        "y": 220,
        "range": 0,
        "dialogs": [
          "Me comunico con el viento y los cielos. ¡Vuela alto con nosotros!"
        ],
        "canHeal": false,
        "battleTrainerId": "gym_alana"
      },
      {
        "id": "steven_fortree",
        "name": "Máximo Peñas (Steven)",
        "avatar": "💎",
        "color": "#0984e3",
        "x": 320,
        "y": 320,
        "range": 0,
        "dialogs": [
          "Usa el Detector Devon para revelar a los Kecleon invisibles."
        ],
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 0,
        "y": 300,
        "w": 20,
        "h": 80,
        "targetMap": "route_119",
        "targetX": 480,
        "targetY": 300,
        "label": "Ruta 119"
      },
      {
        "x": 630,
        "y": 300,
        "w": 20,
        "h": 80,
        "targetMap": "route_120",
        "targetX": 30,
        "targetY": 300,
        "label": "Ruta 120"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "lilycove_city": {
    "id": "lilycove_city",
    "name": "Ciudad Calagua (Lilycove City)",
    "subtitle": "El gran puerto cultural donde el mar y la tierra se abrazan",
    "width": 750,
    "height": 650,
    "spawn": {
      "x": 380,
      "y": 550
    },
    "encounters": {
      "chance": 0.05,
      "pokemon": [
        "Wingull",
        "Pelipper",
        "Wailmer"
      ]
    },
    "items": [
      {
        "id": "lilycove_max_repel",
        "name": "Max Repel",
        "x": 220,
        "y": 440,
        "type": "item",
        "collected": false
      },
      {
        "id": "lilycove_heart_scale",
        "name": "Heart Scale",
        "x": 650,
        "y": 500,
        "type": "hidden",
        "collected": false
      },
      {
        "id": "lilycove_pokeball",
        "name": "Ultra Ball",
        "x": 500,
        "y": 220,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "dept_store_manager",
        "name": "Gerente Gran Almacén",
        "avatar": "🏬",
        "color": "#fdcb6e",
        "x": 400,
        "y": 220,
        "range": 0,
        "dialogs": [
          "¡Bienvenido al Centro Comercial de Calagua! 5 pisos de artículos exclusivos."
        ],
        "canHeal": false
      },
      {
        "id": "museum_curator",
        "name": "Conservador del Museo",
        "avatar": "🎨",
        "color": "#6c5ce7",
        "x": 250,
        "y": 280,
        "range": 15,
        "dialogs": [
          "Pintamos cuadros de los Pokémon que ganan concursos de rango Maestro."
        ],
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 0,
        "y": 350,
        "w": 20,
        "h": 80,
        "targetMap": "route_121",
        "targetX": 480,
        "targetY": 350,
        "label": "Ruta 121"
      },
      {
        "x": 730,
        "y": 450,
        "w": 20,
        "h": 80,
        "targetMap": "route_124",
        "targetX": 30,
        "targetY": 300,
        "label": "Ruta 124 (Mar)"
      },
      {
        "x": 680,
        "y": 150,
        "w": 60,
        "h": 40,
        "targetMap": "aqua_hideout",
        "targetX": 300,
        "targetY": 400,
        "label": "Guarida Aqua"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "mossdeep_city": {
    "id": "mossdeep_city",
    "name": "Ciudad Algaria (Mossdeep City)",
    "subtitle": "La isla soleada y sede del Centro Espacial",
    "width": 650,
    "height": 550,
    "spawn": {
      "x": 320,
      "y": 480
    },
    "encounters": {
      "chance": 0.05,
      "pokemon": [
        "Wingull",
        "Solrock",
        "Lunatone"
      ]
    },
    "items": [
      {
        "id": "mossdeep_net_ball",
        "name": "Net Ball",
        "x": 180,
        "y": 350,
        "type": "item",
        "collected": false
      },
      {
        "id": "mossdeep_sun_stone",
        "name": "Sun Stone",
        "x": 520,
        "y": 180,
        "type": "item",
        "collected": false
      },
      {
        "id": "mossdeep_kings_rock",
        "name": "Star Piece",
        "x": 420,
        "y": 420,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "tate_liza_leaders",
        "name": "Líderes Vito y Leti",
        "avatar": "🔮",
        "color": "#e84393",
        "x": 320,
        "y": 160,
        "range": 0,
        "dialogs": [
          "¡Somos Vito y Leti! Combatimos en sincronía psíquica absoluta."
        ],
        "canHeal": false,
        "battleTrainerId": "gym_vito_leti"
      },
      {
        "id": "space_center_scientist",
        "name": "Científico Espacial",
        "avatar": "🚀",
        "color": "#0984e3",
        "x": 500,
        "y": 300,
        "range": 15,
        "dialogs": [
          "El cohete número 77 está listo para su lanzamiento orbital."
        ],
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 0,
        "y": 300,
        "w": 20,
        "h": 80,
        "targetMap": "route_124",
        "targetX": 550,
        "targetY": 300,
        "label": "Ruta 124"
      },
      {
        "x": 630,
        "y": 300,
        "w": 20,
        "h": 80,
        "targetMap": "route_127",
        "targetX": 30,
        "targetY": 300,
        "label": "Ruta 127"
      },
      {
        "x": 320,
        "y": 0,
        "w": 100,
        "h": 20,
        "targetMap": "route_125",
        "targetX": 320,
        "targetY": 450,
        "label": "Ruta 125"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "sootopolis_city": {
    "id": "sootopolis_city",
    "name": "Arrecípolis (Sootopolis City)",
    "subtitle": "La mística ciudad levantada en el cráter de un volcán",
    "width": 650,
    "height": 600,
    "spawn": {
      "x": 320,
      "y": 520
    },
    "encounters": {
      "chance": 0.08,
      "pokemon": [
        "Magikarp",
        "Gyarados",
        "Tentacool"
      ]
    },
    "items": [
      {
        "id": "sootopolis_water_stone",
        "name": "Water Stone",
        "x": 180,
        "y": 240,
        "type": "item",
        "collected": false
      },
      {
        "id": "sootopolis_tm_water_pulse",
        "name": "TM03 Water Pulse",
        "x": 450,
        "y": 180,
        "type": "tm",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "juan_leader",
        "name": "Líder Galano (Juan)",
        "avatar": "🎩",
        "color": "#00cec9",
        "x": 320,
        "y": 150,
        "range": 0,
        "dialogs": [
          "¡El agua es belleza, gracia y pureza! ¡Prepárate para mi danza acuática!"
        ],
        "canHeal": false,
        "battleTrainerId": "gym_galano"
      },
      {
        "id": "wallace_champion",
        "name": "Plubio (Wallace)",
        "avatar": "👑",
        "color": "#74b9ff",
        "x": 320,
        "y": 320,
        "range": 0,
        "dialogs": [
          "Plubio: Campeón de la Liga Hoenn. ¿Tienes lo necesario para arrebatarme el trono?"
        ],
        "canHeal": false,
        "battleTrainerId": "gym_plubio"
      }
    ],
    "exits": [
      {
        "x": 320,
        "y": 580,
        "w": 100,
        "h": 20,
        "targetMap": "route_126",
        "targetX": 320,
        "targetY": 100,
        "label": "Ruta 126 (Buceo)"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "pacifidlog_town": {
    "id": "pacifidlog_town",
    "name": "Pueblo Oromar (Pacifidlog Town)",
    "subtitle": "Pueblo flotante edificado sobre balsas de madera",
    "width": 550,
    "height": 450,
    "spawn": {
      "x": 270,
      "y": 350
    },
    "encounters": {
      "chance": 0.08,
      "pokemon": [
        "Tentacool",
        "Wingull",
        "Corsola"
      ]
    },
    "items": [
      {
        "id": "pacifidlog_revive",
        "name": "Revive",
        "x": 180,
        "y": 240,
        "type": "item",
        "collected": false
      },
      {
        "id": "pacifidlog_pearl",
        "name": "Pearl",
        "x": 420,
        "y": 280,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "pacifidlog_elder",
        "name": "Anciano de Oromar",
        "avatar": "👴",
        "color": "#b2bec3",
        "x": 270,
        "y": 200,
        "range": 10,
        "dialogs": [
          "¿Ves la Isla Espejismo hoy? ¡A veces aparece y a veces desaparece!"
        ],
        "canHeal": false
      },
      {
        "id": "nurse_pacifidlog",
        "name": "Enfermera Joy",
        "avatar": "👩‍⚕️",
        "color": "#ff7675",
        "x": 350,
        "y": 200,
        "range": 0,
        "dialogs": [
          "¡Descansen aquí antes de surfear las corrientes marinas!"
        ],
        "canHeal": true
      }
    ],
    "exits": [
      {
        "x": 530,
        "y": 220,
        "w": 20,
        "h": 80,
        "targetMap": "route_131",
        "targetX": 30,
        "targetY": 220,
        "label": "Ruta 131 (Pilar Celeste)"
      },
      {
        "x": 0,
        "y": 220,
        "w": 20,
        "h": 80,
        "targetMap": "route_132",
        "targetX": 480,
        "targetY": 220,
        "label": "Ruta 132 (Corrientes)"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "ever_grande_city": {
    "id": "ever_grande_city",
    "name": "Ciudad Colosalia (Ever Grande City)",
    "subtitle": "La cumbre de los entrenadores y sede de la Liga Pokémon",
    "width": 650,
    "height": 600,
    "spawn": {
      "x": 320,
      "y": 520
    },
    "encounters": {
      "chance": 0.06,
      "pokemon": [
        "Luvdisc",
        "Corsola",
        "Gyarados"
      ]
    },
    "items": [
      {
        "id": "ever_grande_rare_candy",
        "name": "Rare Candy",
        "x": 220,
        "y": 380,
        "type": "item",
        "collected": false
      },
      {
        "id": "ever_grande_max_elixir",
        "name": "Max Elixir",
        "x": 480,
        "y": 260,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "league_guard",
        "name": "Guardia de la Liga",
        "avatar": "🛡️",
        "color": "#d63031",
        "x": 320,
        "y": 200,
        "range": 0,
        "dialogs": [
          "¡Solo aquellos con las 8 Medallas de Hoenn pueden cruzar la Calle Victoria!"
        ],
        "canHeal": false,
        "battleOpponent": {
          "name": "Metagross",
          "type": "Acero/Psíquico",
          "hp": 180,
          "maxHp": 180,
          "attack": 42,
          "level": 55,
          "badgeName": "Campeón"
        }
      }
    ],
    "exits": [
      {
        "x": 320,
        "y": 580,
        "w": 100,
        "h": 20,
        "targetMap": "route_128",
        "targetX": 320,
        "targetY": 100,
        "label": "Ruta 128 (Mar)"
      },
      {
        "x": 320,
        "y": 0,
        "w": 100,
        "h": 20,
        "targetMap": "victory_road",
        "targetX": 320,
        "targetY": 480,
        "label": "Calle Victoria"
      }
    ],
    "tileset": "OverworldTrainers"
  },
      "route_101": {
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
        "battleTrainerId": "route_trainer_101"

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
    "route_102": {
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
        "battleTrainerId": "route_trainer_102"

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
  "route_103": {
    "id": "route_103",
    "name": "Ruta 103 (Hoenn)",
    "subtitle": "Paso norte hacia el lago de Pueblo Escaso",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Zigzagoon",
        "Poochyena",
        "Wingull"
      ]
    },
    "items": [
      {
        "id": "route_103_item_1",
        "name": "Guard Spec",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_103_item_2",
        "name": "Cheri Berry",
        "x": 310,
        "y": 270,
        "type": "berry",
        "collected": false
      },
      {
        "id": "route_103_item_3",
        "name": "Leppa Berry",
        "x": 470,
        "y": 390,
        "type": "berry",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_103_trainer",
        "name": "Entrenador de Ruta 103",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 103 fortalece a mi Zigzagoon! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_103"
      },
      {
        "id": "rival_1",
        "name": "Brenda",
        "avatar": "⭐",
        "color": "#00b894",
        "x": 430,
        "y": 300,
        "range": 6,
        "dialogs": [
          "Brenda: ¡Te estaba esperando en la Ruta 103! ¡Vamos a ver qué inicial te ha elegido el profesor!"
        ],
        "canHeal": false,
        "battleTrainerId": "rival_1"
      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "oldale_town",
        "targetX": 300,
        "targetY": 300,
        "label": "Pueblo Escaso"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_110",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 110"
      }
    ]
  },
  "route_104": {
    "id": "route_104",
    "name": "Ruta 104 (Hoenn)",
    "subtitle": "Costa abierta y Bosque Petalia",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Taillow",
        "Wingull",
        "Marill",
        "Wurmple"
      ]
    },
    "items": [
      {
        "id": "route_104_item_1",
        "name": "Pokeball",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_104_item_2",
        "name": "Potion",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_104_item_3",
        "name": "Oran Berry",
        "x": 470,
        "y": 390,
        "type": "berry",
        "collected": false
      },
      {
        "id": "route_104_item_4",
        "name": "Pecha Berry",
        "x": 630,
        "y": 160,
        "type": "berry",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_104_trainer",
        "name": "Entrenador de Ruta 104",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 104 fortalece a mi Taillow! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_104"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "petalburg_city",
        "targetX": 300,
        "targetY": 300,
        "label": "Ciudad Petalia"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "petalburg_woods",
        "targetX": 300,
        "targetY": 300,
        "label": "Bosque Petalia"
      }
    ]
  },
  "route_105": {
    "id": "route_105",
    "name": "Ruta 105 (Hoenn)",
    "subtitle": "Ruta marítima hacia la Cueva Insular",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Tentacool",
        "Wingull",
        "Magikarp"
      ]
    },
    "items": [
      {
        "id": "route_105_item_1",
        "name": "Iron",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_105_item_2",
        "name": "Heart Scale",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_105_trainer",
        "name": "Entrenador de Ruta 105",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 105 fortalece a mi Tentacool! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_105"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_104",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 104"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_106",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 106"
      }
    ]
  },
  "route_106": {
    "id": "route_106",
    "name": "Ruta 106 (Hoenn)",
    "subtitle": "Canal marítimo rodeando Pueblo Azuliza",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Tentacool",
        "Wingull",
        "Magikarp"
      ]
    },
    "items": [
      {
        "id": "route_106_item_1",
        "name": "Protein",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_106_item_2",
        "name": "Star Piece",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_106_trainer",
        "name": "Entrenador de Ruta 106",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 106 fortalece a mi Tentacool! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_106"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_105",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 105"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "dewford_town",
        "targetX": 300,
        "targetY": 300,
        "label": "Pueblo Azuliza"
      }
    ]
  },
  "route_107": {
    "id": "route_107",
    "name": "Ruta 107 (Hoenn)",
    "subtitle": "Océano azul que conecta Azuliza con la Ruta 108",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Tentacool",
        "Wingull",
        "Wailmer"
      ]
    },
    "items": [
      {
        "id": "route_107_item_1",
        "name": "Super Repel",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_107_trainer",
        "name": "Entrenador de Ruta 107",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 107 fortalece a mi Tentacool! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_107"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "dewford_town",
        "targetX": 300,
        "targetY": 300,
        "label": "Pueblo Azuliza"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_108",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 108"
      }
    ]
  },
  "route_108": {
    "id": "route_108",
    "name": "Ruta 108 (Hoenn)",
    "subtitle": "Canal marítimo frente a la Nao Abandonada",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Tentacool",
        "Wingull",
        "Pelipper"
      ]
    },
    "items": [
      {
        "id": "route_108_item_1",
        "name": "Star Piece",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_108_item_2",
        "name": "Heart Scale",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_108_trainer",
        "name": "Entrenador de Ruta 108",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 108 fortalece a mi Tentacool! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_108"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_107",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 107"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "abandoned_ship",
        "targetX": 300,
        "targetY": 300,
        "label": "Barco Abandonado"
      }
    ]
  },
  "route_109": {
    "id": "route_109",
    "name": "Ruta 109 (Hoenn)",
    "subtitle": "Gran playa turística de Ciudad Portual",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Wingull",
        "Tentacool",
        "Magikarp"
      ]
    },
    "items": [
      {
        "id": "route_109_item_1",
        "name": "Great Ball",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_109_item_2",
        "name": "Potion",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_109_item_3",
        "name": "Heart Scale",
        "x": 470,
        "y": 390,
        "type": "hidden",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_109_trainer",
        "name": "Entrenador de Ruta 109",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 109 fortalece a mi Wingull! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_109"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_108",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 108"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "slateport_city",
        "targetX": 300,
        "targetY": 300,
        "label": "Ciudad Portual"
      }
    ]
  },
  "route_110": {
    "id": "route_110",
    "name": "Ruta 110 (Hoenn)",
    "subtitle": "El gran puente ciclista entre Portual y Malvalona",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Electrike",
        "Plusle",
        "Minun",
        "Gulpin",
        "Oddish"
      ]
    },
    "items": [
      {
        "id": "route_110_item_1",
        "name": "Dire Hit",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_110_item_2",
        "name": "Elixir",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_110_item_3",
        "name": "Nanab Berry",
        "x": 470,
        "y": 390,
        "type": "berry",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_110_trainer",
        "name": "Entrenador de Ruta 110",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 110 fortalece a mi Electrike! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_110"

      },
      {
        "id": "rival_3",
        "name": "Brenda",
        "avatar": "⭐",
        "color": "#00b894",
        "x": 320,
        "y": 260,
        "range": 6,
        "dialogs": [
          "Brenda: ¡La Ruta 110 es perfecta para entrenar! ¿Todavía seguimos empatados?"
        ],
        "canHeal": false,
        "battleTrainerId": "rival_3"
      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "slateport_city",
        "targetX": 300,
        "targetY": 300,
        "label": "Ciudad Portual"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "mauville_city",
        "targetX": 300,
        "targetY": 300,
        "label": "Ciudad Malvalona"
      }
    ]
  },
  "route_111": {
    "id": "route_111",
    "name": "Ruta 111 (Hoenn)",
    "subtitle": "Desierto árido y Torre Espejismo",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Trapinch",
        "Sandshrew",
        "Cacnea",
        "Baltoy"
      ]
    },
    "items": [
      {
        "id": "route_111_item_1",
        "name": "Elixir",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_111_item_2",
        "name": "Stardust",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_111_item_3",
        "name": "HP UP",
        "x": 470,
        "y": 390,
        "type": "hidden",
        "collected": false
      },
      {
        "id": "route_111_item_4",
        "name": "Razz Berry",
        "x": 630,
        "y": 160,
        "type": "berry",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_111_trainer",
        "name": "Entrenador de Ruta 111",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 111 fortalece a mi Trapinch! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_111"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "mauville_city",
        "targetX": 300,
        "targetY": 300,
        "label": "Ciudad Malvalona"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_112",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 112"
      }
    ]
  },
  "route_112": {
    "id": "route_112",
    "name": "Ruta 112 (Hoenn)",
    "subtitle": "Falda sur del Monte Cenizo y teleférico",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Numel",
        "Marill"
      ]
    },
    "items": [
      {
        "id": "route_112_item_1",
        "name": "Rawst Berry",
        "x": 150,
        "y": 150,
        "type": "berry",
        "collected": false
      },
      {
        "id": "route_112_item_2",
        "name": "Pecha Berry",
        "x": 310,
        "y": 270,
        "type": "berry",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_112_trainer",
        "name": "Entrenador de Ruta 112",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 112 fortalece a mi Numel! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_112"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_111",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 111"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "fiery_path",
        "targetX": 300,
        "targetY": 300,
        "label": "Senda Ígnea"
      }
    ]
  },
  "route_113": {
    "id": "route_113",
    "name": "Ruta 113 (Hoenn)",
    "subtitle": "Camino cubierto de ceniza volcánica",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Spinda",
        "Slugma",
        "Skarmory"
      ]
    },
    "items": [
      {
        "id": "route_113_item_1",
        "name": "Super Repel",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_113_item_2",
        "name": "Hyper Potion",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_113_item_3",
        "name": "Nugget",
        "x": 470,
        "y": 390,
        "type": "hidden",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_113_trainer",
        "name": "Entrenador de Ruta 113",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 113 fortalece a mi Spinda! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_113"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_111",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 111"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "fallarbor_town",
        "targetX": 300,
        "targetY": 300,
        "label": "Pueblo Pardal"
      }
    ]
  },
  "route_114": {
    "id": "route_114",
    "name": "Ruta 114 (Hoenn)",
    "subtitle": "Sendero rocoso hacia la Cascada Meteoro",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Swablu",
        "Lotad",
        "Lombre",
        "Seviper",
        "Zangoose"
      ]
    },
    "items": [
      {
        "id": "route_114_item_1",
        "name": "EnergyPowder",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_114_item_2",
        "name": "Rare Candy",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_114_item_3",
        "name": "Protein",
        "x": 470,
        "y": 390,
        "type": "hidden",
        "collected": false
      },
      {
        "id": "route_114_item_4",
        "name": "Persim Berry",
        "x": 630,
        "y": 160,
        "type": "berry",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_114_trainer",
        "name": "Entrenador de Ruta 114",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 114 fortalece a mi Swablu! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_114"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "fallarbor_town",
        "targetX": 300,
        "targetY": 300,
        "label": "Pueblo Pardal"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "meteor_falls",
        "targetX": 300,
        "targetY": 300,
        "label": "Cascada Meteoro"
      }
    ]
  },
  "route_115": {
    "id": "route_115",
    "name": "Ruta 115 (Hoenn)",
    "subtitle": "Acantilados costeros al norte de Ciudad Férrica",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Swablu",
        "Taillow",
        "Wingull",
        "Jigglypuff"
      ]
    },
    "items": [
      {
        "id": "route_115_item_1",
        "name": "Super Potion",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_115_item_2",
        "name": "Great Ball",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_115_item_3",
        "name": "Bluk Berry",
        "x": 470,
        "y": 390,
        "type": "berry",
        "collected": false
      },
      {
        "id": "route_115_item_4",
        "name": "Heal Powder",
        "x": 630,
        "y": 160,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_115_trainer",
        "name": "Entrenador de Ruta 115",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 115 fortalece a mi Swablu! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_115"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "rustboro_city",
        "targetX": 300,
        "targetY": 300,
        "label": "Ciudad Férrica"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "meteor_falls",
        "targetX": 300,
        "targetY": 300,
        "label": "Cascada Meteoro"
      }
    ]
  },
  "route_116": {
    "id": "route_116",
    "name": "Ruta 116 (Hoenn)",
    "subtitle": "Ruta este hacia el Túnel Férrfico",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Taillow",
        "Nincada",
        "Skitty",
        "Abra"
      ]
    },
    "items": [
      {
        "id": "route_116_item_1",
        "name": "Repel",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_116_item_2",
        "name": "Potion",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_116_item_3",
        "name": "Ether",
        "x": 470,
        "y": 390,
        "type": "hidden",
        "collected": false
      },
      {
        "id": "route_116_item_4",
        "name": "Chesto Berry",
        "x": 630,
        "y": 160,
        "type": "berry",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_116_trainer",
        "name": "Entrenador de Ruta 116",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 116 fortalece a mi Taillow! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_116"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "rustboro_city",
        "targetX": 300,
        "targetY": 300,
        "label": "Ciudad Férrica"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "rusturf_tunnel",
        "targetX": 300,
        "targetY": 300,
        "label": "Túnel Férrfico"
      }
    ]
  },
  "route_117": {
    "id": "route_117",
    "name": "Ruta 117 (Hoenn)",
    "subtitle": "Camino de flores y Guardería Pokémon",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Roselia",
        "Marill",
        "Illumise",
        "Volbeat",
        "Seedot"
      ]
    },
    "items": [
      {
        "id": "route_117_item_1",
        "name": "Revive",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_117_item_2",
        "name": "Great Ball",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_117_item_3",
        "name": "Wepear Berry",
        "x": 470,
        "y": 390,
        "type": "berry",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_117_trainer",
        "name": "Entrenador de Ruta 117",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 117 fortalece a mi Roselia! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_117"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "mauville_city",
        "targetX": 300,
        "targetY": 300,
        "label": "Ciudad Malvalona"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "verdanturf_town",
        "targetX": 300,
        "targetY": 300,
        "label": "Pueblo Verdegal"
      }
    ]
  },
  "route_118": {
    "id": "route_118",
    "name": "Ruta 118 (Hoenn)",
    "subtitle": "Cruce de río entre Hoenn oeste y este",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Zigzagoon",
        "Linoone",
        "Electrike",
        "Manectric",
        "Wingull"
      ]
    },
    "items": [
      {
        "id": "route_118_item_1",
        "name": "Hyper Potion",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_118_item_2",
        "name": "Sitrus Berry",
        "x": 310,
        "y": 270,
        "type": "berry",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_118_trainer",
        "name": "Entrenador de Ruta 118",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 118 fortalece a mi Zigzagoon! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_118"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "mauville_city",
        "targetX": 300,
        "targetY": 300,
        "label": "Ciudad Malvalona"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_119",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 119"
      }
    ]
  },
  "route_119": {
    "id": "route_119",
    "name": "Ruta 119 (Hoenn)",
    "subtitle": "Larga ruta de hierba alta y el Instituto Meteorológico",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Tropius",
        "Linoone",
        "Oddish",
        "Castform",
        "Feebas"
      ]
    },
    "items": [
      {
        "id": "route_119_item_1",
        "name": "Super Repel",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_119_item_2",
        "name": "Hyper Potion",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_119_item_3",
        "name": "Elixir",
        "x": 470,
        "y": 390,
        "type": "hidden",
        "collected": false
      },
      {
        "id": "route_119_item_4",
        "name": "Zinc",
        "x": 630,
        "y": 160,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_119_item_5",
        "name": "Rare Candy",
        "x": 290,
        "y": 280,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_119_trainer",
        "name": "Entrenador de Ruta 119",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 119 fortalece a mi Tropius! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_119"

      },
      {
        "id": "rival_4",
        "name": "Brenda",
        "avatar": "⭐",
        "color": "#00b894",
        "x": 420,
        "y": 320,
        "range": 6,
        "dialogs": [
          "Brenda: ¡Esta lluvia y estos rápidos me han vuelto imparable! ¡Última batalla por ahora!"
        ],
        "canHeal": false,
        "battleTrainerId": "rival_4"
      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_118",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 118"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "fortree_city",
        "targetX": 300,
        "targetY": 300,
        "label": "Ciudad Arborada"
      }
    ]
  },
  "route_120": {
    "id": "route_120",
    "name": "Ruta 120 (Hoenn)",
    "subtitle": "Lagos, hierba alta y la Tumba Antigua",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Absol",
        "Marill",
        "Mightyena",
        "Linoone"
      ]
    },
    "items": [
      {
        "id": "route_120_item_1",
        "name": "Revive",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_120_item_2",
        "name": "Nest Ball",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_120_item_3",
        "name": "Aspear Berry",
        "x": 470,
        "y": 390,
        "type": "berry",
        "collected": false
      },
      {
        "id": "route_120_item_4",
        "name": "Wepear Berry",
        "x": 630,
        "y": 160,
        "type": "berry",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_120_trainer",
        "name": "Entrenador de Ruta 120",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 120 fortalece a mi Absol! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_120"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "fortree_city",
        "targetX": 300,
        "targetY": 300,
        "label": "Ciudad Arborada"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_121",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 121"
      }
    ]
  },
  "route_121": {
    "id": "route_121",
    "name": "Ruta 121 (Hoenn)",
    "subtitle": "Acceso a la Zona Safari y Muelle del Monte Pírico",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Duskull",
        "Shuppet",
        "Poochyena",
        "Gloom"
      ]
    },
    "items": [
      {
        "id": "route_121_item_1",
        "name": "Zinc",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_121_item_2",
        "name": "Revive",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_121_item_3",
        "name": "Nanab Berry",
        "x": 470,
        "y": 390,
        "type": "berry",
        "collected": false
      },
      {
        "id": "route_121_item_4",
        "name": "Rawst Berry",
        "x": 630,
        "y": 160,
        "type": "berry",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_121_trainer",
        "name": "Entrenador de Ruta 121",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 121 fortalece a mi Duskull! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_121"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_120",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 120"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "safari_zone",
        "targetX": 300,
        "targetY": 300,
        "label": "Zona Safari"
      }
    ]
  },
  "route_122": {
    "id": "route_122",
    "name": "Ruta 122 (Hoenn)",
    "subtitle": "Lago rodeando el sagrado Monte Pírico",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Tentacool",
        "Wingull",
        "Magikarp"
      ]
    },
    "items": [
      {
        "id": "route_122_item_1",
        "name": "Ultra Ball",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_122_trainer",
        "name": "Entrenador de Ruta 122",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 122 fortalece a mi Tentacool! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_122"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_121",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 121"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "mt_pyre",
        "targetX": 300,
        "targetY": 300,
        "label": "Monte Pírico"
      }
    ]
  },
  "route_123": {
    "id": "route_123",
    "name": "Ruta 123 (Hoenn)",
    "subtitle": "Colinas y la gran Casa del Bayólogo",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Swablu",
        "Gloom",
        "Poochyena",
        "Linoone"
      ]
    },
    "items": [
      {
        "id": "route_123_item_1",
        "name": "Elixir",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_123_item_2",
        "name": "Calcium",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_123_item_3",
        "name": "Revival Herb",
        "x": 470,
        "y": 390,
        "type": "hidden",
        "collected": false
      },
      {
        "id": "route_123_item_4",
        "name": "Qualot Berry",
        "x": 630,
        "y": 160,
        "type": "berry",
        "collected": false
      },
      {
        "id": "route_123_item_5",
        "name": "Grepa Berry",
        "x": 290,
        "y": 280,
        "type": "berry",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_123_trainer",
        "name": "Entrenador de Ruta 123",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 123 fortalece a mi Swablu! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_123"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_118",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 118"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_122",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 122"
      }
    ]
  },
  "route_124": {
    "id": "route_124",
    "name": "Ruta 124 (Hoenn)",
    "subtitle": "Inmenso océano con bancos de coral y buceo",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Tentacool",
        "Wingull",
        "Pelipper",
        "Wailmer"
      ]
    },
    "items": [
      {
        "id": "route_124_item_1",
        "name": "Red Shard",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_124_item_2",
        "name": "Blue Shard",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_124_item_3",
        "name": "Yellow Shard",
        "x": 470,
        "y": 390,
        "type": "hidden",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_124_trainer",
        "name": "Entrenador de Ruta 124",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 124 fortalece a mi Tentacool! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_124"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "lilycove_city",
        "targetX": 300,
        "targetY": 300,
        "label": "Ciudad Calagua"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "mossdeep_city",
        "targetX": 300,
        "targetY": 300,
        "label": "Ciudad Algaria"
      }
    ]
  },
  "route_125": {
    "id": "route_125",
    "name": "Ruta 125 (Hoenn)",
    "subtitle": "Aguas frías del norte frente a la Cueva Cardumen",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Tentacool",
        "Wingull",
        "Wailmer"
      ]
    },
    "items": [
      {
        "id": "route_125_item_1",
        "name": "Big Pearl",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_125_trainer",
        "name": "Entrenador de Ruta 125",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 125 fortalece a mi Tentacool! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_125"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "mossdeep_city",
        "targetX": 300,
        "targetY": 300,
        "label": "Ciudad Algaria"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "shoal_cave",
        "targetX": 300,
        "targetY": 300,
        "label": "Cueva Cardumen"
      }
    ]
  },
  "route_126": {
    "id": "route_126",
    "name": "Ruta 126 (Hoenn)",
    "subtitle": "Atolón exterior que rodea el cráter de Arrecípolis",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Tentacool",
        "Wingull",
        "Wailmer"
      ]
    },
    "items": [
      {
        "id": "route_126_item_1",
        "name": "Green Shard",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_126_item_2",
        "name": "Heart Scale",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_126_trainer",
        "name": "Entrenador de Ruta 126",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 126 fortalece a mi Tentacool! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_126"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_124",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 124"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "sootopolis_city",
        "targetX": 300,
        "targetY": 300,
        "label": "Arrecípolis"
      }
    ]
  },
  "route_127": {
    "id": "route_127",
    "name": "Ruta 127 (Hoenn)",
    "subtitle": "Aguas profundas salpicadas de islotes rocosos",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Tentacool",
        "Wingull",
        "Wailmer"
      ]
    },
    "items": [
      {
        "id": "route_127_item_1",
        "name": "Rare Candy",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_127_item_2",
        "name": "Zinc",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_127_trainer",
        "name": "Entrenador de Ruta 127",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 127 fortalece a mi Tentacool! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_127"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "mossdeep_city",
        "targetX": 300,
        "targetY": 300,
        "label": "Ciudad Algaria"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_128",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 128"
      }
    ]
  },
  "route_128": {
    "id": "route_128",
    "name": "Ruta 128 (Hoenn)",
    "subtitle": "Canal marítimo directo a Ciudad Colosalia",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Tentacool",
        "Wingull",
        "Luvdisc",
        "Corsola"
      ]
    },
    "items": [
      {
        "id": "route_128_item_1",
        "name": "Heart Scale",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_128_trainer",
        "name": "Entrenador de Ruta 128",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 128 fortalece a mi Tentacool! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_128"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_127",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 127"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "ever_grande_city",
        "targetX": 300,
        "targetY": 300,
        "label": "Ciudad Colosalia"
      }
    ]
  },
  "route_129": {
    "id": "route_129",
    "name": "Ruta 129 (Hoenn)",
    "subtitle": "Aguas abiertas del sur con corrientes suaves",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Wailord",
        "Wailmer",
        "Tentacruel"
      ]
    },
    "items": [
      {
        "id": "route_129_item_1",
        "name": "Ultra Ball",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_129_trainer",
        "name": "Entrenador de Ruta 129",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 129 fortalece a mi Wailord! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_129"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_128",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 128"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_130",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 130"
      }
    ]
  },
  "route_130": {
    "id": "route_130",
    "name": "Ruta 130 (Hoenn)",
    "subtitle": "Ubicación mítica de la Isla Espejismo",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Tentacruel",
        "Wailmer",
        "Wynaut"
      ]
    },
    "items": [
      {
        "id": "route_130_item_1",
        "name": "Liechi Berry",
        "x": 150,
        "y": 150,
        "type": "berry",
        "collected": false
      },
      {
        "id": "route_130_item_2",
        "name": "Big Pearl",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_130_trainer",
        "name": "Entrenador de Ruta 130",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 130 fortalece a mi Tentacruel! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_130"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_129",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 129"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_131",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 131"
      }
    ]
  },
  "route_131": {
    "id": "route_131",
    "name": "Ruta 131 (Hoenn)",
    "subtitle": "Canal hacia el legendario Pilar Celeste",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Tentacruel",
        "Pelipper",
        "Wailmer"
      ]
    },
    "items": [
      {
        "id": "route_131_item_1",
        "name": "Super Potion",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_131_item_2",
        "name": "Calcium",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_131_trainer",
        "name": "Entrenador de Ruta 131",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 131 fortalece a mi Tentacruel! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_131"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_130",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 130"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "pacifidlog_town",
        "targetX": 300,
        "targetY": 300,
        "label": "Pueblo Oromar"
      }
    ]
  },
  "route_132": {
    "id": "route_132",
    "name": "Ruta 132 (Hoenn)",
    "subtitle": "Rápidas corrientes marinas hacia el oeste",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Tentacruel",
        "Wingull",
        "Horsea"
      ]
    },
    "items": [
      {
        "id": "route_132_item_1",
        "name": "Rare Candy",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_132_item_2",
        "name": "Protein",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_132_trainer",
        "name": "Entrenador de Ruta 132",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 132 fortalece a mi Tentacruel! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_132"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "pacifidlog_town",
        "targetX": 300,
        "targetY": 300,
        "label": "Pueblo Oromar"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_133",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 133"
      }
    ]
  },
  "route_133": {
    "id": "route_133",
    "name": "Ruta 133 (Hoenn)",
    "subtitle": "Rápidos marítimos y bancos de arena",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Tentacruel",
        "Gyarados"
      ]
    },
    "items": [
      {
        "id": "route_133_item_1",
        "name": "Big Pearl",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_133_item_2",
        "name": "Star Piece",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_133_trainer",
        "name": "Entrenador de Ruta 133",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 133 fortalece a mi Tentacruel! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_133"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_132",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 132"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_134",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 134"
      }
    ]
  },
  "route_134": {
    "id": "route_134",
    "name": "Ruta 134 (Hoenn)",
    "subtitle": "Final de los rápidos y entrada a la Cámara Sellada",
    "tileset": "OverworldTrainers",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 250
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Tentacruel",
        "Wailmer",
        "Relicanth"
      ]
    },
    "items": [
      {
        "id": "route_134_item_1",
        "name": "Carbos",
        "x": 150,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "route_134_item_2",
        "name": "Heart Scale",
        "x": 310,
        "y": 270,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "route_134_trainer",
        "name": "Entrenador de Ruta 134",
        "avatar": "🧢",
        "color": "#0984e3",
        "x": 300,
        "y": 250,
        "range": 20,
        "dialogs": [
          "¡Entrenar en la Ruta 134 fortalece a mi Tentacruel! ¡Luchemos!"
        ],
        "canHeal": false,
        "battleTrainerId": "route_trainer_134"

      }
    ],
    "exits": [
      {
        "x": 50,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "route_133",
        "targetX": 300,
        "targetY": 300,
        "label": "Ruta 133"
      },
      {
        "x": 550,
        "y": 250,
        "w": 30,
        "h": 60,
        "targetMap": "slateport_city",
        "targetX": 300,
        "targetY": 300,
        "label": "Ciudad Portual"
      }
    ]
  },
  "petalburg_woods": {
    "id": "petalburg_woods",
    "name": "Bosque Petalia (Petalburg Woods)",
    "subtitle": "Frondoso bosque que separa Ciudad Petalia de Férrica",
    "width": 650,
    "height": 550,
    "spawn": {
      "x": 320,
      "y": 500
    },
    "encounters": {
      "chance": 0.16,
      "pokemon": [
        "Wurmple",
        "Silcoon",
        "Cascoon",
        "Taillow",
        "Shroomish",
        "Slakoth"
      ]
    },
    "items": [
      {
        "id": "pw_paralyze_heal",
        "name": "Paralyze Heal",
        "x": 180,
        "y": 380,
        "type": "item",
        "collected": false
      },
      {
        "id": "pw_great_ball",
        "name": "Great Ball",
        "x": 450,
        "y": 280,
        "type": "item",
        "collected": false
      },
      {
        "id": "pw_ether",
        "name": "Ether",
        "x": 250,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "pw_tiny_mushroom",
        "name": "Tiny Mushroom",
        "x": 520,
        "y": 420,
        "type": "hidden",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "aqua_grunt_woods",
        "name": "Recluta Aqua",
        "avatar": "🏴‍☠️",
        "color": "#0984e3",
        "x": 320,
        "y": 260,
        "range": 15,
        "dialogs": [
          "¡Dame los papeles de Devon o aténtate a las consecuencias!"
        ],
        "canHeal": false,
        "battleOpponent": {
          "name": "Poochyena",
          "type": "Siniestro",
          "hp": 75,
          "maxHp": 75,
          "attack": 18,
          "level": 9,
          "badgeName": "Bosque"
        }
      },
      {
        "id": "devon_researcher_woods",
        "name": "Investigador Devon",
        "avatar": "👨‍🔬",
        "color": "#6c5ce7",
        "x": 320,
        "y": 200,
        "range": 0,
        "dialogs": [
          "¡Gracias por defenderme! Toma esta Repartir Exp."
        ],
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 320,
        "y": 530,
        "w": 100,
        "h": 20,
        "targetMap": "route_104",
        "targetX": 300,
        "targetY": 100,
        "label": "Ruta 104 Sur"
      },
      {
        "x": 320,
        "y": 0,
        "w": 100,
        "h": 20,
        "targetMap": "route_104",
        "targetX": 300,
        "targetY": 400,
        "label": "Ruta 104 Norte"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "rusturf_tunnel": {
    "id": "rusturf_tunnel",
    "name": "Túnel Férrfico (Rusturf Tunnel)",
    "subtitle": "Paso subterráneo entre Ciudad Férrica y Pueblo Verdegal",
    "width": 600,
    "height": 450,
    "spawn": {
      "x": 100,
      "y": 250
    },
    "encounters": {
      "chance": 0.18,
      "pokemon": [
        "Whismur",
        "Geodude"
      ]
    },
    "items": [
      {
        "id": "rt_pokeball",
        "name": "Pokeball",
        "x": 250,
        "y": 200,
        "type": "item",
        "collected": false
      },
      {
        "id": "rt_max_ether",
        "name": "Max Ether",
        "x": 450,
        "y": 300,
        "type": "hidden",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "peeko_grunt",
        "name": "Recluta Ladrón",
        "avatar": "🏴‍☠️",
        "color": "#0984e3",
        "x": 380,
        "y": 220,
        "range": 10,
        "dialogs": [
          "¡El Peeko del viejo es mío!"
        ],
        "canHeal": false,
        "battleOpponent": {
          "name": "Taillow",
          "type": "Normal/Volador",
          "hp": 85,
          "maxHp": 85,
          "attack": 20,
          "level": 11,
          "badgeName": "Túnel"
        }
      }
    ],
    "exits": [
      {
        "x": 0,
        "y": 220,
        "w": 20,
        "h": 80,
        "targetMap": "route_116",
        "targetX": 450,
        "targetY": 250,
        "label": "Ruta 116"
      },
      {
        "x": 580,
        "y": 220,
        "w": 20,
        "h": 80,
        "targetMap": "verdanturf_town",
        "targetX": 100,
        "targetY": 50,
        "label": "Pueblo Verdegal"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "granite_cave": {
    "id": "granite_cave",
    "name": "Cueva Granito (Granite Cave)",
    "subtitle": "Cueva oscura donde descansa Máximo Peñas",
    "width": 650,
    "height": 500,
    "spawn": {
      "x": 320,
      "y": 450
    },
    "encounters": {
      "chance": 0.2,
      "pokemon": [
        "Zubat",
        "Geodude",
        "Makuhita",
        "Aron",
        "Abra",
        "Sableye"
      ]
    },
    "items": [
      {
        "id": "gc_escape_rope",
        "name": "Escape Rope",
        "x": 180,
        "y": 320,
        "type": "item",
        "collected": false
      },
      {
        "id": "gc_rare_candy",
        "name": "Rare Candy",
        "x": 480,
        "y": 180,
        "type": "item",
        "collected": false
      },
      {
        "id": "gc_everstone",
        "name": "Heart Scale",
        "x": 300,
        "y": 220,
        "type": "hidden",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "steven_granite",
        "name": "Máximo Peñas",
        "avatar": "💎",
        "color": "#74b9ff",
        "x": 450,
        "y": 150,
        "range": 0,
        "dialogs": [
          "Busco piedras raras por todo Hoenn. Toma esta MT47 Ala de Acero."
        ],
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 320,
        "y": 480,
        "w": 100,
        "h": 20,
        "targetMap": "dewford_town",
        "targetX": 50,
        "targetY": 150,
        "label": "Pueblo Azuliza"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "meteor_falls": {
    "id": "meteor_falls",
    "name": "Cascada Meteoro (Meteor Falls)",
    "subtitle": "Imponente gruta sagrada donde habitan Pokémon Dragón",
    "width": 700,
    "height": 550,
    "spawn": {
      "x": 150,
      "y": 480
    },
    "encounters": {
      "chance": 0.18,
      "pokemon": [
        "Solrock",
        "Lunatone",
        "Zubat",
        "Golbat",
        "Bagon"
      ]
    },
    "items": [
      {
        "id": "mf_moon_stone",
        "name": "Moon Stone",
        "x": 350,
        "y": 220,
        "type": "item",
        "collected": false
      },
      {
        "id": "mf_tm_dragon_claw",
        "name": "TM02 Dragon Claw",
        "x": 520,
        "y": 150,
        "type": "tm",
        "collected": false
      },
      {
        "id": "mf_star_piece",
        "name": "Star Piece",
        "x": 250,
        "y": 380,
        "type": "hidden",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "dragon_tamer_mf",
        "name": "Domadragón Nicolás",
        "avatar": "🐉",
        "color": "#6c5ce7",
        "x": 420,
        "y": 260,
        "range": 15,
        "dialogs": [
          "¡Aquí entrenan los dragones más fieros de la región!"
        ],
        "canHeal": false,
        "battleOpponent": {
          "name": "Shelgon",
          "type": "Dragón",
          "hp": 130,
          "maxHp": 130,
          "attack": 31,
          "level": 37,
          "badgeName": "Meteoro"
        }
      }
    ],
    "exits": [
      {
        "x": 100,
        "y": 530,
        "w": 80,
        "h": 20,
        "targetMap": "route_114",
        "targetX": 450,
        "targetY": 100,
        "label": "Ruta 114"
      },
      {
        "x": 650,
        "y": 250,
        "w": 20,
        "h": 80,
        "targetMap": "route_115",
        "targetX": 50,
        "targetY": 250,
        "label": "Ruta 115"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "fiery_path": {
    "id": "fiery_path",
    "name": "Senda Ígnea (Fiery Path)",
    "subtitle": "Túnel subterráneo a través de las entrañas del volcán",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 450
    },
    "encounters": {
      "chance": 0.2,
      "pokemon": [
        "Numel",
        "Slugma",
        "Torkoal",
        "Koffing",
        "Grimer"
      ]
    },
    "items": [
      {
        "id": "fp_fire_stone",
        "name": "Fire Stone",
        "x": 220,
        "y": 280,
        "type": "item",
        "collected": false
      },
      {
        "id": "fp_tm_overheat",
        "name": "TM50 Overheat",
        "x": 450,
        "y": 180,
        "type": "tm",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "hiker_fiery",
        "name": "Montañero Fuego",
        "avatar": "🧗‍♂️",
        "color": "#e17055",
        "x": 320,
        "y": 250,
        "range": 15,
        "dialogs": [
          "¡El calor aquí dentro es insoportable sin ropa ligera!"
        ],
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 300,
        "y": 480,
        "w": 100,
        "h": 20,
        "targetMap": "route_112",
        "targetX": 300,
        "targetY": 50,
        "label": "Ruta 112 Sur"
      },
      {
        "x": 300,
        "y": 0,
        "w": 100,
        "h": 20,
        "targetMap": "route_112",
        "targetX": 300,
        "targetY": 450,
        "label": "Ruta 112 Norte"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "jagged_pass": {
    "id": "jagged_pass",
    "name": "Desfiladero (Jagged Pass)",
    "subtitle": "Escarpada bajada montañosa llena de cenizas volcánicas",
    "width": 500,
    "height": 600,
    "spawn": {
      "x": 250,
      "y": 50
    },
    "encounters": {
      "chance": 0.18,
      "pokemon": [
        "Numel",
        "Spoink",
        "Machop"
      ]
    },
    "items": [
      {
        "id": "jp_burn_heal",
        "name": "Burn Heal",
        "x": 180,
        "y": 250,
        "type": "item",
        "collected": false
      },
      {
        "id": "jp_magma_emblem",
        "name": "Magma Emblem",
        "x": 320,
        "y": 420,
        "type": "key",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "magma_grunt_pass",
        "name": "Vigía Magma",
        "avatar": "🌋",
        "color": "#d63031",
        "x": 250,
        "y": 320,
        "range": 10,
        "dialogs": [
          "¡La Guarida Magma está oculta en estas paredes de roca!"
        ],
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 250,
        "y": 0,
        "w": 100,
        "h": 20,
        "targetMap": "mt_chimney",
        "targetX": 250,
        "targetY": 450,
        "label": "Monte Cenizo"
      },
      {
        "x": 250,
        "y": 580,
        "w": 100,
        "h": 20,
        "targetMap": "lavaridge_town",
        "targetX": 450,
        "targetY": 250,
        "label": "Pueblo Lavacalda"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "mt_chimney": {
    "id": "mt_chimney",
    "name": "Monte Cenizo (Mt Chimney)",
    "subtitle": "El cráter activo del volcán más imponente de Hoenn",
    "width": 650,
    "height": 550,
    "spawn": {
      "x": 320,
      "y": 480
    },
    "encounters": {
      "chance": 0.15,
      "pokemon": [
        "Numel",
        "Slugma"
      ]
    },
    "items": [
      {
        "id": "mc_meteorite",
        "name": "Scanner",
        "x": 450,
        "y": 220,
        "type": "key",
        "collected": false
      },
      {
        "id": "mc_fire_stone",
        "name": "Fire Stone",
        "x": 200,
        "y": 320,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "maxie_leader",
        "name": "Líder Magno (Maxie)",
        "avatar": "👓",
        "color": "#c0392b",
        "x": 320,
        "y": 180,
        "range": 0,
        "dialogs": [
          "¡Expandiremos los continentes para la prosperidad de la humanidad con el poder de Groudon!"
        ],
        "canHeal": false,
        "battleOpponent": {
          "name": "Camerupt",
          "type": "Fuego/Tierra",
          "hp": 140,
          "maxHp": 140,
          "attack": 34,
          "level": 37,
          "badgeName": "Magma"
        }
      }
    ],
    "exits": [
      {
        "x": 320,
        "y": 530,
        "w": 100,
        "h": 20,
        "targetMap": "jagged_pass",
        "targetX": 250,
        "targetY": 50,
        "label": "Desfiladero"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "mt_pyre": {
    "id": "mt_pyre",
    "name": "Monte Pírico (Mt Pyre)",
    "subtitle": "El santuario memorial de los espíritus Pokémon",
    "width": 650,
    "height": 600,
    "spawn": {
      "x": 320,
      "y": 550
    },
    "encounters": {
      "chance": 0.18,
      "pokemon": [
        "Duskull",
        "Shuppet",
        "Vulpix",
        "Chimecho",
        "Meditite"
      ]
    },
    "items": [
      {
        "id": "mp_cleanse_tag",
        "name": "Cleanse Tag",
        "x": 220,
        "y": 380,
        "type": "key",
        "collected": false
      },
      {
        "id": "mp_sea_incense",
        "name": "Sea Incense",
        "x": 480,
        "y": 250,
        "type": "item",
        "collected": false
      },
      {
        "id": "mp_lax_incense",
        "name": "Lax Incense",
        "x": 350,
        "y": 180,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "pyre_elder_couple",
        "name": "Guardianes de las Esferas",
        "avatar": "🧓",
        "color": "#8e44ad",
        "x": 320,
        "y": 140,
        "range": 0,
        "dialogs": [
          "¡Los villanos se llevaron la Esfera Roja y la Esfera Azul!"
        ],
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 320,
        "y": 580,
        "w": 100,
        "h": 20,
        "targetMap": "route_122",
        "targetX": 300,
        "targetY": 200,
        "label": "Ruta 122"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "new_mauville": {
    "id": "new_mauville",
    "name": "Malvalona Nueva (New Mauville)",
    "subtitle": "La planta de energía subterránea de alta tecnología",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 450
    },
    "encounters": {
      "chance": 0.2,
      "pokemon": [
        "Voltorb",
        "Electrode",
        "Magnemite",
        "Magneton"
      ]
    },
    "items": [
      {
        "id": "nm_thunder_stone",
        "name": "Thunder Stone",
        "x": 420,
        "y": 220,
        "type": "item",
        "collected": false
      },
      {
        "id": "nm_metal_coat",
        "name": "Storage Key",
        "x": 180,
        "y": 280,
        "type": "key",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "generator_ai",
        "name": "Terminal del Generador",
        "avatar": "💻",
        "color": "#f39c12",
        "x": 300,
        "y": 180,
        "range": 0,
        "dialogs": [
          "Presiona el interruptor para estabilizar la red eléctrica de Malvalona."
        ],
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 300,
        "y": 480,
        "w": 100,
        "h": 20,
        "targetMap": "route_110",
        "targetX": 350,
        "targetY": 250,
        "label": "Ruta 110"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "safari_zone": {
    "id": "safari_zone",
    "name": "Zona Safari (Safari Zone)",
    "subtitle": "Reserva natural con especies exóticas de todo el mundo",
    "width": 750,
    "height": 600,
    "spawn": {
      "x": 370,
      "y": 550
    },
    "encounters": {
      "chance": 0.22,
      "pokemon": [
        "Pikachu",
        "Doduo",
        "Heracross",
        "Girafarig",
        "Phanpy",
        "Pinsir",
        "Psyduck"
      ]
    },
    "items": [
      {
        "id": "sz_leaf_stone",
        "name": "Leaf Stone",
        "x": 250,
        "y": 350,
        "type": "item",
        "collected": false
      },
      {
        "id": "sz_calcium",
        "name": "Calcium",
        "x": 520,
        "y": 280,
        "type": "item",
        "collected": false
      },
      {
        "id": "sz_big_pearl",
        "name": "Big Pearl",
        "x": 380,
        "y": 180,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "safari_ranger",
        "name": "Guardabosques Safari",
        "avatar": "🤠",
        "color": "#27ae60",
        "x": 370,
        "y": 480,
        "range": 20,
        "dialogs": [
          "¡Tienes 30 Safari Balls y 500 pasos para explorar esta reserva!"
        ],
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 370,
        "y": 580,
        "w": 100,
        "h": 20,
        "targetMap": "route_121",
        "targetX": 300,
        "targetY": 100,
        "label": "Ruta 121"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "shoal_cave": {
    "id": "shoal_cave",
    "name": "Cueva Cardumen (Shoal Cave)",
    "subtitle": "Cueva helada sujeta a los ciclos de marea alta y baja",
    "width": 650,
    "height": 500,
    "spawn": {
      "x": 320,
      "y": 450
    },
    "encounters": {
      "chance": 0.18,
      "pokemon": [
        "Spheal",
        "Sealeo",
        "Zubat",
        "Snorunt"
      ]
    },
    "items": [
      {
        "id": "sc_shoal_salt",
        "name": "Shoal Salt",
        "x": 220,
        "y": 320,
        "type": "item",
        "collected": false
      },
      {
        "id": "sc_shoal_shell",
        "name": "Shoal Shell",
        "x": 450,
        "y": 280,
        "type": "item",
        "collected": false
      },
      {
        "id": "sc_never_melt_ice",
        "name": "Never-Melt Ice",
        "x": 320,
        "y": 180,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "shoal_craftsman",
        "name": "Artesano de Sal",
        "avatar": "🧓",
        "color": "#74b9ff",
        "x": 320,
        "y": 220,
        "range": 0,
        "dialogs": [
          "Tráeme 4 Sal Cardumen y 4 Conchas Cardumen para fabricar una Campana Concha."
        ],
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 320,
        "y": 480,
        "w": 100,
        "h": 20,
        "targetMap": "route_125",
        "targetX": 320,
        "targetY": 100,
        "label": "Ruta 125"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "victory_road": {
    "id": "victory_road",
    "name": "Calle Victoria (Victory Road)",
    "subtitle": "La prueba definitiva para los aspirantes a Campeón",
    "width": 700,
    "height": 600,
    "spawn": {
      "x": 350,
      "y": 550
    },
    "encounters": {
      "chance": 0.22,
      "pokemon": [
        "Hariyama",
        "Lairon",
        "Medicham",
        "Golbat",
        "Whismur",
        "Loudred"
      ]
    },
    "items": [
      {
        "id": "vr_max_elixir",
        "name": "Max Elixir",
        "x": 220,
        "y": 420,
        "type": "item",
        "collected": false
      },
      {
        "id": "vr_ultra_ball",
        "name": "Ultra Ball",
        "x": 500,
        "y": 320,
        "type": "item",
        "collected": false
      },
      {
        "id": "vr_tm_earthquake",
        "name": "TM26 Earthquake",
        "x": 350,
        "y": 180,
        "type": "tm",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "wally_victory_road",
        "name": "Blasco (Final)",
        "avatar": "🧑‍🦱",
        "color": "#00b894",
        "x": 350,
        "y": 280,
        "range": 0,
        "dialogs": [
          "¡He recorrido todo Hoenn gracias a ti! ¡Ahora verás lo fuerte que soy!"
        ],
        "canHeal": false,
        "battleOpponent": {
          "name": "Gardevoir",
          "type": "Psíquico",
          "hp": 165,
          "maxHp": 165,
          "attack": 38,
          "level": 48,
          "badgeName": "Victoria"
        }
      }
    ],
    "exits": [
      {
        "x": 350,
        "y": 580,
        "w": 100,
        "h": 20,
        "targetMap": "ever_grande_city",
        "targetX": 320,
        "targetY": 50,
        "label": "Ciudad Colosalia Sur"
      },
      {
        "x": 350,
        "y": 0,
        "w": 100,
        "h": 20,
        "targetMap": "ever_grande_city",
        "targetX": 320,
        "targetY": 520,
        "label": "Liga Pokémon"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "abandoned_ship": {
    "id": "abandoned_ship",
    "name": "Barco Abandonado (Abandoned Ship)",
    "subtitle": "Los restos oxidados del transatlántico Espiral",
    "width": 600,
    "height": 500,
    "spawn": {
      "x": 300,
      "y": 450
    },
    "encounters": {
      "chance": 0.16,
      "pokemon": [
        "Tentacool",
        "Tentacruel",
        "Magikarp"
      ]
    },
    "items": [
      {
        "id": "as_harbor_mail",
        "name": "Scanner",
        "x": 450,
        "y": 220,
        "type": "key",
        "collected": false
      },
      {
        "id": "as_storage_key",
        "name": "Storage Key",
        "x": 200,
        "y": 320,
        "type": "key",
        "collected": false
      },
      {
        "id": "as_rain_dance",
        "name": "Dive Ball",
        "x": 350,
        "y": 180,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "diver_ship",
        "name": "Explorador Marino",
        "avatar": "🤿",
        "color": "#0984e3",
        "x": 300,
        "y": 280,
        "range": 15,
        "dialogs": [
          "Busco el Escáner que perdió el Capitán Babor aquí en el naufragio."
        ],
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 300,
        "y": 480,
        "w": 100,
        "h": 20,
        "targetMap": "route_108",
        "targetX": 300,
        "targetY": 100,
        "label": "Ruta 108"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "aqua_hideout": {
    "id": "aqua_hideout",
    "name": "Guarida Aqua (Aqua Hideout)",
    "subtitle": "La base secreta submarina del Equipo Aqua",
    "width": 650,
    "height": 550,
    "spawn": {
      "x": 320,
      "y": 480
    },
    "encounters": {
      "chance": 0.16,
      "pokemon": [
        "Poochyena",
        "Carvanha",
        "Zubat"
      ]
    },
    "items": [
      {
        "id": "ah_master_ball",
        "name": "Master Ball",
        "x": 480,
        "y": 150,
        "type": "item",
        "collected": false
      },
      {
        "id": "ah_nugget",
        "name": "Nugget",
        "x": 200,
        "y": 320,
        "type": "item",
        "collected": false
      },
      {
        "id": "ah_max_elixir",
        "name": "Max Elixir",
        "x": 350,
        "y": 240,
        "type": "item",
        "collected": false
      },
      {
        "id": "ah_nest_ball",
        "name": "Nest Ball",
        "x": 520,
        "y": 380,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "matt_admin",
        "name": "Comandante Tatiano (Matt)",
        "avatar": "⚓",
        "color": "#0984e3",
        "x": 320,
        "y": 200,
        "range": 10,
        "dialogs": [
          "¡Archie ya zarpó con el submarino Explorador 1! ¡No llegarás a tiempo!"
        ],
        "canHeal": false,
        "battleOpponent": {
          "name": "Sharpedo",
          "type": "Agua/Siniestro",
          "hp": 135,
          "maxHp": 135,
          "attack": 35,
          "level": 35,
          "badgeName": "Aqua"
        }
      }
    ],
    "exits": [
      {
        "x": 320,
        "y": 530,
        "w": 100,
        "h": 20,
        "targetMap": "lilycove_city",
        "targetX": 680,
        "targetY": 200,
        "label": "Ciudad Calagua"
      }
    ],
    "tileset": "OverworldTrainers"
  },
  "magma_hideout": {
    "id": "magma_hideout",
    "name": "Guarida Magma (Magma Hideout)",
    "subtitle": "Base excavada en el magma volcánico del Desfiladero",
    "width": 650,
    "height": 550,
    "spawn": {
      "x": 320,
      "y": 480
    },
    "encounters": {
      "chance": 0.16,
      "pokemon": [
        "Geodude",
        "Graveler",
        "Torkoal"
      ]
    },
    "items": [
      {
        "id": "mh_rare_candy",
        "name": "Rare Candy",
        "x": 220,
        "y": 320,
        "type": "item",
        "collected": false
      },
      {
        "id": "mh_max_revive",
        "name": "Max Revive",
        "x": 450,
        "y": 200,
        "type": "item",
        "collected": false
      },
      {
        "id": "mh_escape_rope",
        "name": "Escape Rope",
        "x": 320,
        "y": 380,
        "type": "item",
        "collected": false
      }
    ],
    "npcs": [
      {
        "id": "tabitha_admin",
        "name": "Comandante Carola (Tabitha)",
        "avatar": "🔥",
        "color": "#d63031",
        "x": 320,
        "y": 200,
        "range": 10,
        "dialogs": [
          "¡Groudon despertará y la tierra cubrirá todo el mar!"
        ],
        "canHeal": false,
        "battleOpponent": {
          "name": "Camerupt",
          "type": "Fuego/Tierra",
          "hp": 135,
          "maxHp": 135,
          "attack": 35,
          "level": 35,
          "badgeName": "Magma"
        }
      }
    ],
    "exits": [
      {
        "x": 320,
        "y": 530,
        "w": 100,
        "h": 20,
        "targetMap": "jagged_pass",
        "targetX": 320,
        "targetY": 400,
        "label": "Desfiladero"
      }
    ],
    "tileset": "OverworldTrainers"
  }
};

// Items del inventario del jugador
const PLAYER_INVENTORY = {
  potions: 5,
  pokeballs: 10,
  coins: 500,
  items: {
    'Potion': 5,
    'Super Potion': 2,
    'Hyper Potion': 1,
    'Max Potion': 0,
    'Full Restore': 0,
    'Revive': 2,
    'Max Revive': 0,
    'Antidote': 3,
    'Burn Heal': 2,
    'Ice Heal': 1,
    'Paralyze Heal': 2,
    'Full Heal': 1,
    'Ether': 1,
    'Max Ether': 0,
    'Elixir': 1,
    'Max Elixir': 0,
    'Pokeball': 10,
    'Great Ball': 5,
    'Ultra Ball': 2,
    'Master Ball': 1,
    'Dive Ball': 2,
    'Nest Ball': 2,
    'Net Ball': 2,
    'Luxury Ball': 1,
    'Rare Candy': 1,
    'Escape Rope': 3,
    'Repel': 2,
    'Super Repel': 1,
    'Max Repel': 0,
    'Nugget': 1,
    'Big Pearl': 1,
    'Pearl': 2,
    'Star Piece': 1,
    'Stardust': 3,
    'Heart Scale': 2,
    'Fire Stone': 0,
    'Water Stone': 0,
    'Thunder Stone': 0,
    'Leaf Stone': 0,
    'Moon Stone': 0,
    'Sun Stone': 0,
    'Oran Berry': 5,
    'Sitrus Berry': 3,
    'Cheri Berry': 2,
    'Chesto Berry': 2,
    'Pecha Berry': 2,
    'Rawst Berry': 2,
    'Aspear Berry': 2,
    'Leppa Berry': 2,
    'Persim Berry': 2,
    'Nanab Berry': 1,
    'Wepear Berry': 1,
    'Pinap Berry': 1,
    'Pomeg Berry': 1,
    'Kelpsy Berry': 1,
    'Qualot Berry': 1,
    'Hondew Berry': 1,
    'Grepa Berry': 1,
    'Protein': 0,
    'Iron': 0,
    'Calcium': 0,
    'Zinc': 0,
    'Carbos': 0,
    'Dire Hit': 1,
    'Guard Spec': 1,
    'X Attack': 1,
    'X Defend': 1,
    'X Speed': 1,
    'X Sp Atk': 1,
    'X Accuracy': 1
  },
  tms: {
    'TM01': 'Focus Punch',
    'TM06': 'Toxic',
    'TM28': 'Dig',
    'TM35': 'Flamethrower'
  },
  keyItems: [
    'Bicicleta Carrera',
    'Detector Devon',
    'Tubo PokéCubos'
  ],
  berries: {
    'Oran Berry': 5,
    'Sitrus Berry': 3
  }
};

// Diccionario de items disponibles con descripción y efectos
const ALL_ITEMS = {
  'Potion': { name: 'Potion', type: 'consumable', effect: 'heal', value: 20, description: 'Restaura 20 PS de un Pokémon.' },
  'Super Potion': { name: 'Super Potion', type: 'consumable', effect: 'heal', value: 50, description: 'Restaura 50 PS de un Pokémon.' },
  'Hyper Potion': { name: 'Hyper Potion', type: 'consumable', effect: 'heal', value: 120, description: 'Restaura 120 PS de un Pokémon.' },
  'Max Potion': { name: 'Max Potion', type: 'consumable', effect: 'heal', value: 999, description: 'Restaura todos los PS de un Pokémon.' },
  'Full Restore': { name: 'Full Restore', type: 'consumable', effect: 'heal_full', value: 999, description: 'Restaura todos los PS y cura cualquier problema de estado.' },
  'Revive': { name: 'Revive', type: 'consumable', effect: 'revive', value: 0.5, description: 'Revive a un Pokémon debilitado con la mitad de sus PS.' },
  'Max Revive': { name: 'Max Revive', type: 'consumable', effect: 'revive', value: 1.0, description: 'Revive a un Pokémon debilitado con todos sus PS al máximo.' },
  'Antidote': { name: 'Antidote', type: 'consumable', effect: 'cure_poison', description: 'Cura el envenenamiento de un Pokémon.' },
  'Burn Heal': { name: 'Burn Heal', type: 'consumable', effect: 'cure_burn', description: 'Cura las quemaduras de un Pokémon.' },
  'Ice Heal': { name: 'Ice Heal', type: 'consumable', effect: 'cure_freeze', description: 'Descongela a un Pokémon congelado.' },
  'Paralyze Heal': { name: 'Paralyze Heal', type: 'consumable', effect: 'cure_paralysis', description: 'Cura la parálisis de un Pokémon.' },
  'Full Heal': { name: 'Full Heal', type: 'consumable', effect: 'cure_all', description: 'Cura cualquier cambio de estado en un Pokémon.' },
  'Pokeball': { name: 'Pokeball', type: 'pokeball', catchRate: 1.0, description: 'Dispositivo esférico para capturar Pokémon salvajes.' },
  'Great Ball': { name: 'Great Ball', type: 'pokeball', catchRate: 1.5, description: 'Poké Ball mejorada con mayor índice de éxito.' },
  'Ultra Ball': { name: 'Ultra Ball', type: 'pokeball', catchRate: 2.0, description: 'Poké Ball de alta calidad para capturas difíciles.' },
  'Master Ball': { name: 'Master Ball', type: 'pokeball', catchRate: 255.0, description: 'La Poké Ball definitiva que jamás falla.' },
  'Dive Ball': { name: 'Dive Ball', type: 'pokeball', catchRate: 3.5, description: 'Especialmente efectiva bajo el agua y en el mar.' },
  'Nest Ball': { name: 'Nest Ball', type: 'pokeball', catchRate: 2.5, description: 'Más eficaz cuanto menor sea el nivel del Pokémon.' },
  'Net Ball': { name: 'Net Ball', type: 'pokeball', catchRate: 3.0, description: 'Efectiva contra Pokémon de tipo Agua y Bicho.' },
  'Luxury Ball': { name: 'Luxury Ball', type: 'pokeball', catchRate: 1.0, description: 'Una Poké Ball acogedora que hace más amigable al Pokémon capturado.' },
  'Rare Candy': { name: 'Rare Candy', type: 'consumable', effect: 'level_up', description: 'Aumenta en 1 el nivel de un Pokémon.' },
  'Escape Rope': { name: 'Escape Rope', type: 'key', description: 'Cuerda resistente para escapar de cuevas y mazmorras.' },
  'Repel': { name: 'Repel', type: 'consumable', duration: 100, description: 'Repele Pokémon salvajes débiles durante 100 pasos.' },
  'Super Repel': { name: 'Super Repel', type: 'consumable', duration: 200, description: 'Repele Pokémon salvajes débiles durante 200 pasos.' },
  'Max Repel': { name: 'Max Repel', type: 'consumable', duration: 250, description: 'Repele Pokémon salvajes débiles durante 250 pasos.' },
  'Fire Stone': { name: 'Fire Stone', type: 'evolution', description: 'Piedra que evoluciona a Vulpix y Growlithe.' },
  'Water Stone': { name: 'Water Stone', type: 'evolution', description: 'Piedra que evoluciona a Poliwhirl, Shellder, Staryu y Lombre.' },
  'Thunder Stone': { name: 'Thunder Stone', type: 'evolution', description: 'Piedra que evoluciona a Pikachu y Eevee.' },
  'Leaf Stone': { name: 'Leaf Stone', type: 'evolution', description: 'Piedra que evoluciona a Gloom, Weepinbell y Nuzleaf.' },
  'Moon Stone': { name: 'Moon Stone', type: 'evolution', description: 'Piedra que evoluciona a Nidorina, Nidorino, Clefairy, Jigglypuff y Skitty.' },
  'Sun Stone': { name: 'Sun Stone', type: 'evolution', description: 'Piedra que evoluciona a Gloom y Sunkern.' }
};

// Exportar al entorno global
if (typeof window !== 'undefined') {
  window.HOENN_FULL_MAPS = HOENN_FULL_MAPS;
  window.HOENN_MAPS = HOENN_FULL_MAPS;
  window.PLAYER_INVENTORY = PLAYER_INVENTORY;
  window.ALL_ITEMS = ALL_ITEMS;
}
