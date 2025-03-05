<template><div v-if="image"><img id="i" :src="image" /></div></template>
<script>
export default{
  mounted(){setTimeout(()=>{this.generateImage()},1600)},
  setup(){const q=ref(''); const image=ref('');
    const generateImage=async()=>{image.value='';
      const response=await fetch('https://api.openai.com/v1/images/generations',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer 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`},body:JSON.stringify({q:document.querySelector('#q').value,n:1,size:'256x256'})});
      const data=await response.json();
      //alert("RES2: "+JSON.stringify(data));
      if(data&&data.data&&data.data.length>0){image.value=data.data[0].url; document.querySelector('#v').firstChild.style.backgroundImage="url("+image.value+")";}
    }
    return{q,image,generateImage};
  },
}
</script>
