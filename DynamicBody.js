//@ts-check
import { Vector2 } from "./Vector.js";

/**
 * A class representing a dynamic body in 2D space.
 */
export class DynamicBody {
  #default_gravity = new Vector2(0, +9.81);
  /**
   * Creates a new `DynamicBody` instance.
   * @param {Object} options - The options for creating the dynamic body.
   * @param {Vector2} options.position - The initial position of the dynamic body.
   * @param {Vector2} options.velocity - The initial velocity of the dynamic body.
   * @param {number} options.mass - The mass of the dynamic body.
   */
  constructor({ position, velocity, mass }) {
    this.position = position;
    this.velocity = velocity;
    this.mass = mass;
    this.isResting = false;
  }

  /**
   * Applies gravity to this dynamic body.
   * @param {Vector2} [gravity] - The gravitational force to apply.
   * @returns {DynamicBody} A reference to this dynamic body.
   */
  applyGravity(gravity) {
    if (!this.isResting) {
      this.velocity.add(gravity ?? this.#default_gravity);
    }
    return this;
  }

  /**
   * Applies a force to this dynamic body.
   * @param {Vector2} force - The force to apply.
   * @returns {DynamicBody} A reference to this dynamic body.
   */
  applyForce(force) {
    this.velocity.add(force.divide(this.mass));
    return this;
  }

  /**
   * Updates the position of this dynamic body based on its current velocity.
   * @param {number} dt - The time delta (in milliseconds) to use for the update.
   * @returns {DynamicBody} A reference to this dynamic body.
   */
  updatePosition(dt) {
    this.position.add(this.velocity.copy().multiply(dt / 1000));
    this.velocity.multiply(0.995);
    return this;
  }

  /**
   * Animate the movement of the body.
   * @param {number} dt - The time delta (in milliseconds) since the last frame.
   * @returns {DynamicBody} A reference to this dynamic body.
   */
  animate(dt) {
    return this;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @returns {DynamicBody}
   */
  draw(ctx) {
    return this;
  }
}
