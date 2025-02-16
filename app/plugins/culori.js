import { defineNuxtPlugin } from "#app";
import * as culori from "culori";
export default defineNuxtPlugin(() => {
  return {
    provide: {
      culori,
    },
  };
});
