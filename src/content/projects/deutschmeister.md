---
title: 'DeutschMeister'
tagline: "I'm learning German. So I built my own B2 grammar coach."
year: 2025
featured: false
order: 2
type: 'product'
status: 'live'
stack: ['React 18', 'TypeScript', 'Vite', 'Tailwind', 'ASP.NET Core 8', 'PostgreSQL']
links:
  live: 'https://deutschmeister.magdaselfhosting.com'
ai:
  assist: 65
  tools: ['Claude Code']
  human: 'The Clean Architecture layering, the grammar curriculum, and daily dogfooding as its only demanding user.'
buildLog:
  - step: 'itch'
    detail: 'German A2 → B1 in progress. Existing apps gamify vocabulary; none drill B2 grammar the way I need.'
  - step: 'spec'
    detail: 'Grammar reference + vocabulary collections + exercises, with real user accounts and progress.'
  - step: 'build'
    detail: 'ASP.NET Core 8 backend in Clean Architecture with CQRS/MediatR; React 18 + Zustand frontend.'
  - step: 'review'
    detail: 'AI wrote most handlers and components; I kept the domain layer honest and the API contracts tight.'
  - step: 'ship'
    detail: 'Two Docker images + PostgreSQL, deployed to my own platform. Traefik label, wildcard DNS, done.'
---

## Overview

A production-grade German learning web app: B2-level grammar reference, vocabulary management, collections and exercises. Built because I am the target user — my CV says "German: B1 in progress" and this is how it's progressing.

## The challenge

Language apps optimize for streaks, not for the grammar wall every intermediate learner hits. I wanted a tool with the exact content I need, and I wanted the backend to be a serious architecture exercise, not a toy.

## My role & the AI's role

I defined the Clean Architecture layering — API / Application (CQRS with MediatR) / Domain / Infrastructure (EF Core 8) — and the curriculum content model. AI agents generated the bulk of the CRUD handlers, validators and React components; I reviewed everything that crossed a layer boundary, because that's where AI code quietly cheats.

## Key decisions

- **Clean Architecture + CQRS** on a personal project: overkill on purpose — it keeps the domain testable and gave me a .NET 8 reference codebase I reuse at work.
- **JWT auth with roles** from day one; a learning app with accounts is still an app with accounts.
- **Zustand over Redux** — the state is small; the boilerplate would have been bigger than the app.

## Results

Live on my own infrastructure, used daily by its most demanding user. The B1 exam will be the real integration test.
