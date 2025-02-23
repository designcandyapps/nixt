<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
</script>

<template>
  <div id="ff">
    <ULandingHero v-if="page.hero" v-bind="page.hero"><br><br><br><br><br>
      <canvas id="cv" ref="canvas" width="60" height="60" style="border:3px solid pink;"></canvas>
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
    //const cv=document.getElementById("cv");
    //const cvx=cv.getContext("2d");
    //cvx.fillStyle="red"; cvx.fillRect(10,10,100,100);

    //const im=document.getElementById("iz");
    //alert("IM: "+im);

      const im=new Image(); im.src="https://pinfluents.com/_BCK/4/im/dc2.png";
      im.onload=function(){
        //const t=this;
        alert(this);
        //alert("T: "+t); alert("TW: "+t.width);

        //const cv=document.createElement("canvas");
        const cv=document.querySelector("#cv");
        alert("CV: "+cv);
        
        cv.width=this.width; cv.height=this.height;
        alert("zCW: "+cv.width);

        const cvx=cv.getContext("2d");
        alert("CVX: "+cvx);

        cvx.fillStyle="rgb(0,0,255)";
        cvx.fillRect(0,0,this.width,this.height);
        cvx.drawImage(this,0,0,this.width,this.height);

        const o=cvx.getImageData(0,0,cv.width,cv.height);
        alert("O2: "+o);

        const d=o.data; const cc={}; let mc=0; let dc="";
        alert("D2: "+d);

        for(let i=0;i<d.length;i+=4){var r=d[i];var g=d[i+1];var b=d[i+2];var rgb=`${r},${g},${b}`;if(cc[rgb]){cc[rgb]++}else{cc[rgb]=1}if(cc[rgb]>mc){mc=cc[rgb];dc=rgb}}

        cx.fillStyle="rgb(0,0,255)";
        //cx.fillStyle=`rgb(${dc})`;
        document.body.style.backgroundColor=`rgb(${dc})`;
      }








    
    //this.ell();
    //this.getCP();
    //setTimeout(()=>{this.snd()},1600);
  },
  methods:{
    async ell(){
      const im=new Image(); im.src="https://pinfluents.com/_BCK/4/im/dc2.png";
      im.onload=function(){
        t=this;
        //alert(this); alert("T: "+t); alert("TW: "+t.width);

        //const cv=document.createElement("canvas");
        const cv=document.getElementById("cv");
        cv.width=t.width; cv.height=t.height;
        alert("CW: "+cv.width);

        const cvx=cv.getContext("2d"); alert("CVX: "+cvx);

        cvx.fillStyle="rgb(0,0,255)";
        cvx.fillRect(0,0,t.width,t.height);
        cvx.drawImage(this,0,0,t.width,t.height);

        const o=cvx.getImageData(0,0,t.width,t.height);
        alert("O2: "+o);

        const d=o.data; const cc={}; let mc=0; let dc="";
        alert("D2: "+d);

        for(let i=0;i<d.length;i+=4){var r=d[i];var g=d[i+1];var b=d[i+2];var rgb=`${r},${g},${b}`;if(cc[rgb]){cc[rgb]++}else{cc[rgb]=1}if(cc[rgb]>mc){mc=cc[rgb];dc=rgb}}

        cx.fillStyle="rgb(0,0,255)";
        //cx.fillStyle=`rgb(${dc})`;
        document.body.style.backgroundColor=`rgb(${dc})`;
      }
    },
    getCP(){
      //document.querySelector("#xx").setAttribute(":src",document.querySelector("#ee").src);
      const ct=new ColorThief(); //alert("CTe: "+ct);
      const si=document.querySelector('#iz');
      alert("SI: "+si);

      const pa=ct.getPalette(si,4);
      alert("PA: "+pa);
      
      if(!pa){return}
      
      const dc=ct.getColor(si);
      alert("DC: "+dc);

      const cp=ct.getPalette(si);
      alert("CP: "+cp);

      document.querySelector('#iz').parent().next("div").css({background:"rgb("+dc+")"});
      //for(i=0;i<cp.length;i++){cc.eq(i).css({background:"rgb("+cp[i]+")"})}
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
