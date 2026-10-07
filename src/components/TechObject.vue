<script setup>
import { useId } from "vue";
defineProps({ kind: String });
const id = useId();
const rows = [
  "ESC 1 2 3 4 5 6 7 8 9 0",
  "TAB Q W E R T Y U I O P",
  "CAP A S D F G H J K L ;",
  "SHIFT Z X C V B N M , . /",
].map((row) => row.split(" "));
</script>
<template>
  <svg
    v-if="kind === 'phone'"
    class="tech-art"
    viewBox="0 0 190 360"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient
        :id="id + '-body'"
        x1="4"
        y1="0"
        x2="190"
        y2="360"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#64745d" />
        <stop offset=".45" stop-color="#19251d" />
        <stop offset="1" stop-color="#718060" />
      </linearGradient>
      <linearGradient
        :id="id + '-screen'"
        x1="15"
        y1="15"
        x2="160"
        y2="325"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#263b2c" />
        <stop offset="1" stop-color="#080f0b" />
      </linearGradient>
    </defs>
    <rect
      x="8"
      y="6"
      width="175"
      height="347"
      rx="27"
      fill="#090e0b"
      stroke="#d4f589"
      stroke-opacity=".6"
    />
    <rect
      x="1"
      y="1"
      width="175"
      height="347"
      rx="27"
      :fill="'url(#' + id + '-body)'"
      stroke="#c8d5bc"
    />
    <rect
      x="8"
      y="8"
      width="161"
      height="331"
      rx="22"
      :fill="'url(#' + id + '-screen)'"
      stroke="#0a100c"
      stroke-width="3"
    />
    <rect x="65" y="15" width="50" height="11" rx="6" fill="#080b09" />
    <circle cx="104" cy="20" r="3" fill="#687767" />
    <path
      d="M21 76h135M21 101h86M21 174h135M21 241h135"
      stroke="#d4f589"
      stroke-opacity=".18"
    />
    <text
      x="22"
      y="61"
      fill="#d4f589"
      font-family="monospace"
      font-size="17"
      font-weight="bold"
    >
      ib.
    </text>
    <text x="23" y="129" fill="#e8efdf" font-family="monospace" font-size="11">
      BUILD.
    </text>
    <text x="23" y="148" fill="#d4f589" font-family="monospace" font-size="11">
      CONNECT.
    </text>
    <text x="23" y="167" fill="#93a48a" font-family="monospace" font-size="11">
      LAUNCH.
    </text>
    <rect x="22" y="193" width="58" height="28" rx="6" fill="#d4f589" />
    <rect x="90" y="193" width="65" height="28" rx="6" stroke="#6e835a" />
    <path
      d="M25 264h87M25 278h118M25 292h73"
      stroke="#6d815f"
      stroke-width="3"
      stroke-linecap="round"
    />
    <rect x="65" y="325" width="53" height="3" rx="2" fill="#d7dfce" />
    <path
      d="M176 65v46M1 49v24M1 88v28"
      stroke="#8a9a7b"
      stroke-width="4"
      stroke-linecap="round"
    />
  </svg>
  <svg
    v-else-if="kind === 'keyboard'"
    class="tech-art"
    viewBox="0 0 480 190"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M19 20h436l20 150-16 13H19L4 170z"
      fill="#0b120d"
      stroke="#637652"
    />
    <rect
      x="7"
      y="5"
      width="461"
      height="162"
      rx="16"
      fill="#202c22"
      stroke="#b4ca9b"
    />
    <rect
      x="15"
      y="13"
      width="445"
      height="147"
      rx="12"
      fill="#0c1510"
      stroke="#516842"
    />
    <g v-for="(row, r) in rows" :key="r">
      <g
        v-for="(key, k) in row"
        :key="k"
        :transform="'translate(' + (24 + k * 39) + ' ' + (22 + r * 28) + ')'"
      >
        <rect width="34" height="25" rx="4" fill="#080e0a" />
        <rect
          y="-2"
          width="34"
          height="21"
          rx="4"
          :fill="r === 0 && k === 0 ? '#d4f589' : '#303d2f'"
          stroke="#839b6a"
          stroke-opacity=".6"
        />
        <text
          x="17"
          y="12"
          text-anchor="middle"
          :fill="r === 0 && k === 0 ? '#111a0d' : '#c3d6b0'"
          font-family="monospace"
          :font-size="key.length > 1 ? 5 : 8"
        >
          {{ key }}
        </text>
      </g>
    </g>
    <rect
      x="25"
      y="134"
      width="55"
      height="20"
      rx="4"
      fill="#263923"
      stroke="#60794c"
    />
    <rect
      x="88"
      y="134"
      width="238"
      height="20"
      rx="4"
      fill="#3d4d34"
      stroke="#b0c58f"
    />
    <rect
      x="335"
      y="134"
      width="44"
      height="20"
      rx="4"
      fill="#263923"
      stroke="#60794c"
    />
    <rect x="389" y="134" width="45" height="20" rx="4" fill="#d4f589" />
    <path
      d="M33 175h400"
      stroke="#d4f589"
      stroke-opacity=".6"
      stroke-width="2"
    />
    <circle cx="446" cy="175" r="2" fill="#d4f589" />
  </svg>
  <svg
    v-else-if="kind === 'mouse'"
    class="tech-art"
    viewBox="0 0 145 230"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient
        :id="id + '-mouse'"
        x1="20"
        y1="20"
        x2="134"
        y2="210"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#5a6b51" />
        <stop offset=".5" stop-color="#182a1d" />
        <stop offset="1" stop-color="#07110a" />
      </linearGradient>
    </defs>
    <path
      d="M72 224C15 221 6 185 10 121L19 55C23 21 43 5 74 5s52 18 56 52l7 71c2 62-14 94-65 96Z"
      fill="#0a110d"
      stroke="#829a6b"
    />
    <path
      d="M67 211C14 207 7 171 14 115l8-63C26 21 45 9 72 9s47 17 51 48l8 63c5 61-13 91-64 91Z"
      :fill="'url(#' + id + '-mouse)'"
      stroke="#c2d5a8"
    />
    <path d="M73 13v91M23 96q50 18 104 0" stroke="#071008" stroke-width="3" />
    <rect x="64" y="39" width="18" height="37" rx="8" fill="#d4f589" />
    <path d="M67 48h11M67 57h11M67 66h11" stroke="#566b40" />
    <path
      d="M29 121c-7 42 2 67 24 76"
      stroke="#d4f589"
      stroke-opacity=".45"
      stroke-width="2"
    />
    <path d="M55 146h26m-13-13v26" stroke="#d4f589" stroke-width="2" />
  </svg>
  <svg
    v-else
    class="tech-art"
    viewBox="0 0 210 210"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="30"
      y="30"
      width="150"
      height="150"
      rx="15"
      fill="#102518"
      stroke="#70865b"
    />
    <path
      v-for="i in 8"
      :key="i"
      :d="
        'M' +
        (44 + i * 14) +
        ' 14v16M' +
        (44 + i * 14) +
        ' 180v16M14 ' +
        (44 + i * 14) +
        'h16M180 ' +
        (44 + i * 14) +
        'h16'
      "
      stroke="#c1d6a7"
      stroke-width="5"
    />
    <rect
      x="58"
      y="58"
      width="94"
      height="94"
      rx="10"
      fill="#24351f"
      stroke="#d4f589"
      stroke-opacity=".8"
    />
    <rect x="71" y="71" width="68" height="68" rx="5" fill="#0e190f" />
    <text
      x="105"
      y="115"
      text-anchor="middle"
      fill="#d4f589"
      font-family="monospace"
      font-size="29"
    >
      ib.
    </text>
    <path
      d="M39 66h13M39 92h13M158 126h14M66 158v14M126 39v14"
      stroke="#88a56c"
    />
    <circle cx="40" cy="40" r="4" fill="#d4f589" />
  </svg>
</template>
