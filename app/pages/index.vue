<script setup lang="ts">
const {data:page}=await useAsyncData('index',()=>queryContent('/').findOne())
useSeoMeta({titleTemplate:'',title:page.value.title,ogTitle:page.value.title,description:page.value.description,ogDescription:page.value.description})
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <img id="ii" src="https://pinfluents.com/_BCK/4/im/bg.jpg"><canvas id="ca" ref="canvas" width="300" height="300"></canvas>
      <div id="ttt" style="width:50px; height:50px; border:2px dashed purple;">Ee</div><input id="fi" type="file"><button onclick="dr()">Clk</button>
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
    //this.imageToBase64(document.getElementById("ii"),document.getElementById("ca"));
    //this.loadColor();
    //setTimeout(()=>{this.snd()},1600);
  },
  methods:{
    async imageToBase64(ii,ca){
      //var ca=document.getElementById("ca");
      //-alert("C: "+ca);
      
      ca.width=ii.width; ca.height=ii.height;
      var cx=ca.getContext("2d"); cx.drawImage(ii,0,0);
      //-alert("S: "+document.getElementById("ca"));
      
      ///var dd=ca.toDataURL(); alert("DD: "+dd);
      return ca.toDataURL();
    },
    async loadColor(){
      var f=document.getElementById("ii");
      const r=new FileReader();
      r.onload=function(e){
        f=document.getElementById("ii");
        //-alert("F: "+f);
        
        const im=new Image();
        const img=document.getElementById('ii');
        const ca=document.createElement("canvas"); ca.id="ca";
        //-alert("CA: "+document.getElementById("ca"));
        ca.width=img.width; ca.height=img.height;
        var cx=ca.getContext("2d");
        cx.drawImage(img,0,0);

        ///var du=ca.toDataURL(); alert("DU: "+du);

        //+var base64String=imageToBase64(img,document.getElementById("ca"));
        //+im.src=base64String;

        im.src=f.src;
        //-alert("IM: "+im.src);

        im.onload=function(){
          //-alert("IM2: "+im.src);
    
          var ca=document.getElementById("ca");
          var cx=ca.getContext("2d");
          ca.width=im.width; ca.height=im.height;
          
          //-alert("CA1: "+ca);
          cx.drawImage(im,0,0);
          //-//alert("CA2: "+ca);
          
          var o=cx.getImageData(0,0,ca.width,ca.height);
          alert("O: "+o);
          
          var d=o.data; var cc={}; let mc=0; let dc="";
          alert("Te: "+d);
          
          for(let i=0;i<d.length;i+=4){
            var r=d[i]; var g=d[i+1]; var b=d[i+2];
            var rgb=`${r},${g},${b}`;
            if(cc[rgb]){cc[rgb]++}else{cc[rgb]=1}
            if(cc[rgb]>mc){mc=cc[rgb]; dc=rgb}
          }
          document.body.style.backgroundColor=`rgb(${dc})`;
        }
      }
      const j=JSON.stringify(f); f=new Blob([j],{type:"application/image"});
      //-alert("TYPE: "+typeof f);
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
