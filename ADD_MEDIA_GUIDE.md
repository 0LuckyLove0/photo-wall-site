# 维护「拾光集」指南

这份文档用于后续维护「拾光集」表白网页。当前页面只做照片展示、滚动叙事和按钮反馈，不提供网页端上传，也不支持视频播放。

## 当前结构

主要文件：

- `index.html`：每一屏的照片、文案和表白按钮。
- `styles.css`：沉浸式滚动、照片排版和表白氛围。
- `script.js`：滚动进度、入场动画和按钮反馈。
- `photos/`：页面使用的照片。

## 改一句文案

直接在 `index.html` 里找到对应屏幕的文字修改即可。每一屏大致长这样：

```html
<section class="scene memory" aria-label="西湾红树林">
  <img src="./photos/west-bay-mangrove-sky.jpg" alt="西湾红树林海边天空" loading="lazy" decoding="async" />
  <div class="shade"></div>
  <div class="copy">
    <p class="kicker">海边的风</p>
    <h2>和你一起散步的时候，连风都慢下来。</h2>
    <p>西湾红树林、海面灯光、很大的天空。那天我们只是散步吹风，我却觉得这样的日子很好。</p>
  </div>
</section>
```

建议写法：

- 先写真实发生过的事情。
- 再写一点感受。
- 不要写太长，每屏适合手机上慢慢读。

## 替换照片

把新照片放进 `photos/`，文件名使用小写英文、数字和连字符。

推荐：

```text
photos/west-bay-mangrove-sky.jpg
photos/book-rooftop-rain.jpg
```

不推荐：

```text
照片 1.png
IMG_1234 原图.jpg
```

然后在 `index.html` 里改对应的 `src`：

```html
<img src="./photos/example-memory.jpg" alt="照片描述" loading="lazy" decoding="async" />
```

## 压缩照片

原图通常太大，手机打开会慢。建议转成网页用 JPEG。

```bash
sips -Z 2000 -s format jpeg -s formatOptions 78 /path/to/original.png --out photos/example-memory.jpg
```

查看尺寸：

```bash
sips -g pixelWidth -g pixelHeight photos/example-memory.jpg
```

建议：

- 长边控制在 `1600` 到 `2200` 像素。
- 单张尽量控制在 `400KB` 到 `800KB`。
- 首屏封面图尽量更小，因为它会优先加载。

## 增加一屏

在 `index.html` 的 `<main>` 里复制一段已有的 `<section class="scene ...">`，替换照片和文案。

如果是单张大图，用这个模板：

```html
<section class="scene memory" aria-label="这一屏的名字">
  <img src="./photos/example-memory.jpg" alt="照片描述" loading="lazy" decoding="async" />
  <div class="shade"></div>
  <div class="copy">
    <p class="kicker">小标题</p>
    <h2>这一屏的大句子。</h2>
    <p>补充一两句真实发生的事情和感受。</p>
  </div>
</section>
```

如果想放两张照片，用 `split` 模板：

```html
<section class="scene split" aria-label="这一屏的名字">
  <div class="photo-pair">
    <img src="./photos/first.jpg" alt="第一张照片描述" loading="lazy" decoding="async" />
    <img src="./photos/second.jpg" alt="第二张照片描述" loading="lazy" decoding="async" />
  </div>
  <div class="split-copy">
    <p class="kicker">小标题</p>
    <h2>这一屏的大句子。</h2>
    <p>补充一两句真实发生的事情和感受。</p>
  </div>
</section>
```

## 发布前检查

语法检查：

```bash
node --check script.js
```

本地预览：

```bash
python3 -m http.server 4173
```

打开：

```text
http://127.0.0.1:4173
```

检查内容：

- 手机上第一屏是否像表白开场，而不是照片列表。
- 每一屏文字是否没有溢出。
- 照片是否加载。
- 最后一屏按钮是否有反馈。
- 页面是否没有横向滚动。

预览完成后停止本地服务：

```text
Ctrl+C
```

## 发布到 GitHub Pages

常规发布：

```bash
git status --short
git add README.md ADD_MEDIA_GUIDE.md index.html styles.css script.js photos
git commit -m "Update confession page"
git push
```

发布后等待 GitHub Pages 构建完成，再打开线上地址检查：

```text
https://0luckylove0.github.io/photo-wall-site/
```

如果浏览器缓存旧文件，可以在网址后加版本参数：

```text
https://0luckylove0.github.io/photo-wall-site/?v=2026-06-17
```
