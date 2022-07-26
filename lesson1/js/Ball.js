import Base from "./Base.js";
import * as m from "./Math.js";

export default class Ball extends Base {
  constructor(canvas, ctx, num) {
    super();

    this.canvas = canvas;
    this.ctx = ctx;
    this.num = num;
    this.w = this.canvas.width;
    this.h = this.canvas.height;

    // ボール
    this.r = 15; // 半径

    // 5発ランダム
    this.speed = Math.random() * 10; // 1 - 10 小数点
    this.randomDeg = Math.random() * 360;

    this.vector2 = {
      x: Math.cos(m.radian(this.randomDeg)),
      y: Math.sin(m.radian(this.randomDeg)),
    };

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
    if (this.posX - this.r <= 0) {
      this.posX = this.r; // 壁にピタッとくっつく位置に移動（壁にめり込まないようにする）
      this.vector2.x *= -1; // スピードだと同方向に跳ね返るだけなので、入射角に対して反射角で返すように
    }

    if (this.posX + this.r >= this.w) {
      this.posX = this.w - this.r;
      this.vector2.x *= -1;
    }

    if (this.posY - this.r <= 0) {
      this.posY = this.r;
      this.vector2.y *= -1;
    }

    if (this.posY + this.r >= this.h) {
      this.posY = this.h - this.r;
      this.vector2.y *= -1;
    }
  }

  setEvents() {
    super.setEvents();
  }
}
