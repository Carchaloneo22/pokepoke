const fs = require('fs');

const path = 'admin.js';
let content = fs.readFileSync(path, 'utf8');

// 1. Reemplazar definición de HOENN_MAPS
const startMarker = '  /* ============================================================\r\n     5. CARTOGRAFÍA COMPLETA DE ESMERALDA (100% RECREADA)\r\n     ============================================================ */\r\n  const HOENN_MAPS = {';
const altStartMarker = '  /* ============================================================\n     5. CARTOGRAFÍA COMPLETA DE ESMERALDA (100% RECREADA)\n     ============================================================ */\n  const HOENN_MAPS = {';

let startIdx = content.indexOf(startMarker);
if (startIdx === -1) startIdx = content.indexOf(altStartMarker);

if (startIdx === -1) {
  // Buscar const HOENN_MAPS = {
  startIdx = content.indexOf('  const HOENN_MAPS = {');
}

if (startIdx === -1) throw new Error('HOENN_MAPS not found');

const endMarker = '  let activeMapKey = \'littleroot_town\';';
const endIdx = content.indexOf(endMarker);
if (endIdx === -1) throw new Error('activeMapKey marker not found');

const replacement = `  /* ============================================================
     5. CARTOGRAFÍA UNIFICADA DE ESMERALDA (HOENN_FULL_MAPS)
     ============================================================ */
  // Fuente única de verdad: todas las 67+ zonas integradas
  const HOENN_MAPS = (typeof window !== 'undefined' && window.HOENN_FULL_MAPS) ? window.HOENN_FULL_MAPS : {};

  `;

content = content.substring(0, startIdx) + replacement + content.substring(endIdx);

// 2. Asegurar que initWorldCanvas usa HOENN_FULL_MAPS como fuente unificada
const oldInitStart = '    const fullMaps = window.HOENN_FULL_MAPS || {};\r\n    const fullMap = fullMaps[activeMapKey] || {};\r\n    const localMap = (typeof HOENN_MAPS !== \'undefined\' && HOENN_MAPS[activeMapKey]) || {};';
const altInitStart = '    const fullMaps = window.HOENN_FULL_MAPS || {};\n    const fullMap = fullMaps[activeMapKey] || {};\n    const localMap = (typeof HOENN_MAPS !== \'undefined\' && HOENN_MAPS[activeMapKey]) || {};';

let initIdx = content.indexOf(oldInitStart);
if (initIdx === -1) initIdx = content.indexOf(altInitStart);

if (initIdx !== -1) {
  const matchLen = (content.indexOf(oldInitStart) !== -1 ? oldInitStart : altInitStart).length;
  const newInitStart = `    const fullMaps = window.HOENN_FULL_MAPS || {};
    const mapData = fullMaps[activeMapKey] || fullMaps['littleroot_town'] || {};
    const fullMap = mapData;
    const localMap = mapData;`;
  content = content.substring(0, initIdx) + newInitStart + content.substring(initIdx + matchLen);
}

fs.writeFileSync(path, content, 'utf8');
console.log('admin.js updated successfully!');
