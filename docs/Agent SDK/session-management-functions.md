# Session management functions


### `query(prompt, options?)` — One-off queries
Returns an async iterable of SDK messages. Session ID created automatically on first message.

### `unstable_v2_createSession(options)` — New persistent session (ALPHA)
Creates a fresh session without a prompt. Use with `unstable_v2_prompt()` or stream messages manually.

### `unstable_v2_resumeSession(sessionId, options)` — Resume by ID (ALPHA)
Load an existing session by UUID.

### `unstable_v2_prompt(message, options)` — One-shot async (ALPHA)
Convenience function: create session, send prompt, await result. Returns `SDKResultMessage`.

### `listSessions(options?)` — List past sessions
Returns array of `SDKSessionInfo` objects with metadata: `summary`, `session_id`, `timestamp`, `tags`, `title`.

### `getSessionMessages(sessionId, options?)` — Transcript access
Reads JSONL transcript file, reconstructs conversation chain via parentUuid links, returns user/assistant messages in order.

### `getSessionInfo(sessionId, options?)` — Session metadata
Returns `SDKSessionInfo` for a single session (faster than listSessions for one session). Returns `undefined` if not found.

### `renameSession(sessionId, title, options?)` — Rename
Appends custom-title entry to session file.

### `tagSession(sessionId, tag | null, options?)` — Tag
Attach a tag or clear it (pass null).

### `forkSession(sessionId, options?)` — Branch
Create new session with copy of messages from source, remapping UUIDs. Supports `upToMessageId` for branching at a specific point.

---

[← Back to Agent SDK/README.md](./README.md)
