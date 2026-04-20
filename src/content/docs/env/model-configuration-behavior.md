---
title: "Model Configuration & Behavior"
tags: [environment]
---


### `ANTHROPIC_MODEL`
- **Type:** String (model ID)
- **Default:** Determined by provider and tier
- **Description:** Override the default Claude model for all API calls. Validated against known model IDs during startup. Can also be set via CLI flag or settings file.
- **Example:** `export ANTHROPIC_MODEL=claude-sonnet-4-6`
- **See also:** ANTHROPIC_DEFAULT_OPUS_MODEL, ANTHROPIC_DEFAULT_SONNET_MODEL, ANTHROPIC_DEFAULT_HAIKU_MODEL

### `ANTHROPIC_DEFAULT_OPUS_MODEL`
- **Type:** String (model ID)
- **Default:** `opus-4.6` (first-party); `opus-4.6` (third-party providers)
- **Description:** Override the default Opus model ID. Used when selecting a high-capability model.
- **Example:** `export ANTHROPIC_DEFAULT_OPUS_MODEL=claude-opus-4-1`

### `ANTHROPIC_DEFAULT_OPUS_MODEL_NAME`
- **Type:** String (display name)
- **Default:** Unspecified
- **Description:** Display name for custom Opus model override shown in the model selector UI.
- **Example:** `export ANTHROPIC_DEFAULT_OPUS_MODEL_NAME="Opus (Internal)"`

### `ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION`
- **Type:** String (description text)
- **Default:** Unspecified
- **Description:** Description text for custom Opus model override displayed in the model selector.
- **Example:** `export ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION="High-capability reasoning model for complex tasks"`

### `ANTHROPIC_DEFAULT_SONNET_MODEL`
- **Type:** String (model ID)
- **Default:** `sonnet-4.6` (first-party); `sonnet-4.5` (third-party providers)
- **Description:** Override the default Sonnet model ID. Used when selecting a balanced model.
- **Example:** `export ANTHROPIC_DEFAULT_SONNET_MODEL=claude-sonnet-4-6`

### `ANTHROPIC_DEFAULT_SONNET_MODEL_NAME`
- **Type:** String (display name)
- **Default:** Unspecified
- **Description:** Display name for custom Sonnet model override in the model selector.
- **Example:** `export ANTHROPIC_DEFAULT_SONNET_MODEL_NAME="Sonnet (Production)"`

### `ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION`
- **Type:** String (description text)
- **Default:** Unspecified
- **Description:** Description text for custom Sonnet model override.
- **Example:** `export ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION="Balanced model for general-purpose coding"`

### `ANTHROPIC_DEFAULT_HAIKU_MODEL`
- **Type:** String (model ID)
- **Default:** `haiku-4.5` (falls back if not set)
- **Description:** Override the default Haiku (small/fast) model ID. Used for non-first-party providers.
- **Example:** `export ANTHROPIC_DEFAULT_HAIKU_MODEL=claude-haiku-3-5`

### `ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME`
- **Type:** String (display name)
- **Default:** Unspecified
- **Description:** Display name for custom Haiku model override.
- **Example:** `export ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME="Haiku (Fast)"`

### `ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION`
- **Type:** String (description text)
- **Default:** Unspecified
- **Description:** Description text for custom Haiku model override.
- **Example:** `export ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION="Lightweight model for quick operations"`

### `ANTHROPIC_CUSTOM_MODEL_OPTION`
- **Type:** String (model ID)
- **Default:** Unspecified
- **Description:** Add a custom model ID to the model selector dropdown. Validated during model selection.
- **Example:** `export ANTHROPIC_CUSTOM_MODEL_OPTION=my-fine-tuned-model-v2`

### `ANTHROPIC_CUSTOM_MODEL_OPTION_NAME`
- **Type:** String (display name)
- **Default:** Unspecified
- **Description:** Display name for the custom model option in the selector.
- **Example:** `export ANTHROPIC_CUSTOM_MODEL_OPTION_NAME="My Fine-Tuned Model"`

