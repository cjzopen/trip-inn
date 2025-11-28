import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { s as serverRenderer_cjs_prodExports, v as vueExports, _ as _export_sfc, u as useRoute, a as useRouter } from './server.mjs';
import { _ as _sfc_main$6, F as Footer } from './Footer.vue.mjs';
import { u as useAppConfig } from './config.mjs';
import { a as useServerHead } from './v3.mjs';
import 'source-map-js';
import '../_/nitro.mjs';
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
import 'node:stream';
import './nuxt-link.mjs';
import '../routes/renderer.mjs';
import 'unhead/server';
import 'unhead/utils';
import '@vue/server-renderer';
import 'devalue';
import 'unhead/plugins';

/* empty css              */
const _sfc_main$5 = {
  __name: "Loading",
  __ssrInlineRender: true,
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({
        style: __props.loading ? null : { display: "none" },
        id: "loading",
        "aria-hidden": "true"
      }, _attrs))}><div class="loading-wave"></div><p>載入中...</p></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Loading.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};

const _sfc_main$4 = {
  __name: "Modal",
  __ssrInlineRender: true,
  props: {
    isOpen: Boolean
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isOpen) {
        _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "modal" }, _attrs))} data-v-e17ff7bf><div class="modal-wrapper" data-v-e17ff7bf><span class="close" data-v-e17ff7bf>×</span><div class="model-content" data-v-e17ff7bf>`);
        serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Modal = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-e17ff7bf"]]);

/* empty css           */
const _sfc_main$3 = {
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    item: Object
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const appConfig = useAppConfig();
    const domainUrl = appConfig.domainUrl;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "card overflow-hidden rounded-xl bg-white shadow-md max-w-[480px] lg:flex" }, _attrs))}><span class="geo-label" aria-hidden="true"><svg class="geo-label-icon" role="presentation" aria-hidden="true"><use href="#pin"></use></svg> ${serverRenderer_cjs_prodExports.ssrInterpolate(__props.item.Region)}${serverRenderer_cjs_prodExports.ssrInterpolate(__props.item.Town)}</span><figure class="figure shrink-0 w-full h-48 lg:w-[200px] lg:h-[200px] *:w-full *:h-full"><img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", __props.item.Pictures[0] || `${vueExports.unref(domainUrl)}/images/default.webp`)}${serverRenderer_cjs_prodExports.ssrRenderAttr("alt", __props.item.Name)}></figure><div class="p-2">`);
      serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></li>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Card.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = {
  __name: "DetailHotel",
  __ssrInlineRender: true,
  props: {
    item: Object
  },
  setup(__props) {
    const props = __props;
    const theItem = vueExports.computed(() => props.item ?? {});
    const isFavorite = vueExports.ref(false);
    const Services = theItem.value.Serviceinfo ? theItem.value.Serviceinfo.split(",").filter((service) => service.trim() !== "") : [];
    const formattedSpec = theItem.value.Spec ? theItem.value.Spec.split(";").filter((spec) => spec.trim() !== "").join("、") : "";
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      if (__props.item) {
        _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(_attrs)}><h2 class="text-2xl font-bold mb-2">${serverRenderer_cjs_prodExports.ssrInterpolate(__props.item.Name)}</h2><div class="relative w-8 h-8 my-1"><button class="heart-icon w-8 h-8 bg-transparent rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 focus:outline-none" aria-label="加入收藏"${serverRenderer_cjs_prodExports.ssrRenderAttr("data-id", __props.item.Id)}><svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${serverRenderer_cjs_prodExports.ssrRenderClass([{ "text-rose-500": isFavorite.value, "text-gray-300": !isFavorite.value, "fill-rose-500": isFavorite.value, "fill-gray-300": !isFavorite.value }, "h-6 w-6"])}"><use href="#heart"></use></svg></button></div><address>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.item.Add)}</address><div class="model-photos flex"><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(__props.item.Pictures, (picture, index) => {
          _push(`<figure><a${serverRenderer_cjs_prodExports.ssrRenderAttr("href", picture)} target="_blank" rel="noopener noreferrer"><img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", picture)}${serverRenderer_cjs_prodExports.ssrRenderAttr("alt", __props.item.PicDescribes[index] || "業主提供的住宿環境照片")}${serverRenderer_cjs_prodExports.ssrRenderAttr("title", __props.item.PicDescribes[index] || "")}></a></figure>`);
        });
        _push(`<!--]--></div><p class="mb-2">${serverRenderer_cjs_prodExports.ssrInterpolate(__props.item.Description || "")}</p>`);
        if ((_a = __props.item) == null ? void 0 : _a.LowestPrice) {
          _push(`<!--[-->`);
          if (__props.item.LowestPrice === __props.item.CeilingPrice) {
            _push(`<p class="mb-2">價位：${serverRenderer_cjs_prodExports.ssrInterpolate(__props.item.CeilingPrice)} 元。</p>`);
          } else {
            _push(`<p class="mb-2">價位：${serverRenderer_cjs_prodExports.ssrInterpolate(__props.item.LowestPrice)} ~ ${serverRenderer_cjs_prodExports.ssrInterpolate(__props.item.CeilingPrice)} 元。</p>`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="mb-2">房間數：${serverRenderer_cjs_prodExports.ssrInterpolate((_b = __props.item) == null ? void 0 : _b.TotalNumberofRooms)}</p>`);
        if (vueExports.unref(formattedSpec)) {
          _push(`<p class="mb-2">特殊房型與價格：${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(formattedSpec))}</p>`);
        } else {
          _push(`<!---->`);
        }
        if ((_c = __props.item) == null ? void 0 : _c.Serviceinfo) {
          _push(`<!--[--><h3 class="text-lg font-bold">服務：</h3><ul class="list-disc mb-2"><!--[-->`);
          serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(Services), (service, index) => {
            _push(`<li>${serverRenderer_cjs_prodExports.ssrInterpolate(service)}</li>`);
          });
          _push(`<!--]--></ul><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if ((_d = __props.item) == null ? void 0 : _d.Tel) {
          _push(`<p>電話：${serverRenderer_cjs_prodExports.ssrInterpolate(__props.item.Tel)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if ((_e = __props.item) == null ? void 0 : _e.IndustryEmail) {
          _push(`<p>Email：${serverRenderer_cjs_prodExports.ssrInterpolate(__props.item.IndustryEmail)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if ((_f = __props.item) == null ? void 0 : _f.Website) {
          _push(`<p class="mb-2"><a class="text-sky-600"${serverRenderer_cjs_prodExports.ssrRenderAttr("href", __props.item.Website)} target="_blank" rel="noopener noreferrer">商家網站</a></p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(_attrs)}><p>沒有資料</p></div>`);
      }
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/lodging/DetailHotel.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = {
  __name: "DetailScenic",
  __ssrInlineRender: true,
  props: {
    item: Object
    // item: {
    //   type: Object,
    //   required: true,
    // },
  },
  setup(__props) {
    const props = __props;
    vueExports.computed(() => props.item ?? {});
    const isFavorite = vueExports.ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g;
      if (__props.item) {
        _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(_attrs)}><h2 class="text-2xl font-bold mb-2">${serverRenderer_cjs_prodExports.ssrInterpolate(__props.item.Name)}</h2><div class="relative w-8 h-8 my-1"><button class="heart-icon w-8 h-8 bg-transparent rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 focus:outline-none" aria-label="加入收藏"${serverRenderer_cjs_prodExports.ssrRenderAttr("data-id", __props.item.Id)}><svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${serverRenderer_cjs_prodExports.ssrRenderClass([{ "text-rose-500": isFavorite.value, "text-gray-300": !isFavorite.value, "fill-rose-500": isFavorite.value, "fill-gray-300": !isFavorite.value }, "h-6 w-6"])}"><use href="#heart"></use></svg></button></div><address>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.item.Add)}</address><div class="model-photos flex"><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(__props.item.Pictures, (picture, index) => {
          _push(`<figure><a${serverRenderer_cjs_prodExports.ssrRenderAttr("href", picture)} target="_blank" rel="noopener noreferrer"><img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", picture)}${serverRenderer_cjs_prodExports.ssrRenderAttr("alt", __props.item.PicDescribes[index] || __props.item.Name)}${serverRenderer_cjs_prodExports.ssrRenderAttr("title", __props.item.PicDescribes[index] || "")}></a></figure>`);
        });
        _push(`<!--]--></div><p class="mb-2">${serverRenderer_cjs_prodExports.ssrInterpolate(__props.item.Toldescribe || "")}</p>`);
        if ((_a = __props.item) == null ? void 0 : _a.Opentime) {
          _push(`<p class="mb-2">開放時間：${serverRenderer_cjs_prodExports.ssrInterpolate(__props.item.Opentime)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if ((_b = __props.item) == null ? void 0 : _b.Ticketinfo) {
          _push(`<p class="mb-2">入場費：${serverRenderer_cjs_prodExports.ssrInterpolate(__props.item.Ticketinfo)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if ((_c = __props.item) == null ? void 0 : _c.Travellinginfo) {
          _push(`<p class="mb-2">大眾交通資訊：${serverRenderer_cjs_prodExports.ssrInterpolate(__props.item.Travellinginfo)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if ((_d = __props.item) == null ? void 0 : _d.Parkinginfo) {
          _push(`<p class="mb-2">停車資訊：${serverRenderer_cjs_prodExports.ssrInterpolate(__props.item.Parkinginfo)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if ((_e = __props.item) == null ? void 0 : _e.Tel) {
          _push(`<p class="mb-2">電話：${serverRenderer_cjs_prodExports.ssrInterpolate(__props.item.Tel)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if ((_f = __props.item) == null ? void 0 : _f.Website) {
          _push(`<p class="mb-2"><a class="text-sky-600"${serverRenderer_cjs_prodExports.ssrRenderAttr("href", __props.item.Website)} target="_blank" rel="noopener noreferrer">官方網站</a></p>`);
        } else {
          _push(`<!---->`);
        }
        if ((_g = __props.item) == null ? void 0 : _g.Remarks) {
          _push(`<p class="mb-2">注意事項：${serverRenderer_cjs_prodExports.ssrInterpolate(__props.item.Remarks)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(_attrs)}><p>沒有資料</p></div>`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/lodging/DetailScenic.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const appConfig = useAppConfig();
    const domainUrl = appConfig.domainUrl;
    const headTitle = vueExports.ref("台灣住宿與景點資訊");
    const headDescription = vueExports.ref("根據政府提供的資訊，從景點附近整理出台灣各地的民宿、旅店、旅館。");
    useServerHead({
      title: headTitle.value,
      meta: [
        { name: "description", content: headDescription.value },
        { property: "og:title", content: headTitle.value },
        { property: "og:description", content: headDescription.value },
        { property: "og:image", content: `${domainUrl}/images/taiwan/og.jpg` },
        { name: "twitter:title", content: headTitle.value },
        { name: "twitter:description", content: headDescription.value },
        { name: "twitter:image", content: `${domainUrl}/images/taiwan/og.jpg` }
      ],
      link: [
        { rel: "canonical", href: `${domainUrl}/taiwan` }
        // { rel: 'stylesheet', href: `${domainUrl}/lib/leaflet/leaflet.1.9.4.css` },
        // { rel: 'stylesheet', href: `${domainUrl}/lib/leaflet/markercluster.1.5.3.css` },
        // { rel: 'stylesheet', href: `${domainUrl}/lib/leaflet/markercluster.default.1.5.3.css` },
        // { rel: 'stylesheet', href: `${domainUrl}/css/trip.css` },
      ],
      script: [
        {
          type: "application/ld+json",
          children: `{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "旅遊小站",
        "item": "${domainUrl}/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "台灣",
        "item": "${domainUrl}/taiwan"
      }]
    }`
        }
      ]
    });
    const hotels = vueExports.ref([]);
    const allHotels = vueExports.ref([]);
    const allScenics = vueExports.ref([]);
    const loading = vueExports.ref(true);
    const selectedCity = vueExports.ref("");
    const cities = vueExports.ref([]);
    const initialLoad = vueExports.ref(true);
    vueExports.ref(null);
    vueExports.ref(null);
    const selectedItem = vueExports.ref(null);
    const dataType = vueExports.ref("");
    vueExports.ref([]);
    const nearbySpots = vueExports.ref([]);
    const distanceRange = vueExports.ref(10);
    const addressPoints = vueExports.ref([]);
    const showHotels = vueExports.ref(true);
    const isHotel = vueExports.ref(true);
    const hotelIconSettings = vueExports.ref({
      // iconUrl: new URL('/src/assets/images/taiwan/home.svg', globalThis._importMeta_.url).href,
      iconUrl: `${domainUrl}/images/taiwan/home.svg`,
      iconSize: [27, 24],
      iconAnchor: [14, 14]
    });
    const scenicIconSettings = vueExports.ref({
      // iconUrl: new URL('/src/assets/images/taiwan/pin.svg', globalThis._importMeta_.url).href,
      iconUrl: `${domainUrl}/images/taiwan/pin.svg`,
      iconSize: [21, 28],
      iconAnchor: [10, 18]
    });
    let map;
    let L;
    useRoute();
    const router = useRouter();
    const filterHotels = vueExports.computed(() => {
      if (!selectedCity.value) {
        return hotels.value;
      }
      return allHotels.value.filter((hotel) => hotel.Region === selectedCity.value);
    });
    const displayHotels = vueExports.computed(() => {
      if (initialLoad.value) {
        return hotels.value.slice(0, 15);
      }
      return filterHotels.value;
    });
    const displayScenics = vueExports.computed(() => {
      if (!selectedCity.value) {
        return allScenics.value.slice(0, 15);
      }
      return allScenics.value.filter((scenic) => scenic.Region === selectedCity.value);
    });
    function calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }
    function updateNearbySpots() {
      if (!selectedItem.value) return;
      const isHotel2 = dataType.value === "hotel";
      const sourceList = isHotel2 ? allScenics.value : allHotels.value;
      nearbySpots.value = sourceList.filter((spot) => {
        const distance = calculateDistance(selectedItem.value.Py, selectedItem.value.Px, spot.Py, spot.Px);
        return distance <= distanceRange.value;
      });
      addressPoints.value = nearbySpots.value.map((spot) => [spot.Py, spot.Px, { name: spot.Name }]);
      updateMap();
    }
    function showDetails(item, type) {
      selectedItem.value = item;
      dataType.value = type;
      updateNearbySpots();
      vueExports.nextTick(() => {
        initializeMap(item.Py, item.Px);
      });
    }
    function closeModal() {
      selectedItem.value = null;
    }
    async function initializeMap(lat, lon) {
      if (!L) {
        L = await import('leaflet').then((module) => module.default);
      }
      {
        await import('leaflet.markercluster');
      }
      if (map) {
        map.remove();
      }
      const isHotel2 = dataType.value === "hotel";
      const mainIcon = isHotel2 ? L.icon(hotelIconSettings.value) : L.icon(scenicIconSettings.value);
      const nearbyIcon = isHotel2 ? L.icon(scenicIconSettings.value) : L.icon(hotelIconSettings.value);
      map = L.map("map").setView([lat, lon], 13);
      let tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        minZoom: 10,
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
      tiles.addTo(map);
      L.marker([lat, lon], { icon: mainIcon }).addTo(map).bindPopup(selectedItem.value.Name).openPopup();
      addNearbyMarkers(nearbyIcon, isHotel2);
    }
    async function updateMap() {
      if (!L) {
        L = await import('leaflet').then((module) => module.default);
      }
      {
        await import('leaflet.markercluster');
      }
      if (!map) return;
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });
      if (!selectedItem.value) return;
      const isHotel2 = dataType.value === "hotel";
      const mainIcon = isHotel2 ? L.icon(hotelIconSettings.value) : L.icon(scenicIconSettings.value);
      const nearbyIcon = isHotel2 ? L.icon(scenicIconSettings.value) : L.icon(hotelIconSettings.value);
      L.marker([selectedItem.value.Py, selectedItem.value.Px], { icon: mainIcon }).addTo(map).bindPopup(selectedItem.value.Name).openPopup();
      addNearbyMarkers(nearbyIcon, isHotel2);
    }
    function addNearbyMarkers(icon, isHotel2) {
      if (!map || !nearbySpots.value.length) return;
      const markerClusterGroup = L.markerClusterGroup();
      nearbySpots.value.forEach((spot) => {
        const marker = L.marker([spot.Py, spot.Px], { icon });
        marker.on("click", () => {
          const mapTarget = (void 0).querySelector("#description");
          if (mapTarget) {
            const ComponentInDscription = isHotel2 ? _sfc_main$1 : _sfc_main$2;
            const caeateDetail = vueExports.createApp(ComponentInDscription, { item: spot });
            caeateDetail.mount(mapTarget);
          }
        });
        markerClusterGroup.addLayer(marker);
      });
      map.addLayer(markerClusterGroup);
    }
    vueExports.watch(selectedCity, (newCity) => {
      initialLoad.value = false;
      updateQuery();
    });
    function updateQuery() {
      router.push({ query: { city: selectedCity.value || void 0 } });
    }
    const priceClass = (price) => {
      if (price < 3e3) return "text-emerald-500";
      if (price > 9e3) return "text-pink-700";
      return "";
    };
    const getPriceHtml = (hotel) => {
      const { LowestPrice, CeilingPrice } = hotel;
      const priceText = LowestPrice === CeilingPrice ? `<span class="${priceClass(CeilingPrice)}">${CeilingPrice}</span>` : `<span class="${priceClass(LowestPrice)}">${LowestPrice}</span> ~ <span class="${priceClass(CeilingPrice)}">${CeilingPrice}</span>`;
      return `價位：${priceText}。`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$6, null, null, _parent));
      _push(`<main><h1 class="text-center py-[5rem] text-cyan-500 text-4xl">找住宿？找景點？</h1><div class="text-center pb-5"><button class="bg-violet-700 text-violet-50 text-2xl px-5 py-3 min-w-80 rounded-full cursor-pointer" type="button">${serverRenderer_cjs_prodExports.ssrInterpolate(showHotels.value ? "改用景點找住宿地點" : "改用旅宿找附近景點")}</button></div>`);
      if (showHotels.value) {
        _push(`<div id="hotel-area" class="pt-5"><div class="text-center mb-5"><label for="city-select" class="bg-violet-100 text-violet-800 text-xl px-5 py-2 rounded-full"><select class="city-select" id="city-select"><option value="" disabled selected>選擇縣市</option><option value=""${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray(selectedCity.value) ? serverRenderer_cjs_prodExports.ssrLooseContain(selectedCity.value, "") : serverRenderer_cjs_prodExports.ssrLooseEqual(selectedCity.value, "")) ? " selected" : ""}>全部</option><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(cities.value, (city) => {
          _push(`<option${serverRenderer_cjs_prodExports.ssrRenderAttr("value", city)}${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray(selectedCity.value) ? serverRenderer_cjs_prodExports.ssrLooseContain(selectedCity.value, city) : serverRenderer_cjs_prodExports.ssrLooseEqual(selectedCity.value, city)) ? " selected" : ""}>${serverRenderer_cjs_prodExports.ssrInterpolate(city)}</option>`);
        });
        _push(`<!--]--></select></label></div><div><ul class="grid justify-self-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4"><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(displayHotels.value, (hotel) => {
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$3, {
            key: hotel.Id,
            item: hotel,
            onClick: ($event) => showDetails(hotel, "hotel")
          }, {
            default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="title text-2xl font-bold mb-2"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(hotel.Name)}</div><p class="min-h-[48px]"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(hotel.Add)}</p><ul${_scopeId}><li${_scopeId}>共有 ${serverRenderer_cjs_prodExports.ssrInterpolate(hotel.TotalNumberofRooms)} 間房間。</li><li${_scopeId}>${getPriceHtml(hotel) ?? ""}</li></ul>`);
              } else {
                return [
                  vueExports.createVNode("div", { class: "title text-2xl font-bold mb-2" }, vueExports.toDisplayString(hotel.Name), 1),
                  vueExports.createVNode("p", { class: "min-h-[48px]" }, vueExports.toDisplayString(hotel.Add), 1),
                  vueExports.createVNode("ul", null, [
                    vueExports.createVNode("li", null, "共有 " + vueExports.toDisplayString(hotel.TotalNumberofRooms) + " 間房間。", 1),
                    vueExports.createVNode("li", {
                      innerHTML: getPriceHtml(hotel)
                    }, null, 8, ["innerHTML"])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></ul></div></div>`);
      } else {
        _push(`<div id="scenic-area" class="pt-5"><div class="text-center mb-5"><label for="scenic-city-select" class="bg-violet-100 text-violet-800 text-xl px-5 py-2 rounded-full"><select class="city-select" id="scenic-city-select"><option value="" disabled selected>選擇縣市</option><option value=""${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray(selectedCity.value) ? serverRenderer_cjs_prodExports.ssrLooseContain(selectedCity.value, "") : serverRenderer_cjs_prodExports.ssrLooseEqual(selectedCity.value, "")) ? " selected" : ""}>全部</option><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(cities.value, (city) => {
          _push(`<option${serverRenderer_cjs_prodExports.ssrRenderAttr("value", city)}${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray(selectedCity.value) ? serverRenderer_cjs_prodExports.ssrLooseContain(selectedCity.value, city) : serverRenderer_cjs_prodExports.ssrLooseEqual(selectedCity.value, city)) ? " selected" : ""}>${serverRenderer_cjs_prodExports.ssrInterpolate(city)}</option>`);
        });
        _push(`<!--]--></select></label></div><div><ul class="grid justify-self-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4"><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(displayScenics.value, (scenic) => {
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$3, {
            key: scenic.Id,
            item: scenic,
            onClick: ($event) => showDetails(scenic, "scenic")
          }, {
            default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="title text-xl font-bold mb-2"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(scenic.Name)}</div><p class="min-h-[48px]"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(scenic.Add)}</p>`);
              } else {
                return [
                  vueExports.createVNode("div", { class: "title text-xl font-bold mb-2" }, vueExports.toDisplayString(scenic.Name), 1),
                  vueExports.createVNode("p", { class: "min-h-[48px]" }, vueExports.toDisplayString(scenic.Add), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></ul></div></div>`);
      }
      _push(`</main>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(Modal, {
        isOpen: !!selectedItem.value,
        onClose: closeModal
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<h2 class="text-2xl"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate((_a = selectedItem.value) == null ? void 0 : _a.Name)}</h2><div class="range-wrap" style="${serverRenderer_cjs_prodExports.ssrRenderStyle({ "--min": "5", "--max": "20", "--val": "10" })}"${_scopeId}><input id="range-input" type="range" min="5" max="20" list="dl"${serverRenderer_cjs_prodExports.ssrRenderAttr("value", distanceRange.value)}${_scopeId}><output for="range-input"${_scopeId}>10</output><label for="range-input"${_scopeId}>方圓 ${serverRenderer_cjs_prodExports.ssrInterpolate(distanceRange.value)} 公里內的${serverRenderer_cjs_prodExports.ssrInterpolate(dataType.value === "hotel" ? "景點" : "旅宿")}</label></div><div id="map-wrapper"${_scopeId}><div id="map"${_scopeId}></div></div><div id="description"${_scopeId}>`);
            serverRenderer_cjs_prodExports.ssrRenderVNode(_push2, vueExports.createVNode(vueExports.resolveDynamicComponent(isHotel.value ? "DetailHotel" : "DetailScenic"), { item: selectedItem.value }, null), _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("h2", { class: "text-2xl" }, vueExports.toDisplayString((_b = selectedItem.value) == null ? void 0 : _b.Name), 1),
              vueExports.createVNode("div", {
                class: "range-wrap",
                style: { "--min": "5", "--max": "20", "--val": "10" }
              }, [
                vueExports.withDirectives(vueExports.createVNode("input", {
                  id: "range-input",
                  type: "range",
                  min: "5",
                  max: "20",
                  list: "dl",
                  "onUpdate:modelValue": ($event) => distanceRange.value = $event,
                  onInput: updateNearbySpots
                }, null, 40, ["onUpdate:modelValue"]), [
                  [vueExports.vModelText, distanceRange.value]
                ]),
                vueExports.createVNode("output", { for: "range-input" }, "10"),
                vueExports.createVNode("label", { for: "range-input" }, "方圓 " + vueExports.toDisplayString(distanceRange.value) + " 公里內的" + vueExports.toDisplayString(dataType.value === "hotel" ? "景點" : "旅宿"), 1)
              ]),
              vueExports.createVNode("div", { id: "map-wrapper" }, [
                vueExports.createVNode("div", { id: "map" })
              ]),
              vueExports.createVNode("div", { id: "description" }, [
                (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(isHotel.value ? "DetailHotel" : "DetailScenic"), { item: selectedItem.value }, null, 8, ["item"]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$5, { loading: loading.value }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/taiwan/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.vue2.mjs.map
