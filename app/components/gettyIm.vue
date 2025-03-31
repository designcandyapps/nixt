<script setup>
import {ref,onMounted} from "vue"; const query=ref(""); const proxyUrl=ref(""); const backgroundImage=ref(""); const isLoading=ref(false);
const fetchGI=async(query)=>{
  /*const apiUrl=`https://api.gettyimages.com/v3/search/images`;
  try{
    const response=await fetch(`${apiUrl}?phrase=${encodeURIComponent(query)}&page_size=1`,{method:"GET",headers:{"Api-Key":"lep3mq3jxr4u99m7hy3gzzp3gl"}});
    if(!response.ok){throw new Error(`Error1: ${response.statusText}`)}
    const data=await response.json(); this.response=data.reply;
    alert("RES1: "+this.response);
    if(data.images&&data.images.length>0){const image=data.images[0];alert("Im: "+image);return image}else{console.log("No ims");return null}
  }catch(error){console.error("Error2: ",error)}*/

  isLoading.value=true;
  //proxyUrl.value=`https://api.gettyimages.com/v3/search/images?phrase=${encodeURIComponent(query)}&page_size=${pageSize}`;
  //proxyUrl.value=`/api/getty?phrase=${encodeURIComponent(query)}&page_size=${pageSize}`;
  proxyUrl.value=`/api/getty?phrase=${encodeURIComponent(query)}`; alert(proxyUrl.value);

  setTimeout(function(){
    document.querySelector("#pho").value=proxyUrl.value;
    document.body.style.backgroundImage="https://www.designcandy.com/im/dc.png";
  },8800);
  //const img=new Image(); img.crossOrigin="Anonymous"; img.src=proxyUrl.value;
  //img.onload=()=>{backgroundImage.value=`url('${query}')`; isLoading.value=false; alert(backgroundImage.value)}; img.onerror=()=>{console.error("Failed"); isLoading.value=false}
};
onMounted(()=>{
  fetchGI("sunset").then(image=>{
    alert("IM: "+image.uri); //.display_sizes[0]
  });
});
</script>
