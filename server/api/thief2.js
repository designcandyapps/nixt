export default defineEventHandler(async(event)=>{
  const body=await readBody(event);
  const ar=await fetch("https://api.openai.com/v1/chat/completions",{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({content:body.message}]}),
  });
  const data=await ar.json(); return{reply:data.choices[0].message.content};
});
