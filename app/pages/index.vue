<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <img id="ii" src="https://pinfluents.com/_BCK/4/im/dc2.png"><canvas id="ca" ref="canvas" width="300" height="300"></canvas>
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
    //this.loadColor()
    //setTimeout(()=>{this.snd()},1600)
  },
  async loadColor(){
    var f=document.getElementById("ii");
    const r=new FileReader();


    r.onload=function(e){
      const im=new Image();
      const img = document.getElementById('ii');
      const base64String = imageToBase64(img);
      im.src=base64String;
      im.onload=function(){
        const ca=document.getElementById("ca");
        const cx=ca.getContext("2d");
        ca.width=im.width; ca.height=im.height;
        cx.drawImage(im,0,0);
        const o=cx.getImageData(0,0,ca.width,ca.height);
        const d=o.data; const cc={}; let mc=0; let dc="";
        for(let i=0;i<d.length;i+=4){
          const r=d[i]; const g=d[i+1]; const b=d[i+2];
          const rgb=`${r},${g},${b}`;
          if(cc[rgb]){cc[rgb]++}else{cc[rgb]=1}
          if(cc[rgb]>mc){mc=cc[rgb]; dc=rgb}
        }
        document.body.style.backgroundColor=`rgb(${dc})`;
      }
    },
    const jsonString = JSON.stringify(f);
    f = new Blob([jsonString], { type: "application/image" });
    console.log(typeof f);
    r.readAsDataURL(f);
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
