<script setup>
import {ref,onMounted} from "vue"; const query=ref(""); const proxyUrl=ref(""); const backgroundImage=ref(""); const isLoading=ref(false);
const fetchGI=async(query)=>{
  /*try{
    const response=await fetch(`https://api.gettyimages.com/v3/search/images?phrase=${encodeURIComponent(query)}&page_size=1`,{method:"GET",headers:{"Api-Key":"lep3mq3jxr4u99m7hy3gzzp3gl"}});
    throw new Error(`Err1:${response.statusText}`);
    //if(!response.ok){throw new Error(`Error1:${response.statusText}`)}
    const data=await response.json(); this.response=data.reply;
    alert("RES1: "+this.response);
    //alert("RES2: "+JSON.stringify(data));
    if(data.images&&data.images.length>0){const image=data.images[0];alert("Im: "+image);return image}else{console.log("No ims");return null}
  }catch(error){console.error("Error2:",error)}*/

  isLoading.value=true;
  proxyUrl.value=`https://api.gettyimages.com/v3/search/images?phrase=${encodeURIComponent(query)}`;
  //proxyUrl.value=`/api/getty?phrase=${encodeURIComponent(query)}`;
  const img=new Image(); img.crossOrigin="Anonymous"; img.src=proxyUrl.value;
  img.onload=()=>{alert("IU: "+imageUrl.value); backgroundImage.value=`url('${imageUrl.value}')`; isLoading.value=false};
  //img.onerror=()=>{console.error("Failed"); isLoading.value=false}
};
onMounted(()=>{
  fetchGI("candy");
  //fetchGI("candy").then(image=>{alert(image.display_sizes[0].uri)});
});
</script>
