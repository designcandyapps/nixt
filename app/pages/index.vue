<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <img id="ii" src="https://pinfluents.com/_BCK/4/im/dc2.png" style="display:none;">
      <canvas id="cav" style="border:1px solid red;"></canvas>
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
  mounted(){setTimeout(()=>{this.snd()},1600)},
  methods:{
    async loadColor(){
  var f=document.getElementById("ii");
  var r=new FileReader();
  r.onload=function(e){
    f=document.getElementById("ii");
    var im=new Image(); im.src=f.src; //alert(im.src);
    im.onload=function(){
     const ca=document.createElement("canvas");
     ca.width=im.width; ca.height=im.height;
     var cx=ca.getContext("2d");cx.drawImage(im,0,0);
     var o=cx.getImageData(0,0,ca.width,ca.height);
     var d=o.data; var cc={}; let mc=0; let dc="";
     for(i=0;i<d.length;i+=4){
       var r=d[i]; var g=d[i+1]; var b=d[i+2];
       var rgb=`${r},${g},${b}`;
       if(cc[rgb]){cc[rgb]++}else{cc[rgb]=1}
       if(cc[rgb]>mc){mc=cc[rgb]; dc=rgb}
     }
     document.body.style.backgroundColor=`rgb(${dc})`;
    }
  }
  var j=JSON.stringify(f); f=new Blob([j],{type:"application/image"}); r.readAsDataURL(f);
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
