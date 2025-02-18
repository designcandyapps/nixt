export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxthq/studio',
    'nuxt-og-image'
  ],
  hooks: {
    'components:extend':(components)=>{
      const globals=components.filter(c=>['UButton','UIcon'].includes(c.pascalName))
      globals.forEach(c=>c.global=true)
    }
  },
  app: {head:{script:[
    //{src:'https://pinfluents.com/inc/jq.js'},
    {src:'https://code.jquery.com/jquery-1.12.0.min.js'},
    {src:'https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.2/color-thief.min.js'},
    {src:'https://pinfluents.com/_BCK/4/jqG.js'}
  ]}},
  colorMode: {preference:'light'},
  nitro: {prerender:{routes:['/'],crawlLinks:true}},
  routeRules: {'/api/search.json':{prerender:true}},
  devtools: {enabled:true},
  typescript: {strict:false},
  future: {compatibilityVersion:4},
  eslint: {config:{stylistic:{commaDangle:'never',braceStyle:'1tbs'}}
  },
  compatibilityDate:'2024-07-11'
})
