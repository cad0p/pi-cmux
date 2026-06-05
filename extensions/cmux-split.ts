import type { ExtensionAPI, ExtensionCommandContext } from "@earendil-works/pi-coding-agent";
import { buildPiCommand, openCommandInNewSplit, type SplitDirection } from "./cmux-core.ts";

function registerSplitCommand(
	pi: ExtensionAPI,
	name: string,
	direction: SplitDirection,
	description: string,
): void {
	pi.registerCommand(name, {
		description,
		handler: async (_args, ctx: ExtensionCommandContext) => {
			const sessionId = ctx.sessionManager.getSessionId();
			const result = await openCommandInNewSplit(
				pi,
				direction,
				buildPiCommand(ctx.cwd, { sessionId }),
			);
			ctx.ui.notify(
				result.ok ? `Opened cmux split (${direction === "right" ? "vertical" : "horizontal"})` : `cmux split failed: ${result.error}`,
				result.ok ? "info" : "error",
			);
		},
	});
}

export default function cmuxSplitExtension(pi: ExtensionAPI) {
	registerSplitCommand(
		pi,
		"cmv",
		"right",
		"Open a vertical cmux split with a snapshot of the current pi session — fork, clone, or branch from there",
	);
	registerSplitCommand(
		pi,
		"cmh",
		"down",
		"Open a horizontal cmux split with a snapshot of the current pi session — fork, clone, or branch from there",
	);
}
