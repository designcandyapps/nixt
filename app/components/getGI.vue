<script setup>
import {ref,onMounted} from "vue";
const imageUrl=ref("");
const proxyUrl=ref("");
const backgroundImage=ref("");
const isLoading=ref(false);
const apiKey="lep3mq3jxr4u99m7hy3gzzp3gl";
const query="blue stone";

const fetchGI=async(query,apiKey,page=1,pageSize=1)=>{
//async function fetchGI(query,apiKey,page=1,pageSize=1){
  isLoading.value=true;
  proxyUrl.value=`https://api.gettyimages.com/v3/search/images?phrase=${encodeURIComponent(query)}&page=${page}&page_size=${pageSize}`;
  //`/api/proxy?url=${encodeURIComponent(imageUrl.value)}`;
  alert(proxyUrl.value);

  const img=new Image();
  img.crossOrigin="Anonymous";
  img.src=proxyUrl.value;
  img.onload=()=>{
    /*const colorThief=new ColorThief();
    let colors=colorThief.getPalette(img).map((c)=>toLCH({r:c[0]/255,g:c[1]/255,b:c[2]/255,mode:"rgb"}));
    const palettesz=discoverPalettes(colors);
    document.getElementById("z").innerHTML=`<span class="content"></span>`;
    var i=0; for(const type of Object.keys(palettesz)){
      const paletteWrapper=document.createElement("span");
      paletteWrapper.classList.add("palette-colors");
      document.querySelector(".content").appendChild(paletteWrapper);
      paletteWrapper.innerHTML=palettesz[type].colors.reduce((html,color)=>{i++; html+=`<span id="dv${i}" style="background:${formatHex(color)}"></span>`;return html},"");
    }*/

    //alert("Z: "+document.getElementById("z").innerHTML);
    //document.body.style.backgroundColor=document.querySelector("#dv13").style.backgroundColor;
    //>>//const scientificColors=discoverPalettes(colors); palette.value=Object.keys(scientificColors).map((type)=>({type,colors:scientificColors[type].colors.map((color)=>({hex:formatHex(color)}))}));

    backgroundImage.value=`url('${imageUrl.value}')`; isLoading.value=false;
    alert(backgroundImage.value);
  };
  img.onerror=()=>{console.error("Failed to Load"); isLoading.value=false}
};

onMounted(()=>{
  //alert("2: "+document.getElementById("ee").src);
  window.onload=function(){
    //setTimeout(function(){
      //alert("1: "+document.getElementById("ee").src);
      //imageUrl.value=document.getElementById("ee").src;
      //alert("IM: "+imageUrl.value);

      fetchGI(query,apiKey).then(images=>{
      //fetchGI(query,apiKey).then(images=>{images.forEach(image=>{
        alert("Im: "+images);
        //pho.value=query;
        //document.querySelector("#a").style.backgroundImage="url("+pho.value+")";
      //})
      });
    //},1800);
  }
});
</script>
