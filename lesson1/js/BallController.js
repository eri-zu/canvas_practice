import Base from "./Base.js";

export default class BallController extends Base {
  constructor(canvas, ctx) {
    super();

    this.canvas = canvas;
    this.ctx = ctx;

    this.speed = {
      x: 1,
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

    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY, 50, 0, Math.PI * 2, true);
    this.ctx.fillStyle = "#000";
    this.ctx.fill();
  }

  setEvents() {
    super.setEvents();
  }
}
