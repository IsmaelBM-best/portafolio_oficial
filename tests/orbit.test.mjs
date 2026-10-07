import test from "node:test";
import assert from "node:assert/strict";
import {
  orbitFace,
  orbitEase,
  shortestTurn,
  ORBIT_DURATION,
} from "../src/motion/orbit.mjs";
test("every face has a stable hold, including the final idea face", () => {
  for (let i = 0; i < 5; i++) {
    assert.equal(orbitFace(i * 2000), i);
    assert.equal(orbitFace(i * 2000 + 1000), i);
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
  assert.equal(shortestTurn(-288, 0), -360);
  assert.equal(shortestTurn(0, -288), 72);
  assert.equal(shortestTurn(-72, -144), -144);
});