### `ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION`
- **Type:** String (description text)
- **Default:** Falls back to "Custom model (MODEL_ID)"
- **Description:** Description text for the custom model option.
- **Example:** `export ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION="Fine-tuned on internal codebase"`

### `ANTHROPIC_SMALL_FAST_MODEL`
- **Type:** String (model ID)
- **Default:** `haiku-4.5` (or the Haiku override)
- **Description:** Override the small/fast model used for internal quick operations like context compaction and summarization.
- **Example:** `export ANTHROPIC_SMALL_FAST_MODEL=claude-haiku-3-5`

### `ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION`
- **Type:** String (AWS region)
- **Default:** Falls back to the general Bedrock region (AWS_REGION)
- **Description:** Specific AWS region for the small fast model when using Bedrock. Allows routing small operations to a different region.
- **Example:** `export ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION=us-west-2`
- **See also:** AWS_REGION, CLAUDE_CODE_USE_BEDROCK

### `CLAUDE_CODE_EFFORT_LEVEL`
- **Type:** String (enum: "low", "medium", "high")
- **Default:** "high"
- **Description:** Set the reasoning effort level for extended thinking on supported models. Affects token usage and reasoning depth.
- **Example:** `export CLAUDE_CODE_EFFORT_LEVEL=medium`

### `CLAUDE_CODE_ALWAYS_ENABLE_EFFORT`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Force effort level support on all models, not just opus-4-6 and sonnet-4-6. Useful when using third-party models with thinking capability.
- **Example:** `export CLAUDE_CODE_ALWAYS_ENABLE_EFFORT=1`

### `MAX_THINKING_TOKENS`
- **Type:** Integer
- **Default:** Unspecified (0 disables thinking)
- **Description:** Maximum tokens for extended thinking. If > 0, enables thinking with a fixed budget. Parsed as int; 0 or negative disables.
- **Example:** `export MAX_THINKING_TOKENS=8000`

### `CLAUDE_CODE_MAX_OUTPUT_TOKENS`
- **Type:** Integer
- **Default:** Model-dependent (typically 4096)
- **Description:** Maximum output tokens for responses. Validated against a per-model upper limit. Parsed as int.
- **Example:** `export CLAUDE_CODE_MAX_OUTPUT_TOKENS=8000`

### `CLAUDE_CODE_MAX_CONTEXT_TOKENS`
- **Type:** Integer
- **Default:** Unspecified
- **Precedence:** Only applied when DISABLE_COMPACT is set
- **Description:** Override the maximum context tokens. Must be > 0 when set.
- **Example:** `export CLAUDE_CODE_MAX_CONTEXT_TOKENS=200000`
- **See also:** DISABLE_COMPACT, CLAUDE_CODE_AUTO_COMPACT_WINDOW

### `CLAUDE_CODE_SUBAGENT_MODEL`
- **Type:** String (model ID)
- **Default:** Unspecified (uses normal model selection logic)
- **Description:** Force a specific model for all sub-agent and teammate operations, overriding normal model selection.
- **Example:** `export CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6`

### `CLAUDE_CODE_EXTRA_BODY`
- **Type:** String (JSON object)
- **Default:** Unspecified
- **Description:** Extra JSON body parameters to include in API requests. Merged with standard request body.
- **Example:** `export CLAUDE_CODE_EXTRA_BODY='{"temperature": 0.5}'`

### `CLAUDE_CODE_EXTRA_METADATA`
- **Type:** String (JSON object)
- **Default:** Unspecified
- **Description:** Extra metadata to include in the API request metadata field. Merged with standard metadata.
- **Example:** `export CLAUDE_CODE_EXTRA_METADATA='{"user_id": "123", "session": "abc"}'`

### `FALLBACK_FOR_ALL_PRIMARY_MODELS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable fallback behavior for all primary models, not just specific ones. When enabled, allows retrying with other models on failure.
- **Example:** `export FALLBACK_FOR_ALL_PRIMARY_MODELS=1`

---

[← Back to env/README.md](/claude-code-docs/env/overview/)
