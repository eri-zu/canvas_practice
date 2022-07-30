import Base from "./Base.js";
import * as m from "./Math.js";

export default class Ball extends Base {
  constructor(canvas, ctx, num, x, y, radian, speed, radius) {
    super();

    this.canvas = canvas;
    this.ctx = ctx;
    this.num = num;
    this.posX = x;
    this.posY = y;
    this.radian = radian; // 角度
    this.r = radius; // 半径

    this.w = this.canvas.width;
    this.h = this.canvas.height;

    // 移動
    this.speed = speed;
    this.vector2 = {
      x: Math.cos(this.radian),
      y: Math.sin(this.radian),
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

    // マウス近づけたら逃げる
    this.force = 5;
    this.forceAngle = 0;
    this.forceVec = {
      x: 0,
      y: 0,
    };
    this.mousePosX = 0;
    this.mousePosY = 0;

    this.isUEv = true;

    this.setup();
    this.setEvents();
  }

  setup() {}

  update() {
    this.frame++;

    // 寿命
    this.checklife();

    // 端で跳ね返り
    this.turn();

    // 寿命の半分時間経過したら2frameに一回減速開始
    this.speedDown();

    // 移動
    this.posX += this.speed * this.vector2.x;
    this.posY += this.speed * this.vector2.y;

    // 50px以内入ってきたらボール逃げる
    if (this.dist < 50 + this.r) {
      // マウスとボールの距離が作る角度
      const forceAngle = Math.atan2(
        this.posX - this.mousePosX,
        this.posY - this.mousePosY
      );

      // 力の大きさ
      this.forceVec.x = Math.cos(forceAngle);
      this.forceVec.y = Math.sin(forceAngle);

      // 位置移動に力加える
      this.posX += this.force * this.forceVec.x;
      this.posY += this.force * this.forceVec.y;
    }

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

  speedDown() {
    if (this.frame >= 60 * (this.lifespan / 2) && this.frame % 2 == 0)
      this.speed *= this.a;
  }

  onMove(e) {
    // マウス座標
    this.mousePosX = e.clientX;
    this.mousePosY = e.clientY;

    // マウスとボールの距離
    this.dist = m.dist(this.mousePosX, this.mousePosY, this.posX, this.posY);
  }

  setEvents() {
    super.setEvents();
  }
}
