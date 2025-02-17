<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
import {rgb,formatHex} from "culori";
const color=rgb("red"); const hexColor=formatHex(color);
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <img id="ii" src="https://pinfluents.com/_BCK/4/im/dc2.png">
      <template><div><p>Generated Color: <span :style="{ color: hexColor }">{{ hexColor }}</span></p></div></template>
      <template #title><MDC :value="page.hero.title" /></template><MDC :value="page.hero.code" class="prose prose-primary dark:prose-invert mx-auto" />
    </ULandingHero><ULandingSection :title="page.features.title" :links="page.features.links"><UPageGrid><ULandingCard v-for="(item,index) of page.features.items" :key="index" v-bind="item" /></UPageGrid></ULandingSection>
  </div>
</template>

<script lang="ts">
//import colorthief from '~/components/colorthief.vue';
export default{
  //components:{colorthief},
  mounted(){
    this.generatePalette()
  },
  methods:{
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
    async loadImg(url){
      alert("U: "+url);
      //const img=document.createElement("img");
      const img=document.getElementById("ii");
      alert("IM: "+img);
      img.src=url;
      alert("IM2: "+img.src);
      img.crossOrigin=`anonymous`;
      await img.decode();
      return img;
    },


    async generatePalette(){
      let colors=[]; let chosenImg;
      const queries=[
        "red",
        "green",
        "blue",
        "yellow",
        "orange",
        "magenta",
        "pink",
        "purple",
        "turqoise",
        "grey",
        "black",
        "white",
        "indigo",
        "violet",
        "emerald",
        "flower",
        "vibrant",
        "gold",
        "silver",
        "jewels",
        "rainbow",
        "forest",
        "ocean",
        "coral",
        "galaxy",
        "tree",
        "leaf",
        "fish",
        "frog",
        "animal",
        "wildlife",
        "color",
        "paint",
        "paint",
        "abstract",
        "colorful",
        "nature",
        "volcano",
        "sun",
        "ruby",
        "saphire",
        "emerald",
        ""
      ];
      while(colors.length<4){
        const url=`https://images.unsplash.com/photo-1732279446743-324499ebbeba?w=800&amp;auto=format&amp;fit=crop&amp;q=60&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D`;//https://designcandy.com/im/lo.png
        chosenImg=await loadImg(url);
        alert("Z: "+chosenImg);
  
        colors=await colorThief.getPalette(chosenImg).map((c)=>toLCH({
          r:c[0]/255,
          g:c[1]/255,
          b:c[2]/255,
          mode:"rgb"
        })
      );
    }
    const palettes=discoverPalettes(colors);
    document.body.innerHTML=`<div class="content"></div>`;
    document.body.appendChild(chosenImg);
    for(const type of Object.keys(palettes)){
      const paletteWrapper=document.createElement("div"); paletteWrapper.classList.add("palette-colors");
      document.querySelector(".content").appendChild(paletteWrapper); paletteWrapper.innerHTML=`<p>${type}</p>`;
      paletteWrapper.innerHTML+=palettes[type].colors.reduce((html,color)=>{html+=`<div style="background:${formatHex(color)};"></div>`;return html},"");
    }
    setTimeout(()=>{
      alert("Test");
      generatePalette();
      alert("Test4");
    },1000);
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
