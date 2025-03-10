<script setup lang="ts">
import * as express from "express";
import axios from "axios"; const app=express();
app.get("/",async(req,res)=>{
  //const url=req.query.url as string;
  const url="https://www.designcandy.com/im/dc.png";
  if(!url){return res.status(400).send("Invalid")}
  try{new URL(url)}catch{return res.status(400).send("Invalid")}
  try{
    const headResponse=await axios.head(url,{
      validateStatus:false,maxRedirects:0,
      httpsAgent:new(require("https").Agent)({rejectUnauthorized:false})
    });
    const contentType=headResponse.headers["content-type"];
    if(!/^image\//i.test(contentType)){return res.status(400).send("xURL")}
    const response=await axios.get(url,{
      responseType:"arraybuffer",
      httpsAgent:new(require("https").Agent)({rejectUnauthorized:false})
    });
    res.setHeader("Content-Type",contentType);
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Cache-Control","no-cache");
    res.send(response.data);
  }catch(error){return res.status(500).send("Err")}
});
//app.listen(3000,()=>{alert("Running")});
</script>

<template><div v-if="im"><img id="i" :src="im" /></div></template>
<script>
export default{
  mounted(){
    this.runProx();
  },
  setup(){
    const prox=ref('');
    const im=ref('');
    const runProx=async()=>{
      im.value='';
      const response=await fetch('https://api.openai.com/v1/images/generations',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer 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`},body:JSON.stringify({prompt:document.querySelector('#prompt').value,n:1,size:'256x256'})});

      const data=await response.json();
      //alert("RES2: "+JSON.stringify(data));
      if(data&&data.data&&data.data.length>0){im.value=data.data[0].url;
      //document.querySelector('#v').firstChild.style.backgroundImage="url("+im.value+")";}
    }
    return{prox,im,gen};
  }
}
</script>
