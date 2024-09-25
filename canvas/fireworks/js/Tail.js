import CanvasOption from "./CanvasOption.js";

export default class Tail extends CanvasOption {
  constructor(x, vy, color) {
    super();
    this.x = x;
    this.y = this.canvasHeight;
    this.vy = vy;
    this.color = "255, 255, 255";
    this.friction = 0.985;
    // this.radius = 5;
    // this.opacity = 1;
    // this.angle = 0;
  }
  update() {
    this.vy *= this.friction;

    // this.opacity = -this.vy;
    // this.angle += 1;
    this.y += this.vy;
    // this.x += Math.cos(this.angle) * this.vy * 0.2;
  }

  draw() {
    this.ctx.fillStyle = `rgba(${this.color}, 1)`;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
