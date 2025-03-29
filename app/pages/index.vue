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
    <Slider />
  </div>
</template>

<script lang="ts">
export default{
  data(){return{prompt:"",response:null}},
  mounted(){
    const apiKey="lep3mq3jxr4u99m7hy3gzzp3gl";
    const q="green candy";
    async function fetchGI(query,apiKey,page=1,pageSize=1){
      alert("Q: "+query);
      const url=`https://api.gettyimages.com/v3/search/images?phrase=${encodeURIComponent(query)}&page=${page}&page_size=${pageSize}`;
      //try{
        const response=await fetch(url,{headers:{"Api-Key":apiKey}});
        //if(!response.ok){throw new Error(`Err: ${response.status}-${response.statusText}`)}
        const data=await response.json();
        alert("RES: "+JSON.stringify(data));
        return data.images.map(image=>({
          id:image.id,title:image.title||'',
          thumbUrl:image.display_sizes[0]?.uri||'',
          previewUrl:image.display_sizes[1]?.uri||''
        }));
      //}catch(error){console.error("Err: ",error); return []}
    }
    //setTimeout(()=>{this.snd()},2200);
    setTimeout(()=>{
      alert(prompt.value);
      fetchGI(prompt.value,apiKey).then(images=>{
        alert("Im: "+images);
        pho.value=images;
        document.querySelector("#a").style.backgroundImage="url("+pho.value+")";
      });
    },8800);
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
