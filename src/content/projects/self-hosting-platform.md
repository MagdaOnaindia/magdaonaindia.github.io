---
title: 'Self-Hosting Platform'
tagline: 'A PaaS on my own hardware: git push in Bilbao, public URL everywhere.'
year: 2026
featured: true
order: 1
type: 'platform'
status: 'live'
stack: ['.NET 8', 'gRPC', 'mTLS', 'Docker', 'Traefik', 'Caddy', 'Ansible', 'Blazor']
links:
  repo: 'https://github.com/MagdaOnaindia/tfm-selfhosting'
ai:
  # TODO(magda): confirm the AI-assist estimate
  assist: 50
  tools: ['Claude Code', 'CLAUDE.md-driven repo']
  human: 'The tunnel architecture, the mTLS trust model, and every deployment decision.'
buildLog:
  - step: 'spec'
    detail: 'Master thesis problem statement: self-hosting fails at network connectivity, not at Docker.'
  - step: 'design'
    detail: 'Decoupled reverse-tunnel pattern — public Broker on a VPS, lightweight Agent on my tower.'
  - step: 'build'
    detail: '.NET 8 services talking over persistent gRPC streams, authenticated with mutual TLS.'
  - step: 'automate'
    detail: 'Ansible playbooks + shell scripts: secrets and certs generated once, distributed everywhere.'
  - step: 'ship'
    detail: 'Caddy terminates TLS publicly, Traefik discovers Docker services locally. Wildcard DNS → any app, one push.'
---

## Overview

My master's thesis (TFM), and the foundation everything else here runs on. Self-hosting has one real enemy: home-network connectivity — CGNAT, dynamic IPs, closed ports. This platform gives personal hardware a PaaS-like experience: deploy an app from your living room, get a public HTTPS URL automatically.

## The challenge

Expose applications running on a home server **without opening a single router port** and without handing the data to a third party. The VPS must route traffic but never see application state; the home server must stay unreachable except through a channel it opens itself.

## My role & the AI's role

I designed the architecture: a public **Broker** on a VPS that authenticates agents and routes requests, and an **Agent** on my tower that keeps a persistent outbound gRPC stream open and forwards traffic to local Docker containers through Traefik. AI agents helped write service code, Ansible playbooks and docs against a `CLAUDE.md` contract — but the trust model (one CA, mTLS both ways, secrets generated exactly once on the dev machine) is where the engineering actually lives, and that was mine.

## Key decisions

- **gRPC streaming over a hand-rolled TCP tunnel** — multiplexing, flow control and typed contracts for free.
- **mTLS instead of API keys** — both ends prove identity cryptographically; a leaked config is useless without the cert.
- **Caddy public / Traefik local** — each proxy does the one thing it is best at: automatic public certificates vs. Docker service discovery.
- **Blazor Server dashboard** — managing apps without SSH-ing into anything.

## Results

The platform serves every live demo on this portfolio from my own tower in Bilbao, through the tunnel, with automatic HTTPS on `*.magdaselfhosting.com`. The portfolio you are reading links to apps it hosts — the thesis defends itself.
