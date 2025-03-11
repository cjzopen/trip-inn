// import { useRoute } from 'vue-router';
// import { useRuntimeConfig } from '#imports';
import tailwindcss from "@tailwindcss/vite";
// import postcssNesting from 'postcss-nesting';


const defaultTitle = 'CJ的SEO日記';
const defaultDescription = '';
const domainUrl = 'https://cjzopen.github.io';
const ver = '01';
// const defaultcanonical = `${domainUrl}${useRoute().path}`;

export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: '怎麼可以讓你知道呢 :P',
    public: {
      domainUrl: process.env.DOMAIN_URL || 'https://cjzopen.github.io'
    }
  },
  // alias: {
  //   '@': '/src/assets/',
  // },
  generate: {
    fallback: '404.html',
  },
  app: {
    baseURL: '/',
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
        
        // {
        //   rel: 'icon',
        //   type: 'image/x-icon',
        //   href: '/favicon.ico'
        // },
        // {
        //   rel: 'icon',
        //   type: 'image/png',
        //   sizes: '32x32',
        //   href: '/favicon-32x32.png'
        // },
        // {
        //   rel: 'icon',
        //   type: 'image/png',
        //   sizes: '16x16',
        //   href: '/favicon-16x16.png'
        // },
        // {
        //   rel: 'apple-touch-icon',
        //   sizes: '180x180',
        //   href: '/apple-touch-icon.png'
        // },
        // {
        //   rel: 'mask-icon',
        //   href: '/safari-pinned-tab.svg',
        //   color: '#5bbad5'
        // },
        // {
        //   rel: 'manifest',
        //   href: '/site.webmanifest'
        // },
      ],
      script: [
        // {
          // src: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.js',
          // 用於調整 script 標籤渲染的位置，值可以是 'head' | 'bodyClose' | 'bodyOpen'
          // tagPosition: 'head'
        // },
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-DJDQTXG7GS',
          async: true
        },
        {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DJDQTXG7GS');
          `,
          // type: 'text/javascript',
          // charset: 'utf-8'
        }
      ],
      style: [
        // 渲染出 <style>h1{ color: red }</style>
        {children: `
          :root{ --main-color:#345678;}
          `},
      ],
      noscript: [
        // 渲染出 <noscript>
        {children: '此網頁需要支援 JavaScript 才能正確運行，請先至你的瀏覽器設定中開啟 JavaScript。'},
      ],
    },
  },

  css: ['~/src/assets/css/main.css'],

  devtools: { enabled: true },

  vite: {
    build: {
      // cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: '[name][extname]', // 圖片、影片、字體名稱不變
        }
      }
    },
    plugins: [
      tailwindcss(),
    ],
    resolve: {
      alias: {
        'entities/lib/esm/decode.js': 'entities/lib/decode.js'
      }
    },
    optimizeDeps: {
      include: ['estree-walker']
    }
  },
  // hooks: {
  //   'nitro:build:done': async (nitro) => {
  //     const fs = await import('fs');
  //     const path = await import('path');

  //     const distPath = nitro.options.output.publicDir;
  //     const htmlFiles = fs.readdirSync(distPath).filter(file => file.endsWith('.html'));

  //     htmlFiles.forEach(file => {
  //       const filePath = path.join(distPath, file);
  //       let content = fs.readFileSync(filePath, 'utf8');

  //       // 修改正則表達式，只匹配實際存在的 CSS 檔案
  //       content = content.replace(/\/_nuxt\/([a-zA-Z0-9-_]+)\.css/g, (match, filename) => {
  //         const cssFilePath = path.join(distPath, '_nuxt', `${filename}.css`);
  //         if (fs.existsSync(cssFilePath)) {
  //           return `/_nuxt/${filename}.css?v=${ver}`;
  //         }
  //         return match; // 如果檔案不存在，則不修改
  //       });

  //       content = content.replace(/\/_nuxt\/(.*?\.js)/g, `/_nuxt/$1?v=${ver}`);

  //       fs.writeFileSync(filePath, content, 'utf8');
  //     });
  //   }
  // },
  
  // AppConfig
  theme: {
    
  },

  components: false,
  // experimental: {
  //   inlineSSRStyles: true
  // },
  build: {
    transpile: ['vue', 'vue-router', 'nuxt', 'estree-walker'],
    extractCSS: false,
    filenames: {
      app: () => 'app.js',
      chunk: () => '[name].js', // 避免 chunk 有 hash
      css: () => '[name].css', // 避免 CSS 有 hash
    },
    rollupOptions: {
      output: {
        assetFileNames: '[name][extname]', // 靜態資源不加 hash
        chunkFileNames: '[name].js', // 避免 chunk 有 hash
        entryFileNames: '[name].js',
      }
    }
    // filenames: {
    //   app: ({ isDev }) => isDev ? '[name].js' : '[name].[contenthash].js',
    //   chunk: ({ isDev }) => isDev ? '[name].js' : '[name].[contenthash].js',
    //   css: ({ isDev }) => isDev ? '[name].css' : '[name].[contenthash].css',
    //   img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[name].[contenthash:7].[ext]',
    //   font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[name].[contenthash:7].[ext]',
    //   video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[name].[contenthash:7].[ext]'
    // }
  },
  modules: ['@nuxtjs/sitemap'],
  site: {
    url: domainUrl
  },
  sitemap: {
    xsl: false,
    gzip: true,
    defaults: {
      changefreq: 'monthly',
    }
  },
  // sitemap: {
  //   site: {
  //     url: domainUrl
  //   },
  //   gzip: true,
  //   routes: async () => {
  //     const { getRoutes } = await import('#imports');
  //     return getRoutes().map(route => route.path);
  //   }
  // },
  target: 'static',

  compatibilityDate: '2025-02-10'
});