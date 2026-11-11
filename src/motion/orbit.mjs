export const ORBIT_FACES = 9;
export const ORBIT_STEP = 2000;
export const ORBIT_DURATION = ORBIT_FACES * ORBIT_STEP;
const cubic = (t, a, b) =>
  3 * (1 - t) * (1 - t) * t * a + 3 * (1 - t) * t * t * b + t * t * t;
export function orbitEase(progress) {
  const x = Math.max(0, Math.min(1, progress));
  let lo = 0,
    hi = 1;
  for (let i = 0; i < 14; i++) {
    const mid = (lo + hi) / 2;
    if (cubic(mid, 0.22, 0.36) < x) lo = mid;
    else hi = mid;
  }
  return cubic((lo + hi) / 2, 0.61, 1);
}
const HOLD = 1200;
export function orbitTransform(angle) {
  return "translateZ(calc(-1 * var(--ring-radius))) rotateY(" + angle + "deg)";
}
export function orbitFrames(faceCount) {
  const angleStep = 360 / faceCount;
  const frames = Array.from({ length: faceCount }, (_, index) => {
    const transform = orbitTransform(-index * angleStep);
    return [
      { offset: index / faceCount, transform },
      {
        offset: (index + HOLD / ORBIT_STEP) / faceCount,
        transform,
        easing: "cubic-bezier(.22,.61,.36,1)",
      },
    ];
  }).flat();
  return [...frames, { offset: 1, transform: orbitTransform(-360) }];
}
export function orbitFace(time, faceCount = ORBIT_FACES) {
  const duration = faceCount * ORBIT_STEP;
  const clock = (((Number(time) || 0) % duration) + duration) % duration;
  const base = Math.floor(clock / ORBIT_STEP),
    local = clock % ORBIT_STEP;
  const position = base + (local <= HOLD ? 0 : orbitEase((local - HOLD) / (ORBIT_STEP - HOLD)));
  return Math.round(position) % faceCount;
}
export function shortestTurn(from, to) {
  return from + (((((to - from) % 360) + 540) % 360) - 180);
}
