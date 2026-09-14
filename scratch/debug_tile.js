const fs = require('fs');
const vm = require('vm');

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
      getBoundingClientRect: () => ({ width: 960, height: 640 }),
      getContext: () => ({ save: () => {}, restore: () => {}, scale: () => {}, translate: () => {}, clearRect: () => {}, fillRect: () => {} }),
      appendChild: () => {},
      removeChild: () => {}
    }),
    dispatchEvent: () => {}
  },
  Image: class { constructor() { this.complete = true; this.naturalWidth = 256; this.naturalHeight = 256; } },
  performance: { now: () => 0 },
  requestAnimationFrame: () => 1,
  cancelAnimationFrame: () => {}
};
domMock.window.document = domMock.document;
domMock.window.Image = domMock.Image;
domMock.window.performance = domMock.performance;
domMock.window.requestAnimationFrame = domMock.requestAnimationFrame;

const context = vm.createContext(domMock);
vm.runInContext(fs.readFileSync('data/hoenn_maps.js', 'utf8'), context);
vm.runInContext(fs.readFileSync('modules/tilemap_renderer.js', 'utf8'), context);

const lr = context.window.HOENN_FULL_MAPS['littleroot_town'];
const fakeContainer = domMock.document.createElement();
const renderer = new context.window.TileMapRenderer(fakeContainer, lr);

console.log('grid[0][18]:', renderer.collisionGrid[0][18]);
for (let y = 0; y < 4; y++) {
  let row = '';
  for (let x = 16; x <= 22; x++) {
    row += `(${x},${y}):${renderer.collisionGrid[y][x]} `;
  }
  console.log(row);
}
