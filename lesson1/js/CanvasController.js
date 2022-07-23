"use strict";

import BallController from "./BallController.js";
import Base from "./Base.js";

export default class CanvasController extends Base {
  constructor() {
    super();

    this.isUEv = true;

    this.setup();
    this.setEvents();
  }

  setup() {
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setEvents() {
    super.setEvents();

    this.canvas.addEventListener("click", (e) => {
      const ball = new BallController(this.canvas, this.ctx);
      ball.getPos(e);
    });
  }
}

(() => {
  new CanvasController();
})();
