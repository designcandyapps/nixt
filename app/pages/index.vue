<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <NuxtImg ref="image" src="https://pinfluents.com/_BCK/4/im/dc2.png" width="60" height="60" provider="sirv" @load="getCP" /><canvas ref="canvas" width="60" height="60"></canvas>
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
    const imE=this.$refs.image.$el.querySelector("img");
    imE.onload=()=>{
      const canvas=this.$refs.canvas;
      const cx=canvas.getContext("2d");
      cx.drawImage(imE,0,0,canvas.width,canvas.height);
    },
    setTimeout(()=>{this.snd()},1600)
  },
  methods:{
    async snd(){
      const response=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:document.querySelector('#q').value})});
      const data=await response.json(); this.response=data.reply;
      //alert("R1: "+this.response);
      document.querySelector('#t').innerText=this.response;
    },
  },
}
</script>
