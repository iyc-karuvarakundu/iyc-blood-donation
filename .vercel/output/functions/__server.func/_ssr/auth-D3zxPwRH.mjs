import { r as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-5zlw-uz9.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
import { a as Lock } from "../_libs/lucide-react.mjs";
import { a as fetchIsAdmin, o as isInvalidCredentialsError } from "./router-CnmDvfNI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-D3zxPwRH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var credentials = objectType({
	username: stringType().trim().min(3, "Enter your username").max(64).regex(/^[A-Za-z0-9._-]+$/, "Username can use letters, numbers, . _ - only"),
	password: stringType().min(8, "Password must be at least 8 characters").max(72)
});
var USERNAME_DOMAIN = "@iycblood.local";
var toEmail = (username) => username.toLowerCase() + USERNAME_DOMAIN;
function AuthPage() {
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [denied, setDenied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		supabase.auth.getSession().then(async ({ data }) => {
			const userId = data.session?.user.id;
			if (!userId) return;
			try {
				const isAdmin = await fetchIsAdmin(userId);
				if (cancelled) return;
				if (isAdmin) {
					navigate({
						to: "/admin",
						replace: true
					});
					return;
				}
				await supabase.auth.signOut();
			} catch {
				if (!cancelled) await supabase.auth.signOut();
			}
		});
		return () => {
			cancelled = true;
		};
	}, [navigate]);
	async function denyAndSignOut() {
		await supabase.auth.signOut();
		setDenied(true);
		setError("");
	}
	async function onSubmit(event) {
		event.preventDefault();
		setError("");
		setDenied(false);
		const raw = Object.fromEntries(new FormData(event.currentTarget));
		const parsed = credentials.safeParse(raw);
		if (!parsed.success) {
			setError(parsed.error.issues[0]?.message ?? "Check your details");
			return;
		}
		setBusy(true);
		try {
			const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
				email: toEmail(parsed.data.username),
				password: parsed.data.password
			});
			if (signInError) {
				await supabase.auth.signOut();
				if (isInvalidCredentialsError(signInError)) setError("Wrong username or password.");
				else setError("Unable to sign in right now. Please try again.");
				return;
			}
			const userId = signInData.user?.id;
			if (!userId) {
				await supabase.auth.signOut();
				setError("Unable to sign in right now. Please try again.");
				return;
			}
			let isAdmin = false;
			try {
				isAdmin = await fetchIsAdmin(userId);
			} catch {
				await supabase.auth.signOut();
				setError("Unable to sign in right now. Please try again.");
				return;
			}
			if (!isAdmin) {
				await denyAndSignOut();
				return;
			}
			navigate({
				to: "/admin",
				replace: true
			});
		} catch {
			await supabase.auth.signOut();
			setError("Unable to sign in right now. Please try again.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
					className: "h-5 w-5",
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-bold",
					children: "Admin login"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "This portal is for authorised IYC Malappuram Blood Bank administrators and coordinators only. There is no public signup."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-8 space-y-4 rounded-xl border border-border bg-card p-6 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "username",
						className: "text-sm font-semibold text-primary",
						children: "Username"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "username",
						name: "username",
						type: "text",
						autoCapitalize: "characters",
						autoComplete: "username",
						className: "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "password",
						className: "text-sm font-semibold text-primary",
						children: "Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "password",
						name: "password",
						type: "password",
						autoComplete: "current-password",
						className: "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
					})] }),
					denied && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						role: "alert",
						className: "rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: "Access denied. Only authorized administrators can login."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-normal text-destructive/90",
							children: "This login is restricted to authorized IYC Malappuram Blood Bank coordinators."
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-md bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: busy,
						className: "w-full rounded-md bg-primary px-5 py-3 font-display font-bold text-primary-foreground disabled:opacity-60",
						children: busy ? "Please wait…" : "Sign in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs text-muted-foreground",
						children: "Accounts are created only by the campaign admin. Contact the organisers if you need access."
					})
				]
			})
		]
	});
}
//#endregion
export { AuthPage as component };
