<script setup>
import { rgb, formatHex } from "culori";

const color = rgb("red"); // Convert color to RGB
const hexColor = formatHex(color); // Convert to hex format
</script>

<template>
  <div>
    <p>Generated Color: <span :style="{ color: hexColor }">{{ hexColor }}</span></p>
  </div>
</template>
