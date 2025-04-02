<script setup lang="ts">
const {data:page}=await useAsyncData("index",()=>queryContent("/").findOne())
useSeoMeta({titleTemplate:"",title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <div id="pv"><input id="pho" v-model="pho"></div><div id="z"><ColorThief /></div>
      <div class="g"><input id="prompt" v-model="prompt"><div id="response" v-if="response">{{response}}</div></div>
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
    async function fetchGetty(query) {
      const apiKey="ep3mq3jxr4u99m7hy3gzzp3g";
      const apiUrl=`https://api.gettyimages.com/v3/search/images`;
      try{
        const response=await fetch(`${apiUrl}?phrase=${encodeURIComponent(query)}&page_size=1`,{method:"GET",headers:{"Api-Key":apiKey}});
        if(!response.ok){throw new Error(`Error:${response.statusText}`)}
        const data=await response.json();
        if(data.images&&data.images.length>0){const imagr=data.images[0];console.log("Im:",image);return image}else{console.log("No ims");return null}
      }catch(error){console.error("Error:",error)}
    }
    //alert(document.querySelector("#prompt").value);
    fetchGetty("sunset").then(image=>{
      //alert("Im: "+image.display_sizes[0].uri);
      pho.value=image.display_sizes[0].uri;
      document.body.style.backgroundImage="url("+image.display_sizes[0].uri+")";
    });
  },
  methods:{

  },
}
</script>

