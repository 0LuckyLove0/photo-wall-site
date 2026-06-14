const DB_NAME = "couple-photo-space";
const DB_VERSION = 1;
const STORE_NAME = "photos";
const MAX_IMAGE_SIZE = 1800;
const JPEG_QUALITY = 0.86;
const MAX_VIDEO_SIZE_BYTES = 80 * 1024 * 1024;

const categoryLabels = {
  all: "全部",
  date: "约会",
  travel: "旅行",
  daily: "日常",
  anniversary: "纪念日",
  surprise: "惊喜"
};

const samplePhotos = [
  {
    id: "sample-seaside-date",
    title: "海边的风",
    location: "厦门",
    date: "2025-05-20",
    category: "date",
    tags: ["约会", "海边", "日落"],
    note: "那天没有特别安排，但散步很久。",
    ratio: "4 / 5",
    source: "sample",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=84"
  },
  {
    id: "sample-window-light",
    title: "窗边的光",
    location: "家",
    date: "2026-02-14",
    category: "daily",
    tags: ["日常", "光影", "安静"],
    note: "普通的一天，也值得被留下。",
    ratio: "4 / 5",
    source: "sample",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=84"
  },
  {
    id: "sample-mountain-trip",
    title: "山谷远行",
    location: "川西",
    date: "2025-10-04",
    category: "travel",
    tags: ["旅行", "山", "云"],
    note: "路很远，但看到风景的那一刻就值了。",
    ratio: "4 / 3",
    source: "sample",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=84"
  },
  {
    id: "sample-coffee-afternoon",
    title: "午后咖啡",
    location: "成都",
    date: "2026-01-08",
    category: "daily",
    tags: ["咖啡", "日常", "聊天"],
    note: "坐在角落里，把最近的小事都说完。",
    ratio: "1 / 1",
    source: "sample",
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=84"
  },
  {
    id: "sample-city-rain",
    title: "雨后街灯",
    location: "上海",
    date: "2024-12-31",
    category: "anniversary",
    tags: ["纪念日", "夜景", "城市"],
    note: "跨年的路上，灯光和雨水都很亮。",
    ratio: "5 / 4",
    source: "sample",
    src: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1100&q=84"
  },
  {
    id: "sample-forest-walk",
    title: "森林散步",
    location: "杭州",
    date: "2024-04-12",
    category: "date",
    tags: ["约会", "森林", "散步"],
    note: "没有目的地，只是一起慢慢走。",
    ratio: "3 / 4",
    source: "sample",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=84"
  },
  {
    id: "sample-cheers",
    title: "庆祝一下",
    location: "深圳",
    date: "2026-03-02",
    category: "surprise",
    tags: ["惊喜", "庆祝", "晚餐"],
    note: "理由不重要，重要的是我们都在。",
    ratio: "4 / 3",
    source: "sample",
    src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=84"
  },
  {
    id: "sample-rooftop-sunset",
    title: "屋顶落日",
    location: "北京",
    date: "2025-08-17",
    category: "travel",
    tags: ["旅行", "落日", "屋顶"],
    note: "一起等天色慢慢暗下来。",
    ratio: "5 / 4",
    source: "sample",
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1100&q=84"
  }
];

let dbPromise;
let localPhotos = [];
let photos = [...samplePhotos];
let visiblePhotos = [...photos];
let activeFilter = "all";
let activeIndex = 0;

const gallery = document.querySelector("#gallery");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const filterButtons = [...document.querySelectorAll(".filter")];
const totalCount = document.querySelector("#totalCount");
const localCount = document.querySelector("#localCount");
const yearRange = document.querySelector("#yearRange");
const uploadForm = document.querySelector("#uploadForm");
const photoUpload = document.querySelector("#photoUpload");
const selectedFileText = document.querySelector("#selectedFileText");
const photoTitle = document.querySelector("#photoTitle");
const photoDate = document.querySelector("#photoDate");
const photoLocation = document.querySelector("#photoLocation");
const photoCategory = document.querySelector("#photoCategory");
const photoNote = document.querySelector("#photoNote");
const storageStatus = document.querySelector("#storageStatus");
const exportButton = document.querySelector("#exportButton");
const importBackup = document.querySelector("#importBackup");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxVideo = document.querySelector("#lightboxVideo");
const lightboxTitle = document.querySelector("#lightboxTitle");
const lightboxMeta = document.querySelector("#lightboxMeta");
const lightboxNote = document.querySelector("#lightboxNote");
const closeLightbox = document.querySelector("#closeLightbox");
const prevPhoto = document.querySelector("#prevPhoto");
const nextPhoto = document.querySelector("#nextPhoto");
const deletePhoto = document.querySelector("#deletePhoto");

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function createId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function basename(fileName) {
  return fileName.replace(/\.[^.]+$/, "");
}

