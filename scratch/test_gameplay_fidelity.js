const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

console.log('--- TEST: FIDELIDAD DE JUGABILIDAD POKÉMON ESMERALDA (GBA) ---');

// 1. Cargar scripts en entorno VM simulando navegador
const domMock = {
  window: {
    devicePixelRatio: 1,
    addEventListener: () => {},
    removeEventListener: () => {}
  },
  document: {
    addEventListener: () => {},
    removeEventListener: () => {},
    createElement: () => ({
      style: {},
      getContext: () => ({
        save: () => {},
        restore: () => {},
        scale: () => {},
        translate: () => {},
        clearRect: () => {},
        fillRect: () => {},
        beginPath: () => {},
        arc: () => {},
        ellipse: () => {},
        fill: () => {},
        stroke: () => {},
        drawImage: () => {},
        measureText: () => ({ width: 40 }),
        fillText: () => {}
      }),
      appendChild: () => {},
      removeChild: () => {}
    }),
    dispatchEvent: () => {}
  },
  Image: class {
    constructor() {
      this.complete = true;
      this.naturalWidth = 256;
      this.naturalHeight = 256;
    }
  },
  performance: { now: () => Date.now() },
  requestAnimationFrame: () => 1,
  cancelAnimationFrame: () => {}
};

domMock.window.document = domMock.document;
domMock.window.Image = domMock.Image;
domMock.window.performance = domMock.performance;
domMock.window.requestAnimationFrame = domMock.requestAnimationFrame;

const context = vm.createContext(domMock);

// Cargar data/hoenn_maps.js
const hoennMapsCode = fs.readFileSync('data/hoenn_maps.js', 'utf8');
vm.runInContext(hoennMapsCode, context);

// Cargar modules/tilemap_renderer.js
const tilemapCode = fs.readFileSync('modules/tilemap_renderer.js', 'utf8');
vm.runInContext(tilemapCode, context);

const HOENN_FULL_MAPS = context.window.HOENN_FULL_MAPS;
const TileMapRenderer = context.window.TileMapRenderer;

assert(HOENN_FULL_MAPS, 'HOENN_FULL_MAPS debe existir');
assert(TileMapRenderer, 'TileMapRenderer debe existir');

// Test 1: Verificar que todas las 67+ zonas están presentes
const zoneKeys = Object.keys(HOENN_FULL_MAPS);
console.log(`[PASS] Total de zonas cargadas en HOENN_FULL_MAPS: ${zoneKeys.length} (>= 67)`);
assert(zoneKeys.length >= 67, 'Debe haber al menos 67 zonas');

// Test 2: Comprobar continuidad geográfica de rutas de inicio
const lr = HOENN_FULL_MAPS['littleroot_town'];
const r101 = HOENN_FULL_MAPS['route_101'];
const ot = HOENN_FULL_MAPS['oldale_town'];
const r102 = HOENN_FULL_MAPS['route_102'];
const pb = HOENN_FULL_MAPS['petalburg_city'];

assert(lr && lr.image && lr.obstacles && lr.obstacles.length > 0, 'Villa Raíz debe tener imagen y obstáculos');
assert(pb && pb.image && pb.obstacles && pb.obstacles.length > 0, 'Ciudad Petalia debe tener imagen y obstáculos');

// Verificar conexión Villa Raíz -> Ruta 101
const lrExit = lr.exits.find(e => e.targetMap === 'route_101');
assert(lrExit, 'Villa Raíz debe conectar con Ruta 101');
console.log(`[PASS] Villa Raíz conecta con: ${lrExit.targetMap} en (${lrExit.targetX}, ${lrExit.targetY})`);

// Verificar conexión Ruta 101 -> Villa Raíz y Pueblo Escaso
const r101ToLr = r101.exits.find(e => e.targetMap === 'littleroot_town');
const r101ToOt = r101.exits.find(e => e.targetMap === 'oldale_town');
assert(r101ToLr, 'Ruta 101 debe conectar con Villa Raíz hacia el sur');
assert(r101ToOt, 'Ruta 101 debe conectar con Pueblo Escaso hacia el norte');
console.log('[PASS] Ruta 101 conecta bidireccionalmente con Villa Raíz y Pueblo Escaso');

