#!/usr/bin/env python3
"""Add tags to all docs frontmatter based on directory."""

import os
import re

DOCS_DIR = "site/src/content/docs"

# Map directory name → tags list
DIR_TAGS = {
    "agent-sdk":     ["agent-sdk"],
    "agents":        ["agent-sdk"],
    "cli":           ["cli"],
    "commands":      ["cli"],
    "env":           ["environment"],
    "getting-started": ["getting-started"],
    "hooks":         ["hooks"],
    "keybindings":   ["cli"],
    "memory":        ["settings"],
    "permissions":   ["permissions"],
    "plugins":       ["plugins"],
    "sessions":      ["cli"],
    "settings":      ["settings"],
    "skills":        ["skills"],
    "tools":         ["tools"],
}

# Additional cross-cutting tags for specific sub-dirs
EXTRA_TAGS = {
    "hooks":         ["settings"],
    "permissions":   ["settings"],
    "plugins":       ["settings"],
    "skills":        ["cli"],
}

def tags_for_dir(dirname):
    primary = DIR_TAGS.get(dirname, [])
    extra = EXTRA_TAGS.get(dirname, [])
    # Merge, dedupe, preserve order
    combined = list(dict.fromkeys(primary + extra))
    return combined

def format_tags(tags):
    return "[" + ", ".join(tags) + "]"

def process_file(filepath, dirname):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Skip files without frontmatter
    if not content.startswith("---"):
        print(f"SKIP (no frontmatter): {filepath}")
        return

    tags = tags_for_dir(dirname)
    if not tags:
        print(f"SKIP (no tag mapping): {filepath}")
        return

    # Already has tags: skip
    if re.search(r"^tags\s*:", content, re.MULTILINE):
        print(f"SKIP (tags exist): {filepath}")
        return

    # Find the closing --- of frontmatter
    end = content.index("---", 3)
    frontmatter = content[3:end]
    rest = content[end:]  # starts with ---

    new_frontmatter = frontmatter.rstrip() + f"\ntags: {format_tags(tags)}\n"
    new_content = "---" + new_frontmatter + rest

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"TAGGED {tags}: {filepath}")

def main():
    for dirpath, dirnames, filenames in os.walk(DOCS_DIR):
        dirname = os.path.basename(dirpath)
        for fname in sorted(filenames):
            if fname.endswith(".md") or fname.endswith(".mdx"):
                filepath = os.path.join(dirpath, fname)
                process_file(filepath, dirname)

if __name__ == "__main__":
    main()
