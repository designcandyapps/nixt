import {converter,differenceEuclidean,formatHex,nearest} from "https://cdn.skypack.dev/culori@2.0.0";
import ColorThief from "https://cdn.skypack.dev/colorthief";
const colorThief=new ColorThief(); const toLCH=converter("lch");
import {serverQueryContent} from '#content/server'
export default eventHandler(async(event)=>{
  return serverQueryContent(event).where({_type:'markdown',navigation:{$ne:false}}).find()
})
