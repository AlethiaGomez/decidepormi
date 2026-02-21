// Script para crear iconos PNG simples
// Ejecuta con: node public/create-icons.js

const canvas = require('canvas');
const fs = require('fs');

function createIcon(size) {
  const canvas = new (require('canvas').Canvas)(size, size);
  const ctx = canvas.getContext('2d');
  
  // Fondo gradiente
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#8B5CF6');
  gradient.addColorStop(1, '#6D28D9');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  // Texto
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${size * 0.4}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('✓', size / 2, size / 2);
  
  // Guardar
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`public/icon-${size}.png`, buffer);
  console.log(`Icono ${size}x${size} creado`);
}

createIcon(192);
createIcon(512);
