<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      
      <template #title><MDC :value="page.hero.title" /></template><MDC :value="page.hero.code" class="prose prose-primary dark:prose-invert mx-auto" />
    </ULandingHero><ULandingSection :title="page.features.title" :links="page.features.links"><UPageGrid><ULandingCard v-for="(item,index) of page.features.items" :key="index" v-bind="item" /></UPageGrid></ULandingSection>
  </div>
</template>

<script lang="ts">
export default{
  //data(){return{q:"",response:null}},
  mounted(){
    //this.generatePalette()
  },
  methods:{


//import {converter,differenceEuclidean,formatHex,nearest} from "https://cdn.skypack.dev/culori@2.0.0";
//import ColorThief from "https://cdn.skypack.dev/colorthief";
//const colorThief=new ColorThief(); const toLCH=converter("lch");

    async adjustHue(val){
      if(val<0)val+=Math.ceil(-val/360)*360;
      return val%360
    },


  },
}
</script>

<style scoped>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  display:grid;
  min-height:100vh;
  color:#1d1934;
  place-items:center;
  font-family:system-ui;
  padding:2rem;
}
.palette-colors {
  display:flex;
  gap:.5rem;
  align-items:center;
}
.palette-colors div {
  flex:1;
  height:3rem;
  border-radius:.375rem;
}
.palette-colors p { margin-right:1rem; text-transform:capitalize; }
img {
  position:absolute;
  top:0;
  left:0;
  width:100vw;
  height:100vh;
  object-fit:cover;
  z-index:-1;
  filter:brightness(.75);
}
.content {
  width:100%;
  display:grid;
  grid-gap:1rem;
  max-width:36rem;
  padding:2rem;
  background:#fff;
  background:hsla(0,100%,100%,.75);
  -webkit-backdrop-filter:blur(16px) saturate(180%);
  backdrop-filter:blur(16px) saturate(180%);
  box-shadow:0 4px 16px 0px hsla(0,0%,0%,.125);
  border-radius:1rem;
  border:1px solid hsla(0,0%,100%,.9);
}
</style>
