<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <div class="g"><input id="prompt" v-model="prompt"><div id="response" v-if="response">{{response}}</div><!--ImageGenerator /--></div>
      <template #title><MDC :value="page.hero.title" /></template><MDC :value="page.hero.code" class="prose prose-primary dark:prose-invert mx-auto" />
    </ULandingHero><ULandingSection :title="page.features.title" :links="page.features.links"><UPageGrid><ULandingCard v-for="(item,index) of page.features.items" :key="index" v-bind="item" /></UPageGrid></ULandingSection>
    <UPageSection
      id="features" v-bind="page.features"
      :ui="{title:'text-left @container relative flex',description:'text-left'}" class="relative overflow-hidden">
      <div class="absolute rounded-full -left-10 top-10 size-[300px] z-10 bg-(--ui-primary) opacity-30 blur-[200px]" />
      <div class="absolute rounded-full -right-10 -bottom-10 size-[300px] z-10 bg-(--ui-primary) opacity-30 blur-[200px]" />
      <template #title><MDC :value="page.features.title" /></template>
    </UPageSection>
  </div>
</template>

<script lang="ts">
export default{
  data(){return{prompt:"",response:null}},
  mounted(){
/*var f=document.querySelector("#ee");
    async function bs64(t){//alert("T: "+t);
      if(!t){return} var cv=document.getElementById("cv");
      cv.width=t.width; cv.height=t.height; var cx=cv.getContext("2d");
      cx.fillStyle="red"; cx.fillRect(0,0,cv.width,cv.height);
      return cv.toDataURL();
    }
    async function bi64(f){alert("Fs2: "+f.src);
      const ym=new Image(); ym.src=f;
      ym.onload=function(){//alert("IM3: "+this.src);
        const cv=document.querySelector("#cv");
        cv.width=this.width; cv.height=this.height;
        const cvx=cv.getContext("2d"); cvx.drawImage(this,0,0);
        const o=cvx.getImageData(0,0,cv.width,cv.height);
        const d=o.data; const cc={}; let mc=0; let dc="";
        for(let i=0;i<d.length;i+=4){var r=d[i];var g=d[i+1];var b=d[i+2];var rgb=`${r},${g},${b}`;if(cc[rgb]){cc[rgb]++}else{cc[rgb]=1}if(cc[rgb]>mc){mc=cc[rgb];dc=rgb}}
        document.body.style.backgroundColor=`rgb(${dc})`;
      }
    }
    async function bb64(ff,callback){//alert("F: "+f);
      const rr=new FileReader();
      const j=JSON.stringify(f); f=new Blob([j],{type:"application/image"});
      var ff=document.querySelector("#iz");
      rr.readAsDataURL(ff);
      rr.onload=()=>callback(bi64(f.src)); //alert("RR: "+rr.result);
      rr.onerror=(error)=>console.error(error)
    }
    //const r=new FileReader(); r.onload=function(){
      const im=new Image(); const img=document.getElementById("ee");
      im.onload=function(){//alert("IM: "+this.src);
        const cv=document.querySelector("#cv");
        cv.width=this.width; cv.height=this.height;
        const cvx=cv.getContext("2d"); cvx.drawImage(this,0,0);
        const o=cvx.getImageData(0,0,cv.width,cv.height);
        const d=o.data; const cc={}; let mc=0; let dc="";
        for(let i=0;i<d.length;i+=4){var r=d[i];var g=d[i+1];var b=d[i+2];var rgb=`${r},${g},${b}`;if(cc[rgb]){cc[rgb]++}else{cc[rgb]=1}if(cc[rgb]>mc){mc=cc[rgb];dc=rgb}}
        document.body.style.backgroundColor=`rgb(${dc})`;
      }
    //} const j=JSON.stringify(f); f=new Blob([j],{type:"application/image"}); r.readAsDataURL(f);
    */
    //setTimeout(()=>{this.snd()},2200);
  },
  methods:{
    async snd(){
      const response=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:document.querySelector('#prompt').value})});
      const data=await response.json(); this.response=data.reply; document.querySelector('#t').innerText=this.response;
    },
  },
}
</script>
