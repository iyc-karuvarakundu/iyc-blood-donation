import { r as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime, r as useQueryClient, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { P as isRedirect, v as useNavigate, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./server-BoKy8xmP.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-mnGdQrtG.mjs";
import { t as supabase } from "./client-5zlw-uz9.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
import { r as bloodGroups } from "./router-CnmDvfNI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-D5AXauu3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("d0cc4eb70f1c92b95ce22d95c09834002dffa58ba813503cd5ea6d670639c258"));
var listDonors = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("a912a6cac59bd7c9a71f8dc1dd9b37dac324b4705d3617269db0303f93336b3a"));
var deleteDonor = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator(objectType({ id: stringType().uuid() })).handler(createSsrRpc("eb5ee7b227927453acfc522265762bcce2ff6ad6f04c48bdf94b8a2790e370fb"));
function AdminPage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const fetchDonors = useServerFn(listDonors);
	const removeDonor = useServerFn(deleteDonor);
	const [group, setGroup] = (0, import_react.useState)("");
	const [search, setSearch] = (0, import_react.useState)("");
	const { data, isPending, isError } = useQuery({
		queryKey: ["donors"],
		queryFn: () => fetchDonors()
	});
	const donors = data?.donors ?? [];
	const filtered = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		return donors.filter((d) => (!group || d.blood_group === group) && (!q || d.full_name.toLowerCase().includes(q) || d.place.toLowerCase().includes(q) || d.phone.includes(q)));
	}, [
		donors,
		group,
		search
	]);
	async function signOut() {
		await queryClient.cancelQueries();
		queryClient.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	}
	(0, import_react.useEffect)(() => {
		if (!data || data.isAdmin !== false) return;
		(async () => {
			await queryClient.cancelQueries();
			queryClient.clear();
			await supabase.auth.signOut();
			navigate({
				to: "/auth",
				replace: true
			});
		})();
	}, [
		data,
		queryClient,
		navigate
	]);
	function exportCsv() {
		const csv = [[
			"Name",
			"Phone",
			"Email",
			"Blood group",
			"District",
			"Place",
			"DOB",
			"Registered"
		], ...filtered.map((d) => [
			d.full_name,
			d.phone,
			d.email ?? "",
			d.blood_group,
			d.district,
			d.place,
			d.date_of_birth ?? "",
			new Date(d.created_at).toLocaleDateString()
		])].map((r) => r.map((cell) => `"${String(cell).replace(/"/g, "\"\"")}"`).join(",")).join("\n");
		const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
		const a = document.createElement("a");
		a.href = url;
		a.download = "iyc-malappuram-donors.csv";
		a.click();
		URL.revokeObjectURL(url);
	}
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mx-auto max-w-6xl px-4 py-16 text-muted-foreground",
		children: "Loading registry…"
	});
	if (isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-bold text-primary",
			children: "Registry unavailable"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "Please refresh and try again."
		})]
	});
	if (!data?.isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-bold text-primary",
			children: "Access denied"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "Only authorized administrators can view the donor registry."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-[0.25em] text-secondary",
						children: "Confidential"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-3xl font-bold text-primary",
						children: "Blood bank registry"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							donors.length,
							" registered donor",
							donors.length === 1 ? "" : "s"
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: exportCsv,
						className: "rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground",
						children: "Export CSV"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: signOut,
						className: "rounded-md border border-border px-4 py-2 text-sm font-semibold",
						children: "Sign out"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: search,
					onChange: (e) => setSearch(e.target.value),
					placeholder: "Search name, place or phone",
					className: "min-w-56 flex-1 rounded-md border border-input bg-card px-3 py-2 text-sm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: group,
					onChange: (e) => setGroup(e.target.value),
					className: "rounded-md border border-input bg-card px-3 py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All blood groups"
					}), bloodGroups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: g,
						children: g
					}, g))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 overflow-x-auto rounded-xl border border-border bg-card shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Group"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Phone"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Place"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "District"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Registered"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3" })
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [filtered.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-semibold text-primary",
								children: d.full_name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-bold text-secondary",
								children: d.blood_group
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `tel:${d.phone}`,
									className: "hover:underline",
									children: d.phone
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: d.place
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: d.district
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-muted-foreground",
								children: new Date(d.created_at).toLocaleDateString()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3 text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `https://wa.me/${d.phone.replace(/[^0-9]/g, "").replace(/^0+/, "")}`,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "rounded-md bg-whatsapp px-3 py-1.5 text-xs font-bold text-whatsapp-foreground",
									children: "WhatsApp"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: async () => {
										if (!window.confirm(`Remove ${d.full_name} from the registry?`)) return;
										await removeDonor({ data: { id: d.id } });
										await queryClient.invalidateQueries({ queryKey: ["donors"] });
									},
									className: "ml-2 rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-destructive",
									children: "Remove"
								})]
							})
						]
					}, d.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 7,
						className: "px-4 py-10 text-center text-muted-foreground",
						children: "No donors match this filter yet."
					}) })] })]
				})
			})
		]
	});
}
//#endregion
export { AdminPage as component };
