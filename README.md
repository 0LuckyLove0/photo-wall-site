# 情侣影像空间

这是一个纯静态的情侣影像空间，可以直接部署到 GitHub Pages。

当前版本支持：

- 默认展示 `photos/` 里的 9 张情侣回忆照片
- 分类浏览照片和短视频：约会、旅行、日常、纪念日、惊喜
- 搜索标题、地点、留言和标签
- 用户从浏览器上传图片和短视频
- 上传图片压缩后保存到当前浏览器的 IndexedDB
- 短视频按原文件保存到当前浏览器的 IndexedDB
- 刷新页面后仍保留本机上传内容
- 删除本机上传内容
- 导出和导入 JSON 备份

## 重要限制

GitHub Pages 是静态托管，本身不能接收并保存用户上传的文件。当前上传能力是“当前浏览器本机保存”，不会自动同步到其他设备，也不会让其他访问者看到。

如果要做真正的多人共享上传，需要增加云端存储，例如 Supabase Storage、Firebase Storage、Cloudinary 或自建后端。

视频建议只放几秒钟的短视频。当前单个视频限制为 80MB，文件越大越容易触发浏览器存储配额限制。

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
