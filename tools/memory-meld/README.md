# memory-meld

Merge Claude memory folders from multiple projects into a clean per-project layout.

Claude's auto-memory fragments over time: the same rule gets saved under
different filenames, and memories for different logical projects pile up in the
same folder. `memory-meld` reads a batch of copied memory folders, asks an LLM
to classify each memory by logical project and dedupe overlaps, and writes
regrouped output folders you can review and drop back into `~/.claude/projects/`.

## Install

```bash
cd memory-meld
bun install
```

Requires the [Claude Code CLI](https://claude.ai/code) (`claude`) to be installed and authenticated.

## Usage

```bash
bun run index.ts <source-dir>
```

`<source-dir>` contains one subfolder per memory folder you want to meld. Each
subfolder should hold the `.md` files (and `MEMORY.md`) copied out of a
`~/.claude/projects/<slug>/memory/` directory.

Example layout:

```
my-meld-input/
├── 1/
│   ├── MEMORY.md
│   ├── feedback_concise_and_careful.md
│   ├── user_background.md
│   └── ...
└── 2/
    ├── MEMORY.md
    ├── user_daniel.md
    └── ...
```

Output is written to `<source-dir>/output/<project>/`:

```
my-meld-input/output/
├── _shared/
│   ├── MEMORY.md
│   ├── user_daniel.md
│   └── feedback_*.md
├── barf/
│   ├── MEMORY.md
│   └── project_*.md
└── zenflow/
    └── ...
```

Each output file preserves frontmatter and adds a provenance comment:

```markdown
---
name: ...
description: ...
type: feedback
---

<!-- melded from: 1/feedback_foo.md, 2/feedback_bar.md -->

...body...
```

## How it works

1. **Read** — walks each subfolder, parses frontmatter, skips `MEMORY.md` and
   any existing `output/`.
2. **Meld** — sends the full memory corpus to Claude in a single request. The
   model classifies each memory into a logical project (or `_shared`) and
   merges duplicates.
3. **Write** — groups the response by `project`, writes one `.md` per melded
   memory plus a regenerated `MEMORY.md` index per project folder.

## The prompt *is* the tool

All melding behavior lives in `prompt.md`. The TypeScript is a thin
file-mover — iteration happens by editing the prompt and re-running.

Things controlled by `prompt.md`:
- How logical projects are inferred from memory content
- When two memories are "the same" and should merge
- Lossy vs. lossless conflict resolution
- Whether `user`-type memories always route to `_shared`
- Provenance (`sources`) requirements

Edit `prompt.md` → run → diff `output/` → iterate.

## Caveats

- LLM-driven classification is non-deterministic. Review `output/` before
  copying anything back into `~/.claude/`.
- Single-call design holds up to ~small corpora (tens of files, tens of KB).
  For larger inputs, per-type batching would be the next step.
- This is an MVP — no tests, no config, no caching. Designed to prove the
  approach, not to be robust.

## Requirements

- [Bun](https://bun.sh)
- [Claude Code CLI](https://claude.ai/code) — authenticated (`claude` must be on `$PATH`)
