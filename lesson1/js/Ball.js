import Base from "./Base.js";
import * as m from "./Math.js";

export default class Ball extends Base {
  constructor(canvas, ctx, i) {
    super();

    this.canvas = canvas;
    this.ctx = ctx;
    this.i = i;
    this.num = 5;

    this.speed = {
      x: 1 * Math.cos(m.radian((360 / this.num) * this.i)),
      y: 1 * Math.sin(m.radian((360 / this.num) * this.i)),
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
    this.posX += this.speed.x;
    this.posY += this.speed.y;

    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY, 10, 0, Math.PI * 2, true);
    this.ctx.fillStyle = "#000";
    this.ctx.fill();
  }

  setEvents() {
    super.setEvents();
  }
}
