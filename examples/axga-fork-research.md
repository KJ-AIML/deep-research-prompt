# Example: Forking a Coding Agent to a Private Branded Tool

## Setup
User wanted to fork the Pi coding agent (MIT) into a private repo called AXGA,
rename everything, and use it as the code generation brain inside Axtra Intellion — 
a backend-first AI code generator SaaS.

## The Grill (Questions Asked)

```
Before writing this prompt, I need to understand your situation:

1. What decision does this research unlock — are you choosing between forking Pi vs 
   building your own agent vs using the npm package as-is?

2. What's your stack? (language, runtime, deployment target)

3. What does "internal tool" mean here — a CLI your team uses, an SDK embedded in 
   a backend service, or something else?

4. What Pi features do you actually need? (TUI, SDK createAgentSession, 
   extensions, skills, all of it?)

5. What have you already tried or ruled out?

6. Who will maintain this fork — you solo, or a team?

7. Timeline and scale: personal tool this week, or production-grade system?

8. What should the research definitely NOT cover? (e.g. if you've already decided 
   on the branding, don't need that researched)
```

## User's Answers

- Forking because need full control + custom branding (not just npm package)
- Stack: Bun, TypeScript, Hono API, Docker
- Embedding as SDK inside sandbox containers — no TUI needed for production, but want TUI preserved for devs
- Need: createAgentSession(), defineTool(), skills system, all 15+ providers
- Already confirmed MIT allows this
- Solo maintainer
- Production system — need it right, not fast
- Don't need: Replit-style web IDE, anything frontend

## Output Prompt

```markdown
# Deep Research Prompt: Complete Private Fork of Pi Coding Agent → AXGA

## Mission Statement
Produce a complete, command-by-command playbook for forking earendil-works/pi 
(MIT) into a private repo called AXGA — renaming all packages, disabling 
upstream telemetry, and preserving 100% of CLI/SDK/TUI/provider functionality — 
so it can be embedded as a headless SDK inside Docker sandbox containers.

## Background & Context
- Stack: Bun runtime, TypeScript, Hono API, Docker-in-Docker sandboxes
- Pi is MIT licensed — fork is legally permitted
- Pi monorepo has 4 packages: pi-tui, pi-ai, pi-agent-core, pi-coding-agent
- Need: createAgentSession() SDK, defineTool(), skills, 15+ LLM providers
- Don't need: Web UI, frontend components
- Will be maintained solo — minimize ongoing maintenance burden
- Production system: correctness over speed

## Research Questions

### 1. Repo Setup
- Exact git commands to clone Pi, strip history, push to private GitHub
- How to initialize clean single-commit history
- How to set up branch protection for solo maintainer

### 2. Package Rename (Complete Map)
- Every file containing @earendil-works/pi-* references
- Safe bulk sed/perl commands for renaming across 120+ files
- Which files require hand-editing (cannot be bulk-renamed safely)
- Post-rename verification commands

### 3. Branding Replacement
- Where APP_NAME and CONFIG_DIR_NAME are defined
- Full list of hardcoded "pi" strings in user-facing output
- Environment variable rename (PI_* → AXGA_*)
- Config directory rename (~/.pi/ → ~/.axga/)

### 4. Telemetry Audit
- Every network call Pi makes to pi.dev or external endpoints
- Which ones are required (OAuth) vs optional (telemetry)
- How to disable all non-essential phone-home calls
- Feature flag approach for unified telemetry kill switch

### 5. Build System
- Exact build order (tui → ai → agent → coding-agent)
- tsgo vs tsc: which compiler Pi uses and why it matters
- How to compile single-file binary with bun build --compile
- Cross-platform binary targets

### 6. SDK Headless Operation
- How to run createAgentSession() without TTY in Docker
- Required SessionManager and ResourceLoader config for headless
- Custom tool integration with defineTool()
- How to pre-bundle axtra-specific skills

## Deliverables
- [ ] Step-by-step setup commands (copy-paste ready)
- [ ] Complete file list with what to change in each
- [ ] Search-and-replace patterns (regex) for bulk rename
- [ ] Telemetry disable code snippets
- [ ] Verification checklist: 13 checks to confirm fork works
- [ ] MIT compliance checklist

## Success Criteria
1. `axga --version` works and shows AXGA branding
2. `axga -p "list files"` runs without error
3. `grep -r "@earendil-works" packages/` returns zero results
4. `createAgentSession()` works in a headless Node.js test script
5. All existing Pi tests pass under new package names
```

## What Made This Good

- The grill revealed **headless SDK** was the primary use case — which completely changed the scope (no TUI sections needed in Phase 1)
- "Solo maintainer" answer → added "minimize maintenance burden" to constraints
- "Production system" answer → added correctness requirement, no shortcuts
- Anti-scope clarification → removed web/frontend research that would have bloated the prompt by 30%
