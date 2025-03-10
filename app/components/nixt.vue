<template><div v-if="im"><img id="i" :src="im" /></div></template>
<script>
export default{
  mounted(){setTimeout(()=>{this.sirv()},1600)},
  setup(){
    const prompt=ref('');
    const im=ref('');
    const sirv=async()=>{
      im.value='';
      const response=await fetch('https://api.sirv.com/v2/token',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
          
        },
        data:{
          "clientId":"5p8p9Su9yZ7NYidnUC3RwEE1fDw",
          "clientSecret":"22RXCSY+WvkmutxOjlyMdzqHSK/n+q7bHx8ay079Y9oCcwjxlq2DogBTqcEbdW2HaSC4rFNQBzKFDrWnicqXBg=="
        },
        body:JSON.stringify({prompt:document.querySelector('#prompt').value,n:1,size:'256x256'})
      });
      const data=await response.json();
      if(data&&data.data&&data.data.length>0){im.value=data.data[0].url; document.querySelector('#v').firstChild.style.backgroundImage="url("+im.value+")";}
    }
    return{prompt,im,sirv};
  },
}
</script>
