import Base from "./Base.js";
import * as m from "./Math.js";

export default class Ball extends Base {
  constructor(canvas, ctx, num, i) {
    super();

    this.canvas = canvas;
    this.ctx = ctx;
    this.num = num;
    this.i = i;
    this.w = this.canvas.width;
    this.h = this.canvas.height;

    // ボール
    this.r = 10; // 半径

    // 5発ランダム
    this.num = 5;
    this.speed = Math.random() * 5;
    this.vector2 = {
      x: Math.cos(m.radian((360 / this.num) * this.i)),
      y: Math.sin(m.radian((360 / this.num) * this.i)),
    };

    // 寿命
    this.frame = 0;
    this.life = 1;
    this.lifespan = 6; // 6sで消える
    this.op = 1;

    this.isUEv = true;

    this.setup();
    this.setEvents();
  }

  setup() {}

  getPos(e) {
    this.posX = e.clientX;
    this.posY = e.clientY;
  }

  update() {
    this.frame++;

    // 寿命
    if (this.dead()) this.life = this.op = 0;

    // 端で跳ね返り
    this.turn();

    this.posX += this.speed * this.vector2.x;
    this.posY += this.speed * this.vector2.y;

    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY, this.r, 0, Math.PI * 2, true);
    this.ctx.fillStyle = `rgba(0, 0, 0, ${this.op})`;
    this.ctx.fill();
  }

  dead() {
    return this.frame % (60 * this.lifespan) == 0 ? true : false;
  }

  turn() {
    if (this.posX - this.r <= 0 || this.posX + this.r >= this.w)
      this.speed *= -1;
    if (this.posY - this.r <= 0 || this.posY + this.r >= this.h)
      this.speed *= -1;
  }

  setEvents() {
    super.setEvents();
  }
}
