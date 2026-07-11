---
title: 'Restaurant Manager'
tagline: 'Split the bill by QR: everyone pays their share, the waiter watches the table turn green.'
year: 2026
featured: false
order: 2
type: 'product'
status: 'building'
stack: ['Next.js 15', 'NestJS', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe Connect', 'Tailwind v4', 'Turborepo']
ai:
  assist: 90
  tools: ['Claude Code', 'phase-gated plan', 'e2e-first verification', 'Playwright-checked UI']
  human: 'The product vision, the split-payment UX calls, and the acceptance bar at every one of the 12 phases.'
buildLog:
  - step: 'itch'
    detail: 'Group dinners end with one waiter charging six cards one by one. The bill should split itself.'
  - step: 'spec'
    detail: 'Two products in one plan: a multi-tenant restaurant platform (tables, menus, reservations, staff roles) and SplitPay, the QR pay-at-table flow.'
  - step: 'build'
    detail: 'pnpm/Turborepo monorepo: NestJS API + two Next.js apps. 12 phases, each shipped working and locked in with e2e tests — 61 by the end.'
  - step: 'harden'
    detail: 'The hard part is concurrency: item claims with TTL so two diners can''t pay the same dish, pending-intent reservations against double "pay it all", Stripe webhooks as the only source of truth.'
  - step: 'ship'
    detail: 'Stripe test mode verified end to end — real PaymentIntent, real signed webhook, table flips to paid live over SSE. Own brand: hand-drawn icon set, Fraunces + Inter, editorial public menu page.'
---

## Overview

A SaaS for restaurants and small chains: any owner signs up, builds their venue (zones, tables with printable QR codes, seasonal menus with EU allergen labelling, reservations with pacing-based availability, staff with roles) and gets the differentiator on top — **SplitPay**. Diners scan the table QR, see the live bill, and pay *their* part: everything, an equal share, their own dishes, or a custom amount. No app install, no sign-up, tips included, cash mixed in when someone insists.

![Landing page](/projects/restaurant-manager/01-landing.png)

## The challenge

Split payments are a distributed-systems problem wearing a hospitality costume. Several phones mutate one bill concurrently: two people claiming the same croquetas, two people tapping "pay the rest" at once, a payment succeeding after the diner closed the browser. Every amount is validated server-side, item claims hold a TTL lease, pending intents reserve their amount, and nothing counts as paid until Stripe's signed webhook says so.

## My role & the AI's role

I set the product direction and made the calls a founder makes: what the MVP is, how splitting should feel on a phone, which trade-offs were acceptable (static QR per table, no diner accounts, tips go whole to the restaurant). Claude Code executed a 12-phase plan — schema to UI to tests — with each phase verified against the running system before moving on. I reviewed the result of every phase and sent back what didn't meet the bar, typography included.

![Waiter floor view](/projects/restaurant-manager/03-comandero.png)

## Key decisions

- **One modular API, three surfaces** — back office, public restaurant page and the diner app share a NestJS core; the diner app stays feather-light because it loads on bad restaurant Wi-Fi.
- **Webhook-only truth** — the UI never marks money as received; `payment_intent.succeeded` does. Demo mode swaps Stripe for a simulated confirm so the whole flow works without keys.
- **Money as integer cents, everywhere.** The equal-split remainder lands on the last share; a 10 €/3 dinner sums back to exactly 10 €.
- **61 e2e tests as the contract** — auth, roles, menu scheduling across timezones, availability pacing, and the concurrency races that make or break split payments.

![Diner split view](/projects/restaurant-manager/08-comensal-cuenta.png)

## Results

v1 complete and running locally end to end: demo restaurant, printable QRs, live SSE updates on the waiter's floor plan, and a real Stripe test charge confirmed through the full webhook pipeline. Next: Stripe Connect onboarding for real payouts per restaurant, then a public deployment.
