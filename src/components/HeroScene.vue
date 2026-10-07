<template>
  <div class="hero-scene" aria-hidden="true">
    <div class="scene-grid" data-depth="-55"></div>
    <svg class="scene-orbits" data-depth="85" viewBox="0 0 700 700" fill="none">
      <circle cx="350" cy="350" r="275" />
      <circle cx="350" cy="350" r="210" />
      <circle cx="350" cy="350" r="145" />
      <path d="M0 350h700M350 0v700" />
      <circle class="orbit-dot" cx="350" cy="75" r="6" />
      <circle class="orbit-dot second" cx="140" cy="350" r="4" />
    </svg>
    <span class="scene-word" data-depth="-120">BUILD.</span>
    <div class="scene-chip chip-a" data-depth="75">
      <span>01 / THINK</span><b>idea → interface</b>
    </div>
    <div class="scene-chip chip-b" data-depth="-70">
      <span>02 / CONNECT</span><b>people + technology</b>
    </div>
  </div>
</template>
