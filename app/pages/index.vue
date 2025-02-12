<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <img id="ii" src="https://pinfluents.com/_BCK/4/im/lo.png" crossOrigin="anonymous"><canvas id="ca" style="border:1px solid red;"></canvas>
      <template #title><MDC :value="page.hero.title" /></template><MDC :value="page.hero.code" class="prose prose-primary dark:prose-invert mx-auto" />
    </ULandingHero><ULandingSection :title="page.features.title" :links="page.features.links"><UPageGrid><ULandingCard v-for="(item,index) of page.features.items" :key="index" v-bind="item" /></UPageGrid></ULandingSection>
  </div>
</template>

<script lang="ts">
export default{
  mounted(){this.loadColor()},
  //setup(){
    //const imageElement = document.getElementById("ii");
  //},
  methods:{
    async loadColor(){
      const imageElement = document.getElementById("ii");
      const response = await fetch(imageElement);
      const blob = await response.blob();
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = URL.createObjectURL(blob);
      alert("IM: "+image.src);

      await new Promise((resolve) => {
        image.onload = resolve;
      });
      const yy=image;

      //image.onload=()=>{
      //}

      const canvas = document.getElementById("ca");
      canvas.width = yy.width; canvas.height = yy.height;
      const context = canvas.getContext("2d");
      context.drawImage(yy, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;

    }
  }
}
</script>
