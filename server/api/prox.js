export default defineEventHandler(async(event)=>{
  const body=await readBody(event);
  const apiResponse=await fetch("/",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Access-Control-Allow-Origin":"*",
      "Cache-Control":"no-cache"
    },
    body:JSON.stringify({
      messages:[{content:body.message}],
    }),
  });
  const data=await apiResponse.json();
  alert("RES2: "+JSON.stringify(data));
  return{reply:data.choices[0].message.content};
});
