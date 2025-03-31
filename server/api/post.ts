export default defineEventHandler(async(event)=>{
  const query=getQuery(event);
  const body=await readBody(event);
  const apiResponse=await fetch("https://api.gettyimages.com/v3/search/images?phrase=${encodeURIComponent(query)}",{
    method:"POST",
    headers:{
      "Content-Type": "application/json",
      "Api-Key":`lep3mq3jxr4u99m7hy3gzzp3gl`,
      Authorization: `Bearer lep3mq3jxr4u99m7hy3gzzp3gl`
    },
    //body:JSON.stringify({messages:[{content:body.message}]}),
  });
  const data=await apiResponse.json();
  this.response=data.reply;
  alert("RES1: "+this.response);
  return{reply:data.choices[0].message.content};
});
