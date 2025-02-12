<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <img id="ii" src="https://pinfluents.com/_BCK/4/im/lo.png"><canvas id="cav" style="border:1px solid red;"></canvas>
      <template #title><MDC :value="page.hero.title" /></template><MDC :value="page.hero.code" class="prose prose-primary dark:prose-invert mx-auto" />
    </ULandingHero><ULandingSection :title="page.features.title" :links="page.features.links"><UPageGrid><ULandingCard v-for="(item,index) of page.features.items" :key="index" v-bind="item" /></UPageGrid></ULandingSection>
  </div>
</template>

<script lang="ts">
export default{
  mounted(){this.loadImage();this.loadColor()},
  setup(){
    const imageElement = document.getElementById("ii");
    const canvas = document.createElement("ca");
    const context = canvas.getContext("2d");
    const loadImage()=async()=>{
      alert("Test2");
      const response = await fetch(document.getElementById("ii").src); // Fetch the image via the network
      const blob = await response.blob(); // Convert it to a blob
      const image = new Image();
      image.crossOrigin = "anonymous"; // Request CORS permissions
      image.src = URL.createObjectURL(blob); // Load the image from the blob
      await new Promise((resolve) => {
        image.onload = resolve; // Wait for image to load
      });
      return image;
    },
  },
  methods:{
    async function loadColor(){
      alert("Test1");
      const image = await loadImage();
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;

    };
    loadColor();
  }
}
</script>
