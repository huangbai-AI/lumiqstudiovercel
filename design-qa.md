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
---

# Plans & Pricing — Nest 15 Card QA

## Comparison target

- Source visual truth: `/var/folders/zn/896c9d3n7x1bv9tzsmkfvs880000gn/T/TemporaryItems/NSIRD_screencaptureui_mrCePt/截屏2026-08-27 00.41.41.png`
- Browser-rendered implementation: `http://127.0.0.1:3001/en#plans`
- Implementation screenshot: `/Users/a1/Documents/lumiqstudiovercel/artifacts/plans-nest-home-final.png`
- State: English locale, desktop Plans & Pricing scene, four hardware cards visible, Nest price pending.

## Viewport and normalization

- Source pixels: 1595 × 859.
- Browser CSS viewport: 1280 × 720; browser screenshot pixels: 1118 × 712; device pixel ratio: 2.
- Full comparison: `/Users/a1/Documents/lumiqstudiovercel/artifacts/plans-nest-reference-vs-final.png`; both captures were normalized to 859 pixels high before horizontal comparison.
- Focused card comparison: `/Users/a1/Documents/lumiqstudiovercel/artifacts/plans-nest-reference-vs-cards.png`; source and implementation card regions were proportionally normalized into equal-width panels.

## Full-view comparison evidence

- The original centered heading, supporting text, draft notice, dark navy palette and numbered hardware-card hierarchy are preserved.
- The original three products retain their order and visual treatment.
- Lumiq Nest 15 is added as card `04` using the supplied oak product image and the same card structure.
- The grid reports no horizontal document overflow; the fourth card remains inside the CSS viewport.

## Focused region comparison evidence

- Card borders, radii, blue glow, large italic numbers, image shadows, copy hierarchy and divider positions remain consistent with the reference.
- Nest uses the real optimized product asset rather than a placeholder or code-drawn approximation.
- The four-card composition is intentionally denser than the three-card source so the new peer product remains in the same row on desktop.

## Required fidelity surfaces

- Fonts and typography: existing Lumiq display, serif-number and supporting-text styles are unchanged; the Nest type and title follow the same hierarchy.
- Spacing and layout rhythm: four equal desktop columns, two columns at intermediate widths and one column on small screens; card gap, padding and visual/copy split remain consistent.
- Colors and visual tokens: existing navy, blue, cream notice and muted copy tokens are unchanged.
- Image quality and asset fidelity: all four real optimized product assets render with contain sizing and drop shadows; Nest retains its frame, screen artwork and perspective.
- Copy and content: Nest is identified as a smart family calendar; because no approved price exists, both pricing surfaces state that the price will be announced rather than inventing a number.

## Interaction and browser checks

- Four homepage hardware cards are present with localized product-detail links.
- Nest links to `/en/products/nest`.
- The dedicated `/en/plans` hardware grid also contains Nest and its waitlist/detail actions.
- Browser console errors after the clean-cache final loads: none.
- No horizontal overflow was detected on either checked desktop pricing surface.

## Findings

- No actionable P0, P1 or P2 differences remain.
- Intentional difference: the desktop grid is denser because the requested fourth peer product is now present.

## Comparison history

- Initial post-change preview inherited stale development manifests from a prior concurrent build; the generated cache was moved to a recoverable temporary directory and regenerated.
- Final fresh-browser captures loaded without console errors and confirmed all four cards, the Nest detail link and the pending-price state.

## Implementation checklist

- [x] Added Nest 15 to the homepage pricing scene as card 04.
- [x] Added Nest 15 to the dedicated Plans page.
- [x] Added English, Traditional Chinese and Japanese copy.
- [x] Added responsive four/two/one-column behavior.
- [x] Verified links, price state, overflow and browser console.

final result: passed

---

# 产品总览视觉验收

**对照资料**

- 原始标注图：`/var/folders/zn/896c9d3n7x1bv9tzsmkfvs880000gn/T/codex-clipboard-703f34f7-b86a-4cb8-9321-d9e3fdc086ad.png`
- 实现截图：`/tmp/lumiq-products-design-qa/design-qa-implementation.png`
- 并排对照图：`/tmp/lumiq-products-design-qa/design-qa-comparison.png`
- 页面：`/zh-hant/products`
- 状态：Lumiq Tablet 为当前产品，页面滚动至产品详情入口与品牌故事引导区交界处。
- 视口：1468 × 923 CSS 像素。
- 原图：2936 × 1846 像素，按 2 倍密度归一为 1468 × 923；实现截图：1453 × 914 像素，为浏览器可见内容区，按相同宽高比例与原图并排对照。

**完整画面对照**

- 产品图片区只保留产品图，不再叠放重复按钮；产品文字区保留唯一详情入口。
- 品牌故事区去掉生活方式图片，改为浅色、低对比度的双栏文字引导，并用边界和留白与产品区分开。
- 新结构延续现有字体、金色标签、正文色和细线体系，层级低于产品展示区。

**重点区域对照**

- 产品入口：5 个产品均只有一个文字入口，链接分别指向对应详情页；无需额外局部放大即可辨认文字、边线和间距。
- 品牌故事入口：标题、说明和链接在桌面端双栏排列，手机端改为单栏；正文没有溢出或不自然断行。
- 图片质量：产品图沿用原有资源和裁切方式；品牌故事区按需求不再使用图片，因此不存在新增资源失真问题。

**Findings**

- 没有发现需要修复的 P0、P1 或 P2 问题。
- 字体与层级：沿用现有衬线标题与无衬线正文，字号、字重和行高符合页面原有层级。
- 间距与节奏：产品区与品牌故事区通过分隔线和独立留白建立清楚边界，桌面和手机端均保持稳定。
- 色彩：沿用 `--cream-2`、`--ink`、`--ink-2`、`--gold` 与现有边线变量，没有引入新的视觉体系。
- 文案：繁体中文内容未改变，5 个产品名称及品牌故事入口准确。

**交互检查**

- 5 个产品标签切换后均只出现一个正确详情入口。
- “阅读我们的故事”可正常进入繁体中文品牌故事页。
- 手机端布局已检查。
- 浏览器控制台错误：0。

**比较历史**

- 首轮对照没有发现 P0、P1 或 P2 问题，仅重新校准滚动位置，使原图与实现截图处于同一页面状态；没有因此修改界面代码。

**Implementation Checklist**

- [x] 移除产品图片上的重复按钮。
- [x] 统一 5 个产品的单一详情入口。
- [x] 将品牌故事引导区改为轻量文字布局。
- [x] 检查桌面端、手机端、链接与控制台。

**Follow-up Polish**

- 当前没有阻塞验收的后续项。

final result: passed
