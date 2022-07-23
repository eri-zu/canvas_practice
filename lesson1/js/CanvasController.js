"use strict";

import Ball from "./Ball.js";
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

  fire(e) {
    for (let i = 0; i < 5; i++) {
      const ball = new Ball(this.canvas, this.ctx, i);
      ball.getPos(e);
    }
  }

  setEvents() {
    super.setEvents();

    this.canvas.addEventListener("click", (e) => {
      this.fire(e);
    });
  }
}

(() => {
  new CanvasController();
})();
