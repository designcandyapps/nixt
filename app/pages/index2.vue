<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({
  titleTemplate:'',
  title:page.value.title,
  ogTitle:page.value.title,
  description:page.value.description,
  ogDescription:page.value.description
})
const prompt=ref('');
const image=ref('');
const error=ref('');
const loading=ref(false);
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <template>
        <div class="image-generator">
          <input id="im" v-model="prompt" />
          <div v-if="loading" class="loading-message o">Gen...</div>
          <div v-if="image" class="image-result"><img :src="image" class="generated-image" /></div>
          <div v-if="error" class="error-message o"><nuxt-ui-alert :type="'error'" :dismissible="true">{{error}}</nuxt-ui-alert></div>
        </div>
      </template><ImageGenerator />
      <input id="ui" v-model="ui"><div id="hh" v-if="response">{{response}}</div>
      <template #title><MDC :value="page.hero.title" /></template>
      <MDC :value="page.hero.code" class="prose prose-primary dark:prose-invert mx-auto" />
    </ULandingHero>
    <ULandingSection :title="page.features.title" :links="page.features.links">
      <UPageGrid><ULandingCard v-for="(item,index) of page.features.items" :key="index" v-bind="item" /></UPageGrid>
    </ULandingSection>
  </div>
</template>

<script lang="ts">
import ImageGenerator from '~/components/ImageGenerator.vue';
export default{
  components: {ImageGenerator},
  data(){return{ui:"",response:null}},
  mounted(){setTimeout(()=>{
    this.generateImage();
    this.sendMessage()
  },1200)},
  methods:{
    async sendMessage(){
      try{
        const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:document.querySelector('#im').value})});
        const data=await res.json(); this.response=data.reply;
      }catch(error){console.error("Error:",error);this.response="Error"}
    },
    async generateImage(){
      alert("Test2: "+image);
      if(!prompt.value){error.value='Enter desc';return}
      loading.value=true; error.value=''; image.value='';
      try{
        const response=await fetch('https://api.openai.com/v1/images/generations',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer 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`
          },
          body:JSON.stringify({prompt:prompt.value,n:1,size:'1024x1024'})
        });
        const data=await response.json();
        if(data&&data.data&&data.data.length>0){
          image.value=data.data[0].url;
        }else{error.value='Failed'}
      }catch(err){error.value='Error'
      }finally{loading.value=false}
      return{prompt,image,error,loading,generateImage};
    },
  },
}
</script>

<style scoped>
.image-generator { margin:0 auto; max-width:600px; }
.generated-image { max-width:100%; height:auto; }
.oo { visibility:hidden; }
.image-generator,.loading-message,.generated-image,.error-message {
border:3px solid red; }
.image-generator { border-color:blue; }
.generated-image { border-color:green; }
.loading-message { border-color:pink; }
.error-message { border-color:yellow; }
</style>
