// Fade before the projected model touches content, including during pose easing.
export function clearanceOpacity(model, obstacles, margin = 48) {
 let clearance = Infinity;
 for (const r of obstacles) {
  const dx = Math.max(r.left-model.right, model.left-r.right, 0);
  const dy = Math.max(r.top-model.bottom, model.top-r.bottom, 0);
  clearance = Math.min(clearance, Math.hypot(dx, dy));
 }
 const t = Math.max(0, Math.min(1, clearance / margin));
 return t*t*(3-2*t);
}
