// Rasterize the OG card (SVG) to public/og/default.png with sharp (bundled with Astro).
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#faf9f7"/>
  <g fill="none" stroke="#b93a28" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 148 88 A 55 55 0 1 1 122 170" />
    <path d="M 105 162 L 124 118 L 143 162 L 162 118 L 181 162" />
  </g>
  <text x="100" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="700" fill="#1c1e22">Magdalena Onaindia</text>
  <text x="100" y="368" font-family="Segoe UI, Arial, sans-serif" font-size="34" fill="#565a60">Software engineer turned AI product builder.</text>
  <text x="100" y="418" font-family="Segoe UI, Arial, sans-serif" font-size="34" fill="#565a60">Shipped with AI agents · hosted on my own hardware in Bilbao.</text>
  <!-- mini skyline -->
  <g fill="none" stroke="#8d9196" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M0 560 C 90 480 190 455 290 505 C 360 542 420 556 490 560" />
    <path d="M540 560 L 556 430 L 572 560" />
    <path d="M620 560 C 650 465 745 460 790 512 C 815 540 835 552 862 560" />
    <path d="M660 560 C 695 445 795 450 838 560" />
    <path d="M950 560 L 967 445 M 984 560 L 967 445 M 1130 560 L 1147 445 M 1164 560 L 1147 445" />
    <path d="M967 445 H 1147" />
    <path d="M967 445 C 1030 482 1085 482 1147 445" stroke-width="3.5"/>
    <path d="M1056 470 L 1056 505 M 1034 505 h 44 v 16 h -44 Z" stroke-width="3.5"/>
    <path d="M0 590 Q 40 585 80 590 T 160 590 T 240 590 T 320 590 T 400 590 T 480 590 T 560 590 T 640 590 T 720 590 T 800 590 T 880 590 T 960 590 T 1040 590 T 1120 590 T 1200 590" stroke-width="3.5"/>
  </g>
  <rect x="100" y="470" width="330" height="10" rx="5" fill="#e4e1db"/>
  <rect x="100" y="470" width="215" height="10" rx="5" fill="#2d6a4f"/>
  <text x="100" y="456" font-family="Consolas, monospace" font-size="20" fill="#2d6a4f">AI-assisted 65%</text>
  <text x="430" y="456" font-family="Consolas, monospace" font-size="20" fill="#565a60" text-anchor="end">Human 35%</text>
</svg>`;

await mkdir('public/og', { recursive: true });
await sharp(Buffer.from(svg)).png().toFile('public/og/default.png');
console.log('public/og/default.png written');
