#!/usr/bin/env python3
"""
Fix all broken relative markdown links in Starlight docs.
Converts relative links (./foo.md, ../Bar/baz.md) to absolute Starlight URLs.
"""

import re
import os
import glob

BASE = "/claude-code-docs"
DOCS_DIR = "/home/user/claude-code-docs/site/src/content/docs"

# Build set of all existing slugs (relative to DOCS_DIR, without extension)
existing_slugs = set()
for path in glob.glob(os.path.join(DOCS_DIR, "**", "*.md"), recursive=True):
    rel = os.path.relpath(path, DOCS_DIR)
    slug = rel.rsplit(".", 1)[0]  # remove .md
    existing_slugs.add(slug)
for path in glob.glob(os.path.join(DOCS_DIR, "**", "*.mdx"), recursive=True):
    rel = os.path.relpath(path, DOCS_DIR)
    slug = rel.rsplit(".", 1)[0]
    existing_slugs.add(slug)

print("Existing slugs:")
for s in sorted(existing_slugs):
    print(f"  {s}")

# Directory name mappings (source dir name -> Starlight section)
DIR_MAP = {
    "gettingstarted": "getting-started",
    "getting-started": "getting-started",
    "cli": "cli",
    "env": "env",
    "settings": "settings",
    "hooks": "hooks",
    "skills": "skills",
    "tools": "tools",
    "plugins": "plugins",
    "permissions": "permissions",
    "memory": "memory",
    "commands": "cli",  # Commands map to cli/
    "agents": "agents",
    "agent sdk": "agent-sdk",
    "agent-sdk": "agent-sdk",
    "agentsdk": "agent-sdk",
    "keybindings": "keybindings",
    "sessions": "sessions",
    "bridge": "agent-sdk",
    "changelog": None,  # top-level
    "coordinator": "agents",  # best guess
}

def resolve_link(link_target, source_file_path):
    """
    Resolve a relative link to an absolute Starlight URL.
    source_file_path is absolute path to the source file.
    Returns absolute URL like /claude-code-docs/section/page/
    """
    # Decode URL encoding
    link_target = link_target.replace("%20", " ")

    # Get the directory of the source file (relative to DOCS_DIR)
    src_dir = os.path.dirname(os.path.relpath(source_file_path, DOCS_DIR))

    # Resolve the link relative to source
    # First, get the full path the link points to
    # link_target is like ./foo.md or ../Bar/baz.md

    # Join with source dir to get the "virtual" path
    raw_path = os.path.normpath(os.path.join(src_dir, link_target))
    # raw_path is now relative to DOCS_DIR, like "settings/foo.md" or "../Settings/README.md"
    # (normpath removes ../ etc)

    # Split into parts
    parts = raw_path.replace("\\", "/").split("/")

    # Remove .md/.mdx extension from last part
    filename = parts[-1]
    if filename.lower().endswith(".mdx"):
        filename = filename[:-4]
    elif filename.lower().endswith(".md"):
        filename = filename[:-3]
    parts[-1] = filename

    # Handle single-part (same-dir) links: parts = ['filename']
    if len(parts) == 1:
        section = src_dir.lower().replace(" ", "-")
        page = filename.lower()
        # Handle README -> overview
        if page.lower() == "readme":
            page = "overview"
        # Handle FRONTMATTER -> overview
        if page.lower() == "frontmatter":
            return f"{BASE}/skills/overview/"
        target_slug = f"{section}/{page}"
        if target_slug in existing_slugs:
            return f"{BASE}/{target_slug}/"
        # fallback to section overview
        if section in [s.split("/")[0] for s in existing_slugs]:
            return f"{BASE}/{section}/overview/"
        return f"{BASE}/{section}/overview/"

    # Multi-part: parts[0] is directory (section), rest is path within
    dir_part = parts[0].lower().replace(" ", "-")
    # Map directory name
    section = DIR_MAP.get(parts[0].lower().replace(" ", "").replace("-", ""),
                           DIR_MAP.get(parts[0].lower(),
                           DIR_MAP.get(parts[0].lower().replace(" ", "-"),
                           parts[0].lower().replace(" ", "-"))))

    if section is None:
        # Top-level like changelog
        page = parts[-1].lower()
        if page == "readme":
            page = "overview"
        if f"{page}" in existing_slugs:
            return f"{BASE}/{page}/"
        return f"{BASE}/{page}/"

    # Build the page slug from remaining parts
    if len(parts) >= 2:
        page = "/".join(parts[1:]).lower()
    else:
        page = "overview"

    # Map file names
    if page.lower() == "readme":
        page = "overview"
    if page.lower() == "frontmatter":
        # FRONTMATTER.md -> skills/overview (no separate page)
        return f"{BASE}/skills/overview/"

    target_slug = f"{section}/{page}"

    # Check if it exists
    if target_slug in existing_slugs:
        return f"{BASE}/{target_slug}/"

    # Try with different casing/formatting
    # Try just the section overview
    section_overview = f"{section}/overview"
    if section_overview in existing_slugs:
        return f"{BASE}/{section_overview}/"

    # Fallback: return best guess URL (even if page doesn't exist yet)
    return f"{BASE}/{target_slug}/"


def fix_links_in_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    original = content

    # Match markdown links with relative paths: [text](./foo.md) or [text](../Bar/baz.md)
    # Pattern: [anything](relative-url) where relative-url starts with ./ or ../
    pattern = r'\[([^\]]*)\]\((\.\.?/[^)]*\.mdx?(?:#[^)]*)?|\.\.?/[^)]*\.mdx?)\)'

    def replace_link(m):
        text = m.group(1)
        href = m.group(2)

        # Split off anchor fragment if present
        if "#" in href:
            href_path, anchor = href.split("#", 1)
            anchor_str = f"#{anchor}"
        else:
            href_path = href
            anchor_str = ""

        new_url = resolve_link(href_path, filepath)
        return f"[{text}]({new_url}{anchor_str})"

    content = re.sub(pattern, replace_link, content)

    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Fixed: {os.path.relpath(filepath, DOCS_DIR)}")

    return content != original


def main():
    files = glob.glob(os.path.join(DOCS_DIR, "**", "*.md"), recursive=True)
    files += glob.glob(os.path.join(DOCS_DIR, "**", "*.mdx"), recursive=True)

    fixed = 0
    for f in sorted(files):
        if fix_links_in_file(f):
            fixed += 1

    print(f"\nFixed {fixed} files.")


if __name__ == "__main__":
    main()
