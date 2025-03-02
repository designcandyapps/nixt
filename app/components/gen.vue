<template><div v-if="im"><img id="i" :src="im" /></div></template>

<script>
export default{
  mounted(){setTimeout(()=>{this.gen()},1600)},
  setup(){const q=ref(''); const im=ref('');
    const gen=async()=>{im.value='';
      const response=await fetch('https://api.openai.com/v1/images/generations',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer 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`},body:JSON.stringify({q:document.querySelector('#q').value,n:1,size:'256x256'})});
      const data=await response.json();
      alert("R2: "+JSON.stringify(data));
      if(data&&data.data&&data.data.length>0){im.value=data.data[0].url; document.querySelector('#y').firstChild.style.backgroundImage="url("+im.value+")";}
    }
    return{q,im,gen};
  },
}
</script>
