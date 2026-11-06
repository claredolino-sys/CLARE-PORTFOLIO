# DESIGN.md — Butterfly Nebula Worlds

Direction: the portfolio is a small game. Each section is its own **world**, a 3D iridescent nebula with its own palette and its own flock of butterflies. Content stays readable on calm glass panels; the world moves behind it.

Basis: the existing project (React 19, Vite, Tailwind 4, three.js, framer-motion) and its Plus Jakarta Sans / JetBrains Mono type. No real-site references were compared (the UXKIN and Mobbin tools were not connected), so this direction rests on the project and on the Unsplash photo references below.

## Reference photos (Unsplash, free license)
- Trogonoptera trojana wing macro, Palawan, by David Clode: https://unsplash.com/photos/UcMA9NZVVpg (Birdwing world: emerald, gold, black margins)
- Blue morpho butterfly, by Fleur: https://unsplash.com/photos/xTurFgWXNDA (Morpho Dawn: cyan to violet sheen)
- Iridescent plastic film, by Emily Bernal: https://unsplash.com/photos/r2F5ZIEUPtk (thin-film colour ramp used in the wing shader)
- Two colourful nebulae, by Sheng Hu: https://unsplash.com/photos/MIwrn7Uxjjs (nebula layering and star density)
- Purple and brown starry night, by Jake Weirick: https://unsplash.com/photos/fj2q9RMnoRU (Orchid Aurora mood)

## Worlds (colour tokens)
Each world sets `--w-a`, `--w-b`, `--w-c` on `:root`. The UI reads those; nothing in components hard-codes a world colour.

| # | Section | World | a | b | c | bg | Role of the world |
|---|---|---|---|---|---|---|---|
| 1 | Overture | Morpho Dawn | #00F2FE | #7F00FF | #FF5FD2 | #06080F | first impression, the original brand cyan and violet |
| 2 | Backstage | Emerald Birdwing | #2EE6A6 | #F6D365 | #0EA5A4 | #050D0C | origin story, Palawan birdwing greens and gold |
| 3 | Approach | Solar Monarch | #FFB454 | #FF5D8F | #FF8A5B | #0F0907 | process, warm amber and coral |
| 4 | Tracklist | Orchid Aurora | #E879F9 | #7C5CFF | #38BDF8 | #09060F | projects, one butterfly per project |
| 5 | Encore | Opal Moth | #BFE3FF | #C4B5FD | #FBCFE8 | #070A12 | contact, pearl and ice |
| 6 | Insights | Midnight Glasswing | #6EA8FF | #4338CA | #A5F3FC | #04050E | essays, deep indigo and silver |

Light theme ("cyber-light") keeps the same hues at low density over a pale lavender ground (#F5F3FF).

## Colour roles
- Primary accent `--w-a`: links, focus rings, active nav, key metrics.
- Secondary accent `--w-b`: badges, role lines, secondary glows.
- Third `--w-c`: only inside the nebula and wings, never for text.
- Text: white at full strength for headings, #CBD5E1 for body, #94A3B8 for captions. Contrast on the dark ground is above 7:1 for body text; `--w-a` on #06080F is above 4.5:1 in every world.
- Panels: `rgba(255,255,255,.03)` fill, 1px `rgba(255,255,255,.10)` border, 16px backdrop blur. Hover raises the border to `--w-a` at 40%.

## Typography
- Plus Jakarta Sans for headings and body (weights 300 to 700), JetBrains Mono for labels, HUD and metrics (400, 500).
- Scale: 11, 12, 14, 16, 20, 30, 48, 60 px. Body is 14 to 16px; HUD labels are 10 to 11px uppercase with 0.16em tracking.

## Spacing, shape, depth
- 4px base scale. Section padding 24 / 28 / 36px. Content width 1024 to 1152px.
- Radius: 8 (chips), 12 (cards), 16 (panels), 999 (pills).
- One glow per element: `0 0 24px rgba(var(--w-a-rgb), .25)`. No stacked shadows.

## Motion (framer-motion + three.js)
- World change: camera warp burst of 0.9s, palette cross-fade of 1.2s, a title card ("WORLD 04 / ORCHID AURORA") for 1.8s.
- Section content: fade and rise 24px, 0.42s, ease [0.22, 1, 0.36, 1].
- Butterflies: Lissajous flight paths, wing flap 6 to 9 Hz, banking sway. Project butterflies steer to a card while it is hovered.
- Game layer: click a butterfly to catch it (burst, counter, sound). Visiting all six worlds completes the chrysalis ring.
- `prefers-reduced-motion`: flight speed 30%, no warp, no title-card movement, no catch burst.

## Components
- Buttons: primary is a filled gradient from `--w-a` to `--w-b` with dark text; secondary is a glass pill; quiet is text with underline on hover. Focus: 2px `--w-a` ring.
- Cards: glass panel, level badge ("LV 1"), butterfly emblem in the project's own palette, metric strip.
- HUD: world card bottom-left, catch counter bottom-right, constellation map on the right edge (dots joined by a line, the active dot is a flapping butterfly).

## Imagery and icons
- lucide-react for icons. Butterflies are drawn in code (SVG and shader), never from photos. The Unsplash photos are references only and are not shipped in the site.