// Test 3: Instanciar TileMapRenderer y comprobar escala fija (15x10 tiles)
const fakeContainer = {
  innerHTML: '',
  getBoundingClientRect: () => ({ width: 960, height: 640 }),
  appendChild: () => {}
};

const renderer = new TileMapRenderer(fakeContainer, {
  mapId: 'littleroot_town',
  name: lr.name,
  width: lr.width,
  height: lr.height,
  spawn: lr.spawn,
  obstacles: lr.obstacles,
  npcs: lr.npcs,
  signs: lr.signs,
  exits: lr.exits,
  flowerPatches: lr.flowerPatches
});

// En viewport 960x640: zoomX = 960 / 240 = 4, zoomY = 640 / 160 = 4 -> fixedZoom = 4
renderer.canvas = { width: 960, height: 640 };
renderer.calculateFixedZoom();
console.log(`[PASS] Factor de escala fijo calculado: ${renderer.fixedZoom}x`);
assert.strictEqual(renderer.fixedZoom, 4, 'fixedZoom para 960x640 debe ser 4');

// Test 4: Comprobar colisiones tile-based
assert(renderer.collisionGrid, 'El mapa de colisiones debe existir');
console.log(`[PASS] Dimensiones de la rejilla de colisión: ${renderer.collisionGrid[0].length}x${renderer.collisionGrid.length} tiles`);

// Obstáculo de casa en Villa Raíz: x: 55-265, y: 20-165
// Tile (5, 5) -> x=80, y=80 (dentro de la casa del jugador)
const isHouseBlocked = renderer.isTileBlocked(5, 5);
console.log(`[PASS] Tile dentro de edificio residencial bloqueado: ${isHouseBlocked}`);
assert.strictEqual(isHouseBlocked, true, 'El interior de un obstáculo debe estar bloqueado');

// Camino despejado: x=240, y=240 -> tile (15, 15)
const isPathBlocked = renderer.isTileBlocked(15, 15);
console.log(`[PASS] Tile en camino despejado bloqueado: ${isPathBlocked}`);
assert.strictEqual(isPathBlocked, false, 'El camino despejado no debe estar bloqueado');

// Borde perimetral sin exit debe estar bloqueado
const isBorderBlocked = renderer.isTileBlocked(0, 10);
console.log(`[PASS] Borde perimetral cerrado bloqueado: ${isBorderBlocked}`);
assert.strictEqual(isBorderBlocked, true, 'El borde exterior debe estar bloqueado');

// Borde en zona de salida (x: 270..360, y: 0 -> tiles 17..22) debe ser transitable
const isExitTileBlocked = renderer.isTileBlocked(18, 0);
console.log(`[PASS] Tile en portal de salida (exit) transitable: ${!isExitTileBlocked}`);
assert.strictEqual(isExitTileBlocked, false, 'El portal de salida debe permitir el paso');

// Test 5: Comprobar FSM de movimiento y bump
// Colocar al jugador frente al borde de la casa (y: 32..160) y probar movimiento hacia arriba (hacia y=144)
renderer.playerPos = { x: 80, y: 160 };
renderer.startGridPos = { x: 80, y: 160 };
renderer.avatarState = 'IDLE';

// Intentar moverse hacia arriba (hacia la casa en y=144)
renderer.keysPressed = { 'ArrowUp': true };
renderer.checkInputMovement();

console.log(`[PASS] Estado tras chocar con obstáculo: ${renderer.avatarState} (debe ser COLLIDING)`);
assert.strictEqual(renderer.avatarState, 'COLLIDING', 'Debe entrar en estado COLLIDING');
assert.strictEqual(renderer.playerDir, 'up', 'Debe mantener la orientación hacia el obstáculo');

