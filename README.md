# 拾光集

这是一个纯静态的表白网页，可以直接部署到 GitHub Pages。

当前版本是手机优先的滚动叙事页：

- 开屏需要输入 `赵霞` 才能解锁
- 解锁后会先预加载照片，进度到 100% 后才能进入正文
- 一屏一屏展示真实照片和文字
- 用照片推进表白情绪，而不是做照片列表
- 手机端优先加载 `photos/mobile/` 里的轻量图片
- 最后一屏有明确表白和按钮反馈
- 页面只展示照片，不支持视频播放
- GitHub Pages 静态托管，不提供网页端上传

## 本地预览

在这个目录运行：

```bash
python3 -m http.server 4173
```

然后访问：

```text
http://127.0.0.1:4173
```

## 发布到 GitHub Pages

1. 把仓库推送到 GitHub。
2. 进入仓库 `Settings` -> `Pages`。
3. `Build and deployment` 选择 `Deploy from a branch`。
4. `Branch` 选择 `main`，目录选择 `/root`。
5. 保存后等待 GitHub Pages 部署完成。

## 修改内容

页面结构在 `index.html`，样式在 `styles.css`，开屏验证、照片预加载、滚动进度和按钮反馈在 `script.js`。

新增或替换照片时，把原图放到 `photos/`，再生成一张手机小图放到 `photos/mobile/`，然后在 `index.html` 里把对应的 `src`、`srcset` 和 `data-mobile-src` 改成类似：

```html
<img
  src="./photos/example.jpg"
  srcset="./photos/mobile/example.jpg 1200w, ./photos/example.jpg 2200w"
  sizes="100vw"
  data-mobile-src="./photos/mobile/example.jpg"
  alt="照片描述"
  loading="lazy"
  decoding="async"
/>
```

具体维护步骤见 [ADD_MEDIA_GUIDE.md](./ADD_MEDIA_GUIDE.md)。
