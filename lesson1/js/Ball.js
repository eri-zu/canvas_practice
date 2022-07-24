import Base from "./Base.js";
import * as m from "./Math.js";

export default class Ball extends Base {
  constructor(canvas, ctx, i) {
    super();

    this.canvas = canvas;
    this.ctx = ctx;
    this.i = i;
    this.num = 5;

    this.speed = Math.random() * 5;
    this.life = 1;
    this.lifespan = 2; // 2sで消える
    this.frame = 0;
    this.op = 1;

    this.vector2 = {
      x: Math.cos(m.radian((360 / this.num) * this.i)),
      y: Math.sin(m.radian((360 / this.num) * this.i)),
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

    if (this.frame % (60 * this.lifespan) == 0) {
      this.life = 0;
      this.op = this.life;
    }

    this.posX += this.speed * this.vector2.x;
    this.posY += this.speed * this.vector2.y;

    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY, 10, 0, Math.PI * 2, true);
    this.ctx.fillStyle = `rgba(0, 0, 0, ${this.op}`;
    this.ctx.fill();
  }

  setEvents() {
    super.setEvents();
  }
}