function formatDate(dateString) {
  return dateString ? dateString.replaceAll("-", ".") : "未记录日期";
}

function getYear(photo) {
  const source = photo.date || photo.year;
  const year = String(source || "").slice(0, 4);
  return /^\d{4}$/.test(year) ? Number(year) : null;
}

function getPhotoText(photo) {
  return normalize(
    [
      photo.title,
      photo.location,
      photo.date,
      photo.note,
      getMediaTypeLabel(photo),
      categoryLabels[photo.category],
      ...(photo.tags || [])
    ].join(" ")
  );
}

function setStatus(message) {
  storageStatus.textContent = message;
}

function getMediaKind(photo) {
  if (photo.kind) return photo.kind;
  if (photo.type) return photo.type;
  if (typeof photo.src === "string" && photo.src.startsWith("data:video/")) return "video";
  return "image";
}

function getMediaTypeLabel(photo) {
  return getMediaKind(photo) === "video" ? "短视频" : "照片";
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "";
  const rounded = Math.round(seconds);
  const minutes = Math.floor(rounded / 60);
  const rest = String(rounded % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function openDb() {
  if (!("indexedDB" in window)) {
    return Promise.reject(new Error("当前浏览器不支持 IndexedDB"));
  }

  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  return dbPromise;
}

async function getAllLocalPhotos() {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME).getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

async function saveLocalPhoto(photo) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).put(photo);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

async function removeLocalPhoto(id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).delete(id);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`无法读取图片：${file.name}`));
    };
    image.src = url;
  });
}

async function compressImage(file) {
  const image = await loadImageFromFile(file);
  const scale = Math.min(1, MAX_IMAGE_SIZE / Math.max(image.naturalWidth, image.naturalHeight));
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);

  return {
    src: canvas.toDataURL("image/jpeg", JPEG_QUALITY),
    ratio: `${width} / ${height}`
  };
}

function loadVideoMetadata(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;
    video.onloadedmetadata = () => {
      const width = video.videoWidth || 16;
      const height = video.videoHeight || 9;
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      URL.revokeObjectURL(url);
      resolve({ width, height, duration });
    };
    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`无法读取视频：${file.name}`));
    };
    video.src = url;
  });
}

async function prepareMedia(file) {
  if (file.type.startsWith("image/")) {
    const image = await compressImage(file);
    return {
      kind: "image",
      mime: "image/jpeg",
      duration: 0,
      ...image
    };
  }

  if (file.type.startsWith("video/")) {
    if (file.size > MAX_VIDEO_SIZE_BYTES) {
      throw new Error(`视频过大：${file.name}`);
    }

    const metadata = await loadVideoMetadata(file);
    return {
      kind: "video",
      mime: file.type || "video/mp4",
      duration: metadata.duration,
      ratio: `${metadata.width} / ${metadata.height}`,
      src: await readFileAsDataUrl(file)
    };
  }

  throw new Error(`不支持的文件类型：${file.name}`);
}

function rebuildPhotos() {
  localPhotos.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  photos = [...localPhotos, ...samplePhotos];
}

function updateStats() {
  const years = photos.map(getYear).filter(Boolean).sort((a, b) => a - b);
  const firstYear = years[0];
  const lastYear = years[years.length - 1];

  totalCount.textContent = String(photos.length);
  localCount.textContent = String(localPhotos.length);
  yearRange.textContent =
    firstYear && lastYear ? (firstYear === lastYear ? String(firstYear) : `${firstYear}-${lastYear}`) : "-";
}

function createMediaElement(photo, preview = true) {
  if (getMediaKind(photo) === "video") {
    const video = document.createElement("video");
    video.src = photo.src;
    video.muted = preview;
    video.loop = preview;
    video.playsInline = true;
    video.preload = "metadata";
    if (!preview) video.controls = true;
    return video;
  }

  const image = document.createElement("img");
  image.src = photo.src;
  image.alt = photo.title;
  image.loading = "lazy";
  return image;
}

