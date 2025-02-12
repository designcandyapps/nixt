<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <img id="ii" src="https://pinfluents.com/_BCK/4/im/lo.png"><canvas id="ca" style="border:1px solid red;"></canvas>
      <template #title><MDC :value="page.hero.title" /></template><MDC :value="page.hero.code" class="prose prose-primary dark:prose-invert mx-auto" />
    </ULandingHero><ULandingSection :title="page.features.title" :links="page.features.links"><UPageGrid><ULandingCard v-for="(item,index) of page.features.items" :key="index" v-bind="item" /></UPageGrid></ULandingSection>
  </div>
</template>

<script lang="ts">
export default{
  mounted(){
    function imageToBase64(ii){
      var ca=document.createElement("canvas");
      ca.width=ii.width; ca.height=ii.height;
      var cx=ca.getContext("2d"); cx.drawImage(ii,0,0);
      return ca.toDataURL();
    }
    this.loadColor();
  },
  methods:{
    async loadColor(){
      alert("Test");

      var f=document.getElementById("ii");
      alert("F: "+f);

      var r=new FileReader();
      r.onload=function(e){
        var im=new Image();
        var img=document.getElementById("ii");
        var bs=imageToBase64(img); im.src=bs;
        alert("IM: "+im.src);
      }
    }
  }
}
</script>
