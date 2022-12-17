//@ts-check
import { Vector2 } from "./Vector.js";
import { Ball } from "./Ball.js";
import { DynamicBody } from "./DynamicBody.js";

export class Joint extends DynamicBody {
  /**
   * Creates a new `Joint` instance.
   * @param {Ball} ball1 - The first ball in the joint.
   * @param {Ball} ball2 - The second ball in the joint.
   * @param {number} springConstant - The stiffness of the spring.
   * @param {Object} options - The options for creating the dynamic body.
   * @param {Vector2} options.position - The initial position of the dynamic body.
   * @param {Vector2} options.velocity - The initial velocity of the dynamic body.
   * @param {number} options.mass - The mass of the dynamic body.
   * @param {number} options.lineWidth - The width of the joint to draw.
   */
  constructor(options, ball1, ball2, springConstant) {
    super(options);
    this.lineWidth = options.lineWidth;
    this.ball1 = ball1;
    this.ball2 = ball2;
    this.length = ball1.position.distanceTo(ball2.position);
    this.offset = 0;
    this.springConstant = springConstant;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(this.ball1.position.x, this.ball1.position.y);
    ctx.lineTo(this.ball2.position.x, this.ball2.position.y);
    ctx.stroke();
    this.ball1.draw(ctx);
    this.ball2.draw(ctx);
    return this;
  }

  /**
   * @param {Vector2} [gravity]
   */
  applyGravity(gravity) {
    this.ball1.applyGravity(gravity);
    this.ball2.applyGravity(gravity);
    return this;
  }

  /**
   * Updates the position of the balls based on the spring joint.
   * @param {number} dt - The time delta (in milliseconds) to use for the update.
   * @returns {Joint} A reference to this joint.
   */
  updatePosition(dt) {
    // Calculate the displacement vector between the two balls
    const displacement = this.ball1.position
      .copy()
      .subtract(this.ball2.position);
    // Calculate the distance between the two balls
    const distance = displacement.magnitude();
    // Calculate the spring force using Hooke's Law: F = -kx
    const springForce = displacement
      .normalize()
      .multiply((distance - this.length + this.offset) * -this.springConstant);
    // Apply the spring force to each ball
    this.ball1.applyForce(springForce);
    this.ball2.applyForce(springForce.multiply(-1));
    // Update the position of each ball
    this.ball1.updatePosition(dt);
    this.ball2.updatePosition(dt);
    return this;
  }

  /**
   * @param {number} offset
   */
  setOffset(offset) {
    this.offset = offset;
    return this;
  }
}
