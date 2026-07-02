# magdaonaindia.github.io

Personal portfolio of **Magdalena Onaindia** — software engineer turned AI product builder, in Bilbao. Live at [magdaonaindia.github.io](https://magdaonaindia.github.io).

## Stack

- [Astro 5](https://astro.build) (static output) + React 19 islands (project grid filters, AI Build Meter, ⌘K command palette via `cmdk`)
- Plain CSS with design tokens (`src/styles/tokens.css`) — "Bilbao duotone": warm paper / night-on-the-ría themes, rust red + Artxanda green accents
- Self-hosted fonts: Space Grotesk · Inter · JetBrains Mono
- Deployed to GitHub Pages via `.github/workflows/deploy.yml`

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static build in dist/
node scripts/generate-og.mjs   # regenerate the Open Graph card
```

## Adding a project

Drop a Markdown file in `src/content/projects/` — frontmatter schema in `src/content.config.ts` (type, status, stack, links, `ai` build recipe, `buildLog` steps). The grid, filters, palette and case-study page pick it up automatically.

## Accessibility

Built to WCAG 2.1 AA: semantic landmarks, full keyboard navigation, visible focus, AA contrast per theme, `prefers-reduced-motion` disables the skyline parallax, blinking windows and every non-essential animation.

---

## Future work: *Live from the tower*

The footer says “Hosted from my own tower” — the plan is to prove it in real time. All live demos run on my own hardware in Bilbao, published through my [self-hosting platform](https://github.com/MagdaOnaindia/tfm-selfhosting) (a .NET 8 Broker on a VPS + an Agent on the tower, connected by an mTLS gRPC tunnel).

**Concept:** an animated line-art SVG diagram — `you (visitor) ⇢ VPS broker ⇢ gRPC tunnel (animated pulses) ⇢ the tower ⇢ Docker containers` — where each deployed app is a little box with a status dot and uptime. If the tower doesn't answer, the diagram switches to night mode: *“The tower is sleeping 💤 — demos will be back soon.”*

**Implementation sketch:**

1. **Public read-only endpoint on the Broker** (already .NET 8): `GET /api/public/status` → `{ tunnel, apps: [{ name, status, uptimeDays }], lastDeploy }`. No internal details (no ports, IPs or versions). Rate-limited, `Cache-Control: max-age=60`, CORS restricted to `https://magdaonaindia.github.io`.
2. **React island** on the portfolio: fetch on load, 60s polling with backoff, 3s timeout → offline mode. Tunnel pulses only animate when `tunnel: 'up'` and reduced-motion is off.
3. **Optional:** a `● self-hosted · up N days` badge on every project card whose live URL is on `*.magdaselfhosting.com`, fed by the same endpoint.
4. **Considerations:** keep the endpoint minimal (it advertises that home infrastructure exists); visitor polling is trivial with the 60s cache; the broker host lives in a single constant.

The semantic hook is already in place: the footer line becomes the entry link once the section exists, and project data already distinguishes self-hosted URLs.
