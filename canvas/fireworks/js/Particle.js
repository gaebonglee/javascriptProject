import CanvasOption from "./CanvasOption";

export default class Particle extends CanvasOption {
  constructor(x, y) {
    //extends를 하면 super를 constructor 안에 입력해서 실행해야 부모 값에 접근 가능함 
    super();
    this.x = x;
    this.y = y;
  }
  update() {}

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
