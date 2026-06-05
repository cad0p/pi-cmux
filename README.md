# pi-cmux

Pi package that connects [pi](https://pi.dev) to [cmux](https://www.cmux.dev): the cmux sidebar, notifications, and run status stay in sync with what pi is doing, and you can split pi into the same session in a new pane.

pi-cmux installs three extensions and registers no agent-callable tools — all commands are user-invoked slash commands.

## Install

```bash
pi install npm:pi-cmux
```

Or run the package installer:

```bash
npx pi-cmux
```

If Pi is already running:

```text
/reload
```

## What it adds

### Snapshot the current session into a split

| Command | Effect |
|---|---|
| `/cmv` | Open a vertical cmux split with a snapshot of the current pi session. |
| `/cmh` | Open a horizontal cmux split with a snapshot of the current pi session. |

The original pane keeps its running pi — the new pane reattaches to the same session file (`pi --session <id>`) and shows the conversation history. From there, use `/fork` or `/clone` to branch into an independent session, or `/compact` to summarize before continuing. The parent pane is unaffected. Inside cmux SSH workspaces, the new split opens on the SSH host automatically.

### Notify (automatic)

`cmux-notify` calls `cmux notify` when pi finishes a run:

- **Waiting** — pi stopped streaming and is waiting for you
- **Task Complete** — the run finished
- **Error** — the run failed

### Sidebar (automatic)

`cmux-sidebar` keeps the cmux right sidebar in sync while pi runs. It activates only inside a cmux workspace:

- `cmux set-status` — running / tool / waiting / done / errored pill
- `cmux set-progress` — coarse run progress with live token counts
- `cmux log` — start, changed files, warnings, final summary, compact session token counts
- `cmux trigger-flash` — flashes the surface when a run finishes and needs attention

## Configuration

All settings are environment variables. Defaults are sensible; tune only if you need to.

### Notifications

| Variable | Default | Purpose |
|---|---:|---|
| `PI_CMUX_NOTIFY_LEVEL` | `all` | `all`, `medium`, `low`, or `disabled`. |
| `PI_CMUX_NOTIFY_INCLUDE_RESPONSE` | `0` | Set `1` to append up to 500 chars of the final assistant response to non-error notifications. |
| `PI_CMUX_NOTIFY_THRESHOLD_MS` | `15000` | Run-duration threshold for `Task Complete` vs `Waiting`. |
| `PI_CMUX_NOTIFY_DEBOUNCE_MS` | `3000` | Suppress repeated identical notifications within this window. |
| `PI_CMUX_NOTIFY_TITLE` | `Pi` | Notification title. |

### Sidebar

| Variable | Default | Purpose |
|---|---:|---|
| `PI_CMUX_SIDEBAR` | `1` | Set `0` to disable sidebar integration. |
| `PI_CMUX_SIDEBAR_FLASH` | `all` | `all`, `error`, or `disabled`. |
| `PI_CMUX_SIDEBAR_LOG_TOOLS` | `0` | Set `1` to log every tool result. |
| `PI_CMUX_SIDEBAR_LOG_PROMPT` | `0` | Set `1` to include a truncated prompt in the start log. |
| `PI_CMUX_SIDEBAR_PROGRESS` | `1` | Set `0` to disable progress updates. |
| `PI_CMUX_SIDEBAR_TOKENS` | `1` | Include compact live session token counts in progress and summaries. |
| `PI_CMUX_SIDEBAR_COST` | `0` | Include reported model cost alongside token counts. |
| `PI_CMUX_SIDEBAR_FINAL_CLEAR_MS` | `2500` | Delay before clearing the final status/progress. |
| `PI_CMUX_SIDEBAR_STATUS_KEY` | — | Override the status key. |
| `PI_CMUX_SIDEBAR_STATUS_PRIORITY` | `80` | Status priority. |

cmux uses the current `CMUX_WORKSPACE_ID` and `CMUX_SURFACE_ID` automatically. Sidebar integration only activates inside a cmux workspace.

## Bundled resources

- `cmux-notify` — `cmux notify` on agent idle / complete / error
- `cmux-sidebar` — `cmux set-status`, `set-progress`, `log`, `trigger-flash`
- `cmux-split` — `/cmv`, `/cmh`
