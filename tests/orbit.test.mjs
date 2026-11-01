import test from "node:test";
import assert from "node:assert/strict";
import {
  orbitFace,
  orbitEase,
  shortestTurn,
  ORBIT_DURATION,
  ORBIT_FACES,
  ORBIT_STEP,
} from "../src/motion/orbit.mjs";
test("every face has a stable hold, including the final idea face", () => {
  for (let i = 0; i < ORBIT_FACES; i++) {
    assert.equal(orbitFace(i * ORBIT_STEP), i);
    assert.equal(orbitFace(i * ORBIT_STEP + 1000), i);
  }
});
test("the end and beginning of the turn have the same front face", () => {
  assert.equal(orbitFace(ORBIT_DURATION - 1), 0);
  assert.equal(orbitFace(ORBIT_DURATION), 0);
  assert.equal(orbitFace(ORBIT_DURATION + 1), 0);
});
test("easing advances monotonically without the reference overshoot", () => {
  let previous = 0;
  for (let i = 0; i <= 1000; i++) {
    const value = orbitEase(i / 1000);
    assert.ok(value >= previous && value >= 0 && value <= 1);
    previous = value;
  }
});
test("manual navigation picks the shortest path across the cycle boundary", () => {
  assert.equal(shortestTurn(-300, 0), -360);
  assert.equal(shortestTurn(0, -300), 60);
  assert.equal(shortestTurn(-60, -120), -120);
});
