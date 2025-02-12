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
  methods:{
    async loadColor(){
      const f=document.getElementById("ii");
      const r=await fetch(f);
      const b=await r.blob();
      const im=new Image();
      im.crossOrigin="anonymous";

document.getElementById("f").onload=function(){
  const ca=document.getElementById("ca");
  const cx=ca.getContext("2d");
  const im=document.getElementById("ii");
  ca.width=im.width; ca.height=im.height;
  cx.drawImage(im,0,0);


  im.src=ca.toDataURL(b);
  alert("IM: "+im.src);


  
  const o=cx.getImageData(0,0,ca.width,ca.height);
  const d=o.data; const cc={}; let mc=0; let dc="";
  for(let i=0;i<o.data.length;i+=4){

  }
  document.body.style.backgroundColor=`rgb(${dc})`;
  cx.putImageData(o,0,0);
}











      


    }
  }
}
</script>
