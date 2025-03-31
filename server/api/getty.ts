export default defineEventHandler(async(event)=>{
  const query=getQuery(event);
  alert(query);

  const imageUrl=query.phrase as string; //`https://api.gettyimages.com/v3/search/images?phrase=sunset&page_size=1`;
  alert(imageUrl);

  if(!imageUrl){return new Response("Invalid URL",{status:400})}
  try{
    const response=await fetch(imageUrl,{
      headers:{
        "User-Agent":"Mozilla/5.0",
        "Api-Key":"lep3mq3jxr4u99m7hy3gzzp3gl"
      }
    });
    if(!response.ok){return new Response("Error",{status:500})}
    const contentType=response.headers.get("Content-Type");
    if(!contentType||!contentType.startsWith("image/")){return new Response("Not URL",{status:400})}
    return new Response(await response.arrayBuffer(),{headers:{"Content-Type":contentType,"Access-Control-Allow-Origin":"*","Cache-Control":"no-cache"}})}
  catch(error){return new Response("Server Error",{status:500})}
});
