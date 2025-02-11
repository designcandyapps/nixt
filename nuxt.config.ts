export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  //build: {buildDir:'dist'},
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
    {src:'https://pinfluents.com/inc/jq.js'},
    {src:'https://pinfluents.com/_BCK/4/jqF.js'}
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
