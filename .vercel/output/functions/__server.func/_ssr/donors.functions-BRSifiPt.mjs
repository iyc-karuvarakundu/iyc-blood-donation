import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./server-BoKy8xmP.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-mnGdQrtG.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/donors.functions-BRSifiPt.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getAdminStatus_createServerFn_handler = createServerRpc({
	id: "d0cc4eb70f1c92b95ce22d95c09834002dffa58ba813503cd5ea6d670639c258",
	name: "getAdminStatus",
	filename: "src/lib/donors.functions.ts"
}, (opts) => getAdminStatus.__executeServer(opts));
var getAdminStatus = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getAdminStatus_createServerFn_handler, async ({ context }) => {
	const { data } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "admin"
	});
	return { isAdmin: data === true };
});
var listDonors_createServerFn_handler = createServerRpc({
	id: "a912a6cac59bd7c9a71f8dc1dd9b37dac324b4705d3617269db0303f93336b3a",
	name: "listDonors",
	filename: "src/lib/donors.functions.ts"
}, (opts) => listDonors.__executeServer(opts));
var listDonors = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listDonors_createServerFn_handler, async ({ context }) => {
	const { data: isAdmin } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "admin"
	});
	if (isAdmin !== true) return {
		isAdmin: false,
		donors: []
	};
	const { data, error } = await context.supabase.from("donors").select("id, full_name, phone, email, blood_group, district, place, date_of_birth, notes, created_at").order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return {
		isAdmin: true,
		donors: data ?? []
	};
});
var deleteDonor_createServerFn_handler = createServerRpc({
	id: "eb5ee7b227927453acfc522265762bcce2ff6ad6f04c48bdf94b8a2790e370fb",
	name: "deleteDonor",
	filename: "src/lib/donors.functions.ts"
}, (opts) => deleteDonor.__executeServer(opts));
var deleteDonor = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator(objectType({ id: stringType().uuid() })).handler(deleteDonor_createServerFn_handler, async ({ data, context }) => {
	const { data: isAdmin } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "admin"
	});
	if (isAdmin !== true) throw new Error("Forbidden");
	const { error } = await context.supabase.from("donors").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
//#endregion
export { deleteDonor_createServerFn_handler, getAdminStatus_createServerFn_handler, listDonors_createServerFn_handler };
