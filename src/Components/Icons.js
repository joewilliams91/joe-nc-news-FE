import React from "react";

const icons = {
  up:
    "M412.6 227.1L278.6 89c-5.8-6-13.7-9-22.4-9h-.4c-8.7 0-16.6 3-22.4 9l-134 138.1c-12.5 12-12.5 31.3 0 43.2 12.5 11.9 32.7 11.9 45.2 0l79.4-83v214c0 16.9 14.3 30.6 32 30.6 18 0 32-13.7 32-30.6v-214l79.4 83c12.5 11.9 32.7 11.9 45.2 0s12.5-31.2 0-43.2z",
    down: "M99.4 284.9l134 138.1c5.8 6 13.7 9 22.4 9h.4c8.7 0 16.6-3 22.4-9l134-138.1c12.5-12 12.5-31.3 0-43.2-12.5-11.9-32.7-11.9-45.2 0l-79.4 83v-214c0-16.9-14.3-30.6-32-30.6-18 0-32 13.7-32 30.6v214l-79.4-83c-12.5-11.9-32.7-11.9-45.2 0s-12.5 31.2 0 43.2z",
    football: "M256 48C141.3 48 48 141.3 48 256s93.3 208 208 208 208-93.3 208-208S370.7 48 256 48zM127 238.2l39.2 17.9 17.1 66.9-15.6 29.3-57.2-.7C95.6 329 86.2 303.1 83 276.3l44-38.1zm217.3 114.1L328.7 323l17.1-67 39.1-17.8 44 38.1c-3.1 26.8-12.6 52.7-27.5 75.3l-57.1.7zm32.4-146.2l-43.6 19.6-61.1-51.6v-47.2l47.9-32.6c29.8 11.9 56.4 32.3 75.6 57.8l-18.8 54zM191.3 94.4l47.7 32.5v47.2l-61 51.5-43-19.6-18.7-53.6c19.3-26.1 45.1-46 75-58zM218.4 426c-.7-.2-1.3-.3-2-.5l-20.5-55.1 14.7-29.4h90.8l15 30.3-19.8 53.9c-1 .2-2 .5-3 .7-11.5 2.3-27 3.8-40.4 4.1-11.7-.1-23.4-1.5-34.8-4z",
    cooking: "M407.2 130.4C360.7 111.5 309.8 102 256 102c-53.9 0-108.3 10.3-151.2 28-8.1 3.3-15.3 9-10.1 19.5S255.9 480 255.9 480l161-329.9c3.2-6.9.9-15.4-9.7-19.7zm-221 73.6c-18.7 0-32-14.3-32-32s13.3-32 32-32 32 14.3 32 32-13.3 32-32 32zM256 347c-18.7 0-32-14.3-32-32s13.3-32 32-32 32 14.3 32 32-13.3 32-32 32zm69.8-123c-18.7 0-32-14.3-32-32s13.3-32 32-32 32 14.3 32 32-13.3 32-32 32z",
    coding: "M437.333 32H74.667C51.198 32 32 51.197 32 74.666v282.667C32 380.802 51.198 400 74.667 400h138.666l-42.666 48v32h170.666v-32l-42.666-48h138.666C460.802 400 480 380.802 480 357.333V74.666C480 51.197 460.802 32 437.333 32zm0 288H74.667V74.666h362.666V320z"
};

export default props => 
props.icon === "up" || props.icon === "down" ?
(
    <svg width="100%" height="100%" viewBox="0 0 1024 1024">
      <path d={icons[props.icon]}></path>
    </svg>
  ) : (  <svg width="120%" height="120%" viewBox="0 0 1024 1024">
  <path d={icons[props.icon]}></path>
</svg>)

