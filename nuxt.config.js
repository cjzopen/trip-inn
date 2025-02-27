// import { useRoute } from 'vue-router';
// import { useRuntimeConfig } from '#imports';
import tailwindcss from "@tailwindcss/vite";
// import postcssNesting from 'postcss-nesting';

const defaultTitle = 'CJ的SEO日記';
const defaultDescription = '';
const domainUrl = 'https://example.com';
// const defaultcanonical = `${domainUrl}${useRoute().path}`;

export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: '怎麼可以讓你知道呢 :P',
    public: {
      // domainUrl: process.env.DOMAIN_URL || 'https://example.com'
      domainUrl: 'https://example.com'
    }
  },
  // alias: {
  //   '@': '/src/assets/',
  // },
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-Hant-TW'
      },
      viewport: 'width=device-width, initial-scale=1', 
      title: defaultTitle,
      charset: 'utf-8',
      meta: [
        { name: 'description', content: defaultDescription },
        { name: 'robots', content: 'max-image-preview:large' },
        { property: 'og:title', content: defaultTitle },
        { property: 'og:description', content: defaultDescription },
        // { property: 'og:url', content: url },
        { property: 'og:image', content: `${domainUrl}/images/og-image.png` },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: defaultTitle },
        { name: 'twitter:description', content: defaultDescription },
        { name: 'twitter:image', content: `${domainUrl}/images/og-image.png` },
        { name: 'twitter:site', content: '@cjzopen' },
        { name: 'twitter:creator', content: '@cjzopen' },
      ],
      link: [
        // { rel: 'canonical', href: defaultcanonical },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''},
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400..700&display=swap'},
      ],
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.js',
          // 用於調整 script 標籤渲染的位置，值可以是 'head' | 'bodyClose' | 'bodyOpen'
          tagPosition: 'head'
        },
      ],
      style: [
        // 渲染出 <style>h1{ color: red }</style>
        {children: ':root{ --main-color:#345678; }'},
      ],
      noscript: [
        // 渲染出 <noscript>
        {children: '此網頁需要支援 JavaScript 才能正確運行，請先至你的瀏覽器設定中開啟 JavaScript。'},
      ],
    },
  },

  css: ['~/src/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  
  // AppConfig
  // theme: {
    
  // },

  // generate: {
  //   routes: ['/web/']
  // },

  devtools: { enabled: true },
  components: true,
  // build: {},
  target: 'static',

  compatibilityDate: '2025-02-10'
});