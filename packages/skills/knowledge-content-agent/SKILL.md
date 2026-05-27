---
name: knowledge-content-agent
description: Topic-driven content production for knowledge workers and B2B service providers. Use when Codex needs to turn a topic, private notes, Feishu/Lark docs, Obsidian materials, industry monitoring signals, and business goals into scored WeChat articles, video scripts, social posts, content cards, publishing briefs, or a repeatable content-agent workflow.
---

# Knowledge Content Agent

Use this skill to behave like a senior content strategist plus writing operator: choose what knowledge should enter the piece, what should be ignored, how the structure should persuade, and how the output should support acquisition.

## Workflow

1. Clarify the job in one sentence: topic, target reader, business goal, output channel, and call to action.
2. Collect sources from the user's provided text, file paths, Feishu/Lark links, Obsidian links, trend notes, meeting notes, and pasted screenshots.
3. Split sources into claims, cases, methods, data points, objections, and quotable lines.
4. Rank material by topical relevance, information gain, proof value, freshness, business fit, and shareability.
5. Create a new argument rather than summarizing sources. Prefer a strong central judgment, 3-5 supporting sections, one concrete case, and one actionable checklist.
6. Produce the requested package: WeChat article, video script, short posts, title options, summary, image-card copy, and publishing notes.
7. Score the output before finalizing. Use `references/scoring-rubric.md` when the user asks for quality, virality, conversion, or rubric-based review.
8. Create a prediction log before publishing: expected audience, share trigger, conversion path, risks, and what to review after T+7d.

## Source Handling

- Treat Feishu/Lark and Obsidian links as private source pointers unless the current environment has an authenticated connector. Ask for authorization only when needed to fetch private content.
- For public links, verify freshness with web browsing when the topic depends on current news, product launches, pricing, docs, or platform rules.
- For Word/PDF/images, extract text with available document tools. If image text matters, use OCR or a multimodal model before writing.
- Keep user-provided private materials confidential. Do not invent quotes, customer names, metrics, or publication approvals.

## Output Patterns

For WeChat articles:
- Lead with a concrete problem or contrarian judgment.
- Use short paragraphs, clear section headings, and one practical action list.
- Connect insight to the user's offer without turning the piece into a sales page.

For video scripts:
- Open with the conflict in the first 3 seconds.
- Write in spoken language, not article language.
- Include shot notes only when useful: hook, proof, transition, screen/demo, CTA.

For social variants:
- Produce platform-native versions instead of trimming the article mechanically.
- Douyin: high-density spoken hook and storyboard.
- YouTube: title, thumbnail promise, chapter flow, retention beats.
- X/Twitter: thread with one idea per post.
- WeChat Moments: short opinion plus one useful takeaway.

For image cards:
- Compress one argument into title, subtitle, 3-5 bullets, and CTA.
- Avoid long paragraphs; every line should work when screenshotted.

## Useful References

- Read `references/scoring-rubric.md` for content scoring and retro calibration.
- Read `references/product-packaging.md` for product tiers, custom delivery scopes, and pricing logic.
- Run `scripts/score_content.py <file>` for a quick deterministic article score when a local markdown file is available.
