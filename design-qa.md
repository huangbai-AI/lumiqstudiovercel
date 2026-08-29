# LumiQ Home Design QA

- source visual truth: `/var/folders/zn/896c9d3n7x1bv9tzsmkfvs880000gn/T/codex-clipboard-3bf251d0-6b93-483a-951c-cca7e0776a84.png`
- rendered implementation: `http://127.0.0.1:3021/en`
- desktop implementation screenshot: `/Users/a1/.codex/worktrees/lumiq-home-warm-source/.design-qa/home-original-long.png`
- clean user-facing long screenshot: `/Users/a1/.codex/worktrees/lumiq-home-warm-source/.design-qa/home-original-long-clean.png`
- mobile evidence: `/Users/a1/.codex/worktrees/lumiq-home-warm-source/.design-qa/home-mobile-board.png`
- final combined comparison: `/Users/a1/.codex/worktrees/lumiq-home-warm-source/.design-qa/home-source-vs-implementation-final.png`
- focused final-panel evidence: `/Users/a1/.codex/worktrees/lumiq-home-warm-source/.design-qa/home-join-desktop.png`
- state: English home, default/light appearance, all six snap panels; separate Traditional Chinese and Japanese mobile checks

## Normalization

- source pixels: 1905 × 6480
- implementation panel captures: 1890 × 1071 each at a 1905 × 1080 browser viewport, device scale factor 1
- combined implementation: 1890 × 6426, normalized to 1905 × 6480 for side-by-side comparison
- mobile viewport: 390 × 844 CSS pixels; captured content is 375 × 812 because of browser chrome/scrollbar allocation
- the repeated fixed header in the stitched implementation column is a capture artifact from six viewport screenshots. In the live page it is one persistent global header; the clean long screenshot removes the repeated strips.

## Required fidelity surfaces

- fonts and typography: Playfair Display and the existing CJK fallbacks match the original hierarchy, weight, scale, line-height, wrapping, and small uppercase labels. No clipping or truncation was found.
- spacing and layout rhythm: all six panels are exactly one viewport high at desktop and mobile. Copy alignment, product crops, panel order, value strip, and CTA placement match the source composition.
- colors and tokens: navy, warm cream, gold, dark-brown overlays, translucent masks, and CTA contrast match the source. Text remains legible on every image.
- image quality and asset fidelity: the exact prior 4K scene assets are used, including dedicated 2160 × 3840 mobile hero and family images. No placeholder, CSS illustration, or substitute artwork is present.
- copy and content: the original English copy is restored. Equivalent Traditional Chinese and Japanese copy is present, with valid language tags and no horizontal overflow.
- interactions and accessibility: mouse wheel and keyboard input snap exactly to panel tops; anchor navigation, product links, waitlist link, reduced-motion behavior, semantic landmarks, labels, and alt text are present. Browser console error check returned no errors.

## Comparison history

### Pass 1

- [P2] The first migration omitted the compact footer inside the final action panel.
  - evidence: the source included the compact LumiQ footer within the sixth screen; the initial implementation ended after the CTA.
  - fix: restored the original compact footer inside the final panel while preserving the correct baseline global footer below the homepage.

### Pass 2

- post-fix evidence: `home-source-vs-implementation-final.png` and `home-join-desktop.png`
- no actionable P0, P1, or P2 differences remain.
- the correct baseline global navigation is slightly larger than the standalone proposal header and remains fixed while scrolling. This is an intentional integration constraint, not a homepage redesign.

## Primary interactions tested

- mouse wheel: Home → Ola stopped at exactly one viewport
- keyboard: ArrowUp returned Ola → Home at exactly the section top
- side anchors: all six panels reached exact panel tops
- product CTA: `/en/products/ola`
- waitlist CTA: `/en/prelaunch`
- locales: `/en`, `/zh-hant`, `/ja`
- mobile: six panels at 844 px each, zero horizontal overflow

## Findings

- No actionable P0/P1/P2 findings.

## Follow-up polish

- None required for fidelity.

final result: passed
