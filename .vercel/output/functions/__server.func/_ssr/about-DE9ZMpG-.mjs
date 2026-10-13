import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-DE9ZMpG-.js
var import_jsx_runtime = require_jsx_runtime();
var facts = [
	{
		label: "Indian National Congress founded",
		value: "1885"
	},
	{
		label: "Indian Youth Congress founded",
		value: "1960"
	},
	{
		label: "Party symbol",
		value: "Hand"
	},
	{
		label: "Our district unit",
		value: "Malappuram, Kerala"
	}
];
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl px-4 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold uppercase tracking-[0.25em] text-secondary",
				children: "About us"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl font-bold text-primary sm:text-4xl",
				children: "Indian Youth Congress, Malappuram"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-5 text-foreground/85",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"The ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Indian National Congress" }),
						" is one of India's two major national political parties. Founded in 1885, it led the Indian independence movement and has since governed the country for much of its post-independence history. Its recognised election symbol is the open ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "hand" }),
						", and its politics are rooted in secularism, social justice and inclusive development."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"The ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Indian Youth Congress (IYC)" }),
						", established in 1960, is the youth wing of the Indian National Congress. It organises young Indians for political and social action — from public campaigns and civic issues to relief work, disaster response, and health drives such as blood donation camps."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Our ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Malappuram district unit" }),
						" runs this volunteer blood donor network across Malappuram — Manjeri, Perinthalmanna, Karuvarakundu, Nilambur, Tirur, Kondotty, Ponnani and beyond. Volunteers maintain a confidential register of willing donors and connect patients and hospitals to a matching donor at any hour, entirely free of cost."
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-10 grid gap-4 sm:grid-cols-2",
				children: facts.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-5 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs font-bold uppercase tracking-wide text-muted-foreground",
						children: f.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-display text-xl font-bold text-primary",
						children: f.value
					})]
				}, f.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 rounded-xl border border-border bg-muted/50 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-bold text-primary",
						children: "Campaign organisers"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-foreground/80",
						children: [
							"This blood donation initiative is organised by ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Nizam Karuvarakundu" }),
							" ",
							"and ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Rishan" }),
							", along with the district coordinator team."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/donate",
							className: "rounded-md bg-secondary px-5 py-2.5 text-sm font-bold text-secondary-foreground",
							children: "Register as a donor"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/need-blood",
							className: "rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold",
							children: "Contact a coordinator"
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { AboutPage as component };
