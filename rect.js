"use strict";
class Rect {
  isInRange() {
    // range of rect
    let left = this.x;
    let right = this.x + this.width;
    let top = this.y;
    let bottom = this.y + this.height;
    return (this.mouse.x < right && this.mouse.x > left
              && this.mouse.y < bottom && this.mouse.y > top);
  }
  move() {
    // the clicked moment, save deltaX, deltaY
    if (!this.isMoving) {
      this.deltaX = this.mouse.x - this.x;
      this.deltaY = this.mouse.y - this.y;
    }
    // mouse is pressed in rect range
    if (this.isInRange())
      // check if there's no other object being dragged
      if (!this.mouse.isDraggingObj){
        this.mouse.isDraggingObj = true;
        this.isMoving = true;
      }
    // update x, y according to mouse and delta
    if (this.isMoving) {
      this.x = this.mouse.x - this.deltaX;
      this.y = this.mouse.y - this.deltaY;
    }
  }
  isCloseEnough(a, b) {
    return Math.abs(a - b) < 10;
  }
  isClickedCorner() {
    // check if any corner is clicked and update clickedCorner
    if (this.isCloseEnough(this.mouse.x, this.x) 
          && this.isCloseEnough(this.mouse.y, this.y))
      this.clickedCorner = 'tl';
    else if (this.isCloseEnough(this.mouse.x, this.x + this.width) 
          && this.isCloseEnough(this.mouse.y, this.y))
      this.clickedCorner = 'tr';
    else if (this.isCloseEnough(this.mouse.x, this.x) 
          && this.isCloseEnough(this.mouse.y, this.y + this.height))
      this.clickedCorner = 'bl';
    else if (this.isCloseEnough(this.mouse.x, this.x + this.width) 
          && this.isCloseEnough(this.mouse.y, this.y + this.height))
      this.clickedCorner = 'br';
    return this.clickedCorner !== 'none';
  }
  resize() {
    // mouse is pressed in rect range
    if (this.isClickedCorner())
      // check if there's no other object being dragged
      if (!this.mouse.isDraggingObj){
        this.mouse.isDraggingObj = true;
        this.isResizing = true;
      }
    // update height, width according to mouse
    if (this.isResizing)
      switch (this.clickedCorner) {
        case 'tl':
          this.width += this.x - this.mouse.x;
          this.height += this.y - this.mouse.y;
          this.x = this.mouse.x;
          this.y = this.mouse.y;
          break;
        case 'tr':
          this.width = Math.abs(this.x - this.mouse.x);
          this.height += this.y - this.mouse.y;
          this.y = this.mouse.y;
          break;
        case 'bl':
          this.width += this.x - this.mouse.x;
          this.height = Math.abs(this.y - this.mouse.y);
          this.x = this.mouse.x;
          break;
        case 'br':
          this.width = Math.abs(this.x - this.mouse.x);
          this.height = Math.abs(this.y - this.mouse.y);
          break;
      }
  }
  draw() {
    if (this.mouse.isPressed) {
      this.resize();
      this.move();
    }
    // mouse is not pressed
    else {
      this.isMoving = false;
      this.isResizing = false;
      this.clickedCorner = 'none';
    }
    this.mapC.fillStyle = '#16a085';
    this.mapC.fillRect(this.x, this.y, this.width, this.height);

  }

  constructor(x, y, mapC, mouse) {
    this.width = 100;
    this.height = 100;
    // x, y is the top left corner
    this.x = x;
    this.y = y;
    this.deltaX = 0;
    this.deltaY = 0;
    this.isMoving = false;
    this.isResizing = false;
    this.clickedCorner = 'none';
    this.mapC = mapC;
    this.mouse = mouse;
    // editting or setting
    this.mode = 'editting';


    
  }
}