/**
 * POKEPOKE RPG — MÓDULO CANÓNICO DE SPRITES (sprites.js)
 * Proporciona un único punto de verdad para el cálculo de coordenadas de spritesheet
 * compatible tanto con Canvas 2D (ctx.drawImage) como con DOM (background-position).
 * 
 * Medición empírica exacta de assets/sprites/brendan_spritesheet.png:
 * - Dimensiones totales: 256 x 256 px
 * - Estructura de grid: 4 columnas × 4 filas (16 celdas)
 * - Tamaño de celda: exactamente 64 x 64 px
 */

(function(global) {
  'use strict';

  const SHEET_CONFIG = {
    url: 'assets/sprites/brendan_spritesheet.png',
    width: 256,
    height: 256,
    cellWidth: 64,
    cellHeight: 64,
    cols: 4,
    rows: 4,
    // Filas (Y) según dirección
    directionRows: {
      'down': 0,
      'left': 1,
      'right': 2,
      'up': 3
    },
    // Secuencia de ciclo de 4 pasos para la caminata: [idle, pasoA, idle, pasoB]
    stepSequence: [0, 1, 2, 3],
    // Bounding box recortado óptimo del personaje (evita espacios vacíos en avatares y colisiones)
    activeBox: {
      offsetX: 16,
      offsetY: 8,
      width: 32,
      height: 56
    }
  };

  const SpriteManager = {
    config: SHEET_CONFIG,

    /**
     * Calcula el rectángulo fuente (sx, sy, sw, sh) para Canvas o CSS
     * @param {string} direction - 'down' | 'left' | 'right' | 'up'
     * @param {number} frame - 0, 1, 2, 3 (o índice del ciclo de caminata)
     * @param {boolean} cropToBody - Si es true, recorta solo el cuerpo visible (32x56)
     */
    getSpriteRect(direction = 'down', frame = 0, cropToBody = false) {
      const row = SHEET_CONFIG.directionRows[direction] ?? 0;
      const col = (frame % SHEET_CONFIG.cols + SHEET_CONFIG.cols) % SHEET_CONFIG.cols;

      const cellX = col * SHEET_CONFIG.cellWidth;
      const cellY = row * SHEET_CONFIG.cellHeight;

      if (cropToBody) {
        return {
          sx: cellX + SHEET_CONFIG.activeBox.offsetX,
          sy: cellY + SHEET_CONFIG.activeBox.offsetY,
          sw: SHEET_CONFIG.activeBox.width,
          sh: SHEET_CONFIG.activeBox.height,
          destOffsetDx: -SHEET_CONFIG.activeBox.width / 2,
          destOffsetDy: -SHEET_CONFIG.activeBox.height + 8 // ancla en los pies
        };
      }

      return {
        sx: cellX,
        sy: cellY,
        sw: SHEET_CONFIG.cellWidth,
        sh: SHEET_CONFIG.cellHeight,
        destOffsetDx: -SHEET_CONFIG.cellWidth / 2,
        destOffsetDy: -SHEET_CONFIG.cellHeight + 16 // ancla en la base del tile de 16px
      };
    },

    /**
     * Genera los estilos CSS exactos para renderizar un sprite en DOM sin deformación ni tile bleeding
     * @param {string} direction - 'down' | 'left' | 'right' | 'up'
     * @param {number} frame - 0 a 3
     * @param {number} displaySize - Tamaño en pantalla (ej: 64px o 32px)
     */
    getCssStyle(direction = 'down', frame = 0, displaySize = 64) {
      const rect = this.getSpriteRect(direction, frame, false);
      const scale = displaySize / SHEET_CONFIG.cellWidth;
      const bgSizeX = SHEET_CONFIG.width * scale;
      const bgSizeY = SHEET_CONFIG.height * scale;
      const posX = -rect.sx * scale;
      const posY = -rect.sy * scale;

      return {
        backgroundImage: `url("${SHEET_CONFIG.url}")`,
        backgroundSize: `${bgSizeX}px ${bgSizeY}px`,
        backgroundPosition: `${posX}px ${posY}px`,
        width: `${displaySize}px`,
        height: `${displaySize}px`,
        imageRendering: 'pixelated'
      };
    },

    /**
     * Dibuja el sprite en un Canvas 2D con centrado exacto y filtrado desactivado
     */
    drawToCanvas(ctx, image, posX, posY, direction = 'down', frame = 0, scale = 1, cropToBody = false) {
      if (!image || !image.complete) return;
      const rect = this.getSpriteRect(direction, frame, cropToBody);
      const dw = rect.sw * scale;
      const dh = rect.sh * scale;
      const dx = Math.round(posX + rect.destOffsetDx * scale);
      const dy = Math.round(posY + rect.destOffsetDy * scale);

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        image,
        rect.sx, rect.sy, rect.sw, rect.sh,
        dx, dy, dw, dh
      );
    }
  };

  // Exportar globalmente
  global.SpriteManager = SpriteManager;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SpriteManager;
  }
})(typeof window !== 'undefined' ? window : this);
