import {converter,differenceEuclidean,formatHex,nearest} from "https://cdn.skypack.dev/culori@2.0.0";
import ColorThief from "https://cdn.skypack.dev/colorthief";
const colorThief=new ColorThief(); const toLCH=converter("lch");

import { defineNuxtPlugin } from "#app";
import * as culori from "culori";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      culori,
    },
  };
});
