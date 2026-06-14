# GitHub Pages 照片墙

这是一个纯静态照片展示墙，可以直接部署到 GitHub Pages，不需要后端服务或构建步骤。

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

## 替换成自己的照片

编辑 `script.js` 顶部的 `photos` 数组：

```js
{
  title: "照片标题",
  location: "地点",
  year: 2026,
  category: "travel",
  tags: ["旅行", "海边"],
  ratio: "4 / 5",
  src: "./photos/example.jpg"
}
```

如果使用本地照片，建议放在 `photos/` 目录，然后把 `src` 写成类似 `./photos/example.jpg`。

页面里的“添加照片”只用于浏览器本地临时预览，不会自动上传到 GitHub 仓库。
