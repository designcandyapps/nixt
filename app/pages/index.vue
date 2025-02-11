<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <img id="ii" src="https://pinfluents.com/im/lo.png">
      <div class="g"><input id="prompt" v-model="prompt"><div id="hh" v-if="response">{{response}}</div><ImageGenerator /></div>
      <template #title><MDC :value="page.hero.title" /></template><MDC :value="page.hero.code" class="prose prose-primary dark:prose-invert mx-auto" />
    </ULandingHero><ULandingSection :title="page.features.title" :links="page.features.links"><UPageGrid><ULandingCard v-for="(item,index) of page.features.items" :key="index" v-bind="item" /></UPageGrid></ULandingSection>
  </div>
</template>

<script lang="ts">
function imageToBase64(ii){
  const ca=document.createElement("canvas");
  ca.width=ii.width; ca.height=ii.height;
  const cx=ca.getContext("2d"); cx.drawImage(ii,0,0);
  return ca.toDataURL();
}
var f=document.querySelector("#ii");
const r=new FileReader();
r.onload=function(e){
  const im=new Image();
  const img=document.querySelector("ii");
  const bs=imageToBase64(img); im.src=bs;
  im.onload=function(){
    const ca=document.createElement("canvas");
    ca.width=im.width; ca.height=im.height;
    const cx=ca.getContext("2d");
    cx.drawImage(im,0,0);
    const o=cx.getImageData(0,0,ca.width,ca.height);
    const d=o.data; const cc={}; let mc=0; let dc="";
    for(let i=0;i<d.length;i+=4){
      const r=d[i]; const g=d[i+1]; const b=d[i+2];
      const rgb=`${r},${g},${b}`;
      if(cc[rgb]){cc[rgb]++}else{cc[rgb]=1}
      if(cc[rgb]>mc){mc=cc[rgb]; dc=rgb}
    }
    document.body.style.backgroundColor=`rgb(${dc})`;
  }
}
const j=JSON.stringify(f);
f=new Blob([j],{type:"application/image"});
r.readAsDataURL(f);
</script>
