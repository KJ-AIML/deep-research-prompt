# AGENTS.md — deep-research-prompt

> AI coding agent orientation for the `deep-research-prompt` project.
> This is a **documentation-only prompt-engineering artifact**, not a codebase with build artifacts, tests, or a runtime.

---

## Project Overview

`deep-research-prompt` is a **Claude Skill** that generates production-ready research prompts. It works by first "grilling" the user with 5–8 targeted questions across four dimensions (Real Problem, Context & Constraints, Scope Control, Output Shape), then synthesizing a structured research prompt that an AI agent swarm can execute autonomously.

**Project type:** Documentation / Prompt-template distribution.  
**License:** MIT.  
**Language of project:** English (all docs, comments, and templates).

There is **no compiled code, no package manager, and no CI/CD build**. The deliverables are Markdown files and ZIP-packaged `.skill` files consumed by Claude, Claude Code, and Pi coding agent.

---

## Directory Layout

```
.
├── README.md                         # Human-facing project overview (marketing / install guide)
├── SKILL.md                          # Root copy of the skill definition (for visibility)
├── deep-research-prompt.skill        # Root copy of the packaged skill (ZIP archive)
├── skill/
│   ├── SKILL.md                      # Canonical skill definition (identical to root copy)
│   └── deep-research-prompt.skill    # Canonical packaged skill (identical to root copy)
├── examples/
│   ├── fork-coding-agent.md          # Example: forking a coding agent into a private tool
│   └── pi-sdk-integration.md         # Example: integrating a headless SDK
├── .github/ISSUE_TEMPLATE/
│   ├── bad-output.md                 # Template for quality regression reports
│   └── new-example.md                # Template for community example submissions
├── CONTRIBUTING.md                   # Contribution guidelines
├── LICENSE                           # MIT license
└── .gitignore                        # Ignores .DS_Store, *.log, node_modules/, .env
```

### Important duplication rule

Every distributable artifact is maintained in **two identical copies**: one at the repository root (for GitHub browsing and raw-file URLs) and one inside `skill/` (the canonical package directory). When you edit `SKILL.md` or the `.skill` archive, you **must keep both copies in sync**.

---

## Technology Stack & Runtime Architecture

| Layer | Technology | Notes |
|-------|-----------|-------|
| Source format | Markdown (YAML front-matter) | `SKILL.md` uses YAML front-matter for skill metadata (`name`, `description`) |
| Package format | ZIP archive (`.skill`) | The `.skill` files are ZIP archives produced by Claude's skill-packaging tooling. Do not attempt to hand-edit the ZIP contents; edit `SKILL.md` and re-package if necessary. |
| Runtime | Claude / Claude Code / Pi | Consumed by AI agent platforms as a skill/prompt template. No local execution environment. |
| Dependencies | None | No `package.json`, `pyproject.toml`, `Cargo.toml`, or equivalent exists. |

---

## Build and Release Process

### There is no traditional build

- **No compilation step.**
- **No test runner.**
- **No linting or formatting pipeline.**

### Manual release steps (when `SKILL.md` changes)

1. Edit `skill/SKILL.md`.
2. Copy the updated `skill/SKILL.md` to the repository root (`SKILL.md`).
3. If the `.skill` archive needs updating, re-package it via Claude's skill-export flow (or copy the ZIP into both root and `skill/`).
4. Verify byte-for-byte identity:
   ```bash
   diff SKILL.md skill/SKILL.md
   diff deep-research-prompt.skill skill/deep-research-prompt.skill
   ```
5. Commit with a clear message (e.g., `feat: add domain-specific grill dimension for security`).

---

## Code Style Guidelines

### Markdown conventions

- Use ATX-style headers (`#`, `##`, etc.).
- Keep lines wrapped at a readable length (≈100 characters) where feasible, but do not enforce hard wraps inside code blocks or tables.
- Use fenced code blocks with explicit language tags.
- Maintain consistent header hierarchy; do not skip levels.

### Skill-writing conventions (inside `SKILL.md`)

