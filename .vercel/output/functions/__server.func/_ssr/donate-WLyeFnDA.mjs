import { r as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-5zlw-uz9.mjs";
import { a as unionType, i as stringType, n as literalType, r as objectType, t as enumType } from "../_libs/zod.mjs";
import { i as malappuramPlaces, r as bloodGroups } from "./router-CnmDvfNI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/donate-WLyeFnDA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var donorSchema = objectType({
	full_name: stringType().trim().min(2, "Enter your full name").max(100),
	phone: stringType().trim().regex(/^[0-9+\s-]{7,20}$/, "Enter a valid phone number").max(20),
	email: unionType([literalType(""), stringType().trim().email("Enter a valid email").max(255)]),
	blood_group: enumType(bloodGroups, { message: "Select your blood group" }),
	district: stringType().trim().min(2).max(60),
	place: stringType().trim().min(2, "Select or enter your place").max(100),
	date_of_birth: stringType().trim().max(20),
	notes: stringType().trim().max(500)
});
var fieldClass = "mt-1.5 w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30";
var labelClass = "text-sm font-semibold text-primary";
function DonatePage() {
	const [errors, setErrors] = (0, import_react.useState)({});
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [message, setMessage] = (0, import_react.useState)("");
	async function onSubmit(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const raw = Object.fromEntries(new FormData(form));
		const parsed = donorSchema.safeParse(raw);
		if (!parsed.success) {
			const next = {};
			for (const issue of parsed.error.issues) {
				const key = String(issue.path[0]);
				if (!next[key]) next[key] = issue.message;
			}
			setErrors(next);
			return;
		}
		setErrors({});
		setStatus("saving");
		const values = parsed.data;
		const { error } = await supabase.from("donors").insert({
			full_name: values.full_name,
			phone: values.phone,
			email: values.email || null,
			blood_group: values.blood_group,
			district: values.district,
			place: values.place,
			date_of_birth: values.date_of_birth || null,
			notes: values.notes || null
		});
		if (error) {
			setStatus("error");
			setMessage("We could not save your registration. Please try again in a moment.");
			return;
		}
		form.reset();
		setStatus("done");
		setMessage("Thank you! You are now part of the Indian Youth Congress Malappuram donor network.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold uppercase tracking-[0.25em] text-secondary",
				children: "Blood Donation Campaign"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl font-bold text-primary sm:text-4xl",
				children: "Be the reason someone smiles today"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground",
				children: "Join our mission to save lives by donating blood. Every drop you give brings hope. Your details stay confidential and are visible only to our authorised coordinators."
			}),
			status === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-xl border border-success/40 bg-success/10 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-bold text-primary",
						children: "Registration received"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-foreground/80",
						children: message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setStatus("idle"),
							className: "rounded-md bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground",
							children: "Register another donor"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/need-blood",
							className: "rounded-md border border-border px-4 py-2 text-sm font-semibold",
							children: "Need blood now?"
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-8 grid gap-5 rounded-xl border border-border bg-card p-6 shadow-card sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelClass,
								htmlFor: "full_name",
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "full_name",
								name: "full_name",
								className: fieldClass,
								maxLength: 100
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: errors["full_name"] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							htmlFor: "phone",
							children: "Phone number"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "phone",
							name: "phone",
							inputMode: "tel",
							placeholder: "+91 98765 43210",
							className: fieldClass,
							maxLength: 20
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: errors["phone"] })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							htmlFor: "email",
							children: "Email (optional)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "email",
							name: "email",
							type: "email",
							className: fieldClass,
							maxLength: 255
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: errors["email"] })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							htmlFor: "blood_group",
							children: "Blood group"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "blood_group",
							name: "blood_group",
							defaultValue: "",
							className: fieldClass,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select blood group"
							}), bloodGroups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: g,
								children: g
							}, g))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: errors["blood_group"] })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							htmlFor: "district",
							children: "District"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "district",
							name: "district",
							defaultValue: "Malappuram",
							className: fieldClass,
							children: [
								"Malappuram",
								"Kozhikode",
								"Palakkad",
								"Thrissur",
								"Wayanad",
								"Kannur",
								"Kasaragod",
								"Ernakulam",
								"Idukki",
								"Kottayam",
								"Alappuzha",
								"Pathanamthitta",
								"Kollam",
								"Thiruvananthapuram"
							].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: d,
								children: d
							}, d))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: errors["district"] })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							htmlFor: "place",
							children: "Place"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "place",
							name: "place",
							list: "places",
							placeholder: "Select or type your place",
							className: fieldClass,
							maxLength: 100
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
							id: "places",
							children: malappuramPlaces.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: p }, p))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: errors["place"] })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							htmlFor: "date_of_birth",
							children: "Date of birth"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "date_of_birth",
							name: "date_of_birth",
							type: "date",
							className: fieldClass
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: errors["date_of_birth"] })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelClass,
								htmlFor: "notes",
								children: "Anything we should know? (optional)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "notes",
								name: "notes",
								rows: 3,
								className: fieldClass,
								maxLength: 500
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: errors["notes"] })
						]
					}),
					status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "sm:col-span-2 rounded-md bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive",
						children: message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: status === "saving",
							className: "w-full rounded-md bg-secondary px-5 py-3 font-display text-base font-bold text-secondary-foreground transition-opacity hover:opacity-90 disabled:opacity-60",
							children: status === "saving" ? "Submitting…" : "Submit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: "By submitting you agree that our coordinators may contact you when a patient needs your blood group."
						})]
					})
				]
			})
		]
	});
}
function FieldError({ message }) {
	if (!message) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-xs font-semibold text-destructive",
		children: message
	});
}
//#endregion
export { DonatePage as component };
