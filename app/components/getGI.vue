<script setup>
import {ref,onMounted} from "vue";
const iurl=ref("");
const proxyUrl=ref("");
const backgroundImage=ref("");
const isLoading=ref(false);

const getGI=async()=>{
  isLoading.value=true;
  proxyUrl.value=`/api/proxy?url=${encodeURIComponent(iurl.value)}`;


  //alert(proxyUrl.value);
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

    backgroundImage.value=`url('${iurl.value}')`; isLoading.value=false
  };
  img.onerror=()=>{console.error("Failed to Load"); isLoading.value=false}
};

onMounted(()=>{
  //alert("2: "+document.getElementById("ee").src);
  window.onload=function(){
    setTimeout(function(){
      //alert("1: "+document.getElementById("ee").src);
      iurl.value=document.getElementById("ee").src;
      //alert("IM: "+iurl.value);
      getGI();
    },1800);
  }
});
</script>
