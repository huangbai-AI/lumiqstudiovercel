# Lumiq Nest 15 — Design QA

## Comparison target

- Source visual truth: `/Users/a1/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_67kb4xju005n21_3fe5/msg/file/2026-08/NEST 15/NEST 15/原木色-正右-1.png`
- Browser-rendered implementation: `http://127.0.0.1:3001/en/products/nest`
- Implementation screenshot: `/Users/a1/Documents/lumiqstudiovercel/artifacts/nest15-desktop-final.png`
- Responsive evidence: `/Users/a1/Documents/lumiqstudiovercel/artifacts/nest15-mobile.png`
- State: English locale, desktop hero, Natural Oak selected, dark theme, signed-out public page.
- Scope note: the source is an isolated product render rather than a complete webpage mockup. Product imagery is therefore compared directly; page composition follows the existing Lumiq website design system.

## Viewport and normalization

- Source pixels: 3500 × 3500.
- Desktop CSS viewport reported by the page: 1280 × 720; browser screenshot pixels: 1265 × 712; device pixel ratio: 2.
- Responsive evidence screenshot: 375 × 812 pixels.
- Full comparison canvas: 1977 × 712; the source was proportionally scaled into a 712 × 712 panel and the implementation capture was normalized to 1265 × 712.
- Focused comparison canvas: 1440 × 720; both product regions were proportionally normalized into equal 720 × 720 panels.

## Full-view comparison evidence

- Combined evidence: `/Users/a1/Documents/lumiqstudiovercel/artifacts/nest15-source-vs-page-final.png`
- The same Natural Oak render, screen artwork, frame perspective, and landscape orientation are preserved.
- The implementation uses the source asset without redrawing the device, logo, interface, or frame.
- The desktop hero maintains a clear left-copy/right-product composition with no horizontal overflow or clipped primary action.

## Focused region comparison evidence

- Combined evidence: `/Users/a1/Documents/lumiqstudiovercel/artifacts/nest15-source-vs-focus-final.png`
- The wood grain, bezel proportions, screen layout, tilt, highlights, and shadow silhouette remain faithful to the supplied render.
- Minor softness is limited to browser screenshot downsampling; the production asset itself is the optimized source render and shows no transparency halo or masking defect.

## Required fidelity surfaces

- Fonts and typography: Lumiq's existing display and serif pairing is retained; hierarchy, wrapping, weights, and letter spacing are balanced at the checked desktop and mobile states.
- Spacing and layout rhythm: hero margins, CTA spacing, finish controls, image scale, and section rhythm are consistent with the existing site; no horizontal overflow was observed.
- Colors and visual tokens: dark navy background, cool blue accent, muted copy, and light CTA retain sufficient contrast and match the site's current visual language.
- Image quality and asset fidelity: the real Natural Oak, Dark Walnut, and Midnight Black source images are used. No placeholder, CSS drawing, handcrafted SVG, or substitute product image is present.
- Copy and content: the product is named Lumiq Nest 15 and presented as a 15.6-inch shared family calendar; finishes, reminders, routines, weather, placement, and waitlist messaging are consistent across the page.

## Interaction and browser checks

- Natural Oak is selected by default and exposes the correct `aria-pressed` state.
- Dark Walnut selection changes the hero image to `nest15-walnut-angle.png`; restoring Natural Oak returns to `nest15-oak-angle.png`.
- The waitlist action resolves to the localized `/en/prelaunch` route.
- The finish anchor resolves to `#finishes`.
- Browser console errors checked after load and interaction: none.
- Responsive evidence shows the main heading, description, CTA, and finish controls without horizontal overflow.

## Findings

- No actionable P0, P1, or P2 differences remain.
- P3 follow-up only: a future product-photography pass could add room-context lifestyle imagery, but it is not required for fidelity to the supplied source.

## Comparison history

- Initial comparison found no P0/P1/P2 visual mismatch, so no design correction iteration was required.
- Final post-build comparison evidence is recorded in `nest15-source-vs-page-final.png` and `nest15-source-vs-focus-final.png`.

## Implementation checklist

- [x] Source and browser render opened and compared together.
- [x] Desktop hero and responsive state checked.
- [x] Three finish states wired to real source assets.
- [x] Primary conversion path and finish anchor verified.
- [x] Console checked after interaction.

final result: passed
