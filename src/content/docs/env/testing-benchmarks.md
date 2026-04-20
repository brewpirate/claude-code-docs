---
title: "Testing & Benchmarks"
tags: [environment]
---


### `SWE_BENCH_INSTANCE_ID`
- **Type:** String (instance identifier)
- **Default:** Unspecified
- **Description:** SWE-bench instance identifier. Used in SWE-bench benchmarking runs.
- **Example:** `export SWE_BENCH_INSTANCE_ID=instance-123`

### `SWE_BENCH_RUN_ID`
- **Type:** String (run identifier)
- **Default:** Unspecified
- **Description:** SWE-bench run identifier for benchmarking. Tracks a benchmarking run.
- **Example:** `export SWE_BENCH_RUN_ID=run-abc123`

### `SWE_BENCH_TASK_ID`
- **Type:** String (task identifier)
- **Default:** Unspecified
- **Description:** SWE-bench task identifier. Identifies the specific task being benchmarked.
- **Example:** `export SWE_BENCH_TASK_ID=task-xyz789`

### `CLAUDE_CODE_TEST_FIXTURES_ROOT`
- **Type:** String (directory path)
- **Default:** Unspecified
- **Description:** Root directory for test fixtures. Used in testing to locate test data.
- **Example:** `export CLAUDE_CODE_TEST_FIXTURES_ROOT=/test/fixtures`

### `TEST_ENABLE_SESSION_PERSISTENCE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable session persistence in tests. Allows sessions to persist across test runs.
- **Example:** `export TEST_ENABLE_SESSION_PERSISTENCE=1`

### `TEST_GRACEFUL_FS_GLOBAL_PATCH`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable graceful-fs global patching in tests. Patches filesystem operations for test stability.
- **Example:** `export TEST_GRACEFUL_FS_GLOBAL_PATCH=1`

### `VCR_RECORD`
- **Type:** String (record mode)
- **Default:** Unspecified
- **Description:** VCR recording mode for test replay. Controls whether HTTP interactions are recorded or replayed.
- **Example:** `export VCR_RECORD=once`

### `AWS_LAMBDA_BENCHMARK_MODE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Set to '1' to enable Lambda benchmark testing mode.
- **Example:** `export AWS_LAMBDA_BENCHMARK_MODE=1`

---

[← Back to env/README.md](/claude-code-docs/env/overview/)
