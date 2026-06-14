# 情侣影像空间

这是一个纯静态的情侣影像空间，可以直接部署到 GitHub Pages。

当前版本支持：

- 默认展示 `photos/` 里的 11 张情侣回忆照片
- 分类浏览照片和短视频：约会、旅行、日常、纪念日、惊喜
- 搜索标题、地点、留言和标签
- 点击卡片打开大图或视频预览
- 键盘切换预览内容：`Esc` 关闭，左右方向键切换

## 重要限制

GitHub Pages 是静态托管，当前网页只做交互和展示，不提供网页端上传。

新增照片或视频需要修改仓库文件，再重新发布到 GitHub Pages。具体步骤见 [ADD_MEDIA_GUIDE.md](./ADD_MEDIA_GUIDE.md)。

如果以后要做真正的多人共享上传，需要增加云端存储，例如 Supabase Storage、Firebase Storage、Cloudinary 或自建后端。

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

## 替换默认示例内容

默认展示内容来自 `photos/` 目录，文字描述在 `script.js` 顶部的 `samplePhotos` 数组里维护。

如果使用仓库里的本地照片或视频，建议放在 `photos/` 目录，然后把 `src` 写成类似：

```js
src: "./photos/example.jpg"
```
