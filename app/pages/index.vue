<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <div class="g"><input id="q" v-model="q"><div id="v" v-if="v">{{v}}</div><ImageGenerator /></div>
      <template #title><MDC :value="page.hero.title" /></template><MDC :value="page.hero.code" class="prose prose-primary dark:prose-invert mx-auto" />
    </ULandingHero><ULandingSection :title="page.features.title" :links="page.features.links"><UPageGrid><ULandingCard v-for="(item,index) of page.features.items" :key="index" v-bind="item" /></UPageGrid></ULandingSection>
  </div>
</template>

<script lang="ts">
import ig from '~/components/ig.vue';
export default{
  components:{ig},
  data(){return{q:"",v:null}},
  mounted(){setTimeout(()=>{this.snd()},1400)},
  methods:{
    async snd(){
      const v=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},b:JSON.stringify({m:document.querySelector('#q').value})});
      const d=await v.json(); this.v=d.re;
      //alert("R1: "+this.v);
      document.querySelector('#t').innerText=this.v;
    },
  },
}
</script>
