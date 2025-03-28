<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <div id="pv"><input id="pho" v-model="pho"></div><div id="z"><ColorThief /></div>
      <div class="g"><input id="prompt" v-model="prompt"><div id="response" v-if="response">{{response}}</div><!--ImageGenerator /--></div>
      <template #title><MDC :value="page.hero.title" /></template><MDC :value="page.hero.code" class="prose prose-primary dark:prose-invert mx-auto" />
    </ULandingHero>
    <ULandingSection :title="page.features.title" :links="page.features.links"><UPageGrid><ULandingCard v-for="(item,index) of page.features.items" :key="index" v-bind="item" /></UPageGrid></ULandingSection>
    <ULandingSection :title="page.sections.title" :links="page.sections.links"><UPageGrid><ULandingCard v-for="(item,index) of page.sections.items" :key="index" v-bind="item" /></UPageGrid></ULandingSection>
    <ULandingSection :title="page.mid.title" :links="page.mid.links"><UPageGrid><ULandingCard v-for="(item,index) of page.mid.items" :key="index" v-bind="item" /></UPageGrid></ULandingSection>
    <ULandingSection :title="page.bottom.title" :links="page.bottom.links"><UPageGrid><ULandingCard v-for="(item,index) of page.bottom.items" :key="index" v-bind="item" /></UPageGrid></ULandingSection>
    <ULandingSection :title="page.lower.title" :links="page.lower.links"><UPageGrid><ULandingCard v-for="(item,index) of page.lower.items" :key="index" v-bind="item" /></UPageGrid></ULandingSection>
  </div>
</template>

<script lang="ts">
export default{
  data(){return{prompt:"",response:null}},
  mounted(){
    async function fetchPh(query,perPage=1,page=1){
      const accessKey="OOBNDpH2xNShX6T9wWV_-9py3NtxfpGT2zMcashaO_o";
      const endpoint=`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}&client_id=${accessKey}`;
      try{
        const response=await fetch(endpoint);
        if(!response.ok){throw new Error(`Err: ${response.status}`)}
        const data=await response.json();
        //alert("RES: "+JSON.stringify(data));
        return data.results;
      }catch(error){console.error('Failed: ',error); return []}
    }
    fetchPh("candy",1).then(photos=>{photos.forEach(photo=>{
      pho.value=photo.urls.small;
      document.querySelector("#a").style.backgroundImage="url("+pho.value+")";
    })});
    setTimeout(()=>{this.snd()},2200);
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
