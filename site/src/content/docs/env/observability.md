---
title: "Observability"
---

# Observability


### OpenTelemetry (OTEL)

#### `OTEL_EXPORTER_OTLP_ENDPOINT`
- **Type:** URL
- **Default:** Unspecified (no export)
- **Description:** OTLP exporter endpoint URL. Base endpoint for traces, metrics, and logs. Usually port 4317 (gRPC) or 4318 (HTTP).
- **Example:** `export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317`

#### `OTEL_EXPORTER_OTLP_HEADERS`
- **Type:** String (comma-separated key=value pairs)
- **Default:** Unspecified
- **Description:** Headers for OTLP exporter requests. Useful for authentication or custom metadata.
- **Example:** `export OTEL_EXPORTER_OTLP_HEADERS=Authorization=Bearer token123`

#### `OTEL_EXPORTER_OTLP_PROTOCOL`
- **Type:** String (enum: grpc, http/protobuf, http/json)
- **Default:** grpc
- **Description:** OTLP transport protocol. Controls how data is sent to the collector.
- **Example:** `export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf`

#### `OTEL_EXPORTER_OTLP_INSECURE`
- **Type:** Boolean (true, false)
- **Default:** false
- **Description:** Allow insecure (non-TLS) OTLP connections. Only use in development/testing.
- **Example:** `export OTEL_EXPORTER_OTLP_INSECURE=true`

#### `OTEL_EXPORTER_OTLP_TRACES_PROTOCOL`
- **Type:** String (enum: grpc, http/protobuf, http/json)
- **Default:** Inherits OTEL_EXPORTER_OTLP_PROTOCOL
- **Description:** Override OTLP protocol specifically for traces.
- **Example:** `export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=http/protobuf`

#### `OTEL_EXPORTER_OTLP_METRICS_PROTOCOL`
- **Type:** String (enum: grpc, http/protobuf, http/json)
- **Default:** Inherits OTEL_EXPORTER_OTLP_PROTOCOL
- **Description:** Override OTLP protocol specifically for metrics.
- **Example:** `export OTEL_EXPORTER_OTLP_METRICS_PROTOCOL=http/protobuf`

#### `OTEL_EXPORTER_OTLP_LOGS_PROTOCOL`
- **Type:** String (enum: grpc, http/protobuf, http/json)
- **Default:** Inherits OTEL_EXPORTER_OTLP_PROTOCOL
- **Description:** Override OTLP protocol specifically for logs.
- **Example:** `export OTEL_EXPORTER_OTLP_LOGS_PROTOCOL=http/protobuf`

#### `OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE`
- **Type:** String (enum: cumulative, delta)
- **Default:** cumulative
- **Description:** Metrics temporality preference. Cumulative is standard; delta is more efficient.
- **Example:** `export OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE=delta`

#### `OTEL_TRACES_EXPORTER`
- **Type:** String (enum: otlp, console, none)
- **Default:** none
- **Description:** Traces exporter type. Set to otlp to send to OTLP endpoint, console for stdout, none to disable.
- **Example:** `export OTEL_TRACES_EXPORTER=otlp`

#### `OTEL_METRICS_EXPORTER`
- **Type:** String (enum: otlp, prometheus, console, none)
- **Default:** none
- **Description:** Metrics exporter type. Prometheus exports for Prometheus scraping.
- **Example:** `export OTEL_METRICS_EXPORTER=prometheus`

#### `OTEL_LOGS_EXPORTER`
- **Type:** String (enum: otlp, console, none)
- **Default:** none
- **Description:** Logs exporter type.
- **Example:** `export OTEL_LOGS_EXPORTER=otlp`

#### `OTEL_EXPORTER_PROMETHEUS_HOST`
- **Type:** String (hostname or IP)
- **Default:** 0.0.0.0
- **Description:** Host for Prometheus metrics exporter. Usually binds to all interfaces.
- **Example:** `export OTEL_EXPORTER_PROMETHEUS_HOST=localhost`

#### `OTEL_EXPORTER_PROMETHEUS_PORT`
- **Type:** Integer (port number)
- **Default:** 8888
- **Description:** Port for Prometheus metrics exporter.
- **Example:** `export OTEL_EXPORTER_PROMETHEUS_PORT=9090`

#### `OTEL_TRACES_EXPORT_INTERVAL`
- **Type:** Integer (milliseconds)
- **Default:** 5000
- **Description:** Traces export interval in milliseconds. How often to flush traces to the collector.
- **Example:** `export OTEL_TRACES_EXPORT_INTERVAL=10000`

#### `OTEL_METRIC_EXPORT_INTERVAL`
- **Type:** Integer (milliseconds)
- **Default:** 60000
- **Description:** Metrics export interval in milliseconds.
- **Example:** `export OTEL_METRIC_EXPORT_INTERVAL=30000`

#### `OTEL_LOGS_EXPORT_INTERVAL`
- **Type:** Integer (milliseconds)
- **Default:** 5000
- **Description:** Logs export interval in milliseconds.
- **Example:** `export OTEL_LOGS_EXPORT_INTERVAL=10000`

