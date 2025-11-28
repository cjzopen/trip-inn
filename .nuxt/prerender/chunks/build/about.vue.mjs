import { _ as _export_sfc, s as serverRenderer_cjs_prodExports, v as vueExports } from './server.mjs';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import { _ as _sfc_main$1, F as Footer } from './Footer.vue.mjs';
import 'file://D:/vuep/trip-inn/node_modules/source-map-js/source-map.js';
import 'file://D:/vuep/trip-inn/node_modules/hookable/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/unctx/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/h3/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/radix3/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/defu/dist/defu.mjs';
import 'file://D:/vuep/trip-inn/node_modules/ufo/dist/index.mjs';
import 'node:stream';
import 'file://D:/vuep/trip-inn/node_modules/destr/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/ofetch/dist/node.mjs';
import 'file://D:/vuep/trip-inn/node_modules/node-mock-http/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/@vue/compiler-dom/dist/compiler-dom.cjs.prod.js';
import 'file://D:/vuep/trip-inn/node_modules/@vue/runtime-dom/dist/runtime-dom.cjs.prod.js';
import 'file://D:/vuep/trip-inn/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file://D:/vuep/trip-inn/node_modules/klona/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/scule/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://D:/vuep/trip-inn/node_modules/pathe/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/consola/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/unstorage/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/unstorage/drivers/fs.mjs';
import 'file:///D:/vuep/trip-inn/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://D:/vuep/trip-inn/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://D:/vuep/trip-inn/node_modules/ohash/dist/index.mjs';
import './nuxt-link.mjs';

const _imports_0 = publicAssetsURL("/images/fixing.webp");

const particleSize = 20;
const animationDuration = 15;
const _sfc_main = {
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    const colors = ["#583C87", "#E45A84", "#FFACAC"];
    const ballSpanStyle = (index) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      const duration = `${(Math.random() * animationDuration + 10).toFixed(1)}s`;
      const delay = `${(Math.random() * (animationDuration + 10) * -1).toFixed(1)}s`;
      const transformOrigin = `${(Math.random() * 50 - 25).toFixed(1)}vw ${(Math.random() * 50 - 25).toFixed(1)}vh`;
      const blurRadius = `${((Math.random() + 0.5) * particleSize * 0.5).toFixed(1)}vmin`;
      const x = Math.random() > 0.5 ? -1 : 1;
      const boxShadow = `${particleSize * 2 * x}vmin 0 ${blurRadius} currentColor`;
      return {
        color,
        top,
        left,
        animationDuration: duration,
        animationDelay: delay,
        transformOrigin,
        boxShadow,
        zIndex: -1
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(_attrs)} data-v-fbaa98cf>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<main class="bg-sky-900 bg-linear-to-bl from-sky-900 to-purple-300" data-v-fbaa98cf><div class="text-center" data-v-fbaa98cf><h1 class="text-center py-[2rem] text-sky-400 text-5xl" data-v-fbaa98cf>旅遊住宿地點查詢</h1></div><div class="text-center px-3" data-v-fbaa98cf><img class="inline rounded-sm" width="512" height="512" loading="lazy"${serverRenderer_cjs_prodExports.ssrRenderAttr("src", _imports_0)} alt="維護中" data-v-fbaa98cf><p class="mt-3" data-v-fbaa98cf>目前正在重新裝修中。</p><address data-v-fbaa98cf>2012cjz@gmail.com</address></div><!--[-->`);
      serverRenderer_cjs_prodExports.ssrRenderList(8, (n) => {
        _push(`<span aria-hidden="true" class="color-ball" style="${serverRenderer_cjs_prodExports.ssrRenderStyle(ballSpanStyle())}" data-v-fbaa98cf></span>`);
      });
      _push(`<!--]--></main>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fbaa98cf"]]);

export { about as default };
//# sourceMappingURL=about.vue.mjs.map