// Ejecutar 4 frames de bump
for (let f = 0; f < 4; f++) {
  renderer.updateBump();
}
console.log(`[PASS] Estado tras completar 4 frames de bump: ${renderer.avatarState} (debe volver a IDLE)`);
assert.strictEqual(renderer.avatarState, 'IDLE', 'Debe volver a IDLE tras 4 frames de bump');
assert.strictEqual(renderer.playerPos.y, 160, 'Debe regresar exactamente a la posición inicial');

// Probar movimiento permitido (en el camino central despejado x=288, y=100)
renderer.playerPos = { x: 288, y: 100 };
renderer.startGridPos = { x: 288, y: 100 };
renderer.keysPressed = { 'ArrowDown': true };
renderer.checkInputMovement();

console.log(`[PASS] Estado tras iniciar movimiento libre: ${renderer.avatarState} (debe ser WALKING)`);
assert.strictEqual(renderer.avatarState, 'WALKING', 'Debe entrar en estado WALKING');
assert.strictEqual(renderer.targetGridPos.y, 116, 'El objetivo debe ser exactamente 1 tile (16px) abajo');

// Simular 8 frames de caminata a 60 FPS (dt = 1/60s)
for (let i = 0; i < 8; i++) {
  renderer.updateWalking(1 / 60, false);
}
console.log(`[PASS] Estado tras completar 8 frames de caminata: ${renderer.avatarState} (debe ser IDLE)`);
assert.strictEqual(renderer.avatarState, 'IDLE', 'Debe llegar al tile destino en 8 frames');
assert.strictEqual(renderer.playerPos.y, 116, 'Debe situarse exactamente en y=116 sin overshoot');

// Test 6: Comprobar cámara fija centrada en el personaje (sin lerp)
renderer.playerPos = { x: 320, y: 256 };
renderer.updateCamera();
console.log(`[PASS] Cámara instantánea centrada en: cameraX=${renderer.cameraX}, cameraY=${renderer.cameraY}`);
assert(renderer.cameraX >= 0 && renderer.cameraY >= 0, 'La cámara debe estar dentro de límites');

// Test 7: Comprobar carrera con [Shift] (1 tile en 5 frames)
renderer.playerPos = { x: 288, y: 116 };
renderer.startGridPos = { x: 288, y: 116 };
renderer.keysPressed = { 'ArrowDown': true, 'Shift': true };
renderer.checkInputMovement();

assert.strictEqual(renderer.avatarState, 'WALKING', 'Debe entrar en WALKING');
assert.strictEqual(renderer.targetGridPos.y, 132, 'Objetivo en y=132');

// Simular 5 frames corriendo a 60 FPS
for (let i = 0; i < 5; i++) {
  renderer.updateWalking(1 / 60, true);
}
console.log(`[PASS] Estado tras 5 frames de carrera: ${renderer.avatarState} (debe ser IDLE en 5 frames)`);
assert.strictEqual(renderer.avatarState, 'IDLE', 'Corriendo debe completar el tile en 5 frames');
assert.strictEqual(renderer.playerPos.y, 132, 'Debe situarse exactamente en y=132');

// Test 8: Comprobar recolección de items
let collectedCalled = false;
renderer.onItemCollect = (item) => {
  collectedCalled = true;
};
renderer.items = [{ id: 'test_ball', name: 'Poké Ball', x: 288, y: 132, collected: false }];
renderer.checkItemCollection();
console.log(`[PASS] Recolección de item en el tile del jugador: item.collected=${renderer.items[0].collected}`);
assert.strictEqual(renderer.items[0].collected, true, 'El item debe marcarse como recolectado');
assert.strictEqual(collectedCalled, true, 'Debe ejecutarse onItemCollect callback');

console.log('\n======================================================');
console.log('¡TODOS LOS TESTS DE FIDELIDAD GBA PASARON CON ÉXITO!');
console.log('======================================================');

