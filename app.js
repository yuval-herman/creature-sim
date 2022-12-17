//@ts-check

import { CanvasManager } from "./CanvasManager.js";
import { Creature } from "./Creature.js";
import { generateRandomCreature } from "./utils.js";
import { Vector2 } from "./Vector.js";

// @ts-ignore
const manager = new CanvasManager(document.getElementById("canvas"));

manager.addBody(
  generateRandomCreature(undefined, {
    maxJoints: 3,
    minOffset: 1 * 100,
    maxOffset: 2 * 100,
    minDelay: 1000,
  })
);

let prev = 0;
let slomo = false;
const PRECISION = 10;
/**
 * @param {number} dt
 */
function draw(dt) {
  const passedTime = dt - prev;
  for (let i = 0; i < PRECISION; i++) {
    manager.update(passedTime / PRECISION / (slomo ? 100 : 1));
  }
  manager.drawFrameRate(passedTime);
  prev = dt;
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

function toggleSlomo(ev) {
  if (ev.key == "s") {
    slomo = !slomo;
    console.log(slomo);
  }
}

window.addEventListener("keypress", toggleSlomo);
