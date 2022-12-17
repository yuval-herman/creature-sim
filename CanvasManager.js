//@ts-check
import { DynamicBody } from "./DynamicBody.js";

export class CanvasManager {
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw "can't make ctx";
    this.ctx = ctx;
    window.onresize = this.resize.bind(this);
    this.resize();

    /** @type {DynamicBody[]} */
    this.bodies = [];
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  /**
   * @param {DynamicBody} body
   */
  addBody(body) {
    this.bodies.push(body);
  }
  /**
   * @param {number} dt - The time delta (in milliseconds) to use for the update.
   */
  update(dt) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const body of this.bodies) {
      body.applyGravity().updatePosition(dt).animate(dt).draw(this.ctx);
    }
  }

  /**
   * @param {number} dt
   */
  drawFrameRate(dt) {
    this.ctx.fillStyle = "white";
    this.ctx.font = "16px serif";
    this.ctx.fillText("fps: " + 1 / (dt / 1000), 10, 20);
  }
}
