//@ts-check
import { DynamicBody } from "./DynamicBody.js";

export class Ball extends DynamicBody {
  constructor({ position, velocity, mass, radius }) {
    super({ position, velocity, mass });
    this.radius = radius;
    this.restClicks = 0;
  }

  /**
   * @param {number} dt
   */
  updatePosition(dt) {
    super.updatePosition(dt);
    this.collideWall({
      left: 0,
      right: window.innerWidth,
      top: 0,
      bottom: window.innerHeight,
    });
    return this;
  }

  /**
   * @param {{ left: number; right: number; top: number; bottom: number; }} wall
   */
  collideWall(wall) {
    // Check if the ball is colliding with the left wall
    if (this.position.x - this.radius <= wall.left) {
      this.velocity.multiply(this.calcVelocity());
      this.velocity.x *= -1;
      this.position.x = wall.left + this.radius;
    }

    // Check if the ball is colliding with the right wall
    if (this.position.x + this.radius >= wall.right) {
      this.velocity.multiply(this.calcVelocity());
      this.velocity.x *= -1;
      this.position.x = wall.right - this.radius;
    }

    // Check if the ball is colliding with the top wall
    if (this.position.y - this.radius <= wall.top) {
      this.velocity.multiply(this.calcVelocity());
      this.velocity.y *= -1;
      this.position.y = wall.top + this.radius;
    }

    // Check if the ball is colliding with the bottom wall
    if (this.position.y + this.radius >= wall.bottom) {
      this.velocity.multiply(this.calcVelocity());
      this.velocity.y *= -1;
      this.position.y = wall.bottom - this.radius;
      this.isResting = true;
    } else {
      this.isResting = false;
    }

    return this;
  }

  calcVelocity() {
    return 0.9;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 100);
    ctx.fill();
    return this;
  }
}
