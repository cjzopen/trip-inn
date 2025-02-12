import { F as Footer, M as Menu } from './Footer-Cg1bnzxq.mjs';
import { resolveComponent, useSSRContext } from 'file://D:/vuep/test/node_modules/vue/index.mjs';
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
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Menu = resolveComponent("Menu");
  const _component_Footer = resolveComponent("Footer");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-f7a45f68>`);
  _push(ssrRenderComponent(_component_Menu, null, null, _parent));
  _push(`<h1 data-v-f7a45f68>Welcome to the Home Page</h1>`);
  _push(ssrRenderComponent(_component_Footer, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-f7a45f68"]]);

export { index as default };
//# sourceMappingURL=index-R-ToRf4b.mjs.map
