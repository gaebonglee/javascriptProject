import CanvasOption from "./CanvasOption.js";

export default class Tail extends CanvasOption {
  constructor(x, vy, color) {
    super();
    this.x = x;
    this.y = this.canvasHeight;
    this.vy = vy;
    this.color = color;
    this.friction = 0.985;
    // this.radius = 5;
    // this.opacity = 1;
    this.angle = 0;
  }
  update() {
    this.vy *= this.friction;
    this.angle += 1;
    this.y += this.vy;
    this.opacity = -this.vy * 0.15;
    this.x += Math.cos(this.angle) * this.vy * 0.2;
  }

  draw() {
    this.ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
