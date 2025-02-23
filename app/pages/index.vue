<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
</script>

<template>
  <div id="ff">
    <ULandingHero v-if="page.hero" v-bind="page.hero"><br><br><br><br><br>
      <canvas id="cv" ref="canvas" width="60" height="60" style="border:3px solid pink;"></canvas>
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
    const ca=document.getElementById("ca"); const cx=ca.getContext("2d"); cx.fillStyle="red"; cx.fillRect(10,10,100,100); //alert("CA0: "+ca); 
    //this.getCP();
    //setTimeout(()=>{this.snd()},1600);
  },
  methods:{
    getCP(){
      //document.querySelector("#xx").setAttribute(":src",document.querySelector("#ee").src);
      const ct=new ColorThief(); //alert("CTe: "+ct);
      const si=document.querySelector('#iz');
      alert("SI: "+si);

      const pa=ct.getPalette(si,4);
      alert("PA: "+pa);
      
      if(!pa){return}
      
      const dc=ct.getColor(si);
      alert("DC: "+dc);

      const cp=ct.getPalette(si);
      alert("CP: "+cp);

      document.querySelector('#iz').parent().next("div").css({background:"rgb("+dc+")"});
      //for(i=0;i<cp.length;i++){cc.eq(i).css({background:"rgb("+cp[i]+")"})}
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
