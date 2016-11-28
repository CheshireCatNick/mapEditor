"use strict";
const map = _('map');
const mapC = map.getContext('2d');
const mapRect = map.getBoundingClientRect();
const mapH = mapRect.height;
const mapW = mapRect.width;
const mapL = mapRect.left;
const mapT = mapRect.top;

const mouse = new Mouse(map);

let rect1 = new Rect(200, 100, mapC, mouse);
let rect2 = new Rect(800, 400, mapC, mouse);

const mapLoop = setInterval(() => {
  //mapC.clearRect(0, 0, 1000, 1000);

  mapC.fillStyle = 'white';
  mapC.fillRect(0, 0, 1600, 900);
  rect1.drawOnMap();
  rect2.drawOnMap();
}, 30);