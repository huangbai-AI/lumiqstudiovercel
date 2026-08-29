# LumiQ Home 方案一｜设计核对

## 对照证据

- 视觉真值：`/Users/a1/.codex/generated_images/01a0493e-8b1f-7e41-9c8f-79b47124b89e/exec-6be4b914-e416-4425-9252-f9b58aac2a15.png`
- 桌面实现：`/Users/a1/.codex/worktrees/lumiq-home-warm-source/.design-qa/implementation-home-en-desktop-final.png`
- 手机实现：`/Users/a1/.codex/worktrees/lumiq-home-warm-source/.design-qa/implementation-home-en-mobile-final.png`
- 首页长图：`/Users/a1/.codex/worktrees/lumiq-home-warm-source/.design-qa/lumiq-home-warm-long.png`
- 全页并排对照：`/Users/a1/.codex/worktrees/lumiq-home-warm-source/.design-qa/qa-comparison-full.jpg`
- 首屏局部对照：`/Users/a1/.codex/worktrees/lumiq-home-warm-source/.design-qa/qa-comparison-hero-final.jpg`

## 规格与状态

- 视觉真值像素：878 × 1792。
- 桌面视口：1440 × 900 CSS 像素；截图像素 1425 × 891（浏览器滚动条与截图边界差异），密度 1。
- 手机视口：390 × 844 CSS 像素；截图像素 375 × 812（浏览器边界差异），密度 1。
- 状态：英文首页未登录首屏、六个楼层、固定导航；同时核对繁中与日文首页。
- 比较方式：保留两图比例并排，不拉伸；首屏另做等大画框局部对照。

## 必查项目

- 字体与层级：延续原站 Playfair Display 与 Inter；标题、正文、眉题层级清楚，桌面与手机无破字或不可读截断。
- 间距与布局：六个楼层均精确为一个视口；固定页头下方内容留有安全距离；桌面左右交替、手机底部文案均无重叠。
- 色彩与对比：延续参考图的暖米色、深海军蓝与金色；场景图上的渐隐蒙版保证正文和按钮对比度。
- 图片质量：全部使用正确仓库的真实产品与家庭场景素材；无占位图、手绘替代物或旧仓库素材；桌面与手机裁切均保留产品主体。
- 文案与内容：英语、繁中、日文键一致；产品描述沿用正确仓库内容，新增首页短文案已完成三语本地化。
- 图标与控件：使用现有图标库；产品入口、登记按钮、页内锚点均可操作并有键盘焦点。
- 响应式与无障碍：手机无横向溢出；每层至少一屏；键盘上下翻页落在 900 的整数倍位置；尊重减少动态效果设置；所有场景图均有替代文字。

## 比较历史

1. 首轮发现 [P2]：桌面首屏标题与产品组合整体偏低，顶部留白过多，主按钮样式也弱于参考图。
   - 修复：标题和产品组合整体上移，主按钮改为深海军蓝圆角按钮。
   - 复核证据：`qa-comparison-hero-final.jpg`。修复后信息层级、产品组合和暖色调与参考图一致，无剩余 P0/P1/P2。

## 可接受差异

- 参考图是紧凑长页示意；实现按明确需求扩展为六个完整视口楼层，因此整页纵向长度更长。
- 全站导航、页脚和品牌文案从正确基线原样继承，未照着示意图重做。
- 首屏使用正确仓库独立产品图组合，而非把参考图或旧首页作为背景上传重绘。

## 功能核对

- 键盘 ArrowDown、PageDown、ArrowUp：0 → 900 → 1800 → 900，锚点分别为 `#ola`、`#tablet`、`#ola`。
- 登记按钮：`/en/prelaunch`。
- 产品入口：`/en/products/ola` 等现有详情路由。
- 三语首页：`/en`、`/zh-hant`、`/ja` 均正常渲染对应文案。
- 生产构建：87 个静态页面生成完成。

final result: passed
