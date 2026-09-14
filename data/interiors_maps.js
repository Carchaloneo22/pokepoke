"use strict";

const HOENN_INTERIORS = {
  // --- PLANTILLAS BÁSICAS ---
  "pokemon_center": {
    "id": "pokemon_center",
    "name": "Centro Pokémon",
    "subtitle": "Descanso y recuperación",
    "image": "assets/maps/pokemon_center_interior.jpg",
    "width": 1024,
    "height": 1024,
    "spawn": { "x": 512, "y": 800, "dir": "up" },
    "obstacles": [
      { "x": 0, "y": 0, "w": 30, "h": 1024 },
      { "x": 994, "y": 0, "w": 30, "h": 1024 },
      { "x": 0, "y": 0, "w": 1024, "h": 250 }, // Mostrador
      { "x": 0, "y": 1000, "w": 1024, "h": 30 }
    ],
    "npcs": [
      {
        "id": "nurse_joy_interior",
        "name": "Enfermera Joy",
        "avatar": "👩‍⚕️",
        "color": "#ff7675",
        "x": 512,
        "y": 120,
        "originX": 512,
        "originY": 120,
        "range": 0,
        "dir": "down",
        "dialogs": [
          "¡Hola! Te damos la bienvenida al Centro Pokémon.",
          "¡Hemos restaurado la salud y todos los movimientos de tu equipo!"
        ],
        "canHeal": true
      }
    ],
    "exits": [
      {
        "x": 412,
        "y": 990,
        "w": 200,
        "h": 40,
        "targetMap": "PREVIOUS", // Keyword especial para salir
        "targetX": "RETURN",
        "targetY": "RETURN",
        "label": "Salir",
        "type": "door"
      }
    ]
  },
  "poke_mart": {
    "id": "poke_mart",
    "name": "Tienda Pokémon",
    "subtitle": "Compra y venta de objetos",
    "image": "assets/maps/poke_mart_interior.jpg",
    "width": 1024,
    "height": 1024,
    "spawn": { "x": 512, "y": 800, "dir": "up" },
    "obstacles": [
      { "x": 0, "y": 0, "w": 30, "h": 1024 },
      { "x": 994, "y": 0, "w": 30, "h": 1024 },
      { "x": 0, "y": 0, "w": 1024, "h": 150 }, 
      { "x": 0, "y": 300, "w": 400, "h": 200 }, // Mostrador lateral
      { "x": 0, "y": 1000, "w": 1024, "h": 30 }
    ],
    "npcs": [
      {
        "id": "clerk_interior",
        "name": "Dependiente",
        "avatar": "👨‍💼",
        "color": "#0984e3",
        "x": 150,
        "y": 450,
        "originX": 150,
        "originY": 450,
        "range": 0,
        "dir": "right",
        "dialogs": [
          "¡Bienvenido a la Tienda Pokémon! Aquí encontrarás de todo para tu viaje."
        ],
        "givesSupplies": true,
        "canHeal": false
      }
    ],
    "exits": [
      {
        "x": 412,
        "y": 990,
        "w": 200,
        "h": 40,
        "targetMap": "PREVIOUS",
        "targetX": "RETURN",
        "targetY": "RETURN",
        "label": "Salir",
        "type": "door"
      }
    ]
  },
  // --- INTERIORES ESPECÍFICOS ---
  "birch_lab": {
    "id": "birch_lab",
    "name": "Laboratorio del Profesor Abedul",
    "subtitle": "Investigación Pokémon de Villa Raíz",
    "image": "assets/maps/birch_lab_interior.jpg",
    "width": 1024,
    "height": 1024,
    "spawn": { "x": 256, "y": 420, "dir": "up" },
    "obstacles": [
      { "x": 0, "y": 0, "w": 30, "h": 512 },
      { "x": 482, "y": 0, "w": 30, "h": 512 },
      { "x": 0, "y": 0, "w": 512, "h": 80 },
      { "x": 0, "y": 482, "w": 512, "h": 30 }
    ],
    "npcs": [
      {
        "id": "prof_birch_lab",
        "name": "Profesor Abedul",
        "avatar": "🥼",
        "color": "#27ae60",
        "x": 256,
        "y": 120,
        "originX": 256,
        "originY": 120,
        "range": 0,
        "dir": "down",
        "dialogs": [
          "¡Ah, hola! Mi laboratorio es modesto, pero desde aquí analizo la biodiversidad de Hoenn.",
          "¿Cómo se encuentra tu equipo? ¡Permíteme revisarlos!"
        ],
        "canHeal": true
      }
    ],
    "exits": [
      {
        "x": 206,
        "y": 482,
        "w": 100,
        "h": 30,
        "targetMap": "PREVIOUS",
        "targetX": "RETURN",
        "targetY": "RETURN",
        "label": "Salir",
        "type": "door"
      }
    ]
  },
  "gym_petalburg": {
    "id": "gym_petalburg",
    "name": "Gimnasio de Petalia",
    "subtitle": "La prueba del equilibrio",
    "image": "assets/maps/gym_petalburg_interior.jpg",
    "width": 1024,
    "height": 1024,
    "spawn": { "x": 256, "y": 520, "dir": "up" },
    "obstacles": [
      { "x": 0, "y": 0, "w": 30, "h": 600 },
      { "x": 482, "y": 0, "w": 30, "h": 600 },
      { "x": 0, "y": 0, "w": 512, "h": 50 },
      { "x": 0, "y": 570, "w": 512, "h": 30 }
    ],
    "npcs": [
      {
        "id": "norman_leader_gym",
        "name": "Líder Norman",
        "avatar": "🥋",
        "color": "#d63031",
        "x": 256,
        "y": 100,
        "originX": 256,
        "originY": 100,
        "range": 0,
        "dir": "down",
        "dialogs": [
          "¡Bienvenido al Gimnasio de Petalia! Soy Norman.",
          "El verdadero poder reside en el equilibrio perfecto. ¡Enfréntame!"
        ],
        "canHeal": false,
        "battleTrainerId": "gym_norman"
      }
    ],
    "exits": [
      {
        "x": 206,
        "y": 570,
        "w": 100,
        "h": 30,
        "targetMap": "PREVIOUS",
        "targetX": "RETURN",
        "targetY": "RETURN",
        "label": "Salir",
        "type": "door"
      }
    ]
  },
  "gym_rustboro": {
    "id": "gym_rustboro",
    "name": "Gimnasio de Férrica",
    "subtitle": "El conocimiento es poder",
    "image": "assets/maps/gym_rustboro_interior.jpg",
    "width": 1024,
    "height": 1024,
    "spawn": { "x": 256, "y": 520, "dir": "up" },
    "obstacles": [
      { "x": 0, "y": 0, "w": 30, "h": 600 },
      { "x": 482, "y": 0, "w": 30, "h": 600 },
      { "x": 0, "y": 0, "w": 512, "h": 50 },
      { "x": 0, "y": 570, "w": 512, "h": 30 }
    ],
    "npcs": [
      {
        "id": "roxanne_leader_gym",
        "name": "Líder Petra",
        "avatar": "👩‍🏫",
        "color": "#6c5ce7",
        "x": 256,
        "y": 100,
        "originX": 256,
        "originY": 100,
        "range": 0,
        "dir": "down",
        "dialogs": [
          "Soy Petra, investigadora y líder tipo Roca.",
          "¡Mis Pokémon son duros como el pedernal!"
        ],
        "canHeal": false,
        "battleTrainerId": "gym_petra"
      }
    ],
    "exits": [
      {
        "x": 206,
        "y": 570,
        "w": 100,
        "h": 30,
        "targetMap": "PREVIOUS",
        "targetX": "RETURN",
        "targetY": "RETURN",
        "label": "Salir",
        "type": "door"
      }
    ]
  },
  "grand_hotel_lobby": {
    "id": "grand_hotel_lobby",
    "name": "Gran Hotel Hoenn · Sala Unión MMO",
    "subtitle": "Club Inalámbrico de Entrenadores (Habbo Style)",
    "image": null, // Usará renderizado procedimental de baldosas de hotel de lujo
    "tileset": "InteriorHotel",
    "width": 800,
    "height": 640,
    "spawn": { "x": 400, "y": 560, "dir": "up" },
    "obstacles": [
      // Paredes perimetrales
      { "x": 0, "y": 0, "w": 800, "h": 60 },
      { "x": 0, "y": 0, "w": 40, "h": 640 },
      { "x": 760, "y": 0, "w": 40, "h": 640 },
      { "x": 0, "y": 600, "w": 350, "h": 40 },
      { "x": 450, "y": 600, "w": 350, "h": 40 },
      // Mostrador de recepción central superior
      { "x": 300, "y": 80, "w": 200, "h": 40 },
      // Mesa de Intercambio 1 (Oeste)
      { "x": 120, "y": 180, "w": 80, "h": 60 },
      // Mesa de Intercambio 2 (Este)
      { "x": 600, "y": 180, "w": 80, "h": 60 },
      // Bar de bayas (Noroeste)
      { "x": 80, "y": 80, "w": 140, "h": 30 },
      // Sofás lounge (Suroeste)
      { "x": 100, "y": 420, "w": 120, "h": 40 },
      // Sofás lounge (Sureste)
      { "x": 580, "y": 420, "w": 120, "h": 40 }
    ],
    "seats": [
      // Asientos en Sofás Lounge Oeste
      { "id": "sofa_w1", "x": 110, "y": 440, "dir": "up", "type": "sofa" },
      { "id": "sofa_w2", "x": 150, "y": 440, "dir": "up", "type": "sofa" },
      { "id": "sofa_w3", "x": 190, "y": 440, "dir": "up", "type": "sofa" },
      // Asientos en Sofás Lounge Este
      { "id": "sofa_e1", "x": 590, "y": 440, "dir": "up", "type": "sofa" },
      { "id": "sofa_e2", "x": 630, "y": 440, "dir": "up", "type": "sofa" },
      { "id": "sofa_e3", "x": 670, "y": 440, "dir": "up", "type": "sofa" },
      // Sillas de Intercambio Mesa 1 (Oeste)
      { "id": "trade_seat_1a", "x": 85, "y": 200, "dir": "right", "type": "trade", "table": "table_1" },
      { "id": "trade_seat_1b", "x": 215, "y": 200, "dir": "left", "type": "trade", "table": "table_1" },
      // Sillas de Intercambio Mesa 2 (Este)
      { "id": "trade_seat_2a", "x": 565, "y": 200, "dir": "right", "type": "trade", "table": "table_2" },
      { "id": "trade_seat_2b", "x": 695, "y": 200, "dir": "left", "type": "trade", "table": "table_2" },
      // Taburetes Bar de Bayas
      { "id": "bar_stool_1", "x": 100, "y": 120, "dir": "up", "type": "bar" },
      { "id": "bar_stool_2", "x": 140, "y": 120, "dir": "up", "type": "bar" },
      { "id": "bar_stool_3", "x": 180, "y": 120, "dir": "up", "type": "bar" }
    ],
    "battleArena": {
      "x": 300,
      "y": 260,
      "w": 200,
      "h": 160,
      "name": "Coliseo Central de Duelos"
    },
    "npcs": [
      {
        "id": "hotel_receptionist",
        "name": "Recepcionista Lucía",
        "avatar": "👩‍💼",
        "color": "#e84393",
        "x": 400,
        "y": 70,
        "originX": 400,
        "originY": 70,
        "range": 0,
        "dir": "down",
        "dialogs": [
          "¡Te damos la bienvenida al Gran Hotel Hoenn y Sala Unión MMO!",
          "Aquí puedes chatear con burbujas, sentarte a relajarte, retar a duelos o intercambiar Pokémon en las mesas laterales."
        ]
      },
      {
        "id": "hotel_shop_clerk",
        "name": "Dependiente Tienda",
        "avatar": "🛒",
        "color": "#f1c40f",
        "x": 340,
        "y": 70,
        "originX": 340,
        "originY": 70,
        "range": 0,
        "dir": "down",
        "dialogs": [
          "¡Bienvenido a la Tienda de la Sala Unión!",
          "Tenemos objetos útiles para tu aventura y combates PvP."
        ],
        "isShop": true
      },
      {
        "id": "bartender_berry",
        "name": "Barman Teo",
        "avatar": "🍹",
        "color": "#00b894",
        "x": 150,
        "y": 65,
        "originX": 150,
        "originY": 65,
        "range": 0,
        "dir": "down",
        "dialogs": [
          "¡Hola! Sirvo los mejores licuados de Bayas Meloc y Pokécubos de Hoenn.",
          "Tómate un respiro en los taburetes antes de tu próximo combate."
        ]
      },
      {
        "id": "referee_duel",
        "name": "Árbitro del Coliseo",
        "avatar": "🧑‍⚖️",
        "color": "#fdcb6e",
        "x": 400,
        "y": 240,
        "originX": 400,
        "originY": 240,
        "range": 0,
        "dir": "down",
        "dialogs": [
          "¡El ring de combate está listo! Haz clic en cualquier entrenador para desafiarlo a un duelo en tiempo real."
        ]
      }
    ],
    "exits": [
      {
        "x": 350,
        "y": 605,
        "w": 100,
        "h": 35,
        "targetMap": "littleroot_town",
        "targetX": 256,
        "targetY": 460,
        "label": "Salir a Hoenn",
        "type": "door"
      }
    ]
  }
};

if (typeof module !== 'undefined') {
  module.exports = { HOENN_INTERIORS };
}
if (typeof window !== 'undefined') {
  window.HOENN_INTERIORS = HOENN_INTERIORS;
}