function createPhotoCard(photo, index) {
  const button = document.createElement("button");
  const media = createMediaElement(photo);
  const info = document.createElement("span");
  const title = document.createElement("strong");
  const meta = document.createElement("span");
  const note = document.createElement("em");
  const kind = getMediaKind(photo);

  button.className = "photo-card";
  button.type = "button";
  button.style.setProperty("--ratio", photo.ratio || "4 / 5");
  button.setAttribute("aria-label", `打开${getMediaTypeLabel(photo)}：${photo.title}`);

  info.className = "photo-info";
  title.textContent = photo.title;
  meta.textContent = `${getMediaTypeLabel(photo)} · ${categoryLabels[photo.category] || "回忆"} · ${photo.location || "未记录地点"} · ${formatDate(photo.date)}`;
  note.textContent = photo.note || "";
  info.append(title, meta);
  if (photo.note) info.append(note);
  button.append(media, info);

  if (kind === "video") {
    const videoBadge = document.createElement("span");
    videoBadge.className = "media-badge";
    videoBadge.textContent = formatDuration(photo.duration) || "短视频";
    button.append(videoBadge);
  }

  if (photo.source === "local") {
    const badge = document.createElement("span");
    badge.className = "local-badge";
    badge.textContent = "本机";
    button.append(badge);
  }

  button.addEventListener("click", () => openLightbox(index));
  return button;
}

function renderGallery() {
  const query = normalize(searchInput.value);
  visiblePhotos = photos.filter((photo) => {
    const categoryMatch = activeFilter === "all" || photo.category === activeFilter;
    const textMatch = !query || getPhotoText(photo).includes(query);
    return categoryMatch && textMatch;
  });

  gallery.replaceChildren(...visiblePhotos.map(createPhotoCard));
  emptyState.hidden = visiblePhotos.length > 0;
}

function render() {
  rebuildPhotos();
  updateStats();
  renderGallery();
}

function openLightbox(index) {
  activeIndex = index;
  const photo = visiblePhotos[activeIndex];
  if (!photo) return;

  const kind = getMediaKind(photo);
  if (kind === "video") {
    lightboxImage.hidden = true;
    lightboxImage.removeAttribute("src");
    lightboxVideo.hidden = false;
    lightboxVideo.src = photo.src;
  } else {
    lightboxVideo.pause();
    lightboxVideo.hidden = true;
    lightboxVideo.removeAttribute("src");
    lightboxImage.hidden = false;
    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.title;
  }

  lightboxTitle.textContent = photo.title;
  lightboxMeta.textContent = [
    getMediaTypeLabel(photo),
    categoryLabels[photo.category] || "回忆",
    photo.location || "未记录地点",
    formatDate(photo.date),
    kind === "video" ? formatDuration(photo.duration) : ""
  ].filter(Boolean).join(" · ");
  lightboxNote.textContent = photo.note || "";
  deletePhoto.hidden = photo.source !== "local";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  closeLightbox.focus();
}

function hideLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.hidden = false;
  lightboxImage.removeAttribute("src");
  lightboxVideo.pause();
  lightboxVideo.hidden = true;
  lightboxVideo.removeAttribute("src");
}

function showPhoto(offset) {
  if (visiblePhotos.length === 0) return;
  activeIndex = (activeIndex + offset + visiblePhotos.length) % visiblePhotos.length;
  openLightbox(activeIndex);
}

function resetUploadForm() {
  uploadForm.reset();
  photoDate.value = new Date().toISOString().slice(0, 10);
  selectedFileText.textContent = "还没有选择文件";
}

async function handleUpload(event) {
  event.preventDefault();
  const files = [...photoUpload.files].filter((file) => file.type.startsWith("image/") || file.type.startsWith("video/"));

  if (files.length === 0) {
    setStatus("请选择至少一张照片或一个短视频。");
    return;
  }

  const submitButton = uploadForm.querySelector("button[type='submit']");
  submitButton.disabled = true;
  setStatus(`正在保存 ${files.length} 个文件...`);

  try {
    for (const [index, file] of files.entries()) {
      const media = await prepareMedia(file);
      const hasSharedTitle = files.length === 1 && normalize(photoTitle.value);
      const photo = {
        id: createId(),
        title: hasSharedTitle ? photoTitle.value.trim() : basename(file.name),
        location: photoLocation.value.trim() || "未记录地点",
        date: photoDate.value || new Date().toISOString().slice(0, 10),
        category: photoCategory.value,
        tags: [
          categoryLabels[photoCategory.value],
          photoLocation.value.trim(),
          media.kind === "video" ? "短视频" : "照片",
          "本机上传"
        ].filter(Boolean),
        note: photoNote.value.trim(),
        kind: media.kind,
        mime: media.mime,
        duration: media.duration,
        ratio: media.ratio,
        src: media.src,
        source: "local",
        createdAt: Date.now() + index
      };

      await saveLocalPhoto(photo);
      localPhotos.unshift(photo);
    }

    resetUploadForm();
    render();
    setStatus(`已保存 ${files.length} 个回忆。`);
  } catch (error) {
    console.error(error);
    setStatus(`保存失败。视频需小于 ${Math.round(MAX_VIDEO_SIZE_BYTES / 1024 / 1024)}MB，或浏览器存储空间不足。`);
  } finally {
    submitButton.disabled = false;
  }
}

