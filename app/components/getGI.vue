<script setup>
import {ref,onMounted} from "vue";
const imageUrl=ref(""); const proxyUrl=ref(""); const backgroundImage=ref(""); const isLoading=ref(false);
const apiKey="lep3mq3jxr4u99m7hy3gzzp3gl";
const query="blue stone";

const fetchGI=async(query,apiKey,page=1,pageSize=1)=>{
//async function fetchGI(query,apiKey,page=1,pageSize=1){
  isLoading.value=true;
  proxyUrl.value=`https://api.gettyimages.com/v3/search/images?phrase=${encodeURIComponent(query)}&page=${page}&page_size=${pageSize}`;
  //`/api/proxy?url=${encodeURIComponent(imageUrl.value)}`;
  alert(proxyUrl.value);


        const url=`https://api.gettyimages.com/v3/search/images?phrase=${encodeURIComponent(query)}&page=${page}&page_size=${pageSize}`;
      try{
        const response=await fetch(url,{headers:{"Api-Key":apiKey}});
        alert("RES0: "+this.response);
        if(!response.ok){throw new Error(`Error: ${response.status}-${response.statusText}`)}
        const data=await response.json();
        alert("RES1: "+JSON.stringify(data));
        return data.images.map(image=>({
          id:image.id,title:image.title||'',
          thumbUrl:image.display_sizes[0]?.uri||'',
          previewUrl:image.display_sizes[1]?.uri||''
        }));
      }catch(error){console.error("Error2: ",error); return []}
  

  setTimeout(function(){
    document.querySelector("#pho").value=proxyUrl.value;
    document.body.style.backgroundImage="https://www.designcandy.com/im/dc.png";
  },8800);



    




  
  const img=new Image();
  img.crossOrigin="Anonymous";
  img.src=proxyUrl.value;
  img.onload=()=>{
    backgroundImage.value=`url('${imageUrl.value}')`; isLoading.value=false;
    alert(backgroundImage.value);
  };
  img.onerror=()=>{console.error("Failed to Load"); isLoading.value=false}
};

onMounted(()=>{
  alert("Test2");
  //window.onload=function(){
    //alert("1: "+document.getElementById("ee").src);
    //imageUrl.value=document.getElementById("ee").src; //alert("IM: "+imageUrl.value);

    fetchGI(query,apiKey).then(images=>{
    //fetchGI(query,apiKey).then(images=>{images.forEach(image=>{
      alert("Im: "+images);
      //pho.value=query;
      //document.querySelector("#a").style.backgroundImage="url("+pho.value+")";
    //})
    });
  //}
});
</script>
