<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <img id="ii" src="https://pinfluents.com/_BCK/4/im/lo.png"><canvas id="ca" style="border:1px solid red;"></canvas>
      <template #title><MDC :value="page.hero.title" /></template><MDC :value="page.hero.code" class="prose prose-primary dark:prose-invert mx-auto" />
    </ULandingHero><ULandingSection :title="page.features.title" :links="page.features.links"><UPageGrid><ULandingCard v-for="(item,index) of page.features.items" :key="index" v-bind="item" /></UPageGrid></ULandingSection>
  </div>
</template>

<script lang="ts">
export default{
  mounted(){
    this.loadColor();
  },
  methods:{
    async loadColor(){
      var f=document.getElementById("ii");
      var r=new FileReader();
      r.onload=function(e){
        var im=new Image();
        var img=document.getElementById("ii");
        //var bs=imageToBase64(img); im.src=bs;

          var ca=document.createElement("canvas");
          ca.width=document.getElementById("ii").width; ca.height=document.getElementById("ii").height;
          var cx=ca.getContext("2d"); cx.drawImage(document.getElementById("ii"),0,0);
          const dataURL=ca.toDataURL();
          alert("D: "+dataURL);

          im.src=dataURL;

        alert("IM: "+im.src);

        im.onload=()=>{
          alert("IM2: "+im.src);


          const o=cx.getImageData(0,0,ca.width,ca.height);
          const d=o.data; const cc={}; let mc=0; let dc="";
          for(var i=0;i<d.length;i+=4){
            const r=d[i]; const g=d[i+1]; const b=d[i+2];
            const rgb=`${r},${g},${b}`;
            if(cc[rgb]){cc[rgb]++}else{cc[rgb]=1}
            if(cc[rgb]>mc){mc=cc[rgb]; dc=rgb}
          }
          document.body.style.backgroundColor=`rgb(${dc})`;
        }
      }
      var j=JSON.stringify(f); f=new Blob([j],{type:"application/image"}); r.readAsDataURL(f);
    }
  }
}
</script>
