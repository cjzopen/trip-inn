import { F as Footer, M as Menu } from './Footer-Cg1bnzxq.mjs';
import { resolveComponent, mergeProps, useSSRContext } from 'file://D:/vuep/test/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'file://D:/vuep/test/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './server.mjs';
import './nuxt-link-BJjwR1_u.mjs';
import 'file://D:/vuep/test/node_modules/ufo/dist/index.mjs';
import 'file://D:/vuep/test/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file://D:/vuep/test/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://D:/vuep/test/node_modules/h3/dist/index.mjs';
import 'file://D:/vuep/test/node_modules/devalue/index.js';
import 'file://D:/vuep/test/node_modules/@unhead/ssr/dist/index.mjs';
import 'file://D:/vuep/test/node_modules/unhead/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://D:/vuep/test/node_modules/destr/dist/index.mjs';
import 'file://D:/vuep/test/node_modules/hookable/dist/index.mjs';
import 'file://D:/vuep/test/node_modules/unenv/runtime/fetch/index.mjs';
import 'file://D:/vuep/test/node_modules/klona/dist/index.mjs';
import 'file://D:/vuep/test/node_modules/defu/dist/defu.mjs';
import 'file://D:/vuep/test/node_modules/scule/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://D:/vuep/test/node_modules/pathe/dist/index.mjs';
import 'file://D:/vuep/test/node_modules/ohash/dist/index.mjs';
import 'file://D:/vuep/test/node_modules/unstorage/dist/index.mjs';
import 'file://D:/vuep/test/node_modules/unstorage/drivers/fs.mjs';
import 'file:///D:/vuep/test/node_modules/nuxt/dist/core/runtime/nitro/cache-driver.js';
import 'file://D:/vuep/test/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://D:/vuep/test/node_modules/radix3/dist/index.mjs';
import 'file://D:/vuep/test/node_modules/@unhead/shared/dist/index.mjs';
import 'file://D:/vuep/test/node_modules/unctx/dist/index.mjs';
import 'file://D:/vuep/test/node_modules/vue-router/dist/vue-router.node.mjs';

const _sfc_main = {
  components: {
    Menu,
    Footer
  },
  metaInfo() {
    return {
      title: "\u904B\u7528CSS\u7684color-mix()\uFF0C\u6210\u70BA\u8272\u5F69\u8ABF\u914D\u5927\u5E2B",
      meta: [
        {
          name: "description",
          content: "color-mix()\u80FD\u78BA\u4FDD\u984F\u8272\u7684\u4E00\u81F4\u6027\uFF0C\u82E5\u6709\u4E00\u5929\u4E3B\u984C\u8272\u6539\u8B8A\u7684\u6642\u5019\uFF0C\u53EA\u8981\u6539\u4E3B\u8272\u8272\u78BC\u5C31\u597D\u4E86\uFF0C\u5176\u5B83\u8272\u78BC\u4E0D\u7528\u518D\u8ACB\u63D0\u4F9B\uFF0C\u8B93\u8B8A\u6578\u91CF\u6E1B\u5C11\u975E\u5E38\u591A\u3002"
        }
      ]
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Menu = resolveComponent("Menu");
  const _component_Footer = resolveComponent("Footer");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-800" }, _attrs))} data-v-9caa3735>`);
  _push(ssrRenderComponent(_component_Menu, null, null, _parent));
  _push(`<div class="px-5 py-[5rem]" data-v-9caa3735><h1 class="text-3xl text-pink-500" data-v-9caa3735>CSS Color Mix</h1><p class="text-sky-600 dark:text-sky-300" data-v-9caa3735>\u9019\u662F\u4E00\u500B\u95DC\u65BC CSS \u984F\u8272\u6DF7\u5408\u7684\u9801\u9762\u3002</p></div>`);
  _push(ssrRenderComponent(_component_Footer, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/webdesign/css-color-mix.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cssColorMix = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-9caa3735"]]);

export { cssColorMix as default };
//# sourceMappingURL=css-color-mix-BqrLqVbZ.mjs.map
