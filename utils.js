//@ts-check

import { Creature } from "./Creature.js";
import { Vector2 } from "./Vector.js";

/**
 * Generates a random creature with the given options.
 *
 * @param {Object} [creatureOptions] - The options for the creature.
 * @param {Vector2} [creatureOptions.position=new Vector2(0, 0)] - The initial position of the creature.
 * @param {Vector2} [creatureOptions.velocity=new Vector2(0, 0)] - The initial velocity of the creature.
 * @param {number} [creatureOptions.mass=1] - The mass of the creature.
 * @param {Object} [creatureOptions.joints] - An object with two properties: coords and connections.
 * @param {Vector2[]} [creatureOptions.joints.coords=[]] - The coordinates of the joint.
 * @param {import("./Creature.js").JointConnection[]} [creatureOptions.joints.connections=[]] - The connections between the joints.
 * @param {Object} [generationOptions] - The options for the generation process.
 * @param {number} [generationOptions.minJoints=3] - The minimum number of joints to generate.
 * @param {number} [generationOptions.maxJoints=12] - The maximum number of joints to generate.
 * @param {number} [generationOptions.minTension=0] - The minimum tension value to generate.
 * @param {number} [generationOptions.maxTension=10] - The maximum tension value to generate.
 * @param {number} [generationOptions.minSteps=1] - The minimum number of steps to generate for each connection's animation.
 * @param {number} [generationOptions.maxSteps=5] - The maximum number of steps to generate for each connection's animation.
 * @param {number} [generationOptions.minOffset=-10] - The minimum offset value to generate for each step in the connection's animation.
 * @param {number} [generationOptions.maxOffset=10] - The maximum offset value to generate for each step in the connection's animation.
 * @param {number} [generationOptions.minDelay=100] - The minimum delay (in milliseconds) to generate for each step in the connection's animation.
 * @param {number} [generationOptions.maxDelay=1000] - The maximum delay (in milliseconds) to generate for each step in the connection's animation.
 * @return {Creature} A new creature with random joints and connections.
 */
export function generateRandomCreature(creatureOptions, generationOptions) {
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

  let {
    minJoints = 3,
    maxJoints = 12,
    minTension = 0,
    maxTension = 10,
    minSteps = 1,
    maxSteps = 5,
    minOffset = -10,
    maxOffset = 10,
    minDelay = 100,
    maxDelay = 1000,
  } = generationOptions || {};

  [minJoints, maxJoints] = updateMinMax(minJoints, maxJoints);
  [minTension, maxTension] = updateMinMax(minTension, maxTension);
  [minSteps, maxSteps] = updateMinMax(minSteps, maxSteps);
  [minOffset, maxOffset] = updateMinMax(minOffset, maxOffset);
  [minDelay, maxDelay] = updateMinMax(minDelay, maxDelay);

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
    ...creatureOptions,
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
      let isConnected = false;
      for (const connection of usedOptions.joints.connections) {
        if (
          (connection.i1 === i && connection.i2 === j) ||
          (connection.i1 === j && connection.i2 === i)
        ) {
          isConnected = true;
          break;
        }
      }
      if (!isConnected || Math.random() > 0.5) {
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
    if (maxSteps > 1) {
      connection.animation?.push({
        offset: 0,
        delay: getRandomNum(maxDelay, minDelay, true),
      });
    }
    for (let i = 0; i < stepsAmount; i++) {
      connection.animation?.push({
        offset: getRandomNum(maxOffset, minOffset),
        delay: getRandomNum(maxDelay, minDelay, true),
      });
    }
  }
  console.log(usedOptions);
  return new Creature(usedOptions);
}

/**
 * @param {number} max
 * @param {number} min
 * @returns {number}
 */
export function getRandomNum(max, min, int = false) {
  if (int) {
    min = Math.ceil(min);
    max = Math.floor(max);
  }
  const num = Math.random() * (max - min + 1) + min;
  return int ? Math.floor(num) : num;
}

/**
 * @param {number} min
 * @param {number} max
 * @returns {[number, number]}
 */
function updateMinMax(min, max) {
  if (min > max) max = min;
  return [min, max];
}
