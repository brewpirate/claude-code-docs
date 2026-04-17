# System & Runtime


### `HOME`
- **Type:** String (directory path)
- **Default:** Auto-detected
- **Description:** User home directory path. Used for resolving ~ expansions and locating config directories.
- **Example:** `/home/username`

### `USER`
- **Type:** String (username)
- **Default:** Auto-detected
- **Description:** Current username. Used for logging and telemetry.
- **Example:** `myusername`

### `USERNAME`
- **Type:** String (username, Windows)
- **Default:** Auto-detected
- **Description:** Current username (Windows). Alternative to USER on Windows.
- **Example:** `myusername`

### `USERPROFILE`
- **Type:** String (directory path, Windows)
- **Default:** Auto-detected on Windows
- **Description:** User profile directory (Windows). Alternative to HOME on Windows.
- **Example:** `C:\Users\myusername`

### `APPDATA`
- **Type:** String (directory path, Windows)
- **Default:** Auto-detected on Windows
- **Description:** Application data directory (Windows). Used for config file discovery.
- **Example:** `C:\Users\myusername\AppData\Roaming`

### `LOCALAPPDATA`
- **Type:** String (directory path, Windows)
- **Default:** Auto-detected on Windows
- **Description:** Local application data directory (Windows). Used for temp and cache files.
- **Example:** `C:\Users\myusername\AppData\Local`

### `PWD`
- **Type:** String (directory path)
- **Default:** Current working directory
- **Description:** Current working directory. Updated automatically by the shell.
- **Example:** `/home/user/projects/myapp`

### `PATH`
- **Type:** String (colon-separated paths)
- **Default:** System defaults
- **Description:** System executable search path. Used for finding executables in bash tools.
- **Example:** `/usr/local/bin:/usr/bin:/bin`

### `PATHEXT`
- **Type:** String (semicolon-separated extensions, Windows)
- **Default:** Auto-detected on Windows
- **Description:** Executable file extensions (Windows). Extensions considered executable (e.g., .exe, .cmd).
- **Example:** `.COM;.EXE;.BAT`

### `SHELL`
- **Type:** String (shell path)
- **Default:** Auto-detected
- **Description:** User's default shell. Used as fallback for shell tool.
- **Example:** `/bin/bash`

### `LANG`
- **Type:** String (locale identifier)
- **Default:** System default
- **Description:** System locale setting. Affects character encoding, date/time formatting, etc.
- **Example:** `en_US.UTF-8`

### `LC_ALL`
- **Type:** String (locale identifier)
- **Default:** Unspecified
- **Description:** Override all locale settings. Takes precedence over individual LC_* vars.
- **Example:** `export LC_ALL=C.UTF-8`

### `LC_TIME`
- **Type:** String (locale identifier)
- **Default:** Inherits from LANG
- **Description:** Time-related locale setting. Controls date/time formatting.
- **Example:** `export LC_TIME=en_US.UTF-8`

### `EDITOR`
- **Type:** String (editor path or name)
- **Default:** Unspecified (typically nano, vi, vim)
- **Description:** Default text editor. Used when Claude Code needs to open an editor.
- **Example:** `export EDITOR=vim`

### `VISUAL`
- **Type:** String (editor path or name)
- **Default:** Unspecified
- **Description:** Default visual editor. Takes precedence over EDITOR for graphical editing.
- **Example:** `export VISUAL=code`

### `BROWSER`
- **Type:** String (browser path or name)
- **Default:** Auto-detected
- **Description:** Default browser for opening URLs. Used when Claude Code needs to open links.
- **Example:** `export BROWSER=google-chrome`

### `OSTYPE`
- **Type:** String (OS identifier)
- **Default:** Auto-detected (linux, darwin, msys, etc.)
- **Description:** Operating system type identifier. Auto-detected; rarely needs override.
- **Example:** `linux`

### `MSYSTEM`
- **Type:** String (MSYS2/MinGW system type)
- **Default:** Unspecified (set by MSYS2)
- **Description:** MSYS2/MinGW system type (e.g., MINGW64, MSYS). Auto-detected when using MSYS2.
- **Example:** `MINGW64`

### `SYSTEMROOT`
- **Type:** String (directory path, Windows)
- **Default:** Auto-detected on Windows
- **Description:** Windows system root directory. Usually C:\Windows.
- **Example:** `C:\Windows`

### `SAFEUSER`
- **Type:** String (sanitized username)
- **Default:** Auto-sanitized from USER
- **Description:** Sanitized username for safe filesystem operations. Special chars removed.
- **Example:** `myusername`

### `XDG_CONFIG_HOME`
- **Type:** String (directory path)
- **Default:** `~/.config`
- **Description:** XDG configuration directory. Used for config file lookup on Unix.
- **Example:** `export XDG_CONFIG_HOME=/etc/xdg`

### `XDG_RUNTIME_DIR`
- **Type:** String (directory path)
- **Default:** Unspecified
- **Description:** XDG runtime directory. Used for temporary files and sockets.
- **Example:** `/run/user/1000`

### `DEMO_VERSION`
- **Type:** String (version identifier)
- **Default:** Unspecified
- **Description:** Demo version identifier. Set when running in demo mode.
- **Example:** `export DEMO_VERSION=1.0.0`

### `IS_DEMO`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Indicates running in demo mode. Disables certain features or restrictions.
- **Example:** `export IS_DEMO=1`

### `IS_SANDBOX`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Indicates running inside a sandbox environment. May restrict filesystem or network access.
- **Example:** `export IS_SANDBOX=1`

### `SSH_CLIENT`
- **Type:** String (connection info)
- **Default:** Unspecified (set by SSH daemon)
- **Description:** SSH client connection info. Used for remote detection. Set by ssh daemon.
- **Example:** `192.168.1.100 55555 22`

### `SSH_CONNECTION`
- **Type:** String (connection details)
- **Default:** Unspecified
- **Description:** SSH connection details. Used for remote detection.
- **Example:** `192.168.1.100 55555 192.168.1.50 22`

### `SSH_TTY`
- **Type:** String (device path)
- **Default:** Unspecified
- **Description:** SSH TTY device. Used for remote detection. Set by ssh when allocating a pseudoterminal.
- **Example:** `/dev/pts/0`

### `WSL_DISTRO_NAME`
- **Type:** String (distro name)
- **Default:** Unspecified
- **Description:** WSL distribution name. Used for platform detection.
- **Example:** `Ubuntu`

### `STY`
- **Type:** String (session identifier)
- **Default:** Unspecified
- **Description:** GNU Screen session identifier. Set by GNU Screen.
- **Example:** `12345.pts-0.hostname`

### `VERBOSE_SSR`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable verbose server-side rendering logs. Development use only.
- **Example:** `export VERBOSE_SSR=1`

---

[← Back to env/README.md](./README.md)
