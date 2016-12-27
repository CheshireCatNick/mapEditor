"use strict";
class Rect {
  roundWithGrid(num) {
    const count = Math.floor(num / gridSize)
    const rest = num % gridSize;
    if (rest < gridSize / 2) return gridSize * count;
    else return gridSize * (count + 1);
  }
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
      this.deltaX = this.mouse.x - this.tmpX;
      this.deltaY = this.mouse.y - this.tmpY;
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
      this.tmpX = this.mouse.x - this.deltaX;
      this.tmpY = this.mouse.y - this.deltaY;
      this.x = this.roundWithGrid(this.tmpX);
      this.y = this.roundWithGrid(this.tmpY);
    }
  }
  isCloseEnough(a, b) {
    return Math.abs(a - b) < this.tolerance;
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
          this.tmpWidth += this.tmpX - this.mouse.x;
          this.tmpHeight += this.tmpY - this.mouse.y;
          this.tmpY = this.mouse.y;
          this.tmpX = this.mouse.x;
          // undo changes if illegal
          if (this.tmpHeight < this.gridSize) {
            this.tmpHeight = this.height;
            this.tmpY = this.y;
          }
          if (this.tmpWidth < this.gridSize) {
            this.tmpWidth = this.width;
            this.tmpX = this.x;
          }
          break;
        case 'tr':
          this.tmpWidth = Math.abs(this.tmpX - this.mouse.x);
          this.tmpHeight += this.tmpY - this.mouse.y;
          this.tmpY = this.mouse.y;
          // undo changes if illegal
          if (this.tmpHeight < this.gridSize) {
            this.tmpHeight = this.height;
            this.tmpY = this.y;    
          }
          if (this.tmpWidth < this.gridSize) {
            this.tmpWidth = this.width;
          }
          break;
        case 'bl':
          this.tmpWidth += this.tmpX - this.mouse.x;
          this.tmpHeight = Math.abs(this.tmpY - this.mouse.y);         
          this.tmpX = this.mouse.x;
          // undo changes if illegal
          if (this.tmpHeight < this.gridSize) {
            this.tmpHeight = this.height;
          }
          if (this.tmpWidth < this.gridSize) {
            this.tmpWidth = this.width;
            this.tmpX = this.x;
          }
          break;
        case 'br':
          this.tmpWidth = Math.abs(this.tmpX - this.mouse.x);
          this.tmpHeight = Math.abs(this.tmpY - this.mouse.y);
          // undo changes if illegal
          if (this.tmpHeight < this.gridSize) {
            this.tmpHeight = this.height;
          }
          if (this.tmpWidth < this.gridSize) {
            this.tmpWidth = this.width;
          }
          break;
      }
      this.x = this.roundWithGrid(this.tmpX);
      this.y = this.roundWithGrid(this.tmpY);
      this.width = this.roundWithGrid(this.tmpWidth);
      this.height = this.roundWithGrid(this.tmpHeight);
  }
  drawRect() {
    this.mapC.fillStyle = this.color;
    this.mapC.fillRect(this.x, this.y, this.width, this.height);
    this.mapC.font = '30px Arial';
    this.mapC.fillStyle = 'black';
    this.mapC.textAlign="center";
    this.mapC.fillText(this.name, this.x + this.width / 2, 
                        this.y + this.height / 2);
  }
  drawHandle() {
    this.drawCircle(this.x, this.y);
    this.drawCircle(this.x + this.width, this.y);
    this.drawCircle(this.x, this.y + this.height);
    this.drawCircle(this.x + this.width, this.y + this.height);
  }
  drawCircle(x, y) {
    this.mapC.fillStyle = this.handleColor;
    this.mapC.beginPath();
    this.mapC.arc(x, y, this.tolerance, 0, 2 * Math.PI);
    this.mapC.fill();
  }
  editMap() {
    if (this.mouse.isPressed) {
      this.resize();
      this.move();
    }
    // mouse is not pressed
    else {
      this.isMoving = false;
      this.isResizing = false;
      this.clickedCorner = 'none';
      this.tmpWidth = this.width;
      this.tmpHeight = this.height;
      this.tmpX = this.x;
      this.tmpY = this.y;
    }
    this.color = Rect.Color.editMap;
    this.drawRect();
    this.drawHandle();
  }
  setProp() {
    if (this.mouse.isPressed)
      if (this.isInRange()) {
        this.isSelected = true;
        _('name-input').value = this.name;
        _('type-input').value = this.type;
      }
      else this.isSelected = false;
    if (this.isSelected) {
      this.color = Rect.Color.selected;
      this.name = _('name-input').value;
      this.type = _('type-input').value;
    }
    else this.color = Rect.Color.notSelected;
    this.drawRect();
  }
  delete() {
    if (this.mouse.isPressed)
      if (this.isInRange()) {
        let index = -1;
        for (let i in this.rects)
          if (this.rects[i].id === this.id)
            index = i;
        this.rects.splice(index, 1);
      }
    this.color = Rect.Color.delete;
    this.drawRect();
  }
  process() {
    switch (this.mode) {
      case 'editMap':
        this.editMap();
        break; 
      case 'setProp':
        this.setProp(); 
        break;
      case 'delete':
        this.delete()
        break;
    }
  }
  toString() {
    let x = this.roundWithGrid(this.x);
    let y = this.roundWithGrid(this.y);

    console.log(`{ 
  id: ${this.id},
  name: "${this.name}", 
  type: "${this.type}", 
  x: ${x}, 
  y: ${y},
  height: ${this.height},
  width: ${this.width}
},`);
  }

  constructor(id, gridSize, mapC, mouse, rects) {
    this.id = id;
    // array that store all rects; for delete
    this.rects = rects;
    this.gridSize = gridSize;
    this.width = this.gridSize;
    this.height = this.gridSize;
    this.color = Rect.Color.editMap;
    this.handleColor = Rect.Color.handle;
    // close tolerance
    this.tolerance = 15;
    // x, y is the top left corner
    this.x = 0;
    this.y = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.isMoving = false;
    this.isResizing = false;
    this.isSelected = false;
    this.clickedCorner = 'none';
    this.mapC = mapC;
    this.mouse = mouse;
    // editMap or setProp
    this.mode = 'editMap';
    // for fixing edge and size
    this.tmpX = this.x;
    this.tmpY = this.y;
    this.tmpWidth = this.width;
    this.tmpHeight = this.height;
    // hard-coded property
    this.name = '';
    this.type = '';


    
  }
}
Rect.Color = {
  editMap: 'rgba(46, 204, 113, 0.6)',
  selected: 'rgba(243, 156, 18, 0.6)',
  notSelected: 'rgba(52, 152, 219, 0.6)',
  handle: 'rgba(52, 73, 94, 0.6)',
  delete: 'rgba(192, 57, 43, 0.6)'
};