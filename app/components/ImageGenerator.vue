<template><div v-if="image"><img id="i" :src="image" /></div></template>
<script>
export default{
  mounted(){setTimeout(()=>{this.generateImage()},1600)},
  setup(){const prompt=ref(''); const image=ref('');
    const generateImage=async()=>{image.value='';
      const response=await fetch('https://api.openai.com/v1/images/generations',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer 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`},body:JSON.stringify({prompt:document.querySelector('#prompt').value,n:1,size:'256x256'})});
      const data=await response.json();
      //alert("RES2: "+JSON.stringify(data));
      if(data&&data.data&&data.data.length>0){image.value=data.data[0].url; document.querySelector('#v').firstChild.style.backgroundImage="url("+image.value+")";}
    }
    return{prompt,image,generateImage};
  },
}
</script>
