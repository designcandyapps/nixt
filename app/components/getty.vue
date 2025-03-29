<script lang="ts">
async function fetchGI(query,apiKey,page=1,pageSize=1){
  const url=`https://api.gettyimages.com/v3/search/images?phrase=${encodeURIComponent(query)}&page=${page}&page_size=${pageSize}`;
  try{
    const response=await fetch(url,{
      headers:{"Api-Key":apiKey}
    });
    if(!response.ok){throw new Error(`Err: ${response.status}-${response.statusText}`)}
    const data=await response.json();
    return data.images.map(image=>({
      id:image.id,title:image.title||'',
      thumbUrl:image.display_sizes[0]?.uri||'',
      previewUrl:image.display_sizes[1]?.uri||''
    }));
  }catch(error){console.error("Err: ",error); return []}
}
</script>
