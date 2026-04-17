<!--
  This file is the instructions sent to the LLM. The memories JSON array is
  appended after this content at runtime. The tool expects the LLM to reply
  with a JSON array of objects with this shape:

    {
      "project": string,      // logical project slug, or "_shared"
      "name": string,
      "description": string,
      "type": "user" | "feedback" | "project" | "reference",
      "body": string,         // markdown body, no frontmatter
      "sources": string[]     // input "source" strings that merged into this one
    }

  Everything below is YOUR design — this is where the tool's behavior lives.
  Write the rules Claude should follow when classifying + merging. Keep it
  tight; long prompts drift. 5–10 lines of rules is usually enough.
-->

You are melding Claude memory files that were scattered across multiple memory
folders into a coherent per-project layout.

# Classification rules

**Known projects** (use exactly these strings as the `project` field):
- `barf` — matches: `barf`, `barf-ts`, `@barf/`, plan numbers (e.g. "Plan 211"), auto-machine, cohort, AI SDK, LanguageModelV2, Mastra, argusFoundry/ArgusFoundry, xstate
- `zenflow` — matches: `zenflow`, `zen-flow`, `zen flow`, collab session, collab skill, skills suite (as a workflow suite for Claude Code dev), plugin loading issues, marketplace (standalone plugin marketplace repo)
- `_shared` — memories about the human (type: user), universal behavior rules with no project mention, feedback that applies across all Claude sessions

**Type routing:**
- `type: user` → always `_shared`, regardless of content
- `type: reference` → infer from content using keywords above
- `type: feedback` → infer from content; if no project keyword found, use `_shared`
- `type: project` → infer from content; if genuinely ambiguous, prefer `barf`

# Merge rules

**Merge** two input memories into one output if they describe the same behavioral rule or the same factual topic AND are the same type. Lean conservative — if in doubt, do NOT merge.

**On conflict or overlap:** concatenate both bodies separated by `\n\n---\n\n`, with a comment `<!-- from: <source> -->` before each block. Never drop content. Clean up obvious word-for-word duplication within the concatenated result.

**Do not merge** across different `type` values. Do not merge memories from different logical projects.

# Output requirements

Every output object must include:
- `project`: one of `barf`, `zenflow`, `_shared`
- `name`: keep the most descriptive name from the inputs (or write a better one if merging)
- `description`: single line, factual, specific — what this memory is for
- `type`: preserved from input (never change type)
- `body`: merged or original body, clean markdown, no frontmatter
- `sources`: array of all input `source` strings that contributed to this output
