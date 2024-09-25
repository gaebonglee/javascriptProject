import CanvasOption from "./CanvasOption.js";

export default class Particle extends CanvasOption {
  constructor(x, y, vx, vy) {
    //extends를 하면 super를 constructor 안에 입력해서 실행해야 부모 값에 접근 가능함
    super();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    // this.opacity = 1;
    // this.gravity = 0.12;
    // this.friction = 0.93;
    // this.color = color;
  }
  update() {
    // this.y += 1;
    // this.vy += this.gravity;
    // this.vx *= this.friction;
    // this.vy *= this.friction;
    this.x += this.vx;
    this.y += this.vy;
    // this.opacity -= 0.02;
  }

  draw() {
    this.ctx.fillStyle = "#fff";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
