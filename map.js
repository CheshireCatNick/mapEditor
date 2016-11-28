"use strict";
function _(id) {
  return document.getElementById(id);
}
class DragImage {

  drawOnMap() {    
    // range of rect
    let left = this.x;
    let right = this.x + this.width;
    let top = this.y;
    let bottom = this.y + this.height; 
    
    if (mousePressed) {
      if (!this.dragged) {
        this.startX = mouseX - this.x;
        this.startY = mouseY - this.y;
      }
      // mouse is pressed in rect range
      if (mouseX < right && mouseX > left && mouseY < bottom && mouseY > top) {
        if (!dragging){
          dragging = true;
          this.dragged = true;
        }
      }      
    }
    else {
      this.dragged = false;
    }
    if (this.dragged) {
      this.x = mouseX - this.startX;
      this.y = mouseY - this.startY;
    }
    //mapC.rect(left, top, 50, 50);
    mapC.strokeRect(left, top, this.width, this.height);
    //mapC.drawImage(this.img, this.x, this.y);
  }

  constructor(x, y) {
    this.width = 50;
    this.height = 50;
    this.x = x;
    this.y = y;
    this.startX = 0;
    this.startY = 0;
    this.dragged = false;
  }
}
const map = _('map');
const mapC = map.getContext('2d');

let rect1 = new DragImage(200, 100);
let rect2 = new DragImage(300, 100);

const mapLoop = setInterval(() => {
  //mapC.clearRect(0, 0, 1000, 1000);

  mapC.fillStyle = 'white';
  mapC.fillRect(0, 0, 1000, 1000);
  rect1.drawOnMap();
  rect2.drawOnMap();
}, 30);

// mouse info
let mouseX = 0, mouseY = 0;
let mousePressed = false;
let dragging = false;
map.addEventListener('mousemove', (e) => {
  let mapRect = map.getBoundingClientRect();
  mouseX = e.clientX - mapRect.left;
  mouseY = e.clientY - mapRect.top;
});
map.addEventListener('mousedown', () => {
  mousePressed = true;
});
map.addEventListener('mouseup', () => {
  mousePressed = false;
  dragging = false;
});


/*
function DragImage(src, x, y) {
    var that = this;
    var startX = 0,
        startY = 0;
    var drag = false;
    
    this.x = x;
    this.y = y;
    var img = new Image();
    img.src = src;
    this.update = function() {
        if (mousePressed ) {
            
                var left = that.x;
                var right = that.x + img.width;
                var top = that.y;
                var bottom = that.y + img.height;
                if (!drag) {
                    startX = mouseX - that.x;
                    startY = mouseY - that.y;
                }
                if (mouseX < right && mouseX > left && mouseY < bottom && mouseY > top) {
                    if (!dragging){
            dragging = true;
                        drag = true;
                    }
                    
                }
            
        } else {
             
            drag = false;
        }
        if (drag) {
            that.x = mouseX - startX;
            that.y = mouseY - startY;
        }
        c.drawImage(img, that.x, that.y);
    }
}*/