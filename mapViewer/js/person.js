'use strict';
class Person {

  drawCircle(x, y) {
    this.mapC.fillStyle = this.color;
    this.mapC.beginPath();
    this.mapC.arc(x, y, this.radius, 0, 2 * Math.PI);
    this.mapC.fill();
  }
  draw() {
    this.drawCircle(this.x, this.y);
  }


  constructor(mapC, id) {
    this.mapC = mapC;
    this.id = id;
    this.radius = 10;
    this.color = 'rgba(231, 76, 60, 1)';
    this.x = Math.random() * 800;
    this.y = Math.random() * 800;


    setInterval(() => {
      this.x += Math.random() * 50 - 25;
      this.y += Math.random() * 50 - 25;
    }, 3000)
  }
}