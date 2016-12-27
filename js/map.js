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
const people = [];

const gridSize = 30;
let rectID = 0;

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
  // new some people
  for (let i = 0; i < 10; i++)
    people.push(new Person(mapC, i));



  const mapLoop = setInterval(() => {
    mapC.clearRect(0, 0, mapW, mapH);
    //mapC.fillStyle = 'white';
    //mapC.fillRect(0, 0, mapW, mapH);
    for (let rect of rects)
      rect.process();
    for (let person of people)
      person.draw();

  }, 30);
  setInterval(() => {
    _('user-list').innerHTML = '';
    for (let person of people) {
      let code = `<li> user ${person.id}: `;
      code += `(${Math.round(person.x)}, ${Math.round(person.y)})</li>`
      _('user-list').innerHTML += code;
    }
  }, 3000);
}

main();
