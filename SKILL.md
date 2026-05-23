---
name: deep-research-prompt
description: >
  Generate a comprehensive deep research prompt by first grilling the user with
  targeted questions to extract full context, then synthesizing a production-ready
  research prompt that an AI agent swarm can execute. Use this skill whenever the
  user wants to research a technical topic, plan a project, evaluate a technology,
  design a system architecture, compare options, or asks for a "research prompt",
  "deep research", "comprehensive prompt", "help me research X", or says they want
  to investigate something thoroughly. Also trigger when the user shares a vague idea
  and needs it crystallized into an actionable research brief — even if they don't
  say "research". Trigger when the user is deciding between technologies, evaluating
  approaches, or needs a structured brief before starting work.
---

# Deep Research Prompt Generator

A two-phase skill that combines **GrillMe** (targeted interrogation) with
**Prompt Engineering** to produce a comprehensive, agent-ready research prompt.

---

## Philosophy

The best research prompt cannot be written without knowing:
1. **What** exactly needs to be researched (not the surface ask — the real ask)
2. **Why** it matters (context shapes depth and angle)
3. **Who** will act on it (a solo dev vs a team vs an AI agent swarm)
4. **What decisions** the research will unlock
5. **What's already known** (avoid re-researching dead ends)

This skill interrogates first, writes second.

---

## Phase 1 — The Grill

### How to Grill

Ask **5–8 sharp questions** in one shot. Do NOT ask one question at a time.
Questions should be specific, sometimes uncomfortable, and always purposeful.

Group questions by dimension:

**Dimension 1 — The Real Problem**
- What decision or action does this research unblock?
- What's the most important thing you DON'T know yet?
- If the research came back perfect, what would you do next?

**Dimension 2 — Context & Constraints**
- What stack/tools/platforms are already in play?
- What's the timeline? (research for tomorrow vs next quarter)
- What's the budget/scale constraint? (solo project vs enterprise)
- What have you already tried or ruled out?

**Dimension 3 — Scope Control**
- What should the research definitely NOT cover? (anti-scope)
- What level of depth? (overview vs implementation-ready)
- Should it include comparisons? benchmarks? cost analysis? legal/compliance?

**Dimension 4 — Output Shape**
- Who is the primary reader? (yourself, a team, a stakeholder, an AI agent)
- What format should the deliverable be in?
- How many research questions are we aiming to answer?

### Grill Tone

- Be direct. Don't soften questions.
- Ask follow-ups if answers are vague.
- It's okay to push back: "That's too broad — what specifically about X?"
- Maximum 2 grill rounds before synthesizing.

---

## Phase 2 — The Synthesis

After the user answers the grill questions, synthesize a deep research prompt
using the structure below. Fill every section. Never leave a section empty.

### Output Format

```
# Deep Research Prompt: [TITLE]

## Mission Statement
[1–2 sentences. What this research will produce and why it matters.]

## Background & Context
[What is already known. Stack, constraints, prior attempts. 3–5 bullets.]

## Research Scope
**In scope:**
- [Specific area 1]
- [Specific area 2]
- ...

**Out of scope:**
- [What to explicitly skip]
- ...

## Research Questions
Answer ALL of the following with comprehensive detail:

### 1. [Primary Question — most important]
[Sub-questions that must be answered within this]

### 2. [Architecture / Technical Question]
[Sub-questions]

### 3. [Comparison / Evaluation Question]
[Sub-questions — include concrete criteria]

### 4. [Risk / Tradeoff Question]
[Sub-questions]

### 5. [Implementation / Execution Question]
[Sub-questions — what does "doing this" actually look like]

[Add more sections as needed based on grill answers]

## Deliverables Expected
For each research question, provide:
- [ ] Concrete answer with evidence
- [ ] Comparison table (if applicable)
- [ ] Code example / config snippet (if applicable)
- [ ] Recommendation with tradeoffs

## Constraints to Respect
- Stack: [from grill]
- Timeline: [from grill]
- Scale: [from grill]
- Budget: [from grill]
- Non-negotiables: [from grill]

## Success Criteria
The research is complete when:
1. [Specific condition 1]
2. [Specific condition 2]
3. [Specific condition 3]

## Suggested Research Approach
[Optional: suggest how an AI agent should tackle this — 
parallel research threads, sources to prioritize, what to verify empirically]
```

---

## Quality Checklist Before Outputting

Before presenting the final prompt, verify:

- [ ] Mission statement is 1–2 sentences, not vague
- [ ] At least 5 research questions, each with 2–3 sub-questions
- [ ] Out-of-scope section is filled (prevents scope creep)
- [ ] Deliverables are concrete (tables, code, comparisons — not just "explain")
- [ ] Success criteria are measurable
- [ ] Prompt is actionable by an AI agent with no further clarification needed

---

## Examples of Good vs Bad Research Questions

**Bad:** "What is Kubernetes?"
**Good:** "What is the minimal Kubernetes setup for a 3-service FastAPI backend on AWS EKS that costs under $200/month, handles 1000 req/s, and can be managed by a solo engineer?"

**Bad:** "How do I fork a GitHub repo?"
**Good:** "What is the complete file-by-file process to fork Pi (earendil-works/pi, MIT) into a private repo called AXGA, rename all package scopes from @earendil-works to @axga, disable all pi.dev telemetry, and preserve 100% of CLI/SDK/TUI functionality?"

---

## Behavior Summary

| Phase | What to do |
|-------|-----------|
| User gives vague topic | Enter Grill phase immediately |
| User gives detailed context | Ask 2–3 clarifying questions max, then synthesize |
| User says "just make the prompt" | Skip grill, synthesize with reasonable assumptions, flag them |
| User answers grill poorly | Push back once, then synthesize with what you have |
| Research prompt is done | Ask: "Want me to also run this research now?" |

---

## Pro Tips

- If the user mentions multiple competing options (e.g., "should I use X or Y?"), 
  ensure the comparison question includes specific criteria weighted by the user's priorities.
- When the user is a solo developer, emphasize low-maintenance paths and operational simplicity.
- If the user already has a working system and is researching a migration, 
  the first research question should always cover "what breaks and how to roll back."
- Always suggest the user run the research prompt immediately after generating it — 
  the context is fresh and they can iterate on the output while their mental model is loaded.
