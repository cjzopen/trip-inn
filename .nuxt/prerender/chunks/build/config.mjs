import { klona } from 'file://D:/vuep/trip-inn/node_modules/klona/dist/index.mjs';
import { d as defineAppConfig, b as useNuxtApp } from './server.mjs';
import { defuFn } from 'file://D:/vuep/trip-inn/node_modules/defu/dist/defu.mjs';

const cfg0 = defineAppConfig({
  foo: "bar",
  domainUrl: "https://cjzopen.github.io/trip-inn",
  theme: {
    primaryColor: "#ababab"
  },
  api: {
    scenic: "https://media.taiwan.net.tw/XMLReleaseALL_public/scenic_spot_C_f.json",
    hotel: "https://media.taiwan.net.tw/XMLReleaseALL_public/hotel_C_f.json"
  }
});

const inlineConfig = {
  "nuxt": {}
};
const __appConfig = /* @__PURE__ */ defuFn(cfg0, inlineConfig);

function useAppConfig() {
  const nuxtApp = useNuxtApp();
  nuxtApp._appConfig || (nuxtApp._appConfig = klona(__appConfig));
  return nuxtApp._appConfig;
}

export { useAppConfig as u };
//# sourceMappingURL=config.mjs.map
