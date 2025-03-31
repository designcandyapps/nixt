<template><div v-if="image"><img id="i" :src="image" /></div></template>
<script>
export default{
  mounted(){setTimeout(()=>{this.gettyGen()},1600)},
  setup(){const query=ref(""); const image=ref("");
    const gettyGen=async()=>{
      query="candied"; image.value="";
      const response=await fetch(`/api/getty?phrase=${encodeURIComponent(query)}`,{method:"GET",headers:{
        "Content-Type":"application/json",
        Authorization:`lep3mq3jxr4u99m7hy3gzzp3gl`,
        "Api-Key":`lep3mq3jxr4u99m7hy3gzzp3gl`
      },
      body:JSON.stringify({query:"radial",n:1,size:"256x256"})});
      const data=await response.json();
      alert("RES2: "+JSON.stringify(data));
      if(data&&data.data&&data.data.length>0){image.value=data.data[0].url; document.querySelector("#v").firstChild.style.backgroundImage="url("+image.value+")";}
    }
    return{query,image,gettyGen};
  },
}
</script>
