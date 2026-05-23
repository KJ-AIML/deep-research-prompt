# Example: Integrating Pi SDK as Headless Coding Agent

## Grill Questions Asked

1. What does your product do and what's the tech stack?
2. What will the agent do — generate code, review it, deploy it, or all three?
3. Do you need headless SDK mode (no TUI) or interactive terminal mode?
4. What's your deployment target — Docker container, cloud function, local dev machine?
5. Is this solo or does a team depend on it? What's the timeline?
6. What have you already tried or ruled out?
7. What specific decision does this research need to unlock?

## User Answers

- Product: AI-powered backend code generator — generates FastAPI services from natural language specs
- Stack: Bun, TypeScript, Hono API, BullMQ, Docker-in-Docker sandbox
- Agent role: Generate FastAPI code + call validation tools autonomously
- Mode: Headless SDK only — no TUI needed, runs inside a Docker container
- Deployment: DinD containers on Railway/self-hosted
- Prior attempts: Raw LLM calls with manual tool orchestration — too fragile
- Timeline: MVP in 4 weeks, solo engineer
- Decision to unlock: Whether to use Pi SDK vs raw LangGraph for the agent loop

## Generated Research Prompt

---

# Deep Research Prompt: Pi SDK as Headless Code Generation Agent in Docker

## Mission Statement
Determine whether Pi SDK (`@earendil-works/pi-coding-agent`) can replace a custom LangGraph
agent loop as the code generation brain inside a SaaS product, running headless inside
Docker containers with no TTY, calling custom validation tools autonomously.

## Background & Context
- Stack: Bun/TypeScript, Hono API, BullMQ queue, Docker-in-Docker sandboxes
- Current approach: Raw LLM calls with manual tool orchestration — brittle at >3 tool steps
- Pi SDK has `createAgentSession()`, `defineTool()`, skill system, multi-provider support
- Pi is MIT licensed — can be vendored or forked
- Deployment: containers on Railway, ~30s cold start budget per generation job

## Research Scope
**In scope:**
- Pi SDK headless configuration (no TTY, no TUI)
- Custom tool integration via `defineTool()`
- Session lifecycle inside BullMQ jobs
- Performance: cold start, token overhead vs raw LLM
- Comparison: Pi SDK vs LangGraph for this use case

**Out of scope:**
- Pi TUI / interactive mode
- Pi CLI usage
- OAuth flows (using direct API keys only)

## Research Questions

### 1. Headless Configuration
- What `createAgentSession()` options are required for no-TTY Docker operation?
- Which `SessionManager` and `ResourceLoader` settings must be set?
- Does Pi write to stdout/stderr in ways that break Docker container logging?

### 2. Custom Tool Integration
- How does `defineTool()` work — schema, execute function, error handling?
- Can tools trigger sandbox operations (docker exec, file writes)?
- How does Pi handle tool call failures — retry, abort, or surface to caller?

### 3. BullMQ Integration Pattern
- Should each BullMQ job create a fresh Pi session or reuse a persistent one?
- What is the session teardown API — memory leaks in long-running workers?
- How to pass job context (spec, user ID, job ID) into the Pi session?

### 4. Performance & Cost
- What is Pi SDK cold start overhead vs raw `anthropic.messages.create()`?
- Does Pi add token overhead (hidden system prompt, context management)?
- How does context compaction work — automatic or manual trigger?

### 5. Pi SDK vs LangGraph Decision
- For a single-agent, multi-tool code generation loop — which has less boilerplate?
- Which handles tool call errors more gracefully in production?
- Which is easier to debug when the agent takes a wrong path?

## Deliverables Expected
- [ ] Working `createAgentSession()` config for headless Docker (TypeScript snippet)
- [ ] `defineTool()` example for a sandbox validation tool
- [ ] BullMQ + Pi session lifecycle pattern (create → run → destroy)
- [ ] Comparison table: Pi SDK vs LangGraph for this use case
- [ ] Recommendation with tradeoffs

## Constraints
- Stack: Bun + TypeScript (not Node.js — check Bun compatibility)
- Timeline: 4 weeks to MVP
- Scale: Solo engineer maintaining this
- Budget: Must run in existing Railway containers (no new infra)

## Success Criteria
1. Pi session runs inside Docker with no TTY and produces generated code
2. Custom validation tool integrates and Pi calls it autonomously
3. Session properly tears down after each BullMQ job (no memory leak)
4. Decision made: Pi SDK vs LangGraph with concrete reasoning

---

## Notes
- Quality: 5/5 — questions extracted exactly the right constraints (Bun compat, BullMQ pattern, DinD)
- The "Bun compatibility" sub-question was auto-generated from stack context — important catch
