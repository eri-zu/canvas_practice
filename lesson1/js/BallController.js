import Base from "./Base.js";

export default class BallController extends Base {
  constructor(canvas, ctx) {
    super();

    this.canvas = canvas;
    this.ctx = ctx;

    this.setup();
    this.setEvents();
  }

  setup() {
    const w = this.canvas.width;
    const h = this.canvas.height;

    this.ctx.beginPath();
    this.ctx.arc(w / 2, h / 2, 50, 0, Math.PI * 2, true);
    this.ctx.fillStyle = "#000";
    this.ctx.fill();
  }

  setEvents() {}
}
