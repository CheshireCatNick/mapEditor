"use strict";
class Mouse {
  constructor(map) {
    this.x = 0;
    this.y = 0;
    this.isDraggingObj = false;
    this.isPressed = false;
    const mapRect = map.getBoundingClientRect();
    const mapL = mapRect.left;
    const mapT = mapRect.top;
    map.addEventListener('mousemove', (e) => {
      this.x = e.clientX - mapL;
      this.y = e.clientY - mapT;
    });
    map.addEventListener('mousedown', () => {
      this.isPressed = true;
    });
    map.addEventListener('mouseup', () => {
      this.isPressed = false;
      this.isDraggingObj = false;
    });
  }
}