#### `OTEL_LOG_TOOL_CONTENT`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Log tool content (input/output) in OTEL spans. Can be verbose; use cautiously.
- **Example:** `export OTEL_LOG_TOOL_CONTENT=1`

#### `OTEL_LOG_TOOL_DETAILS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Log detailed tool use information in OTEL spans.
- **Example:** `export OTEL_LOG_TOOL_DETAILS=1`

#### `OTEL_LOG_USER_PROMPTS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Log user prompts in OTEL spans. Useful for tracing; be aware of privacy implications.
- **Example:** `export OTEL_LOG_USER_PROMPTS=1`

#### `CLAUDE_CODE_OTEL_FLUSH_TIMEOUT_MS`
- **Type:** Integer (milliseconds)
- **Default:** 5000
- **Description:** OTEL flush timeout in milliseconds. Time to wait for pending spans before shutdown.
- **Example:** `export CLAUDE_CODE_OTEL_FLUSH_TIMEOUT_MS=10000`

#### `CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS`
- **Type:** Integer (milliseconds)
- **Default:** 2000
- **Description:** OTEL shutdown timeout in milliseconds. Time to gracefully close exporters.
- **Example:** `export CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS=5000`

#### `CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS`
- **Type:** Integer (milliseconds)
- **Default:** Unspecified
- **Description:** Debounce interval for OTEL headers helper in milliseconds.
- **Example:** `export CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS=1000`

### Datadog

#### `CLAUDE_CODE_DATADOG_FLUSH_INTERVAL_MS`
- **Type:** Integer (milliseconds)
- **Default:** 15000
- **Description:** Datadog log flush interval in milliseconds. How often to send logs to Datadog.
- **Example:** `export CLAUDE_CODE_DATADOG_FLUSH_INTERVAL_MS=10000`

### Profiling & Diagnostics

#### `CLAUDE_CODE_PROFILE_STARTUP`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable startup profiling. Collects timing data for the startup sequence.
- **Example:** `export CLAUDE_CODE_PROFILE_STARTUP=1`

#### `CLAUDE_CODE_PERFETTO_TRACE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable Perfetto trace collection. Generates detailed performance traces for visualization.
- **Example:** `export CLAUDE_CODE_PERFETTO_TRACE=1`

#### `CLAUDE_CODE_COMMIT_LOG`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable React commit (render) performance logging. Not related to git commits; tracks UI rendering.
- **Example:** `export CLAUDE_CODE_COMMIT_LOG=1`

#### `CLAUDE_CODE_DEBUG_REPAINTS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable debug logging for UI repaints. Shows when and why UI components re-render.
- **Example:** `export CLAUDE_CODE_DEBUG_REPAINTS=1`

#### `CLAUDE_CODE_FRAME_TIMING_LOG`
- **Type:** String (file path)
- **Default:** Unspecified (no frame timing log)
- **Description:** Path to write frame timing logs. Detailed timing data for each frame rendered.
- **Example:** `export CLAUDE_CODE_FRAME_TIMING_LOG=/tmp/frame-timing.txt`

#### `CLAUDE_CODE_SCROLL_SPEED`
- **Type:** Float
- **Default:** 3.0 on Windows Terminal; 1.0 elsewhere
- **Range:** Clamped to max 20
- **Description:** Terminal scroll speed multiplier. Parsed as float. Lower = slower scrolling.
- **Example:** `export CLAUDE_CODE_SCROLL_SPEED=2.5`

#### `CLAUDE_CODE_SLOW_OPERATION_THRESHOLD_MS`
- **Type:** Integer (milliseconds)
- **Default:** Unspecified
- **Description:** Threshold in ms for logging slow operations. Operations taking longer are logged.
- **Example:** `export CLAUDE_CODE_SLOW_OPERATION_THRESHOLD_MS=1000`

#### `CLAUDE_CODE_EAGER_FLUSH`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable eager flushing of output buffers. Ensures output is written immediately.
- **Example:** `export CLAUDE_CODE_EAGER_FLUSH=1`

#### `CLAUDE_CODE_NO_FLICKER`
- **Type:** Integer (1 or 0, not boolean)
- **Default:** Unspecified (auto-detect)
- **Description:** Force fullscreen anti-flicker mode. Set to 1 to enable (overrides tmux detection). Set to 0 to force-disable.
- **Example:** `export CLAUDE_CODE_NO_FLICKER=1`

#### `CLAUDE_CODE_STALL_TIMEOUT_MS_FOR_TESTING`
- **Type:** Integer (milliseconds)
- **Default:** Unspecified
- **Description:** Stall timeout override for testing purposes. Used in tests to simulate slow operations.
- **Example:** `export CLAUDE_CODE_STALL_TIMEOUT_MS_FOR_TESTING=5000`

#### `CLAUDE_CODE_EMIT_SESSION_STATE_EVENTS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Emit session_state_changed system events when the session transitions between idle/running states.
- **Example:** `export CLAUDE_CODE_EMIT_SESSION_STATE_EVENTS=1`

#### `CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Skip network error handling in fast mode. Useful for debugging network issues.
- **Example:** `export CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS=1`

---

[← Back to env/README.md](/claude-code-docs/env/overview/)
