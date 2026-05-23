# 🔬 deep-research-prompt

> A Claude skill that **grills you first, then writes the research prompt** — so your AI agent actually knows what to research.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Claude Skill](https://img.shields.io/badge/Claude-Skill-blueviolet)](https://claude.ai)
[![Pi Agent](https://img.shields.io/badge/Pi-Agent-green)](https://pi.dev)
[![AXGA](https://img.shields.io/badge/AXGA-Compatible-blue)](https://axga.dev)

---

## Table of Contents

- [The Problem](#the-problem)
- [How It Works](#how-it-works)
- [What Makes This Different](#what-makes-this-different)
- [Quick Example](#quick-example)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Compatibility](#compatibility)
- [Contributing](#contributing)
- [License](#license)

---

## The Problem

Most research prompts are vague. You write *"research how to build X"* and the AI gives you a generic overview that misses your actual constraints, stack, and decision context.

**This skill fixes that.**

It interrogates you first — *GrillMe style* — extracts the real context, then synthesizes a production-ready research prompt that an AI agent can execute with **no further clarification**.

---

## How It Works

### Phase 1 — The Grill 🔥

Asks **5–8 sharp questions** in one shot across 4 dimensions:

| Dimension | What it extracts |
|-----------|-----------------|
| **Real Problem** | The decision this research unblocks |
| **Context & Constraints** | Stack, timeline, budget, prior attempts |
| **Scope Control** | What's in AND out of scope (prevents scope creep) |
| **Output Shape** | Who reads it, what format, how deep |

### Phase 2 — The Synthesis 📄

Produces a structured research prompt with:

```
# Deep Research Prompt: [TITLE]

## Mission Statement
## Background & Context  
## Research Scope (in/out)
## Research Questions (5+ with sub-questions)
## Deliverables Expected
## Constraints to Respect
## Success Criteria
## Suggested Research Approach
```

---

## What Makes This Different

| Typical AI Research | With This Skill |
|---------------------|-----------------|
| Generic overview | Decision-driven, context-aware |
| Scope creep | Explicit in/out of scope |
| No deliverables defined | Concrete tables, code, comparisons |
| "Let me know if you need anything else" | Actionable by an agent swarm with zero follow-up |

---

## Quick Example

**User:** *"I want to research using Pi SDK as a coding agent inside my product"*

**Skill grills:**

> 1. What does your product do and what's the tech stack?  
> 2. What will the agent do — generate code, review it, both?  
> 3. Do you need headless (no TUI) or interactive mode?  
> 4. What's your deployment target — Docker, cloud, local?  
> 5. What's the timeline and are you building this solo?  
> 6. What have you already tried or ruled out?  
> 7. What decision does this research need to unlock?

**Skill outputs:** → [See full example](examples/axga-pi-sdk-integration.md)

---

## Installation

### Option 1 — Download `.skill` file (Claude.ai)

1. Download [`skill/deep-research-prompt.skill`](./skill/deep-research-prompt.skill)
2. In Claude, go to **Settings → Skills**
3. Click **Install from file** and select the `.skill` file

### Option 2 — Copy SKILL.md manually (Claude Code / Pi / AXGA)

```bash
# Claude Code / AXGA
mkdir -p ~/.axga/agent/skills/deep-research-prompt
cp skill/SKILL.md ~/.axga/agent/skills/deep-research-prompt/SKILL.md

# Pi coding agent
mkdir -p ~/.pi/agent/skills/deep-research-prompt
cp skill/SKILL.md ~/.pi/agent/skills/deep-research-prompt/SKILL.md
```

---

## Usage

The skill triggers automatically when you say things like:

- *"Help me research X"*
- *"I want to investigate Y"*  
- *"Create a research prompt for Z"*
- *"Deep research on..."*
- *"I'm evaluating whether to use..."*
- *"I have this vague idea and need to figure out..."*

Or explicitly mention it:

```
@deep-research-prompt research Firecracker vs Docker for sandbox isolation
```

---

## Examples

| Example | Topic |
|---------|-------|
| [AXGA Pi SDK Integration](examples/axga-pi-sdk-integration.md) | Integrating Pi SDK headless into a SaaS product |
| [Forking a Coding Agent](examples/axga-fork-research.md) | Forking Pi into a private branded tool |

> Want to add your own? See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Compatibility

| Platform | Status | Install Method |
|----------|--------|----------------|
| Claude.ai (Skills) | ✅ Supported | `.skill` file upload |
| Claude Code | ✅ Supported | Copy `SKILL.md` |
| Pi coding agent | ✅ Supported | Copy `SKILL.md` |
| AXGA | ✅ Supported | Copy `SKILL.md` |

---

## Contributing

PRs welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

**Top contribution ideas:**

- 📝 **New example outputs** — run the skill on a real topic, share the result
- 🔥 **Better grill questions** — suggest additions for specific domains (security, hiring, market research)
- 📦 **Domain-specific templates** — add `references/` folders for specialized research
- 🌍 **Translations** — help localize the skill

---

## License

MIT — use it, fork it, embed it in your product.

Copyright 2026 Ter (ก้องภพ)
