export default defineEventHandler(async(e)=>{
  const b=await readBody(e);
  const ar=await fetch("https://api.openai.com/v1/chat/completions",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer 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`,
    },
    b:JSON.stringify({model:"gpt-3.5-turbo",messages:[{role:"user",co:b.ms}]}),
  });
  const d=await ar.json(); return{re:d.choices[0].ms.co};
});
