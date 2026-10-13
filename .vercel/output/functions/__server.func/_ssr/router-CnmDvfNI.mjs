import { r as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime, n as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { L as redirect, _ as Link, f as createRouter, g as createRootRouteWithContext, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, v as useNavigate, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { t as supabase } from "./client-5zlw-uz9.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { a as Lock, c as CircleCheck, i as LogOut, l as ArrowRight, n as Shield, o as HeartPulse, r as ShieldCheck, s as HeartHandshake, t as UsersRound } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coordinators-DGSkuc9V.js
var coordinators = [
	{
		name: "Haris",
		area: "Mudur",
		display: "+91 96337 25868",
		wa: "919633725868",
		tel: "+919633725868"
	},
	{
		name: "Nisam",
		area: "Karuvarakundu",
		display: "+91 96450 71082",
		wa: "919645071082",
		tel: "+919645071082"
	},
	{
		name: "Rashid Chola",
		area: "",
		display: "+91 8129554442",
		wa: "918129554442",
		tel: "+918129554442"
	}
];
var bloodGroups = [
	"A+",
	"A-",
	"B+",
	"B-",
	"AB+",
	"AB-",
	"O+",
	"O-"
];
var malappuramPlaces = [
	"Malappuram",
	"Manjeri",
	"Perinthalmanna",
	"Karuvarakundu",
	"Mudur",
	"Ariyanthodika",
	"Nilambur",
	"Wandoor",
	"Kondotty",
	"Tirur",
	"Tirurangadi",
	"Ponnani",
	"Kottakkal",
	"Edappal",
	"Melattur",
	"Mankada",
	"Areekode",
	"Vazhakkad",
	"Vengara",
	"Parappanangadi",
	"Valanchery",
	"Kuttippuram",
	"Thootha",
	"Pandikkad",
	"Other"
];
function whatsappHelpLink(c, group) {
	const text = group ? `Hello ${c.name}, I urgently need ${group} blood. Can you help me through the Indian Youth Congress Malappuram blood bank?` : `Hello ${c.name}, I urgently need blood. Can you help me through the Indian Youth Congress Malappuram blood bank?`;
	return `https://wa.me/${c.wa}?text=${encodeURIComponent(text)}`;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-CnmDvfNI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-Dl5hkt29.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var iyc_logo_default = "/assets/iyc-logo-DzdVJQr8.png";
function isInvalidCredentialsError(error) {
	const code = error.code?.toLowerCase() ?? "";
	const message = error.message?.toLowerCase() ?? "";
	return code === "invalid_credentials" || message.includes("invalid login credentials") || message.includes("invalid email or password");
}
/** Confirms admin via public.user_roles and has_role(). Throws on Supabase errors. */
async function fetchIsAdmin(userId) {
	const { data: roleRow, error: tableError } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
	if (tableError) throw tableError;
	const { data: hasRole, error: rpcError } = await supabase.rpc("has_role", {
		_user_id: userId,
		_role: "admin"
	});
	if (rpcError) throw rpcError;
	return roleRow?.role === "admin" && hasRole === true;
}
var links = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/donate",
		label: "Donate Blood"
	},
	{
		to: "/need-blood",
		label: "Need Blood"
	},
	{
		to: "/about",
		label: "About"
	}
];
function SiteHeader() {
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		async function syncAdmin(userId) {
			if (!userId) {
				if (!cancelled) setIsAdmin(false);
				return;
			}
			try {
				const admin = await fetchIsAdmin(userId);
				if (!cancelled) setIsAdmin(admin);
			} catch {
				if (!cancelled) setIsAdmin(false);
			}
		}
		supabase.auth.getSession().then(({ data }) => {
			syncAdmin(data.session?.user.id);
		});
		const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
			syncAdmin(session?.user.id);
		});
		return () => {
			cancelled = true;
			listener.subscription.unsubscribe();
		};
	}, []);
	async function signOut() {
		setOpen(false);
		setIsAdmin(false);
		await supabase.auth.signOut();
		navigate({
			to: "/",
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 tricolour-rule" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl items-center gap-3 px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-3",
						onClick: () => setOpen(false),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: iyc_logo_default,
							alt: "Indian Youth Congress Malappuram logo",
							width: 48,
							height: 48,
							className: "h-11 w-11"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-display text-sm font-bold uppercase tracking-wide text-primary sm:text-base",
								children: "Indian Youth Congress"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs uppercase tracking-[0.2em] text-secondary",
								children: "Malappuram"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "ml-auto hidden items-center gap-1 md:flex",
						children: [
							links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: l.to,
								activeOptions: { exact: l.to === "/" },
								activeProps: { className: "bg-muted text-primary" },
								className: "rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-muted",
								children: l.label
							}, l.to)),
							isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/admin",
								className: "ml-2 inline-flex items-center gap-1.5 rounded-md border border-primary/25 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
									className: "h-3.5 w-3.5",
									"aria-hidden": true
								}), "Admin"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void signOut(),
								className: "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold text-foreground/70 transition-colors hover:bg-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
									className: "h-3.5 w-3.5",
									"aria-hidden": true
								}), "Logout"]
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/auth",
								className: "ml-2 inline-flex items-center gap-1.5 rounded-md border border-primary/20 px-3 py-2 text-sm font-semibold text-primary/80 transition-colors hover:bg-muted hover:text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
									className: "h-3.5 w-3.5",
									"aria-hidden": true
								}), "Admin Login"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/donate",
								className: "ml-1 rounded-md bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground transition-opacity hover:opacity-90",
								children: "Register as Donor"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Toggle navigation",
						"aria-expanded": open,
						onClick: () => setOpen((v) => !v),
						className: "ml-auto rounded-md border border-border px-3 py-2 text-sm font-semibold md:hidden",
						children: "Menu"
					})
				]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "border-t border-border bg-card px-4 py-2 md:hidden",
				children: [
					links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						onClick: () => setOpen(false),
						className: "block rounded-md px-2 py-3 text-sm font-semibold text-foreground/85",
						children: l.label
					}, l.to)),
					isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin",
						onClick: () => setOpen(false),
						className: "flex items-center gap-2 rounded-md px-2 py-3 text-sm font-semibold text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
							className: "h-4 w-4",
							"aria-hidden": true
						}), "Admin Dashboard"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void signOut(),
						className: "flex w-full items-center gap-2 rounded-md px-2 py-3 text-left text-sm font-semibold text-foreground/80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
							className: "h-4 w-4",
							"aria-hidden": true
						}), "Logout"]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/auth",
						onClick: () => setOpen(false),
						className: "flex items-center gap-2 rounded-md px-2 py-3 text-sm font-semibold text-primary/85",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
							className: "h-4 w-4",
							"aria-hidden": true
						}), "Admin Login"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/donate",
						onClick: () => setOpen(false),
						className: "mt-1 mb-2 block rounded-md bg-secondary px-3 py-2.5 text-center text-sm font-bold text-secondary-foreground",
						children: "Register as Donor"
					})
				]
			})
		]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-20 border-t border-border bg-primary text-primary-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 tricolour-rule" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-bold",
							children: "Indian Youth Congress Malappuram"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-primary-foreground/75",
							children: "The youth wing of the Indian National Congress in Malappuram district, Kerala. Our volunteer blood network connects patients with willing donors, free of cost, round the clock."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-primary-foreground/60",
							children: "Campaign organisers: Nizam Karuvarakundu & Rishan"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-bold",
						children: "Quick links"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/donate",
								className: "text-primary-foreground/80 hover:underline",
								children: "Register as a donor"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/need-blood",
								className: "text-primary-foreground/80 hover:underline",
								children: "I need blood urgently"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/about",
								className: "text-primary-foreground/80 hover:underline",
								children: "About Indian Youth Congress"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								className: "text-primary-foreground/60 hover:underline",
								children: "Admin login"
							}) })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-bold",
						children: "Blood help desk"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2 text-sm",
						children: coordinators.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "text-primary-foreground/80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold",
								children: [
									c.name,
									" ",
									c.area
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `tel:${c.tel}`,
								className: "block hover:underline",
								children: c.display
							})]
						}, c.wa))
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-primary-foreground/15 px-4 py-5 text-center text-xs text-primary-foreground/60",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Indian Youth Congress Malappuram. Donor details are kept strictly confidential and are visible only to authorised coordinators."
				]
			})
		]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Blood Donation — Indian Youth Congress Malappuram" },
			{
				name: "description",
				content: "Volunteer blood donor network of the Indian Youth Congress Malappuram. Register as a donor or contact a coordinator for urgent blood needs."
			},
			{
				name: "author",
				content: "Indian Youth Congress Malappuram"
			},
			{
				property: "og:title",
				content: "Blood Donation — Indian Youth Congress Malappuram"
			},
			{
				property: "og:description",
				content: "Register as a blood donor or reach a coordinator on WhatsApp for urgent blood requirements in Malappuram."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.PNG",
				type: "image/png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Karla:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
			]
		})
	});
}
var hero_default = "/assets/hero-Dat6ptgd.webp";
var action_default = "/assets/action-xFU6lA4I.webp";
function WhatsappContacts({ group, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: compact ? "grid gap-4 sm:grid-cols-2" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
		children: coordinators.map((c, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: `rounded-xl border border-border bg-card p-5 shadow-card ${compact && coordinators.length % 2 === 1 && index === coordinators.length - 1 ? "sm:col-span-2" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-bold text-primary",
					children: c.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold uppercase tracking-wide text-secondary",
					children: c.area
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `tel:${c.tel}`,
					className: "mt-3 block text-sm font-semibold text-foreground hover:underline",
					children: c.display
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: whatsappHelpLink(c, group),
						target: "_blank",
						rel: "noopener noreferrer",
						className: "flex-1 rounded-md bg-whatsapp px-3 py-2 text-center text-sm font-bold text-whatsapp-foreground transition-opacity hover:opacity-90",
						children: "WhatsApp"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `tel:${c.tel}`,
						className: "rounded-md border border-border px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted",
						children: "Call"
					})]
				})
			]
		}, c.wa))
	});
}
var Route$6 = createFileRoute("/")({
	codeSplitGroupings: [],
	head: () => ({ meta: [
		{ title: "Blood Donation — Indian Youth Congress Malappuram" },
		{
			name: "description",
			content: "A volunteer blood donor network by Indian Youth Congress Malappuram. Register as a donor, or contact a coordinator when you urgently need blood."
		},
		{
			property: "og:title",
			content: "Blood Donation — Indian Youth Congress Malappuram"
		},
		{
			property: "og:description",
			content: "Register as a blood donor or reach a coordinator on WhatsApp for urgent blood requirements in Malappuram."
		}
	] }),
	component: Index
});
var steps = [
	{
		number: "01",
		title: "Register once",
		body: "Add your name, blood group and place to our confidential donor register."
	},
	{
		number: "02",
		title: "We contact you",
		body: "When a patient needs your blood group, a coordinator contacts you directly."
	},
	{
		number: "03",
		title: "You help save a life",
		body: "Your voluntary donation can make a life-changing difference to someone in need."
	}
];
var reasons = [
	{
		icon: HeartPulse,
		title: "Every drop matters",
		body: "A voluntary donor can offer meaningful support when a patient and family need it most."
	},
	{
		icon: UsersRound,
		title: "A local network",
		body: "A shared donor register helps authorised coordinators look for suitable support across Malappuram."
	},
	{
		icon: HeartHandshake,
		title: "Community care",
		body: "Small acts of service can make the search for blood feel less difficult during an emergency."
	}
];
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative isolate min-h-155 overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_default,
						alt: "Volunteers and a nurse at an Indian Youth Congress blood donation camp",
						width: 1920,
						height: 1088,
						className: "absolute inset-0 h-full w-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 hero-overlay" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative mx-auto flex min-h-155 max-w-6xl items-center px-4 py-24 sm:py-32 lg:py-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-3xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold uppercase tracking-[0.3em] text-accent sm:text-sm",
									children: "Indian Youth Congress · Malappuram"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl",
									children: "One donation can give someone one more tomorrow."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 max-w-2xl text-base leading-7 text-primary-foreground/90 sm:text-lg sm:leading-8",
									children: "A few minutes of your time can make a life-changing difference. Register as a voluntary blood donor and help us connect people in need with possible donor support across Malappuram."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 flex flex-wrap gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/donate",
										className: "rounded-md bg-secondary px-6 py-3 font-display text-base font-bold text-secondary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90",
										children: "Become a Donor"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/need-blood",
										className: "rounded-md border border-primary-foreground/40 bg-primary/40 px-6 py-3 font-display text-base font-bold text-primary-foreground backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-primary/60",
										children: "I Need Blood Now"
									})]
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-border bg-primary px-4 py-12 text-primary-foreground sm:py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[auto_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: iyc_logo_default,
						alt: "Indian Youth Congress logo",
						width: 92,
						height: 92,
						className: "h-20 w-20 rounded-full bg-primary-foreground/10 p-2 ring-1 ring-primary-foreground/20"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-[0.25em] text-accent",
							children: "IYC Malappuram"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-2xl font-bold sm:text-3xl",
							children: "Youth participation, community service, and blood donation."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-3xl leading-7 text-primary-foreground/75",
							children: "This initiative carries the community spirit of Indian Youth Congress into a practical local service: helping voluntary donors and people seeking blood find a clearer path to one another."
						})
					] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-border bg-muted/45 px-4 py-20 sm:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-[0.25em] text-secondary",
							children: "Why blood donation matters"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 max-w-2xl font-display text-3xl font-bold text-primary sm:text-4xl",
							children: "Your willingness to help can reach far beyond one moment."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid gap-5 md:grid-cols-3",
							children: reasons.map(({ icon: Icon, title, body }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "card-hover rounded-xl border border-border bg-card p-6 shadow-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "h-6 w-6 text-secondary",
										"aria-hidden": true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-5 font-display text-xl font-bold text-primary",
										children: title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm leading-6 text-muted-foreground",
										children: body
									})
								]
							}, title))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:py-28 lg:grid-cols-[1.05fr_0.95fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-[0.25em] text-secondary",
						children: "Our community initiative"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 max-w-xl font-display text-3xl font-bold text-primary sm:text-4xl",
						children: "Connecting Donors With Those Who Need Them"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-base leading-7 text-muted-foreground",
						children: "This initiative is a community-focused blood donor network supported by Indian Youth Congress, Malappuram, created to help connect voluntary blood donors with people who urgently need blood."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-6 space-y-3 text-sm leading-6 text-foreground/80",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									className: "mt-1 h-4 w-4 shrink-0 text-success",
									"aria-hidden": true
								}), "People can register as voluntary blood donors, and their details are securely maintained."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
									className: "mt-1 h-4 w-4 shrink-0 text-success",
									"aria-hidden": true
								}), "Authorised coordinators can identify suitable donors and contact them when their blood group is needed."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, {
									className: "mt-1 h-4 w-4 shrink-0 text-success",
									"aria-hidden": true
								}), "People who urgently need blood can reach the help desk. The goal is to make blood support easier to find across Malappuram when it matters most."]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/donate",
						className: "group mt-8 inline-flex items-center gap-2 rounded-md bg-secondary px-5 py-3 font-display text-sm font-bold text-secondary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90",
						children: [
							"Become a Donor",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								className: "h-4 w-4 transition-transform group-hover:translate-x-1",
								"aria-hidden": true
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-2xl shadow-lift",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_default,
						alt: "Volunteers and a nurse at an Indian Youth Congress blood donation camp",
						width: 1920,
						height: 1088,
						className: "aspect-4/3 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-x-0 bottom-0 bg-primary/85 px-5 py-4 text-sm font-semibold text-primary-foreground",
						children: "A local network built around voluntary service."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-border bg-muted/40 px-4 py-20 sm:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-[0.25em] text-secondary",
							children: "Simple process"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl font-bold text-primary sm:text-4xl",
							children: "How it works"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-2xl text-muted-foreground",
							children: "The network helps make the next step clear for donors, coordinators, and people seeking blood."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-10 grid gap-5 md:grid-cols-3",
							children: steps.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "card-hover rounded-xl border border-border bg-card p-6 shadow-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex h-11 w-11 items-center justify-center rounded-full bg-secondary font-display font-bold text-secondary-foreground",
										children: step.number
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-5 font-display text-xl font-bold text-primary",
										children: step.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm leading-6 text-muted-foreground",
										children: step.body
									})
								]
							}, step.number))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-4 py-20 sm:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-[0.25em] text-secondary",
							children: "Every donor matters"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-2xl font-bold text-primary sm:text-3xl",
							children: "Every blood group matters."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted-foreground",
							children: "The network welcomes voluntary donors across all major blood groups."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8",
					children: bloodGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-lg border border-border bg-card py-5 text-center font-display text-xl font-bold text-secondary shadow-card transition-all hover:-translate-y-1 hover:shadow-lg",
						children: group
					}, group))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-border bg-muted/45 px-4 py-20 sm:py-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: action_default,
						alt: "Shri Rahul Gandhi",
						width: 720,
						height: 297,
						className: "w-full rounded-2xl object-cover shadow-lift"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-[0.25em] text-secondary",
							children: "Our inspiration"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-3xl font-bold text-primary sm:text-4xl",
							children: "Indian Youth Congress"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-base leading-7 text-muted-foreground",
							children: "Indian Youth Congress is the youth wing of the Indian National Congress. The organisation emphasizes youth participation, community engagement, and social service."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-base leading-7 text-muted-foreground",
							children: "Rahul Gandhi is described by IYC as a source of inspiration for the organisation and its youth-oriented vision."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 border-l-2 border-accent pl-4 text-sm font-semibold leading-6 text-primary",
							children: "Inspired by a spirit of youth participation and service, our Malappuram initiative focuses on one simple goal: helping people find blood when they need it most."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/donate",
							className: "group mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-secondary",
							children: [
								"Join Our Donor Network",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									className: "h-4 w-4 transition-transform group-hover:translate-x-1",
									"aria-hidden": true
								})
							]
						})
					] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 py-20 sm:py-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-[0.25em] text-secondary",
							children: "Need urgent help?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-2xl font-bold text-primary sm:text-3xl",
							children: "Blood help desk — Call or WhatsApp"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted-foreground",
							children: "Patients and relatives can reach our coordinators directly for urgent blood requirements."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsappContacts, {})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-t border-border bg-primary px-4 py-16 text-center text-primary-foreground sm:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-[0.25em] text-accent",
						children: "Be someone's hope"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-3xl font-bold sm:text-4xl",
						children: "Ready to become a blood donor?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-3 max-w-2xl text-primary-foreground/75",
						children: "Register your details today. When someone needs your blood group, authorised coordinators can contact you."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/donate",
						className: "mt-7 inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-3 font-display text-sm font-bold text-secondary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90",
						children: ["Become a Donor ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							className: "h-4 w-4",
							"aria-hidden": true
						})]
					})
				]
			})
		]
	});
}
var $$splitComponentImporter$5 = () => import("./route-Di7iQBCH.mjs");
var Route$5 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		let isAdmin = false;
		try {
			isAdmin = await fetchIsAdmin(data.user.id);
		} catch {
			await supabase.auth.signOut();
			throw redirect({ to: "/auth" });
		}
		if (!isAdmin) {
			await supabase.auth.signOut();
			throw redirect({ to: "/auth" });
		}
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./about-DE9ZMpG-.mjs");
var Route$4 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About Indian Youth Congress Malappuram | Blood Donation Wing" },
		{
			name: "description",
			content: "The Indian Youth Congress is the youth wing of the Indian National Congress, founded in 1960. Learn about our Malappuram unit and its volunteer blood donation network."
		},
		{
			property: "og:title",
			content: "About Indian Youth Congress Malappuram"
		},
		{
			property: "og:description",
			content: "The youth wing of the Indian National Congress in Malappuram district, running a volunteer blood donor network."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./auth-D3zxPwRH.mjs");
var Route$3 = createFileRoute("/auth")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Admin Login | IYC Malappuram Blood Bank" },
		{
			name: "description",
			content: "Secure administrator login for Indian Youth Congress Malappuram Blood Bank coordinators."
		},
		{
			property: "og:title",
			content: "Admin Login | IYC Malappuram Blood Bank"
		},
		{
			property: "og:description",
			content: "Authorised administrators only. Donor data is confidential."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./donate-WLyeFnDA.mjs");
var Route$2 = createFileRoute("/donate")({
	head: () => ({ meta: [
		{ title: "Donate Blood — Register as a Donor | IYC Malappuram" },
		{
			name: "description",
			content: "Register with the Indian Youth Congress Malappuram blood donor network. Add your blood group and place so our coordinators can reach you when a patient needs help."
		},
		{
			property: "og:title",
			content: "Donate Blood — IYC Malappuram Blood Bank"
		},
		{
			property: "og:description",
			content: "Join the Indian Youth Congress Malappuram donor registry. Every drop you give brings hope."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./need-blood-CXNmHoER.mjs");
var Route$1 = createFileRoute("/need-blood")({
	head: () => ({ meta: [
		{ title: "Need Blood Urgently? Contact Our Coordinators | IYC Malappuram" },
		{
			name: "description",
			content: "Need blood in Malappuram? WhatsApp or call an Indian Youth Congress Malappuram blood coordinator directly, any time of day."
		},
		{
			property: "og:title",
			content: "Need Blood Urgently? — IYC Malappuram"
		},
		{
			property: "og:description",
			content: "Reach an Indian Youth Congress Malappuram blood coordinator on WhatsApp for urgent donor support."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitErrorComponentImporter = () => import("./admin-zr748GLm.mjs");
var $$splitComponentImporter = () => import("./admin-D5AXauu3.mjs");
var Route = createFileRoute("/_authenticated/admin")({
	head: () => ({ meta: [
		{ title: "Blood Bank Registry — Admin | IYC Malappuram" },
		{
			name: "description",
			content: "Private donor registry for authorised Indian Youth Congress Malappuram admins."
		},
		{
			property: "og:title",
			content: "Blood Bank Registry — Admin"
		},
		{
			property: "og:description",
			content: "Authorised admins only."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
var IndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$7
});
var AuthenticatedRouteRoute = Route$5.update({
	id: "/_authenticated",
	getParentRoute: () => Route$7
});
var AboutRoute = Route$4.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$7
});
var AuthRoute = Route$3.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$7
});
var DonateRoute = Route$2.update({
	id: "/donate",
	path: "/donate",
	getParentRoute: () => Route$7
});
var NeedBloodRoute = Route$1.update({
	id: "/need-blood",
	path: "/need-blood",
	getParentRoute: () => Route$7
});
var AuthenticatedRouteRouteChildren = { AuthenticatedAdminRoute: Route.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AboutRoute,
	AuthRoute,
	DonateRoute,
	NeedBloodRoute
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { fetchIsAdmin as a, malappuramPlaces as i, WhatsappContacts as n, isInvalidCredentialsError as o, bloodGroups as r, router_exports as t };
