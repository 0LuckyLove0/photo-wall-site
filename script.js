const categoryLabels = {
  all: "全部",
  date: "一起出门",
  travel: "看展",
  daily: "日常",
  anniversary: "纪念",
  surprise: "心意"
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
    src: "./photos/mirror-car-show.jpg"
  },
  {
    id: "memory-insta360-edited-selfie",
    title: "影石店里的 P 图合照",
    location: "Insta360 店铺",
    date: "",
    category: "date",
    tags: ["Insta360", "影石", "防被骂神器", "P图", "合照", "逛店"],
    note: "一起去逛 Insta360 的店铺，体验影石的防被骂神器时拍下的合照，这是她 P 图之后留下的版本。",
    ratio: "3 / 4",
    src: "./photos/insta360-edited-selfie.jpg"
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
    src: "./photos/holmes-phone-booth.jpg"
  },
  {
    id: "memory-zhongshan-park-cat",
    title: "中山公园遇到的乖猫猫",
    location: "中山公园",
    date: "",
    category: "date",
    tags: ["中山公园", "约会", "猫猫", "很乖", "蹭蹭"],
    note: "一起去中山公园约会时遇到的猫猫，很乖，一直在蹭我们两个。",
    ratio: "3 / 4",
    src: "./photos/zhongshan-park-cat.jpg"
  },
  {
    id: "memory-west-bay-mangrove-sky",
    title: "西湾红树林的海边天空",
    location: "西湾红树林",
    date: "",
    category: "date",
    tags: ["西湾红树林", "海边", "散步", "吹风", "天空", "红树林"],
    note: "一起去西湾红树林，在海边散步吹风，看红树林时拍下的天空和海面灯光。",
    ratio: "4 / 3",
    src: "./photos/west-bay-mangrove-sky.jpg"
  }
];

const photos = [...samplePhotos];
let visiblePhotos = [...photos];
let activeFilter = "all";
let activeIndex = 0;

const gallery = document.querySelector("#gallery");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const filterButtons = [...document.querySelectorAll(".filter")];
const totalCount = document.querySelector("#totalCount");
const categoryCount = document.querySelector("#categoryCount");
const yearRange = document.querySelector("#yearRange");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxTitle = document.querySelector("#lightboxTitle");
const lightboxMeta = document.querySelector("#lightboxMeta");
const lightboxNote = document.querySelector("#lightboxNote");
const closeLightbox = document.querySelector("#closeLightbox");
const prevPhoto = document.querySelector("#prevPhoto");
const nextPhoto = document.querySelector("#nextPhoto");

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
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
      "照片",
      categoryLabels[photo.category],
      ...(photo.tags || [])
    ].join(" ")
  );
}

function getPhotoMetaParts(photo) {
  return [
    categoryLabels[photo.category] || "回忆",
    photo.location || "未记录地点",
    photo.date ? formatDate(photo.date) : ""
  ].filter(Boolean);
}

function updateStats() {
  const years = photos.map(getYear).filter(Boolean).sort((a, b) => a - b);
  const firstYear = years[0];
  const lastYear = years[years.length - 1];
  const categories = new Set(photos.map((photo) => photo.category).filter(Boolean));

  totalCount.textContent = String(photos.length);
  categoryCount.textContent = String(categories.size);
  yearRange.textContent =
    firstYear && lastYear ? (firstYear === lastYear ? String(firstYear) : `${firstYear}-${lastYear}`) : "两个人";
}

function createPhotoElement(photo) {
  const image = document.createElement("img");
  image.src = photo.src;
  image.alt = photo.title;
  image.loading = "lazy";
  return image;
}

function createPhotoCard(photo, visibleIndex, pageIndex) {
  const button = document.createElement("button");
  const image = createPhotoElement(photo);
  const info = document.createElement("span");
  const page = document.createElement("span");
  const title = document.createElement("strong");
  const meta = document.createElement("span");
  const note = document.createElement("em");
  const tilt = ((pageIndex % 5) - 2) * 0.36;

  button.className = "photo-card";
  button.type = "button";
  button.style.setProperty("--ratio", photo.ratio || "4 / 5");
  button.style.setProperty("--tilt", `${tilt}deg`);
  button.setAttribute("aria-label", `打开照片：${photo.title}`);

  info.className = "photo-info";
  page.className = "page-label";
  page.textContent = `第 ${String(pageIndex + 1).padStart(2, "0")} 页`;
  title.textContent = photo.title;
  meta.textContent = getPhotoMetaParts(photo).join(" · ");
  note.textContent = photo.note || "";
  info.append(page, title, meta);
  if (photo.note) info.append(note);
  button.append(image, info);

  button.addEventListener("click", () => openLightbox(visibleIndex));
  return button;
}

function renderGallery() {
  const query = normalize(searchInput.value);
  visiblePhotos = photos.filter((photo) => {
    const categoryMatch = activeFilter === "all" || photo.category === activeFilter;
    const textMatch = !query || getPhotoText(photo).includes(query);
    return categoryMatch && textMatch;
  });

  gallery.replaceChildren(
    ...visiblePhotos.map((photo, visibleIndex) => createPhotoCard(photo, visibleIndex, photos.indexOf(photo)))
  );
  emptyState.hidden = visiblePhotos.length > 0;
}

function render() {
  updateStats();
  renderGallery();
}

function openLightbox(index) {
  activeIndex = index;
  const photo = visiblePhotos[activeIndex];
  if (!photo) return;

  lightboxImage.hidden = false;
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.title;

  lightboxTitle.textContent = photo.title;
  lightboxMeta.textContent = getPhotoMetaParts(photo).join(" · ");
  lightboxNote.textContent = photo.note || "";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  closeLightbox.focus();
}

function hideLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.hidden = false;
  lightboxImage.removeAttribute("src");
}

function showPhoto(offset) {
  if (visiblePhotos.length === 0) return;
  activeIndex = (activeIndex + offset + visiblePhotos.length) % visiblePhotos.length;
  openLightbox(activeIndex);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    renderGallery();
  });
});

searchInput.addEventListener("input", renderGallery);
closeLightbox.addEventListener("click", hideLightbox);
prevPhoto.addEventListener("click", () => showPhoto(-1));
nextPhoto.addEventListener("click", () => showPhoto(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) hideLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (event.key === "Escape") hideLightbox();
  if (event.key === "ArrowLeft") showPhoto(-1);
  if (event.key === "ArrowRight") showPhoto(1);
});

function init() {
  render();
}

init();
