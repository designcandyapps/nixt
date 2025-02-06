<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'
const { seo }=useAppConfig()
const { data:navigation }=await useAsyncData('navigation',()=>fetchContentNavigation())
const { data:files }=useLazyFetch<ParsedContent[]>('/api/search.json',{default:()=>[],server:false})
useHead({
  meta: [{ name:'viewport',content:'width=device-width,initial-scale=1' }],
  htmlAttrs: { lang:'en' }
})
provide('navigation',navigation)
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <AppHeader />
    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
    <AppFooter />
    <ClientOnly><LazyUContentSearch :files="files" :navigation="navigation" /></ClientOnly>
    <UNotifications />
  </div>
</template>
