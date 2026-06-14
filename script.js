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
    id: "memory-name-practice",
    title: "写满名字的一页",
    location: "手写纸页",
    date: "",
    category: "surprise",
    tags: ["赵霞", "手写", "名字", "认真"],
    note: "把一个名字一遍遍写满整页，像是在认真留下喜欢的痕迹。",
    ratio: "3 / 4",
    source: "curated",
    kind: "image",
    mime: "image/jpeg",
    duration: 0,
    src: "./photos/name-practice.jpg"
  },
  {
    id: "memory-rice-noodle-selfie",
    title: "小龙虾店里的合照",
    location: "小龙虾店",
    date: "",
    category: "date",
    tags: ["约会", "自拍", "小龙虾", "笑脸"],
    note: "一起吃小龙虾的店里，先把两个人和热闹的背景都装进镜头。",
    ratio: "1900 / 1424",
    source: "curated",
    kind: "image",
    mime: "image/jpeg",
    duration: 0,
    src: "./photos/rice-noodle-selfie.jpg"
  },
  {
    id: "memory-peace-selfie",
    title: "她比了个耶",
    location: "小龙虾店",
    date: "",
    category: "date",
    tags: ["约会", "自拍", "比耶", "小龙虾"],
    note: "同一家小龙虾店里的另一张照片，一个比耶，一个靠近镜头。",
    ratio: "1900 / 1424",
    source: "curated",
    kind: "image",
    mime: "image/jpeg",
    duration: 0,
    src: "./photos/peace-selfie.jpg"
  },
  {
    id: "memory-crayfish-dinner",
    title: "一桌小龙虾晚餐",
    location: "餐桌",
    date: "",
    category: "date",
    tags: ["晚餐", "小龙虾", "汽水", "约会"],
    note: "辣味小龙虾、烤翅、凉菜和汽水，是一顿很实在的开心。",
    ratio: "4 / 3",
    source: "curated",
    kind: "image",
    mime: "image/jpeg",
    duration: 0,
    src: "./photos/crayfish-dinner.jpg"
  },
  {
    id: "memory-ocean-art-museum",
    title: "大洋洲艺术展入口",
    location: "博物馆",
    date: "",
    category: "travel",
    tags: ["展览", "博物馆", "大洋洲", "旅行"],
    note: "蓝色展墙和木船把那次看展的第一眼留了下来。",
    ratio: "4 / 3",
    source: "curated",
    kind: "image",
    mime: "image/jpeg",
    duration: 0,
    src: "./photos/ocean-art-museum.jpg"
  },
  {
    id: "memory-wooden-statues",
    title: "展厅里的木雕",
    location: "博物馆",
    date: "",
    category: "travel",
    tags: ["展览", "木雕", "博物馆", "安静"],
    note: "灯光照在木雕和影子上，是看展途中停下来的一刻。",
    ratio: "3 / 4",
    source: "curated",
    kind: "image",
    mime: "image/jpeg",
    duration: 0,
    src: "./photos/wooden-statues.jpg"
  },
  {
    id: "memory-perfume-lab",
    title: "一起调香",
    location: "调香体验馆",
    date: "",
    category: "surprise",
    tags: ["调香", "体验", "香水", "手作"],
    note: "滴管、琥珀色瓶子和配方卡，记录了一次一起动手做香水的体验。",
    ratio: "4 / 3",
    source: "curated",
    kind: "image",
    mime: "image/jpeg",
    duration: 0,
    src: "./photos/perfume-lab.jpg"
  },
  {
    id: "memory-perfumer-certificate",
    title: "初级调香师证书",
    location: "调香体验馆",
    date: "",
    category: "anniversary",
    tags: ["证书", "调香", "纪念", "完成"],
    note: "体验结束后留下的证书，比照片更像一次正式盖章的纪念。",
    ratio: "4 / 3",
    source: "curated",
    kind: "image",
    mime: "image/jpeg",
    duration: 0,
    src: "./photos/perfumer-certificate.jpg"
  },
  {
    id: "memory-mirror-car-show",
    title: "车展哈哈镜自拍",
    location: "车展展厅",
    date: "",
    category: "daily",
    tags: ["车展", "哈哈镜", "自拍", "好玩"],
    note: "镜面把表情拉成了夸张的样子，这种不好好拍照的瞬间反而最鲜活。",
    ratio: "3 / 4",
    source: "curated",
    kind: "image",
    mime: "image/jpeg",
    duration: 0,
    src: "./photos/mirror-car-show.jpg"
  },
  {
    id: "memory-book-rooftop-rain",
    title: "暴雨里的 BOOK 灯牌",
    location: "湾区之眼书城楼顶",
    date: "",
    category: "date",
    tags: ["湾区之眼书城", "楼顶", "暴雨", "BOOK"],
    note: "在湾区之眼书城楼顶，外面下着大暴雨，BOOK 灯牌和远处的城市一起亮起来。",
    ratio: "4 / 3",
    source: "curated",
    kind: "image",
    mime: "image/jpeg",
    duration: 0,
    src: "./photos/book-rooftop-rain.jpg"
  },
  {
    id: "memory-holmes-phone-booth",
    title: "福尔摩斯展的电话亭",
    location: "湾区之眼书城",
    date: "",
    category: "date",
    tags: ["福尔摩斯", "电话亭", "展览", "马车"],
    note: "福尔摩斯展里被玫瑰围住的电话亭，后面还一起坐了马车。",
    ratio: "3 / 4",
    source: "curated",
    kind: "image",
    mime: "image/jpeg",
    duration: 0,
    src: "./photos/holmes-phone-booth.jpg"
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

function getMediaMetaParts(photo) {
  const kind = getMediaKind(photo);
  const duration = kind === "video" ? formatDuration(photo.duration) : "";
  return [
    getMediaTypeLabel(photo),
    categoryLabels[photo.category] || "回忆",
    photo.location || "未记录地点",
    photo.date ? formatDate(photo.date) : "",
    duration
  ].filter(Boolean);
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
  meta.textContent = getMediaMetaParts(photo).join(" · ");
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
  lightboxMeta.textContent = getMediaMetaParts(photo).join(" · ");
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
