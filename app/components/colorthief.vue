<script>
//const { $culori } = useNuxtApp(); const color = $culori.rgb("blue"); const hexColor = $culori.formatHex(color);
import {converter,differenceEuclidean,formatHex,nearest} from "https://cdn.skypack.dev/culori@2.0.0";
import ColorThief from "https://cdn.skypack.dev/colorthief";
export default{
  mounted(){this.colorthief()},
  setup(){
    const colorThief=new ColorThief(); const toLCH=converter("lch");
    const colorthief=async()=>{
          async adjustHue(val){
      if(val<0)val+=Math.ceil(-val/360)*360;
      return val%360
    },
    async createScientificPalettes(baseColor){
      const targetHueSteps={
        analogous:[0,30,60],
        triadic:[0,120,240],
        tetradic:[0,90,180,270],
        complementary:[0,180],
        splitComplementary:[0,150,210]
      };
      const palettes={};
      for(const type of Object.keys(targetHueSteps)){
        palettes[type]=targetHueSteps[type].map((step)=>({
        mode:"lch",
        l:baseColor.l,
        c:baseColor.c,
        h:adjustHue(baseColor.h+step)
      }));
      }
      return palettes;
    },
    async isColorEqual(c1,c2){
      return c1.h===c2.h && c1.l===c2.l && c1.c===c2.c;
    },


    async discoverPalettes(colors){
      const palettes={};
      for(const color of colors){
        const targetPalettes=createScientificPalettes(color);
        for(const paletteType of Object.keys(targetPalettes)){
          const palette=[]; let variance=0;
          for(const targetColor of targetPalettes[paletteType]){
            const availableColors=colors.filter(
              (color1)=>!palette.some((color2)=>isColorEqual(color1,color2))
            );
            const match=nearest(
              availableColors,
              differenceEuclidean("lch")
            )(targetColor)[0];
            variance+=differenceEuclidean("lch")(targetColor,match);
            palette.push(match);
          }
          if(!palettes[paletteType]||variance<palettes[paletteType].variance){palettes[paletteType]={colors:palette,variance}}
        }
      }
      return palettes;
    },
    async loadImg(url){
      const img=document.createElement("img"); img.src=url;
      img.crossOrigin=`anonymous`; await img.decode(); return img;
    },


    async generatePalette(){
      let colors=[]; let chosenImg;
      const queries=[
        "red",
        "green",
        "blue",
        "yellow",
        "orange",
        "magenta",
        "pink",
        "purple",
        "turqoise",
        "grey",
        "black",
        "white",
        "indigo",
        "violet",
        "emerald",
        "flower",
        "vibrant",
        "gold",
        "silver",
        "jewels",
        "rainbow",
        "forest",
        "ocean",
        "coral",
        "galaxy",
        "tree",
        "leaf",
        "fish",
        "frog",
        "animal",
        "wildlife",
        "color",
        "paint",
        "paint",
        "abstract",
        "colorful",
        "nature",
        "volcano",
        "sun",
        "ruby",
        "saphire",
        "emerald",
        ""
      ];
      while(colors.length<4){
        const url=`https://images.unsplash.com/photo-1732279446743-324499ebbeba?w=800&amp;auto=format&amp;fit=crop&amp;q=60&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D`;//https://designcandy.com/im/lo.png
    chosenImg=await loadImg(url);
    colors=await colorThief.getPalette(chosenImg).map((c)=>toLCH({
      r:c[0]/255,
      g:c[1]/255,
      b:c[2]/255,
      mode:"rgb"
    })
   );
  }
  const palettes=discoverPalettes(colors);
  document.body.innerHTML=`<div class="content"></div>`;
  document.body.appendChild(chosenImg);
  for(const type of Object.keys(palettes)){
    const paletteWrapper=document.createElement("div"); paletteWrapper.classList.add("palette-colors");
document.querySelector(".content").appendChild(paletteWrapper); paletteWrapper.innerHTML=`<p>${type}</p>`;
paletteWrapper.innerHTML+=palettes[type].colors.reduce((html,color)=>{html+=`<div style="background:${formatHex(color)};"></div>`;return html},"");
  }
  setTimeout(()=>{generatePalette()},1000);
},

  
    }
    //return{q,im,gen};
  },
}
</script>
