"use strict";

import BallController from "./BallController.js";
import Base from "./Base.js";

export default class CanvasController extends Base {
  constructor() {
    super();

    this.setup();
    this.setEvents();
  }

  setup() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    new BallController(canvas, ctx);
  }

  setEvents() {}
}

(() => {
  new CanvasController();
})();
