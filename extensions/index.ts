import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import cmuxNotifyExtension from "./cmux-notify.ts";
import cmuxSplitExtension from "./cmux-split.ts";
import cmuxSidebarExtension from "./cmux-sidebar.ts";

export default function piCmuxExtensionBundle(pi: ExtensionAPI) {
	cmuxNotifyExtension(pi);
	cmuxSplitExtension(pi);
	cmuxSidebarExtension(pi);
}
