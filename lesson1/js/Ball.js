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

    console.log(this.w, this.h, "this.w", "this.h");

    // ボール
    this.r = 10; // 半径

    // 5発ランダム
    this.num = 5;
    this.speed = Math.random() * 10; // 1 - 10 小数点

    this.vector2 = {
      x: Math.cos(m.radian((360 / this.num) * this.i)),
      y: Math.sin(m.radian((360 / this.num) * this.i)),
    };

    console.log(
      this.vector2.x,
      this.vector2.y,
      "this.vector2.x",
      "this.vector2.y"
    );

    // 減速
    this.a = 0.99;

    // 寿命
    this.frame = 0;
    this.life = 1;
    this.lifespan = 20; // 20sで消える
    this.op = 1;
    this.isDead = false;

    // 色
    this.color = {
      r: Math.round(Math.random() * 255),
      g: Math.round(Math.random() * 255),
      b: Math.round(Math.random() * 255),
    };

    this.isUEv = true;

    this.setup();
    this.setEvents();
  }

  setup() {}

  getPos(e) {
    this.posX = e.clientX;
    this.posY = e.clientY;

    if (this.posX - this.r <= 0) {
      this.posX += this.r + 1;
    }

    if (this.posX + this.r >= this.w) {
      this.posX -= this.r + 1;
    }

    if (this.posY - this.r <= 0) {
      this.posY += this.r + 1;
    }

    if (this.posY + this.r >= this.h) {
      this.posY -= this.r + 1;
    }
  }

  update() {
    this.frame++;

    // 寿命
    this.checklife();

    // 端で跳ね返り
    this.turn();

    // 寿命の半分時間経過したら2frameに一回減速開始
    if (this.frame >= 60 * (this.lifespan / 2) && this.frame % 2 == 0)
      this.speed *= this.a;

    // 移動
    this.posX += this.speed * this.vector2.x;
    this.posY += this.speed * this.vector2.y;

    // 描画
    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY, this.r, 0, Math.PI * 2, true);
    this.ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.op})`;
    this.ctx.fill();
  }

  checklife() {
    this.isDead = this.frame % (60 * this.lifespan) == 0 ? true : false;
    if (this.isDead) this.life = this.op = 0;
  }

  turn() {
    if (this.posX - this.r <= 0 || this.posX + this.r >= this.w) {
      this.vector2.x *= -1; // 入射角と反射角の関係
    }

    if (this.posY - this.r <= 0 || this.posY + this.r >= this.h) {
      this.vector2.y *= -1;
    }
  }

  setEvents() {
    super.setEvents();
  }
}
