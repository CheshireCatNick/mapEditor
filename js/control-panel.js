"use strict";


function addRect() {
  for (let rect of rects)
    rect.mode = 'editMap';
  rects.push(new Rect(rects.length, gridSize, 
                      mapC, mouse, rects));
}
function deleteRect() {
  for (let rect of rects)
    rect.mode = 'delete';
}

function editMap() {
  for (let rect of rects)
    rect.mode = 'editMap';
  _('set-prop').style.display = 'none';
  _('edit-map').style.display = 'inline-block';

}
function setProp() {
  for (let rect of rects)
    rect.mode = 'setProp';
  _('set-prop').style.display = 'inline-block';
  _('edit-map').style.display = 'none';
}