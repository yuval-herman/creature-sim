//@ts-check

import { CanvasManager } from "./CanvasManager.js";
import { Creature } from "./Creature.js";
import { generateRandomCreature } from "./utils.js";
import { Vector2 } from "./Vector.js";

// @ts-ignore
const manager = new CanvasManager(document.getElementById("canvas"));

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
