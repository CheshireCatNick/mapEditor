"use strict";
const map = _('map');
const mapC = map.getContext('2d');
const mapRect = map.getBoundingClientRect();
const mapH = mapRect.height;
const mapW = mapRect.width;
const mapL = mapRect.left;
const mapT = mapRect.top;

const mouse = new Mouse(map);

const rects = [];

const gridSize = 100;
function drawGridLine() {
  mapC.strokeStyle = '#999'
  for (let x = 0; x <= mapW; x += gridSize) {
    mapC.moveTo(x, 0);
    mapC.lineTo(x, mapH);

  }
  for (let y = 0; y <= mapH; y += gridSize) {
    mapC.moveTo(0, y);
    mapC.lineTo(mapW, y);
  }
  mapC.stroke();

}

function addRect() {
  rects.push(new Rect(100, 100, mapC, mouse));
}

function main() {
  const mapLoop = setInterval(() => {
    mapC.fillStyle = 'white';
    mapC.fillRect(0, 0, mapW, mapH);
    drawGridLine();
    for (let rect of rects)
      rect.draw();
  }, 80);
}

main();