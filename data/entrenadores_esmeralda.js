/**
 * entrenadores_esmeralda.js — Datos reales de Pokémon Esmeralda (Gen III)
 * Fuente: guíasnintendo.com (guía de Pokémon Esmeralda)
 * Contiene:
 * - Rival (Brenda/Bruno): 4 batallas con equipos según el inicial del jugador
 * - 8 Líderes de Gimnasio + Campeón (equipos, medallas y MT reales)
 * - Entrenadores de ruta (clases y equipos de la región)
 *
 * Los campos `especie` usan el NOMBRE ESPAÑOL del Pokémon (igual que el
 * catálogo), y `nivel` el nivel real del juego.
 */
"use strict";

const EMERALD_TRAINERS = {
  rivalName: 'Brenda',

  // ============================================================
  // RIVAL (Brenda/Bruno): 4 batallas según tu Pokémon inicial
  //   dexId inicial: 252=Treecko, 255=Torchic, 258=Mudkip
  //   El rival SIEMPRE elige el inicial que te gana (como en Esmeralda)
  // ============================================================
  rivals: [
    {
      id: 'rival_1',
      nombre: 'Brenda',
      fase: 1,
      mapa: 'route_103',
      once: true,
      dialogo: '¡Por fin nos enfrentamos! El Profesor Abedul me pidió que te pusiera a prueba. ¡Prepárate!',
      dialogoVictoria: '¡Vaya, me has ganado! Pero entrenaré duro y esta vez no me vencerás tan fácilmente.',
      equipoPorInicial: {
        '252': [{ especie: 'Torchic', nivel: 5 }],
        '255': [{ especie: 'Mudkip', nivel: 5 }],
        '258': [{ especie: 'Treecko', nivel: 5 }]
      }
    },
    {
      id: 'rival_2',
      nombre: 'Brenda',
      fase: 2,
      mapa: 'rustboro_city',
      once: true,
      dialogo: '¡Ya tienes tu primera medalla! Demuéstrame que no fue suerte. ¡Batalla!',
      dialogoVictoria: 'Impresionante... La próxima vez estudiaré mejor tus movimientos.',
      equipoPorInicial: {
        '252': [{ especie: 'Lotad', nivel: 13 }, { especie: 'Torchic', nivel: 15 }],
        '255': [{ especie: 'Torkoal', nivel: 13 }, { especie: 'Mudkip', nivel: 15 }],
        '258': [{ especie: 'Wingull', nivel: 13 }, { especie: 'Treecko', nivel: 15 }]
      }
    },
    {
      id: 'rival_3',
      nombre: 'Brenda',
      fase: 3,
      mapa: 'route_110',
      once: true,
      dialogo: '¡Nos volvemos a ver! Mi equipo es mucho más fuerte ahora. ¡A luchar!',
      dialogoVictoria: 'No puede ser... Mi combinación era perfecta. ¡Entrenaré más!',
      equipoPorInicial: {
        '252': [{ especie: 'Wingull', nivel: 18 }, { especie: 'Lombre', nivel: 18 }, { especie: 'Combusken', nivel: 20 }],
        '255': [{ especie: 'Lombre', nivel: 18 }, { especie: 'Slugma', nivel: 18 }, { especie: 'Marshtomp', nivel: 20 }],
        '258': [{ especie: 'Slugma', nivel: 18 }, { especie: 'Wingull', nivel: 18 }, { especie: 'Grovyle', nivel: 20 }]
      }
    },
    {
      id: 'rival_4',
      nombre: 'Brenda',
      fase: 4,
      mapa: 'route_119',
      once: true,
      dialogo: '¡La batalla definitiva! He perfeccionado mi equipo. ¡No me contengas!',
      dialogoVictoria: 'Eres un rival digno... La Liga te espera, entrenador.',
      equipoPorInicial: {
        '252': [{ especie: 'Pelipper', nivel: 29 }, { especie: 'Lombre', nivel: 29 }, { especie: 'Combusken', nivel: 31 }],
        '255': [{ especie: 'Lombre', nivel: 29 }, { especie: 'Slugma', nivel: 29 }, { especie: 'Marshtomp', nivel: 31 }],
        '258': [{ especie: 'Slugma', nivel: 29 }, { especie: 'Lombre', nivel: 29 }, { especie: 'Pelipper', nivel: 29 }, { especie: 'Grovyle', nivel: 31 }]
      }
    }
  ],

  // ============================================================
  // LÍDERES DE GIMNASIO (equipos y premios reales de Esmeralda)
  // ============================================================
  gymLeaders: [
    {
      id: 'gym_petra',
      nombre: 'Petra',
      ciudad: 'Ciudad Férrica',
      mapa: 'rustboro_city',
      tipo: 'Roca',
      medalla: 'Medalla Piedra',
      mt: 'MT39 Tumba Rocas',
      dialogo: 'Soy Petra, investigadora y líder tipo Roca. ¡Mis Pokémon son duros como el pedernal!',
      dialogoVictoria: '¡Dominaste el tipo Roca con maestría! Llevo la Medalla Piedra y la MT39 con orgullo tuyo.',
      equipo: [
        { especie: 'Geodude', nivel: 12 },
        { especie: 'Geodude', nivel: 12 },
        { especie: 'Nosepass', nivel: 15 }
      ]
    },
    {
      id: 'gym_marcial',
      nombre: 'Marcial',
      ciudad: 'Pueblo Azuliza',
      mapa: 'dewford_town',
      tipo: 'Lucha',
      medalla: 'Medalla Puño',
      mt: 'MT08 Corpulencia',
      dialogo: '¡Una gran ola de fuerza! ¡Lucha contra mi equipo tipo Lucha!',
      dialogoVictoria: '¡Qué fortaleza! Acepta la Medalla Puño y la MT08. ¡Sigue entrenando!',
      equipo: [
        { especie: 'Machop', nivel: 16 },
        { especie: 'Meditite', nivel: 16 },
        { especie: 'Makuhita', nivel: 19 }
      ]
    },
    {
      id: 'gym_erico',
      nombre: 'Erico',
      ciudad: 'Ciudad Malvalona',
      mapa: 'mauville_city',
      tipo: 'Eléctrico',
      medalla: 'Medalla Dinamo',
      mt: 'MT34 Onda Voltio',
      dialogo: '¡Jajaja! ¡La energía eléctrica corre por mis venas! ¡Demuestra tu chispa!',
      dialogoVictoria: '¡Zzzzap! Eres electrizante. La Medalla Dinamo y la MT34 son tuyas.',
      equipo: [
        { especie: 'Voltorb', nivel: 20 },
        { especie: 'Magneton', nivel: 22 },
        { especie: 'Electrike', nivel: 20 },
        { especie: 'Manectric', nivel: 24 }
      ]
    },
    {
      id: 'gym_candela',
      nombre: 'Candela',
      ciudad: 'Pueblo Lavacalda',
      mapa: 'lavaridge_town',
      tipo: 'Fuego',
      medalla: 'Medalla Calor',
      mt: 'MT50 Sofoco',
      dialogo: '¡Candela al mando! ¡Siente el calor abrazador de mi volcán!',
      dialogoVictoria: '¡Increíble! Tu temple supera al fuego. Medalla Calor y MT50 para ti.',
      equipo: [
        { especie: 'Numel', nivel: 24 },
        { especie: 'Slugma', nivel: 24 },
        { especie: 'Camerupt', nivel: 26 },
        { especie: 'Torkoal', nivel: 29 }
      ]
    },
    {
      id: 'gym_norman',
      nombre: 'Norman',
      ciudad: 'Ciudad Petalia',
      mapa: 'petalburg_city',
      tipo: 'Normal',
      medalla: 'Medalla Equilibrio',
      mt: 'MT42 Imagen',
      dialogo: 'Soy Norman, el líder de este gimnasio. El verdadero poder reside en el equilibrio perfecto.',
      dialogoVictoria: 'Me has superado, hijo. El equilibrio está en ti. Medalla Equilibrio y MT42.',
      equipo: [
        { especie: 'Spinda', nivel: 27 },
        { especie: 'Linoone', nivel: 29 },
        { especie: 'Vigoroth', nivel: 27 },
        { especie: 'Slaking', nivel: 31 }
      ]
    },
    {
      id: 'gym_alana',
      nombre: 'Alana',
      ciudad: 'Ciudad Arborada',
      mapa: 'fortree_city',
      tipo: 'Volador',
      medalla: 'Medalla Pluma',
      mt: 'MT40 Golpe Aéreo',
      dialogo: 'Me comunico con el viento y los cielos. ¡Vuela alto con nosotros!',
      dialogoVictoria: '¡Volaste hacia la victoria! Medalla Pluma y MT40 en tu poder.',
      equipo: [
        { especie: 'Swablu', nivel: 29 },
        { especie: 'Pelipper', nivel: 30 },
        { especie: 'Tropius', nivel: 29 },
        { especie: 'Skarmory', nivel: 31 },
        { especie: 'Altaria', nivel: 33 }
      ]
    },
    {
      id: 'gym_vito_leti',
      nombre: 'Vito y Leti',
      ciudad: 'Ciudad Algaria',
      mapa: 'mossdeep_city',
      tipo: 'Psíquico',
      medalla: 'Medalla Mente',
      mt: 'MT04 Paz Mental',
      dialogo: '¡Somos Vito y Leti! Combatimos en sincronía psíquica absoluta.',
      dialogoVictoria: 'Nuestra mente se rinde ante tu estrategia. Medalla Mente y MT04 son tuyas.',
      equipo: [
        { especie: 'Claydol', nivel: 41 },
        { especie: 'Xatu', nivel: 41 },
        { especie: 'Lunatone', nivel: 42 },
        { especie: 'Solrock', nivel: 42 }
      ]
    },
    {
      id: 'gym_galano',
      nombre: 'Galano',
      ciudad: 'Arrecípolis',
      mapa: 'sootopolis_city',
      tipo: 'Agua',
      medalla: 'Medalla Lluvia',
      mt: 'MT03 Hidropulso',
      dialogo: '¡El agua es belleza, gracia y pureza! ¡Prepárate para mi danza acuática!',
      dialogoVictoria: 'Tu coraje navega contra corriente. Medalla Lluvia y MT03 para ti.',
      equipo: [
        { especie: 'Luvdisc', nivel: 41 },
        { especie: 'Whiscash', nivel: 41 },
        { especie: 'Sealeo', nivel: 43 },
        { especie: 'Crawdaunt', nivel: 43 },
        { especie: 'Kingdra', nivel: 46 }
      ]
    },
    {
      id: 'gym_plubio',
      nombre: 'Plubio',
      ciudad: 'Ciudad Colosalia',
      mapa: 'ever_grande_city',
      tipo: 'Agua',
      medalla: 'Cinturón Campeón',
      mt: null,
      dialogo: 'Soy Plubio, Campeón de la Liga Pokémon de Hoenn. ¡Demuestra que mereces el título!',
      dialogoVictoria: 'Eres digno del Salón de la Fama. La región de Hoenn está en buenas manos.',
      equipo: [
        { especie: 'Wailord', nivel: 57 },
        { especie: 'Ludicolo', nivel: 56 },
        { especie: 'Gyarados', nivel: 56 },
        { especie: 'Tentacruel', nivel: 55 },
        { especie: 'Whiscash', nivel: 56 },
        { especie: 'Milotic', nivel: 58 }
      ]
    }
  ],

  // ============================================================
  // ENTRENADORES DE RUTA (clases y equipos típicos de Hoenn)
  // ============================================================
  routeTrainers: {
    route_trainer_101: {
      id: 'route_trainer_101',
      nombre: 'Joven Renz',
      clase: 'Joven',
      mapa: 'route_101',
      dialogo: '¡Entrenar en la Ruta 101 fortalece a mi Poochyena! ¡Luchemos!',
      equipo: [
        { especie: 'Poochyena', nivel: 6 }
      ]
    },
    route_trainer_102: {
      id: 'route_trainer_102',
      nombre: 'Joven Calvino',
      clase: 'Joven',
      mapa: 'route_102',
      dialogo: '¡Si te cruzas con la mirada de otro entrenador, el combate es obligatorio!',
      equipo: [
        { especie: 'Zigzagoon', nivel: 7 },
        { especie: 'Poochyena', nivel: 8 }
      ]
    },
    route_trainer_103: {
      id: 'route_trainer_103',
      nombre: 'Joven Uto',
      clase: 'Joven',
      mapa: 'route_103',
      dialogo: '¡Los Pokémon de la costa son veloces! ¡A ver si me alcanzas!',
      equipo: [
        { especie: 'Wingull', nivel: 7 },
        { especie: 'Zigzagoon', nivel: 8 }
      ]
    },
    route_trainer_104: {
      id: 'route_trainer_104',
      nombre: 'Chica Iris',
      clase: 'Chica',
      mapa: 'route_104',
      dialogo: '¡Mis Pokémon mimados van a darte una lección!',
      equipo: [
        { especie: 'Poochyena', nivel: 9 },
        { especie: 'Wurmple', nivel: 9 }
      ]
    },
    route_trainer_110: {
      id: 'route_trainer_110',
      nombre: 'Rudo Bravo',
      clase: 'Rudo',
      mapa: 'route_110',
      dialogo: '¡La ruta de las bicis es mi territorio! ¡Enfréntate a mi fuerza!',
      equipo: [
        { especie: 'Electrike', nivel: 17 },
        { especie: 'Voltorb', nivel: 18 }
      ]
    },
    route_trainer_118: {
      id: 'route_trainer_118',
      nombre: 'Pescador Cano',
      clase: 'Pescador',
      mapa: 'route_118',
      dialogo: '¡El que pesca algo pesca lo que sea! ¡Mis Pokémon acuáticos te retan!',
      equipo: [
        { especie: 'Magikarp', nivel: 24 },
        { especie: 'Barboach', nivel: 25 },
        { especie: 'Corphish', nivel: 25 }
      ]
    },
    route_trainer_119: {
      id: 'route_trainer_119',
      nombre: 'Rudo Tero',
      clase: 'Rudo',
      mapa: 'route_119',
      dialogo: '¡Esta ruta con lluvia y rápidos me ha hecho fuerte! ¡Demuéstralo!',
      equipo: [
        { especie: 'Linoone', nivel: 29 },
        { especie: 'Gloom', nivel: 30 }
      ]
    },
    route_trainer_120: {
      id: 'route_trainer_120',
      nombre: 'Acechadora Lía',
      clase: 'Acechadora',
      mapa: 'route_120',
      dialogo: '¡Te vi escondido! Nadie se escapa de mi vista ni de mi Kecleon.',
      equipo: [
        { especie: 'Kecleon', nivel: 30 }
      ]
    },
    route_trainer_105: {
      id: 'route_trainer_105',
      nombre: 'Paseante Alan',
      clase: 'Paseante',
      mapa: 'route_105',
      dialogo: '¡Con esta brisa marina siento que puedo volar! ¡Combate!',
      equipo: [
        { especie: 'Wingull', nivel: 12 },
        { especie: 'Spheal', nivel: 13 }
      ]
    },
    route_trainer_106: {
      id: 'route_trainer_106',
      nombre: 'Pesca Lanzarote',
      clase: 'Pescador',
      mapa: 'route_106',
      dialogo: '¡He lanzado decenas de anzuelos y solo pesco victorias!',
      equipo: [
        { especie: 'Magikarp', nivel: 12 },
        { especie: 'Wingull', nivel: 12 },
        { especie: 'Tentacool', nivel: 13 }
      ]
    },
    route_trainer_107: {
      id: 'route_trainer_107',
      nombre: 'Rudo Forzudo',
      clase: 'Rudo',
      mapa: 'route_107',
      dialogo: '¡El mar golpea fuerte y eso me ha enseñado a pelear duro!',
      equipo: [
        { especie: 'Machop', nivel: 14 },
        { especie: 'Meditite', nivel: 14 }
      ]
    },
    route_trainer_108: {
      id: 'route_trainer_108',
      nombre: 'Internauta Kiko',
      clase: 'Internauta',
      mapa: 'route_108',
      dialogo: '¡Navego en el pecio de la Ruta 108! ¡Mis pájaros marinos no te dejarán escapar!',
      equipo: [
        { especie: 'Wingull', nivel: 15 },
        { especie: 'Pelipper', nivel: 16 }
      ]
    },
    route_trainer_109: {
      id: 'route_trainer_109',
      nombre: 'Bañista Coral',
      clase: 'Bañista',
      mapa: 'route_109',
      dialogo: '¡Un baño de mar y un combate a la orilla! ¡Vamos!',
      equipo: [
        { especie: 'Marill', nivel: 15 },
        { especie: 'Spheal', nivel: 15 },
        { especie: 'Wingull', nivel: 16 }
      ]
    },
    route_trainer_111: {
      id: 'route_trainer_111',
      nombre: 'Curtido Siro',
      clase: 'Curtido',
      mapa: 'route_111',
      dialogo: '¡El desierto templa el carácter! ¡Muéstrame tu temple!',
      equipo: [
        { especie: 'Baltoy', nivel: 19 },
        { especie: 'Cacnea', nivel: 20 },
        { especie: 'Trapinch', nivel: 21 }
      ]
    },
    route_trainer_112: {
      id: 'route_trainer_112',
      nombre: 'Excavador Bruno',
      clase: 'Excavador',
      mapa: 'route_112',
      dialogo: '¡Estas rocas guardan poder! ¡Y mis Pokémon también!',
      equipo: [
        { especie: 'Geodude', nivel: 20 },
        { especie: 'Numel', nivel: 21 }
      ]
    },
    route_trainer_113: {
      id: 'route_trainer_113',
      nombre: 'Chica Cenicienta',
      clase: 'Chica',
      mapa: 'route_113',
      dialogo: '¡Bajo las cenizas también hay corazones ardientes! ¡Prepárate!',
      equipo: [
        { especie: 'Spinda', nivel: 21 },
        { especie: 'Slugma', nivel: 21 }
      ]
    },
    route_trainer_114: {
      id: 'route_trainer_114',
      nombre: 'Encuestadora Nía',
      clase: 'Encuestadora',
      mapa: 'route_114',
      dialogo: '¡Estoy investigando los Pokémon de esta ruta! Tú también quedas investigado.',
      equipo: [
        { especie: 'Swablu', nivel: 22 },
        { especie: 'Nuzleaf', nivel: 22 },
        { especie: 'Linoone', nivel: 23 }
      ]
    },
    route_trainer_115: {
      id: 'route_trainer_115',
      nombre: 'Ciclista Turbo',
      clase: 'Ciclista',
      mapa: 'route_115',
      dialogo: '¡Voy a toda velocidad! ¡A ver si mi equipo te pisa los talones!',
      equipo: [
        { especie: 'Wingull', nivel: 22 },
        { especie: 'Pelipper', nivel: 23 },
        { especie: 'Machoke', nivel: 24 }
      ]
    },
    route_trainer_116: {
      id: 'route_trainer_116',
      nombre: 'Ciclista Arranque',
      clase: 'Ciclista',
      mapa: 'route_116',
      dialogo: '¡Arrancamos con ritmo en la Ruta 116! ¡Cruzamos miradas, cruzamos golpes!',
      equipo: [
        { especie: 'Skitty', nivel: 15 },
        { especie: 'Whismur', nivel: 15 },
        { especie: 'Nincada', nivel: 16 }
      ]
    },
    route_trainer_117: {
      id: 'route_trainer_117',
      nombre: 'Acróbata Félix',
      clase: 'Acróbata',
      mapa: 'route_117',
      dialogo: '¡Mira mis volteretas! Si no te impresionan, mis Pokémon sí.',
      equipo: [
        { especie: 'Wingull', nivel: 17 },
        { especie: 'Marill', nivel: 17 },
        { especie: 'Lombre', nivel: 18 }
      ]
    },
    route_trainer_121: {
      id: 'route_trainer_121',
      nombre: 'Pirada Pío',
      clase: 'Pirada',
      mapa: 'route_121',
      dialogo: '¡Estas aguas son dominio pirata! ¡Páginas de mi botín! ¡Combate!',
      equipo: [
        { especie: 'Pelipper', nivel: 30 },
        { especie: 'Corphish', nivel: 30 },
        { especie: 'Sharpedo', nivel: 31 }
      ]
    },
    route_trainer_122: {
      id: 'route_trainer_122',
      nombre: 'Monje Venerable',
      clase: 'Monje',
      mapa: 'route_122',
      dialogo: 'En mi ascenso al Monte Piro, mis espíritus me acompañan. ¿Y a ti?',
      equipo: [
        { especie: 'Shuppet', nivel: 31 },
        { especie: 'Duskull', nivel: 31 },
        { especie: 'Dusclops', nivel: 33 }
      ]
    },
    route_trainer_123: {
      id: 'route_trainer_123',
      nombre: 'Ciclista Pedraqueo',
      clase: 'Ciclista',
      mapa: 'route_123',
      dialogo: '¡Bajando toda la cuesta! ¡Guarda el aliento! ¡Combate!',
      equipo: [
        { especie: 'Pelipper', nivel: 31 },
        { especie: 'Tropius', nivel: 32 },
        { especie: 'Sharpedo', nivel: 32 }
      ]
    },
    route_trainer_124: {
      id: 'route_trainer_124',
      nombre: 'Buzo Inmersión',
      clase: 'Buzo',
      mapa: 'route_124',
      dialogo: '¡He explorado los arrecifes más profundos! ¡Mis hallazgos luchan conmigo!',
      equipo: [
        { especie: 'Spheal', nivel: 33 },
        { especie: 'Clamperl', nivel: 33 },
        { especie: 'Sealeo', nivel: 34 }
      ]
    },
    route_trainer_125: {
      id: 'route_trainer_125',
      nombre: 'Buzo Corriente',
      clase: 'Buzo',
      mapa: 'route_125',
      dialogo: '¡Las corrientes del fondo entrenan mi pulso! ¡Y el tuyo?',
      equipo: [
        { especie: 'Tentacool', nivel: 34 },
        { especie: 'Wailmer', nivel: 34 },
        { especie: 'Tentacruel', nivel: 36 }
      ]
    },
    route_trainer_126: {
      id: 'route_trainer_126',
      nombre: 'Buzo Abisal',
      clase: 'Buzo',
      mapa: 'route_126',
      dialogo: '¡En la fosa abisal solo sobreviven los fuertes! ¡Muéstrame lo tuyo!',
      equipo: [
        { especie: 'Corsola', nivel: 35 },
        { especie: 'Luvdisc', nivel: 35 },
        { especie: 'Crawdaunt', nivel: 36 }
      ]
    },
    route_trainer_127: {
      id: 'route_trainer_127',
      nombre: 'Rudo Escollera',
      clase: 'Rudo',
      mapa: 'route_127',
      dialogo: '¡El mar abierto forjó a mi equipo! ¡Contra las olas y contra ti!',
      equipo: [
        { especie: 'Sharpedo', nivel: 37 },
        { especie: 'Gyarados', nivel: 37 },
        { especie: 'Wailord', nivel: 38 }
      ]
    },
    route_trainer_128: {
      id: 'route_trainer_128',
      nombre: 'Acróbata Jet',
      clase: 'Acróbata',
      mapa: 'route_128',
      dialogo: '¡Vuelo con los vientos de la Ruta 128! ¡Acompáñame al combate!',
      equipo: [
        { especie: 'Swellow', nivel: 37 },
        { especie: 'Pelipper', nivel: 37 },
        { especie: 'Manectric', nivel: 38 }
      ]
    },
    route_trainer_129: {
      id: 'route_trainer_129',
      nombre: 'Pesca Colosal',
      clase: 'Pescador',
      mapa: 'route_129',
      dialogo: '¡De estas aguas salen trofeos enormes y combates legendarios!',
      equipo: [
        { especie: 'Wailmer', nivel: 40 },
        { especie: 'Gyarados', nivel: 41 },
        { especie: 'Wailord', nivel: 42 }
      ]
    },
    route_trainer_130: {
      id: 'route_trainer_130',
      nombre: 'Buzo Militante',
      clase: 'Buzo',
      mapa: 'route_130',
      dialogo: '¡La leyenda del coloso Paco duerme en estas aguas! ¡Y también mi fiereza!',
      equipo: [
        { especie: 'Luvdisc', nivel: 40 },
        { especie: 'Tentacruel', nivel: 41 },
        { especie: 'Gyarados', nivel: 42 }
      ]
    },
    route_trainer_131: {
      id: 'route_trainer_131',
      nombre: 'Pesca Saulina',
      clase: 'Pescador',
      mapa: 'route_131',
      dialogo: '¡Estas aguas están plagadas de monstruos! ¡Pescar un combate contigo también me vale!',
      equipo: [
        { especie: 'Gyarados', nivel: 42 },
        { especie: 'Wailord', nivel: 43 }
      ]
    },
    route_trainer_132: {
      id: 'route_trainer_132',
      nombre: 'Rudo Rompemareas',
      clase: 'Rudo',
      mapa: 'route_132',
      dialogo: '¡Las mareas me rompieron y me forjaron! ¡Hoy te toca a ti!',
      equipo: [
        { especie: 'Sharpedo', nivel: 43 },
        { especie: 'Gyarados', nivel: 43 },
        { especie: 'Wailord', nivel: 44 }
      ]
    },
    route_trainer_133: {
      id: 'route_trainer_133',
      nombre: 'Acróbata Vendaval',
      clase: 'Acróbata',
      mapa: 'route_133',
      dialogo: '¡El vendaval final está aquí! ¡Corre o enfréntate a mí!',
      equipo: [
        { especie: 'Swellow', nivel: 44 },
        { especie: 'Altaria', nivel: 44 },
        { especie: 'Gyarados', nivel: 45 }
      ]
    },
    route_trainer_134: {
      id: 'route_trainer_134',
      nombre: 'Sable Marea',
      clase: 'Sable',
      mapa: 'route_134',
      dialogo: 'Yo surco la última ruta del archipiélago. Mi poder está a la altura de las leyendas.',
      equipo: [
        { especie: 'Gyarados', nivel: 46 },
        { especie: 'Walrein', nivel: 46 },
        { especie: 'Milotic', nivel: 47 }
      ]
    }
  }
};

if (typeof window !== 'undefined') {
  window.EMERALD_TRAINERS = EMERALD_TRAINERS;
}