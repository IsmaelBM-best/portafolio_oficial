export const clamp = (value, min = 0, max = 1) =>
  Math.max(min, Math.min(max, value));
const smooth = (t) => t * t * (3 - 2 * t);
const frame = (p, x, y, rz, ry, rx, scale, z, opacity = 1) => ({
  p,
  x,
  y,
  rz,
  ry,
  rx,
  scale,
  z,
  opacity,
});
const tracks = {
  hero: {
    phone: [
      frame(0, 0.92, 0.17, 18, -28, 8, 0.85, 1, 0.85),
      frame(0.45, 0.96, 0.57, -12, 20, 3, 1, 5, 1),
      frame(1, 0.9, 0.85, -28, 38, -12, 0.78, 1, 0),
    ],
    keyboard: [
      frame(0, 0.76, 0.91, -7, -14, 48, 0.82, 1, 0.85),
      frame(0.55, 0.59, 0.89, 12, 6, 26, 1.06, 5, 1),
      frame(1, 0.38, 0.75, 24, 30, 5, 0.82, 1, 0),
    ],
    mouse: [
      frame(0, 0.63, 0.29, 24, 10, 14, 0.86, 1, 0.82),
      frame(0.45, 0.64, 0.52, -18, -20, 8, 1, 5, 0.95),
      frame(1, 0.51, 0.83, -36, 12, 0, 0.7, 1, 0),
    ],
    chip: [
      frame(0, 0.19, 0.91, -20, 20, 15, 0.75, 0, 0.28),
      frame(0.6, 0.3, 0.88, 28, -25, 0, 1, 0, 0.35),
      frame(1, 0.5, 0.75, 40, 0, 0, 0.5, 0, 0),
    ],
  },
  workbench: {
    phone: [
      frame(0, 0.96, 0.17, 19, -30, 8, 0.82, 1, 0.95),
      frame(0.38, 0.95, 0.49, -10, 14, 0, 1, 5, 1),
      frame(0.72, 0.87, 0.77, -25, 35, 10, 0.95, 5, 1),
      frame(1, 0.98, 0.26, 18, -28, 6, 0.78, 1, 0.8),
    ],
    keyboard: [
      frame(0, 0.53, 0.99, -8, -12, 45, 0.87, 1, 1),
      frame(0.32, 0.4, 0.95, 12, 15, 29, 1, 5, 1),
      frame(0.67, 0.59, 0.9, -10, -16, 24, 1.08, 5, 1),
      frame(1, 0.52, 1.01, 0, 0, 42, 0.9, 1, 1),
    ],
    mouse: [
      frame(0, 0.05, 0.64, 22, -12, 3, 0.82, 1, 0.9),
      frame(0.42, 0.07, 0.8, -19, 18, 6, 1, 5, 1),
      frame(0.78, 0.13, 0.91, 20, -22, 0, 0.9, 5, 1),
      frame(1, 0.09, 0.59, 30, 10, 0, 0.72, 1, 0.75),
    ],
    chip: [
      frame(0, 0.12, 0.14, -18, 12, 0, 0.62, 1, 0.65),
      frame(0.5, 0.1, 0.4, 24, -10, 15, 0.88, 1, 0.7),
      frame(1, 0.79, 0.12, 45, 25, 0, 0.66, 1, 0.65),
    ],
  },
};
export function sceneProgress(sectionTop, sectionHeight, viewportHeight) {
  return clamp(
    -sectionTop / Math.max(sectionHeight - viewportHeight * 0.48, 1),
  );
}
export function sampleDevice(
  variant,
  kind,
  progress,
  { compact = false, reduced = false } = {},
) {
  const keys = tracks[variant]?.[kind];
  if (!keys) throw new Error("Unknown scene device");
  const p = reduced ? 0 : clamp(progress);
  const upper = keys.findIndex((key) => key.p >= p);
  const end = upper < 0 ? keys.at(-1) : keys[upper];
  const start = keys[Math.max(0, upper - 1)];
  const t =
    end.p === start.p ? 0 : smooth(clamp((p - start.p) / (end.p - start.p)));
  const result = {};
  for (const property of ["x", "y", "rz", "ry", "rx", "scale", "z", "opacity"])
    result[property] = start[property] + (end[property] - start[property]) * t;
  if (compact) {
    result.scale *= variant === "hero" ? 0.66 : 0.75;
    result.x = clamp(result.x, 0.12, 0.84);
    if (variant === "hero" && kind === "keyboard") {
      result.z = 1;
      result.opacity *= 0.65;
    }
  }
  if (reduced) {
    result.rx = 0;
    result.ry = 0;
    result.rz = 0;
  }
  return result;
}
