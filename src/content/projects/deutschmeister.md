---
title: 'DeutschMeister'
tagline: "I'm learning German. So I built my own B2 grammar coach."
year: 2025
featured: false
order: 3
type: 'product'
status: 'live'
stack: ['ASP.NET Core 8', 'React 18', 'TypeScript', 'PostgreSQL', 'pgvector', 'Claude API', 'Vite', 'Tailwind']
links:
  live: 'https://deutschmeister.magdaselfhosting.com'
ai:
  assist: 70
  tools: ['Claude Code', 'Claude API', 'evals in CI']
  human: 'The Clean Architecture layering, the grammar curriculum, and the eval gates that decide when AI features are allowed to ship.'
buildLog:
  - step: 'itch'
    detail: 'German A2 → B1 in progress. Existing apps gamify vocabulary; none drill B2 grammar the way I need.'
  - step: 'spec'
    detail: 'Grammar reference + vocabulary collections + exercises, with real user accounts and progress.'
  - step: 'build'
    detail: 'ASP.NET Core 8 backend in Clean Architecture with CQRS/MediatR; React 18 + Zustand frontend.'
  - step: 'rag'
    detail: 'AI tutor: hybrid retrieval (pgvector + full-text, RRF) over my own grammar corpus, streamed explanations with citations.'
  - step: 'evals'
    detail: 'Golden datasets + LLM-as-judge in CI. A PR that makes the tutor worse does not merge.'
  - step: 'ship'
    detail: 'Two Docker images + PostgreSQL, deployed to my own platform. Traefik label, wildcard DNS, done.'
---

## Overview

A production-grade German learning web app: B2-level grammar reference, vocabulary management, collections and exercises — plus an AI tutor that explains my mistakes using my own grammar reference as its only source of truth. Built because I am the target user: my CV says "German: B1 in progress" and this is how it's progressing.

## The challenge

Language apps optimize for streaks, not for the grammar wall every intermediate learner hits. And when I added an LLM tutor, the challenge shifted: a tutor that *invents* grammar rules is worse than no tutor. The answer to a wrong exercise had to be grounded, cited, and measured — not vibes.

## My role & the AI's role

I defined the Clean Architecture layering — API / Application (CQRS with MediatR) / Domain / Infrastructure (EF Core 8) — and the curriculum content model. AI agents generated the bulk of the CRUD handlers, validators and React components; I reviewed everything that crossed a layer boundary, because that's where AI code quietly cheats.

The AI tutor phase was almost entirely agent-built, but against contracts I set: a spec adapted to the repo's reality, a retrieval quality gate that had to pass before any LLM call existed, and eval thresholds in CI that decide when the feature ships. The agent wrote the pipeline; I own the bar it has to clear.

## Key decisions

- **Clean Architecture + CQRS** on a personal project: overkill on purpose — it keeps the domain testable and gave me a .NET 8 reference codebase I reuse at work.
- **RAG over my own corpus, no framework** — 18 grammar sections indexed in the same PostgreSQL (pgvector + full-text, reciprocal rank fusion), Anthropic API called directly. The tutor cites sections like `[§konjunktiv]` and links back to the reference; if retrieval doesn't cover the question, it says so instead of inventing a rule.
- **Evals as the ship gate, not an afterthought** — golden datasets versioned in the repo, deterministic retrieval metrics (hit@4 ≥ 85%) plus LLM-as-judge for faithfulness and correctness, wired into GitHub Actions. New AI features stay gated until their baselines pass; the Grammatik-Training generator additionally puts every AI-made exercise behind a human accept/discard review.
- **Honest degradation** — no API key configured means the tutor tells you it's off and the rest of the app works untouched. Budget circuit breaker and per-user daily limits keep the whole thing under ~5€/month.
- **JWT auth with roles** from day one; a learning app with accounts is still an app with accounts.

## Results

Live on my own infrastructure, used daily by its most demanding user. The retrieval layer finds the right grammar section for 92.5% of golden queries before real embeddings even land (hit@4, 53-query golden set); the tutor and exercise generator roll out behind those eval gates. The B1 exam will be the real integration test.
