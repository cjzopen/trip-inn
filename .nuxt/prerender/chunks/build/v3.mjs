import { t as tryUseNuxtApp, v as vueExports } from './server.mjs';
import { u as useServerHead$1, h as headSymbol, a as useHead$1 } from '../_/renderer.mjs';

function injectHead(nuxtApp) {
  var _a;
  const nuxt = nuxtApp || tryUseNuxtApp();
  return ((_a = nuxt == null ? void 0 : nuxt.ssrContext) == null ? void 0 : _a.head) || (nuxt == null ? void 0 : nuxt.runWithContext(() => {
    if (vueExports.hasInjectionContext()) {
      return vueExports.inject(headSymbol);
    }
  }));
}
function useHead(input, options = {}) {
  const head = injectHead(options.nuxt);
  if (head) {
    return useHead$1(input, { head, ...options });
  }
}
function useServerHead(input, options = {}) {
  const head = injectHead(options.nuxt);
  if (head) {
    return useServerHead$1(input, { head, ...options });
  }
}

export { useServerHead as a, useHead as u };
//# sourceMappingURL=v3.mjs.map
