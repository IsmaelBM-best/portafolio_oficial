import { onMounted, onBeforeUnmount } from "vue";

export function usePortfolioMotion() {
  let stop = () => {};
  onMounted(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const root = document.documentElement;
    const sections = [...document.querySelectorAll("main > section[id]")];
    const parallax = [...document.querySelectorAll("[data-depth]")];
    let frame = 0,
      pointerTarget = null,
      pointerFrame = 0;
    let x = 0,
      y = 0,
      targetX = 0,
      targetY = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    const reveal = () =>
      document
        .querySelectorAll(".reveal:not(.revealed)")
        .forEach((el) => observer.observe(el));
    root.classList.add("motion-ready");
    reveal();
    const borders = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) =>
          entry.target.classList.toggle("in-view", entry.isIntersecting),
        ),
      { threshold: 0.05 },
    );
    document
      .querySelectorAll(".magic-card")
      .forEach((card) => borders.observe(card));
    const update = () => {
      frame = 0;
      const maximum = Math.max(1, root.scrollHeight - innerHeight);
      root.style.setProperty("--reading-progress", String(scrollY / maximum));
      let current = sections[0]?.id;
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= innerHeight * 0.36)
          current = section.id;
      });
      document.querySelectorAll("[data-section-link]").forEach((link) => {
        const active = link.dataset.sectionLink === current;
        link.classList.toggle("is-current", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      if (!reduced.matches)
        parallax.forEach((el) => {
          const rect = el.closest("section").getBoundingClientRect();
          if (rect.bottom > 0 && rect.top < innerHeight) {
            const progress = Math.max(
              -1,
              Math.min(1, -rect.top / Math.max(rect.height, innerHeight)),
            );
            el.style.setProperty(
              "--depth-offset",
              `${progress * Number(el.dataset.depth)}px`,
            );
          }
        });
      const chapters = [...document.querySelectorAll(".journey-chapter")];
      let activeChapter = 0;
      chapters.forEach((chapter, i) => {
        if (chapter.getBoundingClientRect().top < innerHeight * 0.58)
          activeChapter = i;
      });
      chapters.forEach((chapter, i) =>
        chapter.classList.toggle("is-active", i === activeChapter),
      );
      document
        .querySelector(".journey-index")
        ?.style.setProperty(
          "--chapter-progress",
          String((activeChapter + 1) / Math.max(chapters.length, 1)),
        );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    addEventListener("scroll", schedule, { passive: true, signal });
    addEventListener("resize", schedule, { passive: true, signal });
    reduced.addEventListener(
      "change",
      () => {
        parallax.forEach((el) => el.style.removeProperty("--depth-offset"));
        document.querySelectorAll("[data-tilt]").forEach((el) => {
          el.style.setProperty("--tilt-x", "0deg");
          el.style.setProperty("--tilt-y", "0deg");
        });
        schedule();
      },
      { signal },
    );
    const animatePointer = () => {
      pointerFrame = 0;
      if (!pointerTarget || reduced.matches || !fine.matches) return;
      x += (targetX - x) * 0.16;
      y += (targetY - y) * 0.16;
      pointerTarget.style.setProperty("--tilt-x", `${-y * 4.5}deg`);
      pointerTarget.style.setProperty("--tilt-y", `${x * 5.5}deg`);
      pointerTarget.style.setProperty("--pointer-x", `${50 + x * 50}%`);
      pointerTarget.style.setProperty("--pointer-y", `${50 + y * 50}%`);
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.005)
        pointerFrame = requestAnimationFrame(animatePointer);
    };
    document.addEventListener(
      "pointermove",
      (event) => {
        if (!fine.matches || reduced.matches) return;
        const target = event.target.closest("[data-tilt]");
        if (!target) return;
        if (pointerTarget !== target) {
          pointerTarget = target;
          x = y = 0;
        }
        const rect = target.getBoundingClientRect();
        targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        targetY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
        if (!pointerFrame) pointerFrame = requestAnimationFrame(animatePointer);
      },
      { passive: true, signal },
    );
    document.addEventListener(
      "pointerout",
      (event) => {
        const target = event.target.closest("[data-tilt]");
        if (target && !target.contains(event.relatedTarget)) {
          target.style.setProperty("--tilt-x", "0deg");
          target.style.setProperty("--tilt-y", "0deg");
          if (pointerTarget === target) {
            pointerTarget = null;
            cancelAnimationFrame(pointerFrame);
            pointerFrame = 0;
          }
        }
      },
      { signal },
    );
    const mutation = new MutationObserver(() => {
      reveal();
      schedule();
    });
    mutation.observe(document.querySelector("main"), {
      childList: true,
      subtree: true,
    });
    const size = new ResizeObserver(schedule);
    size.observe(document.querySelector("main"));
    schedule();
    stop = () => {
      controller.abort();
      observer.disconnect();
      borders.disconnect();
      mutation.disconnect();
      size.disconnect();
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pointerFrame);
      root.classList.remove("motion-ready");
    };
  });
  onBeforeUnmount(() => stop());
}
