---
title: 'TravelApp'
tagline: 'Group trips without the Excel + WhatsApp + Google Docs chaos.'
year: 2026
featured: false
order: 3
type: 'product'
status: 'building'
stack: ['Next.js', 'TypeScript', 'Drizzle', 'PostgreSQL', 'Docker']
links:
  live: 'https://travelapp.magdaselfhosting.com'
ai:
  assist: 80
  tools: ['Claude Code', 'spec-driven workflow', 'AI audit reports']
  human: 'The product spec, the permission model, and saying no to every feature outside the MVP.'
buildLog:
  - step: 'spec'
    detail: 'A real spec.md first: product vision, permission model (Google-Drive-style roles), full MVP scope.'
  - step: 'plan'
    detail: 'plan.md broke the spec into implementable batches before any code existed.'
  - step: 'agents'
    detail: 'AI agents implemented batch by batch; prompt files for cross-cutting passes (auth audit, mobile responsive).'
  - step: 'audit'
    detail: 'Dedicated AI audit rounds: an auth review and two session-leak investigations, written up as reports.'
  - step: 'ship'
    detail: 'Dockerized Next.js on my self-hosting platform. Planning on desktop, execution on mobile.'
---

## Overview

A collaborative web app for planning and running trips — solo or in group. Day-by-day itinerary, flights and stays, multi-currency expenses with automatic split, notes, documents, checklists and maps. One place instead of the usual Excel + WhatsApp + Google Docs + phone-notes chaos.

## The challenge

Trip data is unforgiving: shared money, shared permissions, people editing at once from different countries. The product principle was *reliability over velocity* — data integrity and a correct permission model beat cool features.

## My role & the AI's role

This is my most AI-built product, and the most disciplined: **spec-driven development for real**. I wrote `spec.md` (vision, roles, MVP boundaries) and `plan.md`; agents implemented in batches; targeted prompt files drove cross-cutting passes like the auth audit and mobile responsiveness; findings came back as written reports (including two session-leak investigations) that I triaged. I made the product calls — AI made the pull requests.

## Key decisions

- **Google-Drive-style permission model** (owner / editor / viewer) specified before any UI existed.
- **Business rules enforced in the database via row-level security**, not just in API code — the API can be wrong, the data can't.
- **Web-first, mobile-ready**: responsive web now, the API/frontend split leaves a native app open later without a rewrite.
- **Archive over delete** for trips: destructive actions need an undo story.

## Results

Live in MVP form on my own platform, currently being battle-tested trip by trip. The audit-report workflow (AI investigates, writes findings, I decide) became my template for every project since.
