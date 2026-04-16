(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/analytics.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "trackPlausibleEvent",
    ()=>trackPlausibleEvent
]);
function trackPlausibleEvent(eventName, props) {
    if (("TURBOPACK compile-time value", "object") === "undefined" || typeof window.plausible !== "function") {
        return;
    }
    const filteredProps = Object.fromEntries(Object.entries(props ?? {}).filter((entry)=>entry[1] !== undefined));
    window.plausible(eventName, {
        props: filteredProps
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/analytics/tracked-anchor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrackedAnchor",
    ()=>TrackedAnchor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/analytics.ts [app-client] (ecmascript)");
"use client";
;
;
;
const TrackedAnchor = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ eventName, eventProps, onClick, ...props }, ref)=>{
    const handleClick = (event)=>{
        if (eventName) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackPlausibleEvent"])(eventName, eventProps);
        }
        onClick?.(event);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        ref: ref,
        onClick: handleClick,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/analytics/tracked-anchor.tsx",
        lineNumber: 22,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = TrackedAnchor;
TrackedAnchor.displayName = "TrackedAnchor";
var _c, _c1;
__turbopack_context__.k.register(_c, "TrackedAnchor$forwardRef");
__turbopack_context__.k.register(_c1, "TrackedAnchor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/analytics/tracked-link.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrackedLink",
    ()=>TrackedLink
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/analytics.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const TrackedLink = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ eventName, eventProps, onClick, ...props }, ref)=>{
    const handleClick = (event)=>{
        if (eventName) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackPlausibleEvent"])(eventName, eventProps);
        }
        onClick?.(event);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        ref: ref,
        onClick: handleClick,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/analytics/tracked-link.tsx",
        lineNumber: 24,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = TrackedLink;
TrackedLink.displayName = "TrackedLink";
var _c, _c1;
__turbopack_context__.k.register(_c, "TrackedLink$forwardRef");
__turbopack_context__.k.register(_c1, "TrackedLink");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "absoluteHttpUrl",
    ()=>absoluteHttpUrl,
    "chunk",
    ()=>chunk,
    "cn",
    ()=>cn,
    "formatDisplayDate",
    ()=>formatDisplayDate,
    "formatMonthYear",
    ()=>formatMonthYear,
    "slugify",
    ()=>slugify,
    "titleCase",
    ()=>titleCase,
    "toSentenceCase",
    ()=>toSentenceCase,
    "unique",
    ()=>unique
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function slugify(value) {
    return value.toLowerCase().trim().replace(/['"]/g, "").replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function titleCase(value) {
    return value.replace(/\w\S*/g, (word)=>{
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
}
function toSentenceCase(value) {
    if (!value) {
        return value;
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
}
function unique(items) {
    return [
        ...new Set(items)
    ];
}
function formatDisplayDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(date);
}
function formatMonthYear(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return new Intl.DateTimeFormat("en-GB", {
        month: "long",
        year: "numeric"
    }).format(date);
}
function chunk(items, size) {
    const result = [];
    for(let index = 0; index < items.length; index += size){
        result.push(items.slice(index, index + size));
    }
    return result;
}
function absoluteHttpUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
    } catch  {
        return null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 rounded-xl border text-[15px] font-medium tracking-[-0.012em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "border-primary bg-primary text-primary-foreground shadow-[0_12px_26px_-18px_rgba(166,33,3,0.42)] hover:bg-primary/95",
            secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/85",
            outline: "border-border bg-card text-foreground hover:border-primary/25 hover:bg-muted",
            ghost: "border-transparent bg-transparent text-foreground hover:bg-foreground/4",
            link: "border-transparent bg-transparent p-0 text-primary underline-offset-4 hover:text-primary/80 hover:underline"
        },
        size: {
            default: "h-11 px-5",
            sm: "h-9 px-4 text-[14px]",
            lg: "h-12 px-6 text-[17px]",
            icon: "size-11"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/button.tsx",
        lineNumber: 49,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/site.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "absoluteUrl",
    ()=>absoluteUrl,
    "footerNavigation",
    ()=>footerNavigation,
    "getPhoneHref",
    ()=>getPhoneHref,
    "primaryNavigation",
    ()=>primaryNavigation,
    "siteConfig",
    ()=>siteConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const siteConfig = {
    name: "Glen Canopies",
    legalName: "Glen Canopies",
    title: "Premium canopy supply-and-fit specialists for homes and developments.",
    description: "Premium canopy supply-and-fit specialists for homes and developments across Northern Ireland.",
    baseUrl: ("TURBOPACK compile-time value", "http://127.0.0.1:3000")?.replace(/\/$/, "") ?? "http://localhost:3000",
    locale: "en_GB",
    region: "Northern Ireland",
    serviceArea: [
        "Northern Ireland"
    ],
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_BUSINESS_PHONE?.trim() ?? "",
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_BUSINESS_EMAIL?.trim() ?? "",
    plausibleDomain: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim() ?? "",
    instagramUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() ?? "",
    facebookUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_FACEBOOK_URL?.trim() ?? ""
};
const primaryNavigation = [
    {
        href: "/",
        label: "Home"
    },
    {
        href: "/about",
        label: "About & Services"
    },
    {
        href: "/recent-work",
        label: "Recent Work"
    },
    {
        href: "/developments",
        label: "Developments"
    },
    {
        href: "/faq",
        label: "FAQ"
    },
    {
        href: "/contact",
        label: "Contact"
    }
];
const footerNavigation = {
    services: [
        {
            href: "/services/canopies",
            label: "Canopies"
        },
        {
            href: "/services/canopies/roman-canopies",
            label: "Roman Canopies"
        },
        {
            href: "/services/canopies/small-lean-to-canopies",
            label: "Small Lean-To"
        },
        {
            href: "/services/canopies/large-lean-to-canopies",
            label: "Large Lean-To"
        },
        {
            href: "/services/canopies/apex-canopies",
            label: "Apex Canopies"
        },
        {
            href: "/services/door-surrounds",
            label: "Door Surrounds"
        },
        {
            href: "/services/columns",
            label: "Columns"
        },
        {
            href: "/services/pvc-sills",
            label: "PVC Sills"
        },
        {
            href: "/services/aluminium-sills",
            label: "Aluminium Sills"
        }
    ],
    company: [
        {
            href: "/about",
            label: "About & Services"
        },
        {
            href: "/developments",
            label: "Developments"
        },
        {
            href: "/recent-work",
            label: "Recent Work"
        },
        {
            href: "/contact",
            label: "Get a Quote"
        }
    ],
    legal: [
        {
            href: "/privacy-policy",
            label: "Privacy Policy"
        },
        {
            href: "/cookie-policy",
            label: "Cookie Policy"
        }
    ]
};
function absoluteUrl(path = "/") {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return new URL(cleanPath, siteConfig.baseUrl).toString();
}
function getPhoneHref(phone = siteConfig.phone) {
    return phone ? `tel:${phone.replace(/[^+\d]/g, "")}` : "";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/layout/mobile-sticky-cta.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MobileStickyCTA",
    ()=>MobileStickyCTA
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2d$more$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircleMore$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle-more.js [app-client] (ecmascript) <export default as MessageCircleMore>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$call$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneCall$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone-call.js [app-client] (ecmascript) <export default as PhoneCall>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analytics$2f$tracked$2d$anchor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/analytics/tracked-anchor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analytics$2f$tracked$2d$link$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/analytics/tracked-link.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/site.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
function MobileStickyCTA() {
    const phoneHref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPhoneHref"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none fixed inset-x-0 bottom-4 z-40 px-4 lg:hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "pointer-events-auto shell-container",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "surface-panel flex items-center gap-3 rounded-xl p-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        asChild: true,
                        className: "flex-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analytics$2f$tracked$2d$link$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackedLink"], {
                            eventName: "Quote CTA Clicked",
                            eventProps: {
                                location: "mobile-sticky"
                            },
                            href: "/contact",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2d$more$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircleMore$3e$__["MessageCircleMore"], {}, void 0, false, {
                                    fileName: "[project]/components/layout/mobile-sticky-cta.tsx",
                                    lineNumber: 23,
                                    columnNumber: 15
                                }, this),
                                "Get a Quote"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/mobile-sticky-cta.tsx",
                            lineNumber: 18,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/layout/mobile-sticky-cta.tsx",
                        lineNumber: 17,
                        columnNumber: 11
                    }, this),
                    phoneHref ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        asChild: true,
                        className: "min-w-0 flex-1",
                        variant: "outline",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analytics$2f$tracked$2d$anchor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackedAnchor"], {
                            eventName: "Phone CTA Clicked",
                            eventProps: {
                                location: "mobile-sticky"
                            },
                            href: phoneHref,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$call$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneCall$3e$__["PhoneCall"], {}, void 0, false, {
                                    fileName: "[project]/components/layout/mobile-sticky-cta.tsx",
                                    lineNumber: 34,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "truncate",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].phone
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/mobile-sticky-cta.tsx",
                                    lineNumber: 35,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/mobile-sticky-cta.tsx",
                            lineNumber: 29,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/layout/mobile-sticky-cta.tsx",
                        lineNumber: 28,
                        columnNumber: 13
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/mobile-sticky-cta.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/layout/mobile-sticky-cta.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/layout/mobile-sticky-cta.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = MobileStickyCTA;
var _c;
__turbopack_context__.k.register(_c, "MobileStickyCTA");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/layout/brand-logo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BrandLogo",
    ()=>BrandLogo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
function BrandLogo({ src = "/brand/glen-canopies-logo.png", href = "/", width = 240, height = 112, className = "w-[164px] md:w-[190px]", style }) {
    const logo = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative block shrink-0", className),
        style: {
            aspectRatio: `${width} / ${height}`,
            ...style
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: src,
            alt: "Glen Canopies",
            fill: true,
            className: "object-contain object-center",
            priority: true,
            sizes: `${width}px`
        }, void 0, false, {
            fileName: "[project]/components/layout/brand-logo.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/layout/brand-logo.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
    return href ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        className: "flex items-center",
        href: href,
        children: logo
    }, void 0, false, {
        fileName: "[project]/components/layout/brand-logo.tsx",
        lineNumber: 40,
        columnNumber: 17
    }, this) : logo;
}
_c = BrandLogo;
var _c;
__turbopack_context__.k.register(_c, "BrandLogo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/layout/site-header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteHeader",
    ()=>SiteHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$call$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneCall$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone-call.js [app-client] (ecmascript) <export default as PhoneCall>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analytics$2f$tracked$2d$anchor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/analytics/tracked-anchor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analytics$2f$tracked$2d$link$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/analytics/tracked-link.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$brand$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/brand-logo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/site.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
const MAX_HEADER_HEIGHT = 11;
const MIN_HEADER_HEIGHT = 6.1;
const MAX_VERTICAL_PADDING = 1.25;
const MIN_VERTICAL_PADDING = 0.95;
const SCROLL_DISTANCE = 260;
const FROST_START = 0.08;
function SiteHeader({ logoSrc }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const mobileMenuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const phoneHref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPhoneHref"])();
    const [scrollProgress, setScrollProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const isHome = pathname === "/";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            mobileMenuRef.current?.removeAttribute("open");
        }
    }["SiteHeader.useEffect"], [
        pathname
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            let frame = 0;
            const updateScrollState = {
                "SiteHeader.useEffect.updateScrollState": ()=>{
                    const nextProgress = Math.min(window.scrollY / SCROLL_DISTANCE, 1);
                    setScrollProgress({
                        "SiteHeader.useEffect.updateScrollState": (current)=>Math.abs(current - nextProgress) > 0.002 ? nextProgress : current
                    }["SiteHeader.useEffect.updateScrollState"]);
                    frame = 0;
                }
            }["SiteHeader.useEffect.updateScrollState"];
            updateScrollState();
            const onScroll = {
                "SiteHeader.useEffect.onScroll": ()=>{
                    if (frame) {
                        return;
                    }
                    frame = window.requestAnimationFrame(updateScrollState);
                }
            }["SiteHeader.useEffect.onScroll"];
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            return ({
                "SiteHeader.useEffect": ()=>{
                    window.removeEventListener("scroll", onScroll);
                    if (frame) {
                        window.cancelAnimationFrame(frame);
                    }
                }
            })["SiteHeader.useEffect"];
        }
    }["SiteHeader.useEffect"], []);
    const headerHeight = MAX_HEADER_HEIGHT - (MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT) * scrollProgress;
    const verticalPadding = MAX_VERTICAL_PADDING - (MAX_VERTICAL_PADDING - MIN_VERTICAL_PADDING) * scrollProgress;
    const frostProgress = Math.min(Math.max((scrollProgress - FROST_START) / (1 - FROST_START), 0), 1);
    const headerBackgroundAlpha = isHome ? frostProgress : 1;
    const headerBorderAlpha = isHome ? 0.1 * frostProgress : 0.1;
    const headerShadowAlpha = isHome ? 0.48 * frostProgress : 0.38;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "SiteHeader.useLayoutEffect": ()=>{
            document.documentElement.style.setProperty("--site-header-height", `${headerHeight}rem`);
            return ({
                "SiteHeader.useLayoutEffect": ()=>{
                    document.documentElement.style.setProperty("--site-header-height", `${MAX_HEADER_HEIGHT}rem`);
                }
            })["SiteHeader.useLayoutEffect"];
        }
    }["SiteHeader.useLayoutEffect"], [
        headerHeight
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 border-b",
        style: {
            backgroundColor: `rgba(29, 29, 29, ${headerBackgroundAlpha})`,
            borderColor: `rgba(255, 255, 255, ${headerBorderAlpha})`,
            boxShadow: `0 18px 40px -28px rgba(17, 17, 17, ${headerShadowAlpha})`
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "shell-container-wide flex min-h-[var(--site-header-height)] items-center justify-between gap-4",
            style: {
                paddingBlock: `${verticalPadding}rem`
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$brand$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrandLogo"], {
                    src: logoSrc,
                    className: "origin-left h-[calc(var(--site-header-height)-0.65rem)] w-[11.25rem] sm:w-[12rem] md:w-[12.75rem] lg:w-[13.5rem] xl:w-[14rem]"
                }, void 0, false, {
                    fileName: "[project]/components/layout/site-header.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "hidden items-center gap-8 lg:flex",
                    "aria-label": "Primary",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["primaryNavigation"].map((item)=>{
                        const active = item.href === "/" ? pathname === item.href : item.href === "/about" ? pathname.startsWith("/about") || pathname.startsWith("/services") : pathname.startsWith(item.href);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: item.href,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[15px] font-medium tracking-[-0.01em] text-white/72 transition-colors hover:text-[#F2BD1D]", active && "text-[#F2BD1D]"),
                            children: item.label
                        }, item.href, false, {
                            fileName: "[project]/components/layout/site-header.tsx",
                            lineNumber: 115,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/layout/site-header.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hidden items-center gap-3 lg:flex",
                    children: [
                        phoneHref ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            asChild: true,
                            variant: "ghost",
                            size: "sm",
                            className: "border border-white/12 bg-white/5 text-white hover:bg-white/10 hover:text-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analytics$2f$tracked$2d$anchor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackedAnchor"], {
                                eventName: "Phone CTA Clicked",
                                eventProps: {
                                    location: "header"
                                },
                                href: phoneHref,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$call$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneCall$3e$__["PhoneCall"], {}, void 0, false, {
                                        fileName: "[project]/components/layout/site-header.tsx",
                                        lineNumber: 141,
                                        columnNumber: 17
                                    }, this),
                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].phone
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/layout/site-header.tsx",
                                lineNumber: 136,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/layout/site-header.tsx",
                            lineNumber: 130,
                            columnNumber: 13
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            asChild: true,
                            size: "sm",
                            className: "!border-[#F2BD1D] !bg-[#F2BD1D] !text-[#1D1D1D] hover:!border-[#d4a20f] hover:!bg-[#d4a20f] hover:!text-[#1D1D1D]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analytics$2f$tracked$2d$link$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackedLink"], {
                                eventName: "Quote CTA Clicked",
                                eventProps: {
                                    location: "header"
                                },
                                href: "/contact",
                                children: "Get a Free Quote"
                            }, void 0, false, {
                                fileName: "[project]/components/layout/site-header.tsx",
                                lineNumber: 151,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/layout/site-header.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/layout/site-header.tsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                    ref: mobileMenuRef,
                    className: "group lg:hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                            className: "flex size-11 cursor-pointer list-none items-center justify-center rounded-xl border border-white/14 bg-white/8 text-white transition-colors hover:bg-white/12 hover:text-white [&::-webkit-details-marker]:hidden",
                            "aria-controls": "mobile-menu",
                            "aria-label": "Open menu",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                className: "size-5"
                            }, void 0, false, {
                                fileName: "[project]/components/layout/site-header.tsx",
                                lineNumber: 166,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/layout/site-header.tsx",
                            lineNumber: 161,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-x-0 top-full border-t border-white/10 bg-[#1D1D1D] px-6 py-6 shadow-[0_24px_60px_-44px_rgba(17,17,17,0.42)]",
                            id: "mobile-menu",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "shell-container flex flex-col gap-3",
                                "aria-label": "Mobile",
                                children: [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["primaryNavigation"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: item.href,
                                            className: "rounded-xl px-4 py-3 text-[15px] font-medium tracking-[-0.01em] text-white/82 transition-colors hover:bg-white/8 hover:text-[#F2BD1D]",
                                            onClick: ()=>mobileMenuRef.current?.removeAttribute("open"),
                                            children: item.label
                                        }, item.href, false, {
                                            fileName: "[project]/components/layout/site-header.tsx",
                                            lineNumber: 174,
                                            columnNumber: 17
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 flex flex-col gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                asChild: true,
                                                className: "!border-[#F2BD1D] !bg-[#F2BD1D] !text-[#1D1D1D] hover:!border-[#d4a20f] hover:!bg-[#d4a20f] hover:!text-[#1D1D1D]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analytics$2f$tracked$2d$link$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackedLink"], {
                                                    eventName: "Quote CTA Clicked",
                                                    eventProps: {
                                                        location: "mobile-menu"
                                                    },
                                                    href: "/contact",
                                                    onClick: ()=>mobileMenuRef.current?.removeAttribute("open"),
                                                    children: "Get a Free Quote"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/site-header.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/site-header.tsx",
                                                lineNumber: 184,
                                                columnNumber: 17
                                            }, this),
                                            phoneHref ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                asChild: true,
                                                variant: "outline",
                                                className: "border-white/14 bg-white/8 text-white hover:bg-white/12 hover:text-white",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analytics$2f$tracked$2d$anchor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackedAnchor"], {
                                                    eventName: "Phone CTA Clicked",
                                                    eventProps: {
                                                        location: "mobile-menu"
                                                    },
                                                    href: phoneHref,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$call$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneCall$3e$__["PhoneCall"], {}, void 0, false, {
                                                            fileName: "[project]/components/layout/site-header.tsx",
                                                            lineNumber: 208,
                                                            columnNumber: 23
                                                        }, this),
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].phone
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/layout/site-header.tsx",
                                                    lineNumber: 203,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/site-header.tsx",
                                                lineNumber: 198,
                                                columnNumber: 19
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/layout/site-header.tsx",
                                        lineNumber: 183,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/layout/site-header.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/layout/site-header.tsx",
                            lineNumber: 168,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/layout/site-header.tsx",
                    lineNumber: 160,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/layout/site-header.tsx",
            lineNumber: 97,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/layout/site-header.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
_s(SiteHeader, "E8rBNwpTWU3fIVQ975PJ17VwARA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = SiteHeader;
var _c;
__turbopack_context__.k.register(_c, "SiteHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_010qm~e._.js.map