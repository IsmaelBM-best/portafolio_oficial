import test from "node:test";
import assert from "node:assert/strict";
import { sceneProgress, sampleDevice } from "../src/motion/techScene.mjs";

test("anchor jumps and extreme scroll positions remain bounded", () => {
  assert.equal(sceneProgress(500, 1400, 800), 0);
  assert.equal(sceneProgress(-5000, 1400, 800), 1);
  assert.equal(sceneProgress(-50, 100, 1000), 1);
  assert.ok(
    sceneProgress(-450, 1400, 800) > 0 && sceneProgress(-450, 1400, 800) < 1,
  );
});
test("phone passes from behind the frame into the foreground and back", () => {
  assert.ok(sampleDevice("workbench", "phone", 0).z < 2);
  assert.ok(sampleDevice("workbench", "phone", 0.38).z > 3);
  assert.ok(sampleDevice("workbench", "phone", 1).z < 2);
});
test("reverse scrolling reconstructs the same pose without accumulated drift", () => {
  const forward = sampleDevice("workbench", "keyboard", 0.45);
  for (const p of [0.6, 0.8, 1, 0.8, 0.6])
    sampleDevice("workbench", "keyboard", p);
  assert.deepEqual(sampleDevice("workbench", "keyboard", 0.45), forward);
});
test("every intermediate pose remains finite, visible and positively scaled", () => {
  for (const variant of ["hero", "workbench"])
    for (const kind of ["phone", "keyboard", "mouse", "chip"])
      for (let i = 0; i <= 1000; i++) {
        const pose = sampleDevice(variant, kind, i / 1000);
        assert.ok(Object.values(pose).every(Number.isFinite));
        assert.ok(pose.scale > 0 && pose.opacity >= 0 && pose.opacity <= 1);
      }
});
test("mobile tracks stay inside the horizontal safe area and shrink hardware", () => {
  for (const variant of ["hero", "workbench"])
    for (const kind of ["phone", "keyboard", "mouse", "chip"])
      for (let i = 0; i <= 100; i++) {
        const desktop = sampleDevice(variant, kind, i / 100),
          mobile = sampleDevice(variant, kind, i / 100, { compact: true });
        assert.ok(mobile.x >= 0.12 && mobile.x <= 0.84);
        assert.ok(mobile.scale < desktop.scale);
      }
});
test("reduced motion freezes the scene and removes device rotations", () => {
  for (const variant of ["hero", "workbench"])
    for (const kind of ["phone", "keyboard", "mouse", "chip"]) {
      const initial = sampleDevice(variant, kind, 0, { reduced: true });
      assert.deepEqual(
        sampleDevice(variant, kind, 0.75, { reduced: true }),
        initial,
      );
      assert.equal(initial.rx, 0);
      assert.equal(initial.ry, 0);
      assert.equal(initial.rz, 0);
    }
});
