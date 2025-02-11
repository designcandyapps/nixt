<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <img id="ii" src="https://pinfluents.com/im/lo.png"><canvas id="ca" style="border:1px solid pink;"></canvas>
      <div class="g"><input id="q" v-model="q"><div id="response" v-if="response">{{response}}</div><ImageGenerator /></div>
      <template #title><MDC :value="page.hero.title" /></template><MDC :value="page.hero.code" class="prose prose-primary dark:prose-invert mx-auto" />
    </ULandingHero><ULandingSection :title="page.features.title" :links="page.features.links"><UPageGrid><ULandingCard v-for="(item,index) of page.features.items" :key="index" v-bind="item" /></UPageGrid></ULandingSection>
  </div>
</template>

<script lang="ts">
export default{
  //data(){return{q:"",response:null}},
  mounted(){this.loadColor()},
  methods:{
  async itB(ii){
    var ca=document.getElementById("ca");
    ca.width=ii.width; ca.height=ii.height;
    var cx=ca.getContext("2d");
    cx.drawImage(ii,0,0);
    //return ca.toDataURL();
    const dataURL=ca.toDataURL();
    alert(dataURL);
  },
  async loadColor(){
    var f=document.getElementById("ii");
    const r=new FileReader();
    r.onload=function(e){
      const im=new Image();
      const img=document.getElementById("ii");
      const bs=itB(img); im.src=bs;
      alert("IMSRC2: "+im.src);

      im.onload=()=>{
       alert("IM2: "+im.src);

      }
    }
    var j=JSON.stringify(f); f=new Blob([j],{type:"application/image"}); r.readAsDataURL(f);
  }
  }
}
</script>
