window.__errors = [];
window.onerror = function (m, s, l) { window.__errors.push(m + ' @ ' + s + ':' + l); };
window.__captures = {};