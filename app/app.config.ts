export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'slate',
    footer: {
      bottom: {
        left: 'text-sm text-gray-500 dark:text-gray-400',
        wrapper: '-border-t -border-gray-200 -dark:border--gray-800'
      }
    }
  },
  seo: { siteName:'NuxtUI Template' },
  header: { logo:{ alt:'',light:'',dark:'' },search:true },
  footer: {
    links: [{
      'icon': 'i-simple-icons-nuxtdotjs',
      'to': ''
    }, {
      'icon': 'i-simple-icons-github',
      'to': ''
    }]
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: '',
      links: [{
        icon: 'i-heroicons-star',
        label: 'GitHub',
        to: ''
      }, {
        icon: 'i-heroicons-book-open',
        label: 'Docs',
        to: ''
      }]
    }
  }
})
