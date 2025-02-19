<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <NuxtImg id="nnu" ref="image" src="https://pinfluents.com/_BCK/4/im/dc2.png" width="60" height="60" @load="getCP" />
      <nuxt-img id="nnn" src="https://pinfluents.com/_BCK/4/im/dc2.png" width="60" height="60" @load="getCP" />
      <nuxt-img id="nim" src="https://pinfluents.com/_BCK/4/im/lo.png" width="60" height="60" @load="getCP" :custom="true" v-slot="{src,isLoaded,imgAttrs}">
        <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />
        <img v-else src="https://pinfluents.com/_BCK/4/im/bp.png" alt="placeholder" />
      </nuxt-img>
      <canvas id="ca" ref="canvas" width="60" height="60"></canvas>

      <div class="g"><input id="q" v-model="q"><div id="response" v-if="response">{{response}}</div><ImageGenerator /></div>
      <template #title><MDC :value="page.hero.title" /></template><MDC :value="page.hero.code" class="prose prose-primary dark:prose-invert mx-auto" />
    </ULandingHero><ULandingSection :title="page.features.title" :links="page.features.links"><UPageGrid><ULandingCard v-for="(item,index) of page.features.items" :key="index" v-bind="item" /></UPageGrid></ULandingSection>
  </div>
</template>

<script lang="ts">
import gen from '~/components/gen.vue';
export default{
  components:{gen},
  data(){return{q:"",response:null}},
  mounted(){
    const ca=document.getElementById("ca"); const cx=ca.getContext("2d"); cx.fillStyle="red"; cx.fillRect(10,10,100,100);
    this.getCP();
    setTimeout(()=>{this.snd()},1600);
  },
  methods:{
    getCP(){
      alert("Test14z");
      const ct=new ColorThief(); alert("CT2z: "+ct);
      const si=$("#iz"); const pa=ct.getPalette(si,4);
      if(!pa){return} const dc=ct.getColor(si); const cp=ct.getPalette(si);
      $("#iz").parent().next("div").css({background: "rgb("+dc+")"});
      for(i=0;i<cp.length;i++){cc.eq(i).css({background: "rgb("+cp[i]+")"})}
    },
    async snd(){
      const response=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:document.querySelector('#q').value})});
      const data=await response.json(); this.response=data.reply;
      //alert("R1: "+this.response);
      document.querySelector('#t').innerText=this.response;
    },
  },
}
</script>
