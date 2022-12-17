//@ts-check

import { Ball } from "./Ball.js";
import { CanvasManager } from "./CanvasManager.js";
import { Creature } from "./Creature.js";
import { Vector2 } from "./Vector.js";

/**
 * Generates a random creature with the given options.
 *
 * @param {Object} [options] - The options for creating the creature.
 * @param {Vector2} [options.position=new Vector2(0, 0)] - The initial position of the creature.
 * @param {Vector2} [options.velocity=new Vector2(0, 0)] - The initial velocity of the creature.
 * @param {number} [options.mass=1] - The mass of the creature.
 * @param {Object} [options.joints] - An object with two properties: coords and connections.
 * @param {Vector2[]} [options.joints.coords=[]] - The coordinates of the joint.
 * @param {import("./Creature.js").JointConnection[]} [options.joints.connections=[]] - The connections between the joints.
 * @param {number} [minJoints=3] - The minimum number of joints to generate.
 * @param {number} [maxJoints=12] - The maximum number of joints to generate.
 * @param {number} [minTension=0] - The minimum tension value to generate.
 * @param {number} [maxTension=10] - The maximum tension value to generate.
 * @param {number} [minSteps=1] - The minimum number of steps to generate for each connection's animation.
 * @param {number} [maxSteps=5] - The maximum number of steps to generate for each connection's animation.
 * @param {number} [minOffset=-10] - The minimum offset value to generate for each step in the connection's animation.
 * @param {number} [maxOffset=10] - The maximum offset value to generate for each step in the connection's animation.
 * @param {number} [minDelay=100] - The minimum delay (in milliseconds) to generate for each step in the connection's animation.
 * @param {number} [maxDelay=1000] - The maximum delay (in milliseconds) to generate for each step in the connection's animation.
 * @return {Creature} A new creature with random joints and connections.
 */
function generateRandomCreature(
  options,
  minJoints = 3,
  maxJoints = 12,
  minTension = 0,
  maxTension = 10,
  minSteps = 1,
  maxSteps = 5,
  minOffset = -10,
  maxOffset = 10,
  minDelay = 100,
  maxDelay = 1000
) {
  /**
   * Set default options
   * @typedef {Object} UsedOptions - The options for creating the creature.
   * @property {Vector2} position - The initial position of the creature.
   * @property {Vector2} velocity - The initial velocity of the creature.
   * @property {number} mass - The mass of the creature.
   * @property {Object} joints - An object with two properties: coords and connections.
   * @property {Vector2[]} joints.coords - The coordinates of the joint.
   * @property {import("./Creature.js").JointConnection[]} joints.connections - The connections between the joints.
   */

  /** @type {UsedOptions} */
  const usedOptions = {
    position: new Vector2(0, 0),
    velocity: new Vector2(0, 0),
    mass: 1,
    joints: {
      // @ts-ignore
      coords: [],
      // @ts-ignore
      connections: [],
    },
    ...options,
  };

  // Generate random number of joints within the specified range
  const numJoints = getRandomNum(maxJoints, minJoints, true);

  // Generate random joint coordinates
  for (let i = 0; i < numJoints; i++) {
    usedOptions.joints.coords.push(
      new Vector2(Math.random() * 100, Math.random() * 100)
    );
  }
  // Generate random connections between joints.
  for (let i = 0; i < numJoints; i++) {
    for (let j = i + 1; j < numJoints; j++) {
      if (Math.random() > 0.5) {
        usedOptions.joints.connections.push({
          i1: i,
          i2: j,
          tension: getRandomNum(maxTension, minTension),
          animation: [],
        });
      }
    }
  }

  for (const connection of usedOptions.joints.connections) {
    const stepsAmount = getRandomNum(maxSteps, minSteps, true);
    for (let i = 0; i < stepsAmount; i++) {
      const animation = {
        offset: getRandomNum(maxOffset, minOffset),
        delay: getRandomNum(maxDelay, minDelay, true),
      };
      connection.animation?.push(animation);
    }
  }

  return new Creature(usedOptions);
}

// @ts-ignore
const manager = new CanvasManager(document.getElementById("canvas"));
manager.addBody(
  new Ball({
    position: new Vector2(100, 100),
    velocity: new Vector2(1000, 1000),
    mass: 1,
    radius: 10,
  })
);

const ball1 = new Ball({
  position: new Vector2(100, 100),
  velocity: new Vector2(0, 0),
  mass: 1,
  radius: 50,
});
const ball2 = new Ball({
  position: new Vector2(200, 200),
  velocity: new Vector2(0, 0),
  mass: 1,
  radius: 50,
});

const creature = new Creature({
  position: new Vector2(),
  velocity: new Vector2(),
  mass: 1,
  joints: {
    coords: [
      new Vector2(0, 0),
      new Vector2(100, 0),
      new Vector2(100, 100),
      new Vector2(0, 100),
    ],
    connections: [
      { i1: 0, i2: 1, tension: 10 }, // connect joint 0 to joint 1
      { i1: 1, i2: 2, tension: 10 }, // connect joint 1 to joint 2
      { i1: 2, i2: 3, tension: 10 }, // connect joint 2 to joint 3
      { i1: 3, i2: 0, tension: 10 }, // connect joint 3 to joint 0
      { i1: 1, i2: 3, tension: 10 }, // connect joint 1 to joint 3
    ],
  },
});

creature.connections[0].animation = [
  { offset: 10, delay: 1000 }, // add 10 to the joint length and wait 1 second
  { offset: -10, delay: 1000 }, // subtract 10 from the joint length and wait 1 second
];

creature.connections[1].animation = [
  { offset: -10, delay: 1000 }, // subtract 10 from the joint length and wait 1 second
  { offset: 10, delay: 1000 }, // add 10 to the joint length and wait 1 second
];

creature.connections[2].animation = [
  { offset: 10, delay: 1000 }, // add 10 to the joint length and wait 1 second
  { offset: -10, delay: 1000 }, // subtract 10 from the joint length and wait 1 second
];

creature.connections[3].animation = [
  { offset: -10, delay: 1000 }, // subtract 10 from the joint length and wait 1 second
  { offset: 10, delay: 1000 }, // add 10 to the joint length and wait 1 second
];

creature.connections[4].animation = [
  { offset: 10, delay: 1000 }, // add 10 to the joint length and wait 1 second
  { offset: -10, delay: 1000 }, // subtract 10 from the joint length and wait 1 second
];

manager.addBody(creature);
manager.addBody(generateRandomCreature());

let prev = 0;

/**
 * @param {number} dt
 */
function draw(dt) {
  requestAnimationFrame(draw);
  manager.update(dt - prev);
  prev = dt;
}
requestAnimationFrame(draw);

/**
 * @param {number} max
 * @param {number} min
 * @returns {number}
 */
function getRandomNum(max, min, int = false) {
  const num = Math.random() * (max - min + 1);
  return (int ? Math.floor(num) : num) + min;
}
