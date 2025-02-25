<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <div class="g"><input id="q" v-model="q"><div id="response" v-if="response">{{response}}</div><ImageGenerator /><div id="dr"></div><canvas id="cv"></canvas><canvas id="cvB"></canvas></div>
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
    var f=document.querySelector("#ee");
    async function bs64(t){//alert("T: "+t.src);
      if(!t){return} var cv=document.getElementById("cv");
      cv.width=t.width; cv.height=t.height; var cx=cv.getContext("2d");
      cx.fillStyle="red"; cx.fillRect(0,0,cv.width,cv.height);
      var o=cx.getImageData(0,0,cv.width,cv.height);
      var d=o.data; var cc={}; let mc=0; let dc="";
      for(let i=0;i<d.length;i+=4){var r=d[i];var g=d[i+1];var b=d[i+2];var rgb=`${r},${g},${b}`;if(cc[rgb]){cc[rgb]++}else{cc[rgb]=1}if(cc[rgb]>mc){mc=cc[rgb];dc=rgb}}
      //alert("DU: "+cv.toDataURL());
      return cv.toDataURL();
    }
    async function bs64rgb(b64,callback){
      let em=new Image(); em.crossOrigin="Anonymous"; em.src=b64;
      em.onload=function(){
        let cv=document.createElement("canvas");
        let cvx=cv.getContext("2d");
        cv.width=em.width; cv.height=em.height;
        cvx.drawImage(em,0,0);
        alert("Tes2");

        let o=cvx.getImageData(0,0,em.width,em.height);
        let d=o.data; let ra=[]; for(let i=0;i<d.length;i+=4){let r=d[i]; let g=d[i+1]; let b=d[i+2]; ra.push({r,g,b})}
        callback(ra,em.width,em.height);
      };
    }
    const r=new FileReader(); r.onload=function(){
      const im=new Image(); const img=document.getElementById("ee");
      //im.src="https://pinfluents.com/_BCK/4/im/dc2.png";
      im.src=`data:image/png;base64,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`;
      //const bs=bs64(img); im.src=bs;
      const bs=bs64(img).then(bs=>{
        //im.src=bs;
        const bsi=bs64rgb(this).then(bsi=>{
          em=new Image(); em.crossOrigin="Anonymous"; em.src=b64;
      em.onload=function(){
        let cv=document.createElement("canvas");
        let cvx=cv.getContext("2d");
        cv.width=em.width; cv.height=em.height;
        cvx.drawImage(em,0,0);
        alert("Tes2");

        let o=cvx.getImageData(0,0,em.width,em.height);
        let d=o.data; let ra=[]; for(let i=0;i<d.length;i+=4){let r=d[i]; let g=d[i+1]; let b=d[i+2]; ra.push({r,g,b})}
        callback(ra,em.width,em.height);
      };
        });
        im.src=bsi;
      });
      im.onload=function(){//alert("IM: "+this.src);
        const cv=document.querySelector("#cv");
        cv.width=this.width; cv.height=this.height;
        const cvx=cv.getContext("2d"); cvx.drawImage(this,0,0);
        const o=cvx.getImageData(0,0,cv.width,cv.height);
        const d=o.data; const cc={}; let mc=0; let dc="";
        for(let i=0;i<d.length;i+=4){var r=d[i];var g=d[i+1];var b=d[i+2];var rgb=`${r},${g},${b}`;if(cc[rgb]){cc[rgb]++}else{cc[rgb]=1}if(cc[rgb]>mc){mc=cc[rgb];dc=rgb}}
        document.body.style.backgroundColor=`rgb(${dc})`;

        const dr=document.querySelector("#dr"); dr.innerHTML=this.src;
        //alert("DR: "+dr.innerHTML); alert("BC: "+dc); alert("BC2: "+`rgb(${dc})`);

        //const bs=bs64(img).then(bs=>{im.src=bs});
        //const bsi=bs64rgb(this.src); alert("BSI: "+bsi);
        //const bsImg=dr.innerHTML;
  
        //const bsi=bs64rgb(dr.innerHTML).then(bsi=>{
          //alert("BSI: "+this);
          //document.body.style.backgroundColor=`rgb(${bsi})`;
        //});
        //const bsImg=bs64rgb(dr.innerHTML).then(bsImg=>{

        //});
        //let bsImg=dr.innerHTML;
        //bs64rgb(bsImg,function(ra,width,height){
          
        //});

        //document.body.style.background="url("+dr.innerHTML+")"; //dr.innerHTML
        //document.body.style.background=`url('+document.querySelector("#dr").innerHTML+')`;
        //document.body.style.background=`rgb(${dc})`;
      }
    }
    const j=JSON.stringify(f); f=new Blob([j],{type:"application/image"}); r.readAsDataURL(f);
    //setTimeout(()=>{this.snd()},1600);
  },
  methods:{
    async bp64(f){
      const r=new FileReader();
      r.onload=function(){

      }
      const j=JSON.stringify(f); f=new Blob([f],{type:"application/image"}); r.readAsDataURL(f);
    },
    async bb64(f,callback){
      alert("F: "+f);
      const r=new FileReader(); r.readAsDataURL(f);
      r.onload=()=>callback(alert("R: "+r.result));
      r.onerror=(error)=>console.error(error)
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
