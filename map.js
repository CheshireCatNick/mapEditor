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
  const gridLayer = _('gridLayer');
  const gridLayerC = gridLayer.getContext('2d');
  for (let x = 0; x <= mapW; x += gridSize) {
    gridLayerC.moveTo(x, 0);
    gridLayerC.lineTo(x, mapH);
  }
  for (let y = 0; y <= mapH; y += gridSize) {
    gridLayerC.moveTo(0, y);
    gridLayerC.lineTo(mapW, y);
  }
  gridLayerC.strokeStyle = '#999';
  gridLayerC.stroke();
}

function main() {
  drawGridLine();

  const mapLoop = setInterval(() => {
    mapC.clearRect(0, 0, mapW, mapH);
    //mapC.fillStyle = 'white';
    //mapC.fillRect(0, 0, mapW, mapH);
    for (let rect of rects)
      rect.draw();
  }, 80);
}

main();
