const photos = [
  {
    title: "海边清晨",
    location: "厦门",
    year: 2025,
    category: "travel",
    tags: ["海边", "日出", "旅行"],
    ratio: "4 / 5",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=84"
  },
  {
    title: "老街转角",
    location: "广州",
    year: 2024,
    category: "city",
    tags: ["城市", "街道", "建筑"],
    ratio: "3 / 4",
    src: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1000&q=84"
  },
  {
    title: "山谷微光",
    location: "川西",
    year: 2025,
    category: "nature",
    tags: ["山", "自然", "云"],
    ratio: "4 / 3",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=84"
  },
  {
    title: "窗边人像",
    location: "家",
    year: 2026,
    category: "people",
    tags: ["人物", "生活", "光影"],
    ratio: "4 / 5",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=84"
  },
  {
    title: "雨后霓虹",
    location: "上海",
    year: 2024,
    category: "city",
    tags: ["夜景", "城市", "雨"],
    ratio: "5 / 4",
    src: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1100&q=84"
  },
  {
    title: "森林步道",
    location: "杭州",
    year: 2023,
    category: "nature",
    tags: ["森林", "自然", "步道"],
    ratio: "3 / 4",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=84"
  },
  {
    title: "旅行剪影",
    location: "青岛",
    year: 2025,
    category: "people",
    tags: ["人物", "旅行", "海风"],
    ratio: "4 / 3",
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=84"
  },
  {
    title: "午后咖啡",
    location: "成都",
    year: 2026,
    category: "travel",
    tags: ["咖啡", "旅行", "生活"],
    ratio: "1 / 1",
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=84"
  },
  {
    title: "港口晚风",
    location: "香港",
    year: 2024,
    category: "city",
    tags: ["港口", "城市", "傍晚"],
    ratio: "4 / 5",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=84"
  },
  {
    title: "雪山远眺",
    location: "云南",
    year: 2023,
    category: "nature",
    tags: ["雪山", "自然", "远方"],
    ratio: "16 / 11",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1300&q=84"
  },
  {
    title: "朋友聚会",
    location: "深圳",
    year: 2026,
    category: "people",
    tags: ["朋友", "人物", "聚会"],
    ratio: "4 / 3",
    src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=84"
  },
  {
    title: "屋顶落日",
    location: "北京",
    year: 2025,
    category: "travel",
    tags: ["落日", "屋顶", "旅行"],
    ratio: "5 / 4",
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1100&q=84"
  }
];

let activeFilter = "all";
let visiblePhotos = [...photos];
let activeIndex = 0;

const gallery = document.querySelector("#gallery");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const filterButtons = [...document.querySelectorAll(".filter")];
const totalCount = document.querySelector("#totalCount");
const albumCount = document.querySelector("#albumCount");
const yearRange = document.querySelector("#yearRange");
const photoUpload = document.querySelector("#photoUpload");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxTitle = document.querySelector("#lightboxTitle");
const lightboxMeta = document.querySelector("#lightboxMeta");
const closeLightbox = document.querySelector("#closeLightbox");
const prevPhoto = document.querySelector("#prevPhoto");
const nextPhoto = document.querySelector("#nextPhoto");

function normalize(value) {
  return String(value).trim().toLowerCase();
}

function getPhotoText(photo) {
  return normalize([photo.title, photo.location, photo.year, ...photo.tags].join(" "));
}

function updateStats() {
  const years = photos.map((photo) => photo.year).filter(Boolean).sort();
  const categories = new Set(photos.map((photo) => photo.category));

  totalCount.textContent = String(photos.length);
  albumCount.textContent = String(categories.size);
  yearRange.textContent =
    years.length > 1 ? `${years[0]}-${years[years.length - 1]}` : String(years[0] ?? "-");
}

function createPhotoCard(photo, index) {
  const button = document.createElement("button");
  const image = document.createElement("img");
  const info = document.createElement("span");
  const title = document.createElement("strong");
  const meta = document.createElement("span");

  button.className = "photo-card";
  button.type = "button";
  button.style.setProperty("--ratio", photo.ratio || "4 / 5");
  button.setAttribute("aria-label", `打开照片：${photo.title}`);

  image.src = photo.src;
  image.alt = photo.title;
  image.loading = "lazy";

  info.className = "photo-info";
  title.textContent = photo.title;
  meta.textContent = `${photo.location} · ${photo.year}`;
  info.append(title, meta);
  button.append(image, info);
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

function openLightbox(index) {
  activeIndex = index;
  const photo = visiblePhotos[activeIndex];
  if (!photo) return;

  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.title;
  lightboxTitle.textContent = photo.title;
  lightboxMeta.textContent = `${photo.location} · ${photo.year} · ${photo.tags.join(" / ")}`;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  closeLightbox.focus();
}

function hideLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.removeAttribute("src");
}

function showPhoto(offset) {
  if (visiblePhotos.length === 0) return;
  activeIndex = (activeIndex + offset + visiblePhotos.length) % visiblePhotos.length;
  openLightbox(activeIndex);
}

function addLocalPhotos(files) {
  [...files].forEach((file) => {
    if (!file.type.startsWith("image/")) return;
    const src = URL.createObjectURL(file);
    photos.unshift({
      title: file.name.replace(/\.[^.]+$/, ""),
      location: "本地预览",
      year: new Date().getFullYear(),
      category: "people",
      tags: ["本地", "预览"],
      ratio: "4 / 5",
      src
    });
  });
  updateStats();
  renderGallery();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    renderGallery();
  });
});

searchInput.addEventListener("input", renderGallery);
photoUpload.addEventListener("change", (event) => addLocalPhotos(event.target.files));
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

updateStats();
renderGallery();
