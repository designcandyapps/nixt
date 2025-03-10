import * as express from "express";
import axios from "axios"; const app=express();
app.get("/",async(req,res)=>{
  const url=req.query.url as string;
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
app.listen(3000,()=>{alert("Running")});
