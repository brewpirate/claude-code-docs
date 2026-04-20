---
title: "Filesystem Tools"
tags: [tools]
---


### `Read`
- **Invoked as:** `Read`
- **Source directory:** `claude-code-main/tools/FileReadTool/`
- **Class:** Filesystem
- **Side effect:** Read-only
- **Gating:** Always
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Reads the contents of files." Supports plain text, images (PNG, JPG), and Jupyter notebooks (.ipynb). Returns file contents as text or structured data. Images are processed and described. Notebooks are returned with all cells and outputs.
- **Input parameters:**
  - `file_path` (string, required) — Absolute path to the file to read
  - `limit` (integer, optional) — Number of lines to read from the start of the file
  - `offset` (integer, optional) — Line number to start reading from
  - `pages` (string, optional) — For PDFs, page range (e.g., "1-5", "3") — maximum 20 pages per request
- **Returns:** File contents as plain text, with line numbers (format: `line_number\t content`), or structured data for notebooks and images.
- **Notes:** Maximum context for file reads is configurable via `CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS`. No permission required—this is a read-only tool.

### `Write`
- **Invoked as:** `Write`
- **Source directory:** `claude-code-main/tools/FileWriteTool/`
- **Class:** Filesystem
- **Side effect:** Writes
- **Gating:** Always; permission required
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Creates or overwrites files." Always overwrites; does not preserve existing content. Validate permissions before writing to sensitive paths.
- **Input parameters:**
  - `file_path` (string, required) — Absolute path to the file to create or overwrite
  - `content` (string, required) — File contents to write
- **Returns:** Confirmation that file was written; no content returned.
- **Notes:** This is a mutating tool. Permission system applies. Overwrites any existing file at the path without warning—use Edit for safer, targeted modifications.

### `Edit`
- **Invoked as:** `Edit`
- **Source directory:** `claude-code-main/tools/FileEditTool/`
- **Class:** Filesystem
- **Side effect:** Writes
- **Gating:** Always; permission required
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Makes targeted edits to specific files." Does not overwrite the entire file; instead performs a search-and-replace on exact text ranges. Requires reading the file first to identify the text to replace.
- **Input parameters:**
  - `file_path` (string, required) — Absolute path to the file to modify
  - `old_string` (string, required) — Exact text to find and replace. Must be unique in the file or the edit fails.
  - `new_string` (string, required) — Text to replace it with. Must be different from old_string.
  - `replace_all` (boolean, optional) — If true, replace all occurrences instead of requiring uniqueness.
- **Returns:** Confirmation that the edit succeeded; shows context around the modified line.
- **Notes:** Safer than Write for incremental changes. Prefer Edit for code modifications. The old_string must match exactly, including whitespace and indentation.

### `NotebookEdit`
- **Invoked as:** `NotebookEdit`
- **Source directory:** `claude-code-main/tools/FileEditTool/` (part of Notebook operations)
- **Class:** Filesystem
- **Side effect:** Writes
- **Gating:** Always; permission required
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Modifies Jupyter notebook cells." Targets specific cells by index or markdown header matching, allowing you to update code and markdown cells without rewriting the entire notebook.
- **Input parameters:**
  - `file_path` (string, required) — Path to the .ipynb file
  - `cell_index` (integer, optional) — Index of the cell to modify
  - `header_match` (string, optional) — Markdown header to find the cell by title
  - `new_source` (string, required) — New cell source code or markdown content
- **Returns:** Updated notebook with modified cell.
- **Notes:** Requires the notebook to already exist. Works with both code and markdown cells. Returns the full notebook structure after edit.

### `Glob`
- **Invoked as:** `Glob`
- **Source directory:** `claude-code-main/tools/GlobTool/` (inferred from source)
- **Class:** Filesystem
- **Side effect:** Read-only
- **Gating:** Always
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Finds files based on pattern matching." Returns file paths sorted by modification time. Supports glob patterns with `**` for recursive matching and `{}` for alternation.
- **Input parameters:**
  - `pattern` (string, required) — Glob pattern (e.g., `**/*.js`, `src/*.{ts,tsx}`)
  - `path` (string, optional) — Directory to search in; defaults to current working directory
- **Returns:** List of matching file paths, sorted by modification time (newest first).
- **Notes:** No permission required. Fast pattern matching via ripgrep. Respects .gitignore by default; override with `CLAUDE_CODE_GLOB_NO_IGNORE=1`. Include hidden files with `CLAUDE_CODE_GLOB_HIDDEN=1`.

### `Grep`
- **Invoked as:** `Grep`
- **Source directory:** `claude-code-main/tools/GrepTool/` (inferred from source)
- **Class:** Filesystem
- **Side effect:** Read-only
- **Gating:** Always
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Searches for patterns in file contents." Powered by ripgrep (rg). Supports regex, case-insensitive search, context lines, and multiple output modes (content, files_with_matches, count).
- **Input parameters:**
  - `pattern` (string, required) — Regular expression to search for
  - `path` (string, optional) — File or directory to search in
  - `type` (string, optional) — File type filter (e.g., `js`, `py`, `rust`, `go`)
  - `glob` (string, optional) — Glob pattern to filter files
  - `output_mode` (string, optional) — `content`, `files_with_matches`, or `count`; defaults to `files_with_matches`
  - `-i` (boolean) — Case-insensitive search
  - `-n` (boolean) — Show line numbers (default true for content mode)
  - `-A`, `-B`, `-C` (number) — Show context lines after/before/around match
  - `head_limit` (integer, optional) — Limit output to N results; defaults to 250
  - `multiline` (boolean, optional) — Match across line boundaries (rg -U --multiline-dotall)
- **Returns:** Matching lines with context, file paths, or counts depending on output_mode.
- **Notes:** No permission required. Supports full ripgrep regex syntax. Default head_limit of 250 prevents unbounded output; pass `head_limit: 0` for unlimited (use sparingly).

---

[← Back to Tools/README.md](/claude-code-docs/tools/overview/)
