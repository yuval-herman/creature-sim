//@ts-check
import { Vector2 } from "./Vector.js";
import { DynamicBody } from "./DynamicBody.js";
import { Ball } from "./Ball.js";
import { Joint } from "./Joint.js";

/**
 * @typedef {Object} JointConnection
 * @property {number} i1 - The index of the first joint in the connection.
 * @property {number} i2 - The index of the second joint in the connection.
 * @property {number} tension - The tension of the connection.
 * @property {Animation[]} [animation] - An array defining the connection animation.
    
 */

/**
 * @typedef {Object} Animation
 * @property {number} offset - The offset to add to the joint length.
 * @property {number} delay - The delay (in milliseconds) to wait before moving to the next step in the animation.
 */

/**
 * A class representing a creature in 2D space.
 */
export class Creature extends DynamicBody {
  /**
    Creates a new Creature instance.
    @param {Object} options - The options for creating the creature.
    @param {Vector2} options.position - The initial position of the creature.
    @param {Vector2} options.velocity - The initial velocity of the creature.
    @param {number} options.mass - The mass of the creature.
    @param {Object} options.joints - An object with two properties: coords and connections.
    @param {Vector2[]} options.joints.coords - The coordinates of the joint.
    @param {JointConnection[]} options.joints.connections - The connections between the joints.  
    */
  constructor({ position, velocity, mass, joints }) {
    super({ position, velocity, mass });

    this.connections = joints.connections;
    this.elapsedTime = 0;

    // Create an array of balls for each joint
    const balls = joints.coords.map(
      (coords) =>
        new Ball({
          position: coords,
          mass: 1,
          radius: 10,
          velocity: new Vector2(),
        })
    );

    this.joints = [];
    // Create a joint for each connection
    for (const connection of joints.connections) {
      this.joints.push(
        new Joint(
          {
            position: new Vector2(),
            velocity: new Vector2(),
            mass: 1,
            lineWidth: balls[connection.i1].radius / 2,
          },
          balls[connection.i1],
          balls[connection.i2],
          connection.tension
        )
      );
    }
  }

  /**
   * Applies gravity to this dynamic body.
   * @param {Vector2} [gravity] - The gravitational force to apply.
   * @returns {DynamicBody} A reference to this dynamic body.
   */
  applyGravity(gravity) {
    // Apply gravity to each joint in the creature
    this.joints.forEach((joint) => joint.applyGravity(gravity));
    return this;
  }

  /**
   * Updates the position of this dynamic body based on its current velocity.
   * @param {number} dt - The time delta (in milliseconds) to use for the update.
   * @returns {DynamicBody} A reference to this dynamic body.
   */
  updatePosition(dt) {
    this.joints.forEach((joint) => joint.updatePosition(dt));
    return this;
  }

  /**
   * Animate the movement of the creature.
   * @param {number} dt - The time delta (in milliseconds) since the last frame.
   * @returns {Creature} A reference to this dynamic body.
   */
  animate(dt) {
    // Loop through each connection and apply its animation
    this.elapsedTime += dt;
    for (const connection of this.connections) {
      // If the connection has an animation defined, loop through each step
      if (connection.animation) {
        let elapsedTime = 0;

        // Calculate the elapsed time since the start of the animation
        for (const step of connection.animation) {
          elapsedTime += step.delay;
        }

        // Calculate the current step based on the elapsed time and the time delta
        const currentStep =
          Math.floor(this.elapsedTime / elapsedTime) %
          connection.animation.length;

        // Add the offset of the current step to the joint length
        this.joints[connection.i1].setOffset(
          connection.animation[currentStep].offset
        );
        this.joints[connection.i2].setOffset(
          connection.animation[currentStep].offset
        );
      }
    }
    return this;
  }

  /**
   * Draws this creature on the given canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   * @returns {Creature} A reference to this creature.
   */
  draw(ctx) {
    ctx.save();
    this.joints.forEach((joint) => joint.draw(ctx));
    ctx.restore();
    return this;
  }
}
