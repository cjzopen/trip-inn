import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { t as trapUnhandledNodeErrors, u as useNitroApp } from './chunks/_/nitro.mjs';
import 'file://D:/vuep/trip-inn/node_modules/h3/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/ufo/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/destr/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/hookable/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/ofetch/dist/node.mjs';
import 'file://D:/vuep/trip-inn/node_modules/node-mock-http/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/defu/dist/defu.mjs';
import 'file://D:/vuep/trip-inn/node_modules/@vue/compiler-dom/dist/compiler-dom.cjs.prod.js';
import 'file://D:/vuep/trip-inn/node_modules/@vue/runtime-dom/dist/runtime-dom.cjs.prod.js';
import 'file://D:/vuep/trip-inn/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file://D:/vuep/trip-inn/node_modules/klona/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/scule/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://D:/vuep/trip-inn/node_modules/pathe/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/consola/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/unstorage/dist/index.mjs';
import 'file://D:/vuep/trip-inn/node_modules/unstorage/drivers/fs.mjs';
import 'file:///D:/vuep/trip-inn/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://D:/vuep/trip-inn/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://D:/vuep/trip-inn/node_modules/ohash/dist/index.mjs';

const nitroApp = useNitroApp();
const localFetch = nitroApp.localFetch;
const closePrerenderer = () => nitroApp.hooks.callHook("close");
trapUnhandledNodeErrors();

export { closePrerenderer, localFetch };
//# sourceMappingURL=index.mjs.map
