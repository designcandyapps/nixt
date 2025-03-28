export default defineEventHandler(async(event)=>{
  const body=await readBody(event);
  const apiResponse=await fetch("https://api.openai.com/v1/chat/completions",{
    method:"POST",
    headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer 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`,
      //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`,
    },
    body:JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{role:"user",content:body.message}],
    }),
  });
  const data=await apiResponse.json();
  return{reply:data.choices[0].message.content};
});
