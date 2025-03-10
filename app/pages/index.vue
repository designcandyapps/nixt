<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
//import axios from "axios"; import https from "https";
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <input id="prox" v-model="prox">
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
  data(){return{prompt:"",prox:"",response:null}},
  mounted(){
    //var f=document.querySelector("#ee");
    //setTimeout(()=>{this.snd()},2200);
    setTimeout(()=>{
      //this.setProx();
      const url="https://designcandy.com";
      this.fetchData(url);
    },2200);
  },
  methods:{
    async fetchData(url){
      try{
        const response=await fetch(url);
        if(!response.ok){
          alert(`xH: ${response.status}`);
          //throw new Error(`xH: ${response.status}`);
        }
        const data=await response.text(); //or res.json()
        alert(data);
      }catch(error){console.error("Err:", error)}
    },
    async zfetchData(url){
      try{
        const response=await axios.get(url,{
          maxRedirects:5,
          headers:{},
          httpsAgent:new https.Agent({rejectUnauthorized:false})
        });
        console.log("Headers:",response.headers);
        console.log("Response Body (ignored):",response.data.length > 0 ? "Has content" : "No content");
      }catch(error){console.error("Err:",error)}
    },
    /*async setProx(){
      const response=await fetch("/api/prox",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
          //"Access-Control-Allow-Origin":"*",
          //"Cache-Control":"no-cache"
        },
        body:JSON.stringify({message:document.querySelector('#prox').value})
      });
      const data=await response.json();
      this.response=data.reply;
      alert("RES1: "+this.response);
      document.querySelector('#t').innerText=this.response;
    },*/
    /*async snd(){
      const response=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:document.querySelector('#prompt').value})});
      const data=await response.json(); this.response=data.reply; document.querySelector('#t').innerText=this.response;
    },*/
  },
}
</script>
