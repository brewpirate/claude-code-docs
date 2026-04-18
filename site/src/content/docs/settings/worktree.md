---
title: "Worktree"
---

# Worktree


### `worktree.symlinkDirectories`
- **Type:** string[]
- **Default:** unspecified
- **Description:** Directories to symlink from the main repository into each worktree to avoid duplicating large directories on disk. Reduces disk usage when creating multiple worktrees.
- **Example:**
  ```json
  {
    "worktree": {
      "symlinkDirectories": ["node_modules", ".cache"]
    }
  }
  ```

### `worktree.sparsePaths`
- **Type:** string[]
- **Default:** unspecified
- **Description:** Directories to check out in each worktree via git sparse-checkout (cone mode). Only the listed paths are written to disk, which is faster in large monorepos.
- **Example:**
  ```json
  {
    "worktree": {
      "sparsePaths": ["packages/my-app", "shared/utils"]
    }
  }
  ```

---

[← Back to settings/README.md](./README.md)
