import CanvasOption from "./CanvasOption.js";

export default class Particle extends CanvasOption {
  constructor(x, y) {
    //extends를 하면 super를 constructor 안에 입력해서 실행해야 부모 값에 접근 가능함
    super();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.opacity = 1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;

    this.opacity -= 0.01;
  }

  draw() {
    this.ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
