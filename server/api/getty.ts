export default defineEventHandler(async(event)=>{

    const apiKey="lep3mq3jxr4u99m7hy3gzzp3gl";
    const query=prompt.value; //document.querySelector("#prompt").value;
    async function fetchGI(query,apiKey,page=1,pageSize=1){
      alert("Q: "+query);
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
    }





  
  const query=getQuery(event); const imageUrl=query.url as string;
  if(!imageUrl){return new Response("Invalid URL",{status:400})}
  try{const response=await fetch(imageUrl,{headers:{"User-Agent":"Mozilla/5.0"}});
  if(!response.ok){return new Response("Error",{status:500})}
  const contentType=response.headers.get("Content-Type");
  if(!contentType||!contentType.startsWith("image/")){return new Response("Not Img URL",{status:400})}
  return new Response(await response.arrayBuffer(),{headers:{"Content-Type":contentType,"Access-Control-Allow-Origin":"*","Cache-Control":"no-cache"}})}
  catch(error){return new Response("Server Error",{status:500})}
});
