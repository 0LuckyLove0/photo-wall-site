# 添加照片和视频指南

这份文档用于后续维护情侣影像空间。当前网页只做交互和展示，不提供网页端上传。新增照片或视频需要改仓库文件，再发布到 GitHub Pages。

## 当前结构

主要文件：

- `index.html`：页面结构。
- `styles.css`：页面样式。
- `script.js`：照片墙数据和交互逻辑。
- `photos/`：默认展示的照片文件。
- `videos/`：如果以后加入默认短视频，建议放在这里。

默认展示内容写在 `script.js` 顶部的 `samplePhotos` 数组里。新增内容时，一般只需要：

1. 把压缩后的文件放进 `photos/` 或 `videos/`。
2. 在 `script.js` 的 `samplePhotos` 数组里增加一条记录。
3. 本地检查。
4. 提交并发布到 GitHub Pages。

## 公开性提醒

这个站点发布在 GitHub Pages 上。正式加入默认照片墙后，图片和视频会成为公开网页资源，知道链接的人都可能访问。

不要放不希望公开的原图、证件信息、聊天截图、定位细节或其他敏感内容。

## 文件命名

使用小写英文、数字和连字符，避免空格、中文和特殊符号。

推荐：

```text
photos/book-rooftop-rain.jpg
photos/holmes-phone-booth.jpg
videos/rainy-rooftop-clip.mp4
```

不推荐：

```text
照片 1.png
IMG_1234 原图.mov
```

## 添加照片

### 1. 压缩照片

原图通常太大，建议转成网页用 JPEG。

```bash
sips -Z 2200 -s format jpeg -s formatOptions 82 /path/to/original.png --out photos/example-memory.jpg
```

查看尺寸：

```bash
sips -g pixelWidth -g pixelHeight photos/example-memory.jpg
```

建议：

- 长边控制在 `1800` 到 `2400` 像素。
- 单张尽量控制在 `1MB` 左右。
- 竖图常见比例：`3 / 4`。
- 横图常见比例：`4 / 3` 或 `16 / 9`。

### 2. 增加照片数据

在 `script.js` 的 `samplePhotos` 数组里加入对象。放在数组越前面，页面默认展示越靠前。

模板：

```js
{
  id: "memory-example-memory",
  title: "照片标题",
  location: "地点",
  date: "",
  category: "date",
  tags: ["标签一", "标签二"],
  note: "这张照片背后的简短说明。",
  ratio: "4 / 3",
  source: "curated",
  kind: "image",
  mime: "image/jpeg",
  duration: 0,
  src: "./photos/example-memory.jpg"
}
```

字段说明：

- `id`：唯一编号，不能重复。建议格式为 `memory-英文短名`。
- `title`：卡片标题。
- `location`：地点。不确定时写宽一点，不要硬编具体店名。
- `date`：知道就写 `YYYY-MM-DD`；不知道就留空字符串 `""`。
- `category`：只能使用 `date`、`travel`、`daily`、`anniversary`、`surprise`。
- `tags`：搜索关键词，建议包含地点、主题和特殊记忆点。
- `note`：简短说明，优先写真实发生的事情。
- `ratio`：图片宽高比，例如 `4 / 3`、`3 / 4`、`1900 / 1424`。
- `source`：默认展示内容固定写 `curated`。
- `kind`：照片写 `image`。
- `mime`：JPEG 写 `image/jpeg`。
- `duration`：照片固定写 `0`。
- `src`：文件路径，通常写 `./photos/文件名.jpg`。

## 添加视频

视频也可以作为默认展示内容加入，但 GitHub Pages 不适合放太大的视频。

建议：

- 使用 `.mp4`。
- 长度控制在几秒到十几秒。
- 单个视频尽量小于 `25MB`。
- 横屏用 `16 / 9`，竖屏用 `9 / 16` 或实际宽高比。

### 1. 准备视频目录

```bash
mkdir -p videos
```

### 2. 压缩视频

如果本机有 `ffmpeg`，可以压缩成网页友好的 MP4：

```bash
ffmpeg -i /path/to/original.mov \
  -vf "scale='min(1280,iw)':-2" \
  -c:v libx264 -crf 26 -preset medium \
  -c:a aac -b:a 96k \
  -movflags +faststart \
  videos/example-clip.mp4
```

如果没有 `ffmpeg`，可以先用手机、剪映、QuickTime、iMovie 等工具导出较小的 MP4。

### 3. 增加视频数据

模板：

```js
{
  id: "memory-example-clip",
  title: "短视频标题",
  location: "地点",
  date: "",
  category: "daily",
  tags: ["短视频", "标签"],
  note: "这段视频记录的事情。",
  ratio: "9 / 16",
  source: "curated",
  kind: "video",
  mime: "video/mp4",
  duration: 8,
  src: "./videos/example-clip.mp4"
}
```

视频字段补充：

- `kind`：视频写 `video`。
- `mime`：MP4 写 `video/mp4`。
- `duration`：秒数。知道就填数字；不知道可以填 `0`，页面会显示“短视频”。
- `ratio`：建议按实际宽高填写，比如竖屏 `1080 / 1920` 或简写 `9 / 16`。

## 描述写法

建议使用“确认发生过的事实 + 一点感受”。

可以写：

```text
在湾区之眼书城楼顶，外面下着大暴雨，BOOK 灯牌和远处的城市一起亮起来。
```

不建议写：

```text
这是我们最浪漫的一天，整个城市都在为我们庆祝。
```

原因是后者无法从照片或记忆里稳定确认，后续维护也容易失真。

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

- 默认数量是否增加。
- 新照片或视频是否加载。
- 搜索标题、地点、标签是否能搜到。
- 分类筛选是否正常。
- 点击卡片能否打开预览。
- 手机宽度下页面是否没有横向滚动。

预览完成后停止本地服务：

```text
Ctrl+C
```

## 发布到 GitHub Pages

常规发布：

```bash
git status --short
git add README.md ADD_MEDIA_GUIDE.md index.html styles.css script.js photos videos
git commit -m "Add new memories"
git push
```

如果只改了部分文件，可以缩小 `git add` 范围。例如只加一张照片和一条数据：

```bash
git add script.js photos/example-memory.jpg
git commit -m "Add example memory"
git push
```

发布后等待 GitHub Pages 构建完成，再打开线上地址检查：

```text
https://0luckylove0.github.io/photo-wall-site/
```

如果浏览器缓存旧文件，可以在网址后加版本参数：

```text
https://0luckylove0.github.io/photo-wall-site/?v=2026-06-14
```

## 常见问题

### 新内容没有显示

检查：

- `src` 路径是否写对。
- 文件是否真的提交到了仓库。
- `script.js` 对象之间是否漏了逗号。
- GitHub Pages 是否构建完成。
- 浏览器是否缓存旧文件。

### 视频无法播放

检查：

- 文件是否是浏览器支持的 MP4。
- `mime` 是否写成 `video/mp4`。
- 文件是否太大。
- 路径是否写对。

### 不确定日期怎么办

留空：

```js
date: ""
```

不要为了让页面更完整而编日期。

### 以后想恢复网页端上传怎么办

GitHub Pages 本身不能保存网页上传的文件。要做多人同步上传，需要增加云端存储或后端，例如 Supabase Storage、Firebase Storage、Cloudinary 或自建服务。
