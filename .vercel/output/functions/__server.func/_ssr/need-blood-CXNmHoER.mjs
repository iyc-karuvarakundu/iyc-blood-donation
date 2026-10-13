import { r as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as WhatsappContacts, r as bloodGroups } from "./router-CnmDvfNI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/need-blood-CXNmHoER.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NeedBloodPage() {
	const [group, setGroup] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold uppercase tracking-[0.25em] text-secondary",
				children: "24×7 Help Desk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl font-bold text-primary sm:text-4xl",
				children: "Need blood urgently?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted-foreground",
				children: "Message any coordinator below on WhatsApp with the patient's blood group, hospital and city. Our volunteers will search the donor registry and connect you with a matching donor as fast as possible. This service is completely free."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-muted/50 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "group",
						className: "text-sm font-semibold text-primary",
						children: "Blood group needed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						id: "group",
						value: group,
						onChange: (e) => setGroup(e.target.value),
						className: "rounded-md border border-input bg-card px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Not sure / any"
						}), bloodGroups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: g,
							children: g
						}, g))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: "We pre-fill your WhatsApp message with this group."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsappContacts, { group: group || void 0 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 rounded-xl border border-border bg-card p-6 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-bold text-primary",
						children: "Want to help someone else?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Add your name to the donor registry so our coordinators can reach you the next time a patient needs your blood group."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/donate",
						className: "mt-4 inline-block rounded-md bg-secondary px-5 py-2.5 text-sm font-bold text-secondary-foreground",
						children: "Register as a donor"
					})
				]
			})
		]
	});
}
//#endregion
export { NeedBloodPage as component };