- **Ask 5–8 questions in one shot** — never one-at-a-time.
- Group grill questions under the four documented dimensions.
- The synthesis template must contain **all eight sections**; never leave a section empty.
- Use the behavior-summary table at the end of `SKILL.md` as the source of truth for edge-case handling.
- Keep the tone direct and slightly confrontational ("GrillMe" style); do not soften questions.

---

## Testing Strategy

There are **no automated tests**. Quality assurance is manual:

1. Load the skill into Claude (Claude.ai, Claude Code, or another supported platform).
2. Trigger it with a vague research topic (e.g., *"Help me research embedding a coding agent in my SaaS"*).
3. Answer the grill questions.
4. Evaluate the synthesized prompt against the **Quality Checklist** defined in `SKILL.md`:
   - Mission statement is 1–2 sentences and specific.
   - At least 5 research questions, each with 2–3 sub-questions.
   - Out-of-scope section is filled.
   - Deliverables are concrete (tables, code, comparisons).
   - Success criteria are measurable.
   - Prompt is actionable by an AI agent with no further clarification needed.
5. If the output is sub-par, open a GitHub issue using the `bad-output.md` template or submit a PR adjusting `SKILL.md`.

### Adding new examples

If you run the skill on a real topic and want to contribute the output:

1. Create `examples/<topic-slug>.md`.
2. Follow the exact structure used by existing examples:
   - `# Example: [Topic Name]`
   - `## Grill Questions Asked`
   - `## User Answers`
   - `## Generated Research Prompt`
   - `## Notes` (quality rating, observations)
3. Open a PR.

---

## Deployment & Distribution

Users install the skill in one of two ways:

1. **Download `.skill` file:**
   - Download `skill/deep-research-prompt.skill`.
   - In Claude, go to **Settings → Skills → Install from file**.

2. **Copy `SKILL.md` manually:**
   ```bash
   # Claude Code
   mkdir -p ~/.claude/skills/deep-research-prompt
   cp skill/SKILL.md ~/.claude/skills/deep-research-prompt/SKILL.md

   # Pi coding agent
   mkdir -p ~/.pi/agent/skills/deep-research-prompt
   cp skill/SKILL.md ~/.pi/agent/skills/deep-research-prompt/SKILL.md
   ```

There is no hosted service, no container image, and no package registry publication step.

---

## Security Considerations

- The `.skill` files are ZIP archives. Before accepting external contributions that modify them, inspect the ZIP contents to ensure no unexpected files are injected.
- `SKILL.md` contains prompt-injection guidance (it instructs the AI how to behave). Review any PR that changes the "Behavior Summary" or "Grill Tone" sections carefully, as these alter the agent's behavior surface.
- No secrets, tokens, or API keys are present in the repository (confirmed by `.gitignore` rules for `.env` and `*.log`).

---

## Contribution Workflow

1. Fork the repo.
2. Create a branch: `git checkout -b feat/your-contribution`.
3. Make changes (most commonly to `skill/SKILL.md` or `examples/`).
4. Sync the root duplicates if you touched `skill/SKILL.md` or `skill/deep-research-prompt.skill`.
5. Test the skill manually with Claude (see Testing Strategy above).
6. Open a PR with a clear description.

For full details, see `CONTRIBUTING.md`.

---

## Compatibility Matrix

| Platform | Status | Install Path |
|----------|--------|--------------|
| Claude.ai (Skills) | ✅ Supported | `.skill` file upload |
| Claude Code | ✅ Supported | `~/.claude/skills/deep-research-prompt/SKILL.md` |
| Pi coding agent | ✅ Supported | `~/.pi/agent/skills/deep-research-prompt/SKILL.md` |


---

## Quick Reference for Agents

- **If asked to add a feature:** You probably need to edit `skill/SKILL.md` (and sync the root copy). Features here are new grill dimensions, output sections, or behavior rules.
- **If asked to fix a bug:** Review the "Behavior Summary" and "Quality Checklist" in `SKILL.md`; the fix is usually a wording change or a new rule, not a code change.
- **If asked to add an example:** Create a new file in `examples/` following the existing template.
- **If asked to build/test:** Remind the user there is no build system; manual testing with Claude is required.
