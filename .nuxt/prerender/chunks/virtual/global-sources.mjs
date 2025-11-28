const sources = [
    {
        "context": {
            "name": "sitemap:urls",
            "description": "Set with the `sitemap.urls` config."
        },
        "urls": [],
        "sourceType": "user"
    },
    {
        "context": {
            "name": "nuxt:pages",
            "description": "Generated from your static page files.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:pages'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/about"
            },
            {
                "loc": "/favorites"
            },
            {
                "loc": "/"
            },
            {
                "loc": "/taiwan"
            }
        ],
        "sourceType": "app"
    },
    {
        "context": {
            "name": "nuxt:prerender",
            "description": "Generated at build time when prerendering.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:prerender'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/",
                "images": [
                    {
                        "loc": "https://cjzopen.github.io/images/hiking.webp"
                    }
                ]
            },
            {
                "loc": "/trip-inn/favorites"
            },
            {
                "loc": "/about",
                "images": [
                    {
                        "loc": "https://cjzopen.github.io/images/fixing.webp"
                    }
                ]
            },
            {
                "loc": "/favorites"
            },
            {
                "loc": "/trip-inn/taiwan"
            },
            {
                "loc": "/taiwan"
            }
        ],
        "sourceType": "app"
    }
];

export { sources };
//# sourceMappingURL=global-sources.mjs.map
