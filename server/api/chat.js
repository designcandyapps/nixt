export default defineEventHandler(async(event)=>{
  const body=await readBody(event);
  const ar=await fetch("https://api.openai.com/v1/chat/completions",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer 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`,
    },
    body:JSON.stringify({model:"gpt-3.5-turbo",messages:[{role:"user",content:body.message}]}),
  });
  const data=await ar.json(); return{reply:data.choices[0].message.content};
});
