import { _ as _export_sfc, v as vueExports, s as serverRenderer_cjs_prodExports } from './server.mjs';
import { _ as _sfc_main$1, F as Footer } from './Footer.vue.mjs';
import 'file://D:/vuep/trip-inn/node_modules/source-map-js/source-map.js';
import 'file://D:/vuep/trip-inn/node_modules/hookable/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/unctx/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/h3/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/radix3/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/defu/dist/defu.mjs';
import 'file://D:/vuep/trip-inn/node_modules/ufo/dist/index.mjs';
import 'node:stream';
import './nuxt-link.mjs';

const particleSize = 20;
const animationDuration = 15;
const _sfc_main = {
  __name: "favorites",
  __ssrInlineRender: true,
  setup(__props) {
    vueExports.ref([]);
    const filteredFavorites = vueExports.ref([]);
    vueExports.ref(null);
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
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(_attrs)} data-v-d30aa495>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<main class="bg-sky-900 bg-linear-to-bl from-sky-900 to-purple-300" data-v-d30aa495><div class="text-center" data-v-d30aa495><h1 class="text-center py-[2rem] text-sky-400 text-5xl mb-4" data-v-d30aa495>你的收藏記錄</h1></div><div class="flex justify-center gap-4 mb-4" data-v-d30aa495><button class="bg-blue-500 text-white px-4 py-2 rounded" data-v-d30aa495>旅宿</button><button class="bg-green-500 text-white px-4 py-2 rounded" data-v-d30aa495>景點</button></div>`);
      if (filteredFavorites.value.length) {
        _push(`<div class="p-4" data-v-d30aa495><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(filteredFavorites.value, (favorite, index) => {
          _push(`<details class="bg-green-200/10 rounded-sm p-3 mb-3" data-v-d30aa495><summary class="flex items-center gap-2 text-xl relative pr-4" data-v-d30aa495>`);
          if (favorite.type === "hotel") {
            _push(`<svg role="presentation" aria-hidden="true" class="h-5 w-5 text-blue-500" data-v-d30aa495><use href="#camp" data-v-d30aa495></use></svg>`);
          } else {
            _push(`<svg role="presentation" aria-hidden="true" class="h-5 w-5 text-green-500" data-v-d30aa495><use href="#pin" data-v-d30aa495></use></svg>`);
          }
          _push(`<span data-v-d30aa495>${serverRenderer_cjs_prodExports.ssrInterpolate(favorite.Name)}</span><button class="absolute right-0 top-0 cursor-pointer px-1 text-rose-500 hover:text-red-700" title="刪除" data-v-d30aa495> × </button></summary><div class="pt-2" data-v-d30aa495><p data-v-d30aa495><strong data-v-d30aa495>類型：</strong>${serverRenderer_cjs_prodExports.ssrInterpolate(favorite.type)}</p><p data-v-d30aa495><strong data-v-d30aa495>地址：</strong>${serverRenderer_cjs_prodExports.ssrInterpolate(favorite.Add)}</p></div></details>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div data-v-d30aa495><p class="text-center text-white" data-v-d30aa495>目前沒有收藏的項目。</p></div>`);
      }
      _push(`<!--[-->`);
      serverRenderer_cjs_prodExports.ssrRenderList(8, (n) => {
        _push(`<span aria-hidden="true" class="color-ball" style="${serverRenderer_cjs_prodExports.ssrRenderStyle(ballSpanStyle())}" data-v-d30aa495></span>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/favorites.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const favorites = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d30aa495"]]);

export { favorites as default };
//# sourceMappingURL=favorites.vue.mjs.map
