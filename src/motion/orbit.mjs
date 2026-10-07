export const ORBIT_DURATION = 10000;
export const ORBIT_STEP = 2000;
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
export function orbitFace(time) {
  const clock =
    (((Number(time) || 0) % ORBIT_DURATION) + ORBIT_DURATION) % ORBIT_DURATION;
  const base = Math.floor(clock / ORBIT_STEP),
    local = clock % ORBIT_STEP;
  const position = base + (local <= 1200 ? 0 : orbitEase((local - 1200) / 800));
  return Math.round(position) % 5;
}
export function shortestTurn(from, to) {
  return from + (((((to - from) % 360) + 540) % 360) - 180);
}
