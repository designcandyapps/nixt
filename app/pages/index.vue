<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <gettyGen />
      <div id="pv"><input id="pho" v-model="pho"></div><div id="z"><ColorThief /></div>
      <div class="g"><input id="prompt" v-model="prompt"><div id="response" v-if="response">{{response}}</div><!--ImageGenerator /--></div>
      <template #title><MDC :value="page.hero.title" /></template><MDC :value="page.hero.code" class="prose prose-primary dark:prose-invert mx-auto" />
    </ULandingHero>
    <ULandingSection :title="page.features.title" :links="page.features.links"><UPageGrid><ULandingCard v-for="(item,index) of page.features.items" :key="index" v-bind="item" /></UPageGrid></ULandingSection>
    <ULandingSection :title="page.sections.title" :links="page.sections.links"><UPageGrid><ULandingCard v-for="(item,index) of page.sections.items" :key="index" v-bind="item" /></UPageGrid></ULandingSection>
    <ULandingSection :title="page.mid.title" :links="page.mid.links"><UPageGrid><ULandingCard v-for="(item,index) of page.mid.items" :key="index" v-bind="item" /></UPageGrid></ULandingSection>
    <ULandingSection :title="page.bottom.title" :links="page.bottom.links"><UPageGrid><ULandingCard v-for="(item,index) of page.bottom.items" :key="index" v-bind="item" /></UPageGrid></ULandingSection>
    <Slider />
  </div>
</template>

<script lang="ts">
export default{
  data(){return{prompt:"",response:null}},
  mounted(){
    /*async function fetchGI(query){
      const apiKey="lep3mq3jxr4u99m7hy3gzzp3gl";
      const apiUrl=`https://api.gettyimages.com/v3/search/images`;
      try{
        const response=await fetch(`${apiUrl}?phrase=${encodeURIComponent(query)}&page_size=1`,{method:"GET",headers:{"Api-Key":apiKey}});
        if(!response.ok){throw new Error(`Error: ${response.statusText}`)}
        const data=await response.json();
        if(data.images&&data.images.length>0){const image=data.images[0]; console.log("Im:",image); return image}else{console.log("No ims"); return null}
      }catch(error){console.error("Error:",error)}
    }
    fetchGI("sunset").then(image=>{
      if(image){
        alert("IM: "+image.display_sizes[0].uri);
        //pho.value=query; //document.querySelector("#a").style.backgroundImage="url("+pho.value+")";
      }
    });*/
    //setTimeout(()=>{this.snd()},2200);
  },
  methods:{
    async snd(){
      const response=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:document.querySelector('#prompt').value})});
      const data=await response.json(); this.response=data.reply;
      //alert("RES1: "+this.response);
      document.querySelector('#t').innerText=this.response;
    },
  },
}
</script>