function exportBackup() {
  if (localPhotos.length === 0) {
    setStatus("还没有本机上传的内容可导出。");
    return;
  }

  const payload = {
    app: "couple-photo-space",
    version: 1,
    exportedAt: new Date().toISOString(),
    photos: localPhotos
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `couple-photo-space-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
  setStatus(`已导出 ${localPhotos.length} 个本机回忆。`);
}

async function importPhotos(file) {
  if (!file) return;

  try {
    const data = JSON.parse(await file.text());
    const incoming = Array.isArray(data) ? data : data.photos;
    if (!Array.isArray(incoming)) throw new Error("备份格式不正确");

    const validPhotos = incoming
      .filter((photo) => {
        if (typeof photo?.src !== "string") return false;
        return photo.src.startsWith("data:image/") || photo.src.startsWith("data:video/");
      })
      .map((photo) => ({
        id: createId(),
        title: String(photo.title || "导入的回忆"),
        location: String(photo.location || "未记录地点"),
        date: String(photo.date || new Date().toISOString().slice(0, 10)),
        category: categoryLabels[photo.category] ? photo.category : "daily",
        tags: Array.isArray(photo.tags) ? photo.tags.map(String) : ["导入"],
        note: String(photo.note || ""),
        ratio: String(photo.ratio || "4 / 5"),
        kind: photo.kind === "video" || photo.src.startsWith("data:video/") ? "video" : "image",
        mime: String(photo.mime || ""),
        duration: Number(photo.duration || 0),
        src: photo.src,
        source: "local",
        createdAt: Date.now()
      }));

    for (const photo of validPhotos) {
      await saveLocalPhoto(photo);
      localPhotos.unshift(photo);
    }

    importBackup.value = "";
    render();
    setStatus(`已导入 ${validPhotos.length} 个回忆。`);
  } catch (error) {
    console.error(error);
    setStatus("导入失败，请确认文件是这个影像空间导出的 JSON 备份。");
  }
}

async function deleteActivePhoto() {
  const photo = visiblePhotos[activeIndex];
  if (!photo || photo.source !== "local") return;
  const ok = window.confirm(`删除「${photo.title}」？这个操作只会删除当前浏览器里的本机内容。`);
  if (!ok) return;

  try {
    await removeLocalPhoto(photo.id);
    localPhotos = localPhotos.filter((item) => item.id !== photo.id);
    hideLightbox();
    render();
    setStatus("已删除本机内容。");
  } catch (error) {
    console.error(error);
    setStatus("删除失败，请稍后再试。");
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    renderGallery();
  });
});

searchInput.addEventListener("input", renderGallery);
photoUpload.addEventListener("change", () => {
  const count = photoUpload.files.length;
  selectedFileText.textContent = count ? `已选择 ${count} 个文件` : "还没有选择文件";
});
uploadForm.addEventListener("submit", handleUpload);
exportButton.addEventListener("click", exportBackup);
importBackup.addEventListener("change", (event) => importPhotos(event.target.files[0]));
closeLightbox.addEventListener("click", hideLightbox);
prevPhoto.addEventListener("click", () => showPhoto(-1));
nextPhoto.addEventListener("click", () => showPhoto(1));
deletePhoto.addEventListener("click", deleteActivePhoto);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) hideLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (event.key === "Escape") hideLightbox();
  if (event.key === "ArrowLeft") showPhoto(-1);
  if (event.key === "ArrowRight") showPhoto(1);
});

async function init() {
  photoDate.value = new Date().toISOString().slice(0, 10);

  try {
    localPhotos = await getAllLocalPhotos();
    setStatus(localPhotos.length ? `已载入 ${localPhotos.length} 个本机回忆。` : "");
  } catch (error) {
    console.error(error);
    setStatus("当前浏览器无法使用本机持久保存。");
  }

  render();
}

init();
