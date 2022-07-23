"use strict";

import BallController from "./BallController.js";

export default class CanvasController {
  constructor() {
    this.setup();
  }

  setup() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    new BallController(canvas, ctx);
  }
}

(() => {
  new CanvasController();
})();
