import { _ as _export_sfc, v as vueExports, s as serverRenderer_cjs_prodExports } from './server.mjs';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import { _ as _sfc_main$1, F as Footer } from './Footer.vue.mjs';
import { u as useAppConfig } from './config.mjs';
import { a as useServerHead } from './v3.mjs';
import 'source-map-js';
import 'node:stream';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@vue/compiler-dom';
import '@vue/runtime-dom';
import '@vue/shared';
import 'node:fs';
import 'node:url';
import 'consola';
import 'node:path';
import 'node:crypto';
import './nuxt-link.mjs';
import '../routes/renderer.mjs';
import 'unhead/server';
import 'unhead/utils';
import '@vue/server-renderer';
import 'devalue';
import 'unhead/plugins';

const _imports_0 = publicAssetsURL("/video/hiking.webm");

const _imports_1 = publicAssetsURL("/images/hiking.webp");

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const appConfig = useAppConfig();
    const domainUrl = appConfig.domainUrl;
    const showVideo = vueExports.ref(false);
    useServerHead({
      link: [
        { rel: "canonical", href: `${domainUrl}/` }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(_attrs)} data-v-8de901c7>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<main class="bg-sky-900 bg-linear-to-bl from-sky-900 to-purple-300" data-v-8de901c7><div class="wrapper p-4" data-v-8de901c7><div class="text-center flex justify-center items-center h-full" data-v-8de901c7><div class="pb-[15cqh]" data-v-8de901c7><h1 class="text-center py-[2rem] text-sky-400 text-5xl" data-v-8de901c7>旅遊住宿地點查詢</h1><p class="text-sky-400" data-v-8de901c7>用景點尋找附近合適的旅宿，或是用旅宿查看附近有哪些知名景點</p></div></div></div>`);
      if (showVideo.value) {
        _push(`<video${serverRenderer_cjs_prodExports.ssrRenderAttr("src", _imports_0)} autoplay muted loop playsinline${serverRenderer_cjs_prodExports.ssrRenderAttr("poster", _imports_1)} class="background-video" data-v-8de901c7></video>`);
      } else {
        _push(`<img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", _imports_1)} alt="*" class="background-image" data-v-8de901c7>`);
      }
      _push(`</main>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8de901c7"]]);

export { index as default };
//# sourceMappingURL=index.vue.mjs.map
