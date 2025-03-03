<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <div class="g"><input id="prompt" v-model="prompt"><div id="hh" v-if="response">{{response}}</div><ImageGenerator /></div>
      <template #title><MDC :value="page.hero.title" /></template><MDC :value="page.hero.code" class="prose prose-primary dark:prose-invert mx-auto" />
    </ULandingHero><ULandingSection :title="page.features.title" :links="page.features.links"><UPageGrid><ULandingCard v-for="(item,index) of page.features.items" :key="index" v-bind="item" /></UPageGrid></ULandingSection>
  </div>
</template>

<script lang="ts">
import ImageGenerator from '~/components/ImageGenerator.vue';
export default{
  components:{ImageGenerator},
  data(){return{prompt:"",response:null}},
  mounted(){setTimeout(()=>{this.snd()},1400)},
  methods:{
    async snd(){
      const response=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:document.querySelector('#prompt').value})});
      const data=await response.json(); this.response=data.reply;
      //alert("RES1: "+this.response);
      document.querySelector('#t').innerText=this.response;
      //alert("T: "+document.querySelector('#t').innerText);
    },
  },
}
</script>
