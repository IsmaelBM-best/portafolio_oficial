import { onMounted, onBeforeUnmount } from "vue";
import { sampleDevice, sceneProgress } from "../motion/techScene.mjs";
export function useTechScroll() {
  let dispose = () => {};
  onMounted(() => {
    const controller = new AbortController(),
      signal = controller.signal;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const compact = matchMedia("(max-width: 760px)");
    let raf = 0,
      last = 0,
      dirty = true;
    let scenes = [];
    const size = new ResizeObserver(() => schedule());
    function refresh() {
      const previous = scenes;
      size.disconnect();
      scenes = [...document.querySelectorAll("[data-tech-scene]")].map(
        (element) => {
          const record = previous.find(
            (scene) => scene.element === element,
          ) || { element, p: 0 };
          Object.assign(record, {
            section: element.closest("section"),
            variant: element.dataset.techScene,
            target: 0,
            width: 1,
            height: 1,
            visible: true,
            objects: [...element.querySelectorAll("[data-tech-object]")],
          });
          size.observe(element);
          size.observe(record.section);
          return record;
        },
      );
    }
    function tick(time) {
      raf = 0;
      const dt = Math.min(40, time - last || 16);
      last = time;
      if (dirty) {
        scenes.forEach((scene) => {
          const bounds = scene.section.getBoundingClientRect(),
            own = scene.element.getBoundingClientRect();
          scene.visible = bounds.bottom > 0 && bounds.top < innerHeight;
          scene.target = sceneProgress(bounds.top, bounds.height, innerHeight);
          scene.width = own.width;
          scene.height = own.height;
        });
        dirty = false;
      }
      let pending = false;
      scenes.forEach((scene) => {
        if (!scene.visible) return;
        scene.p = reduced.matches
          ? 0
          : scene.p + (scene.target - scene.p) * (1 - Math.exp(-dt / 125));
        if (Math.abs(scene.p - scene.target) < 0.0004) scene.p = scene.target;
        else if (!reduced.matches) pending = true;
        scene.element.style.setProperty("--scene-progress", String(scene.p));
        scene.element.parentElement.style.setProperty(
          "--scene-progress",
          String(scene.p),
        );
        scene.objects.forEach((object) => {
          const pose = sampleDevice(
            scene.variant,
            object.dataset.techObject,
            scene.p,
            { compact: compact.matches, reduced: reduced.matches },
          );
          object.style.transform =
            "translate3d(" +
            (pose.x * scene.width).toFixed(2) +
            "px," +
            (pose.y * scene.height).toFixed(2) +
            "px,0) translate(-50%,-50%) perspective(1000px) rotateZ(" +
            pose.rz.toFixed(2) +
            "deg) rotateY(" +
            pose.ry.toFixed(2) +
            "deg) rotateX(" +
            pose.rx.toFixed(2) +
            "deg) scale(" +
            pose.scale.toFixed(4) +
            ")";
          object.style.zIndex = String(Math.round(pose.z));
          object.style.opacity = pose.opacity.toFixed(3);
          object.dataset.plane = pose.z >= 3 ? "front" : "back";
        });
      });
      if (pending) raf = requestAnimationFrame(tick);
    }
    const schedule = () => {
      dirty = true;
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };
    addEventListener("scroll", schedule, { passive: true, signal });
    addEventListener("resize", schedule, { passive: true, signal });
    reduced.addEventListener("change", schedule, { signal });
    compact.addEventListener("change", schedule, { signal });
    const mutation = new MutationObserver(() => {
      if (
        scenes.some(
          (scene) =>
            !scene.element.isConnected ||
            scene.objects.some((object) => !object.isConnected),
        ) ||
        document.querySelectorAll("[data-tech-scene]").length !== scenes.length
      )
        refresh();
      schedule();
    });
    mutation.observe(document.querySelector("main"), {
      subtree: true,
      childList: true,
    });
    refresh();
    schedule();
    dispose = () => {
      controller.abort();
      size.disconnect();
      mutation.disconnect();
      cancelAnimationFrame(raf);
    };
  });
  onBeforeUnmount(() => dispose());
}
