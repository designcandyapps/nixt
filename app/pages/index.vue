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
async createScientificPalettes(baseColor){
  const targetHueSteps={
    analogous:[0,30,60],
    triadic:[0,120,240],
    tetradic:[0,90,180,270],
    complementary:[0,180],
    splitComplementary:[0,150,210]
  };
  const palettes={};
  for(const type of Object.keys(targetHueSteps)){
palettes[type]=targetHueSteps[type].map((step)=>({
      mode:"lch",
      l:baseColor.l,
      c:baseColor.c,
      h:adjustHue(baseColor.h+step)
    }));
  }
  return palettes;
},
async isColorEqual(c1,c2){
  return c1.h===c2.h && c1.l===c2.l && c1.c===c2.c;
},


async discoverPalettes(colors){
  const palettes={};
  for(const color of colors){
    const targetPalettes=createScientificPalettes(color);
    for(const paletteType of Object.keys(targetPalettes)){
      const palette=[]; let variance=0;
      for(const targetColor of targetPalettes[paletteType]){
        const availableColors=colors.filter(
         (color1)=>!palette.some((color2)=>isColorEqual(color1,color2))
        );
        const match=nearest(
          availableColors,
          differenceEuclidean("lch")
        )(targetColor)[0];
        variance+=differenceEuclidean("lch")(targetColor,match);
        palette.push(match);
      }
      if(!palettes[paletteType]||variance<palettes[paletteType].variance){palettes[paletteType]={colors:palette,variance}}
    }
  }
  return palettes;
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
