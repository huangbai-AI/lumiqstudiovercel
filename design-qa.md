# Home 页视觉验收

- source visual truth:
  - `/var/folders/zn/896c9d3n7x1bv9tzsmkfvs880000gn/T/TemporaryItems/NSIRD_screencaptureui_L8c1zD/截屏2026-08-29 15.16.04.png`
  - `/var/folders/zn/896c9d3n7x1bv9tzsmkfvs880000gn/T/TemporaryItems/NSIRD_screencaptureui_RPcKLQ/截屏2026-08-29 15.16.50.png`
  - `/var/folders/zn/896c9d3n7x1bv9tzsmkfvs880000gn/T/TemporaryItems/NSIRD_screencaptureui_52LHbu/截屏2026-08-29 15.17.14.png`
  - `/var/folders/zn/896c9d3n7x1bv9tzsmkfvs880000gn/T/TemporaryItems/NSIRD_screencaptureui_ypzfpH/截屏2026-08-29 15.18.12.png`
  - `/var/folders/zn/896c9d3n7x1bv9tzsmkfvs880000gn/T/codex-clipboard-d0d308f5-b3f4-433d-b6e9-426e266b2ce5.png`
- implementation screenshots:
  - `.design-qa/homepage-desktop-long-v2.png`
  - `.design-qa/hero-desktop-v2.png`
  - `.design-qa/tablet-desktop-v2.png`
  - `.design-qa/join-desktop-v2.png`
  - `.design-qa/hero-mobile-v2.png`
  - `.design-qa/tablet-mobile-v2.png`
  - `.design-qa/join-mobile-v2.png`
  - `.design-qa/hero-annotation-fix-1458.png`
  - `.design-qa/hero-annotation-fix-mobile.png`
- comparison boards:
  - `.design-qa/hero-comparison-v2.jpg`
  - `.design-qa/tablet-comparison-v2.jpg`
  - `.design-qa/join-footer-comparison-v2.jpg`
  - `.design-qa/hero-annotation-comparison.jpg`
- state: `/en` Home，首屏、Tablet、Join；桌面与手机默认状态
- viewport: 桌面 1904 × 835 CSS px；手机 390 × 844 CSS px
- density normalization: 用户桌面截图为 2× 密度（3808 × 1670 等），对比板统一缩放到 1889 × 828 可视内容；浏览器截图为 1× 密度。手机截图为 1×。

## 对比历史

### 第一轮发现

- [P1] Tablet 场景的平板朝向和结构不可信：原图中产品角度容易被理解为背面朝向镜头，手部、边框与屏幕关系混乱。
- [P2] 首屏英文标题在桌面断成四行，字距和行距偏紧，主视觉显得拥挤。
- [P2] Join 场景内部重复放置了一条迷你页脚，造成一屏内出现“封底”，同时与网站正式页脚重复。

### 修复

- 使用 LibTV General Image Pro 原生 4K 生成新的 5504 × 3072 Tablet 场景；屏幕朝向人物，人物视线、双手、边框、摄像头与屏幕透视关系一致，右侧保留文字空间。
- 首屏标题容器加宽到 760px，英文标题调整为最高 80px、1.03 行高、-0.03em 字距，并增加标题与正文间距。
- 删除 Join 场景内部迷你页脚，将行动内容重新垂直居中；保留全站正式页脚。

### 第二轮可见证据

- 完整对比：长图中六个楼层均为完整一屏，视觉顺序和暖色家庭叙事保持不变。
- 聚焦对比：Tablet 对比板显示屏幕明确朝向女孩，手部与产品几何正确，右侧文字对比度充足。
- 聚焦对比：Hero 对比板显示英文标题稳定为三行，行距与字距更舒展，产品区仍完整可见。
- 聚焦对比：Join 底部对比板显示内部封底已完全移除；真实全站页脚只在六屏内容之后出现。

### 第三轮标注修正

- [P2] 用户标注首屏正文最后一行与按钮距离偏紧，并要求移除按钮下方的产品说明。
- 修复：桌面正文与按钮间距调整为 38px；移动端调整为 26px；删除产品说明节点及其无用样式。
- 可见证据：在与标注原图一致的 1458 × 796 CSS 视口下，正文与按钮实际间距为 38px，产品说明节点数量为 0；390 × 844 手机端间距为 26px，按钮完整位于首屏内。
- 对比板 `.design-qa/hero-annotation-comparison.jpg` 将用户标注原图与修正页面放在同一画面中，标注区域已按要求处理，未改变其他首屏结构。

## 必检项

- 字体与排版：通过。桌面标题三行；移动端无溢出或遮挡；正文层级清楚。
- 间距与布局：通过。六个楼层在桌面均为 835px，与视口高度一致；锚点落点 top=0。
- 色彩与对比：通过。暖色基调保持一致，Tablet 右侧深色留白与白字对比充分。
- 图片质量：通过。新 Tablet 图为 5504 × 3072，无模糊、错手、反向屏幕或裁切主体问题。
- 文案与内容：通过。原有多语言文案未修改。
- 响应式：通过。390 × 844 下每层仍为 844px，无横向溢出，Tablet 主体和文字均完整。
- 交互：通过。首屏按钮滚动到 `#ola` 后该楼层 top=0；Tablet 入口为 `/en/products/tablet`；最终按钮为 `/en/prelaunch`。
- 可访问性：通过。图片保留本地化替代文字，键盘与减少动态效果逻辑未改动。
- 控制台：无 error 或 warning。

## 残余差异

- 新 Tablet 场景不是旧图的像素级重制，而是按用户要求对产品方向与人物交互重新生成；这是有意修正，不是设计漂移。
- 浏览器自身的悬浮圆形工具会出现在截图左下角，不属于网站内容。

final result: passed
