const fs = require('fs');
const lines = fs.readFileSync('data/hoenn_maps.js', 'utf8').split('\n');
const keys = ['littleroot_town', 'oldale_town', 'petalburg_city', 'rustboro_city', 'route_101', 'route_102'];
keys.forEach(k => {
  const idx = lines.findIndex(l => l.includes('"' + k + '":'));
  console.log(k, idx + 1);
});
