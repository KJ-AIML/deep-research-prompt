# Contributing to deep-research-prompt

Thanks for wanting to contribute! Here's how.

## What we need most

### 1. Example outputs (easiest)
Run the skill on a real topic, save the output as `examples/<topic-slug>.md`

Format:
```markdown
# Example: [Topic Name]

## Grill Questions Asked
[paste the questions the skill asked]

## User Answers
[paste your answers]

## Generated Research Prompt
[paste the final prompt]

## Notes
[any observations about quality, what worked, what could improve]
```

### 2. Better grill questions
If you find the questions miss something for a specific domain, open an issue or PR
with suggested additions to the relevant dimension in SKILL.md.

### 3. Domain-specific templates
For specialized research (security audits, market research, hiring, etc.) you can
add a `references/` folder with domain-specific question sets.

## Pull Request Process

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-contribution`  
3. Make your changes
4. Test the skill manually with Claude
5. Open a PR with a clear description

## Issues

Use GitHub Issues to:
- Report when the skill produces bad output (include the input/output)
- Suggest new grill question dimensions
- Request domain-specific templates

## Code of Conduct

Be kind. That's it.
