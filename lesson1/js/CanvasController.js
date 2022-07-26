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

    this.balls = [];
    this.num = 5; // ボール数
  }

  update() {
    // clear
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.balls.length - 1; i >= 0; i--) {
      // 描画
      this.balls[i].update();

      // canvas上から消す
      if (this.balls[i].isDead) this.balls.splice(i, 1); // splice(start, count)
    }
  }

  createBall(e) {
    for (let i = 0; i < this.num; i++) {
      const ball = new Ball(this.canvas, this.ctx, this.num);
      this.balls.push(ball);

      ball.getPos(e);
    }
  }

  setEvents() {
    super.setEvents();

    this.canvas.addEventListener("click", (e) => {
      this.createBall(e);
    });
  }
}

(() => {
  new CanvasController();
})();
