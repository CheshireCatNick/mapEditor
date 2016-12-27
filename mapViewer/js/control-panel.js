"use strict";


function addRect() {
  rects.push(new Rect(gridSize, mapC, mouse));
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