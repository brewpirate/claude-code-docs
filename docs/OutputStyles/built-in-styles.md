# Built-in styles

Three output styles ship with Claude Code: `default`, `Explanatory`, and `Learning`. These are defined in `constants/outputStyles.ts` and cannot be customized or overridden.

## default

**Name**: `default`  
**Description**: No custom prompt; standard Claude Code behavior.  
**Keep coding instructions**: N/A (no custom prompt).  
**Source**: Built-in.

The `default` style applies no custom prompt. Claude Code's standard system instructions (coding guidelines, tool usage, file-handling) remain active. Claude responds directly to user requests without special tone or teaching mode.

```typescript
[DEFAULT_OUTPUT_STYLE_NAME]: null,
```

## Explanatory

**Name**: `Explanatory`  
**Description**: Claude explains its implementation choices and codebase patterns.  
**Keep coding instructions**: `true` (Claude Code's coding guidance remains active).  
**Source**: Built-in.

The Explanatory style adds an educational mode. Claude provides brief insights before and after writing code, using `✦ Insight` header blocks. Insights are embedded in the conversation, not the codebase.

**Key instruction snippet**:

```
## Insights
In order to encourage learning, before and after writing code, always provide brief educational explanations about implementation choices using (with backticks):
"`✦ Insight ─────────────────────────────────────`
[2-3 key educational points]
`─────────────────────────────────────────────────`"

These insights should be included in the conversation, not in the codebase. You should generally focus on interesting insights that are specific to the codebase or the code you just wrote, rather than general programming concepts.
```

**Guidance**: Frame insights around design decisions, patterns, and trade-offs specific to the project, not general CS concepts. Exceed typical length constraints when insights are relevant.

## Learning

**Name**: `Learning`  
**Description**: Claude pauses and asks you to write small pieces of code for hands-on practice.  
**Keep coding instructions**: `true` (Claude Code's coding guidance remains active).  
**Source**: Built-in.

The Learning style enables interactive hands-on teaching. Claude breaks down tasks, requests user contributions for meaningful design decisions (2–10 line pieces), and provides insights. Uses "Learn by Doing" blocks and optional TodoList integration.

**Key instruction snippet — requesting contributions**:

```
In order to encourage learning, ask the human to contribute 2-10 line code pieces when generating 20+ lines involving:
- Design decisions (error handling, data structures)
- Business logic with multiple valid approaches  
- Key algorithms or interface definitions

Example TodoList flow:
   ✓ "Set up component structure with placeholder for logic"
   ✓ "Request human collaboration on decision logic implementation"
   ✓ "Integrate contribution and complete feature"
```

**Request format**:

```
• **Learn by Doing**
**Context:** [what's built and why this decision matters]
**Your Task:** [specific function/section in file, mention file and TODO(human) but do not include line numbers]
**Guidance:** [trade-offs and constraints to consider]
```

**Key guidelines**:

- Frame contributions as valuable design decisions, not busy work.
- Insert a `TODO(human)` section in the codebase before making the "Learn by Doing" request.
- Ensure exactly one `TODO(human)` section in the code.
- Do not output anything after the request; wait for human implementation.

**After contributions**: Share one insight connecting the code to broader patterns or system effects. Avoid praise or repetition.

---

[← Back to OutputStyles/README.md](./README.md)
