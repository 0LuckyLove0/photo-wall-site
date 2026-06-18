const progress = document.querySelector("#scrollProgress");
const scenes = [...document.querySelectorAll(".scene")];
const answerButtons = [...document.querySelectorAll("[data-answer]")];
const answerMessage = document.querySelector("#answerMessage");
const entryGate = document.querySelector("#entryGate");
const gateForm = document.querySelector("#gateForm");
const nameInput = document.querySelector("#nameInput");
const gateButton = document.querySelector("#gateButton");
const gateStatus = document.querySelector("#gateStatus");
const gateProgress = document.querySelector("#gateProgress");

const unlockName = "赵霞";
const mobileImageQuery = window.matchMedia("(max-width: 640px)");
let gateState = "idle";
let loadedImageCount = 0;

function updateScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  progress.style.width = `${Math.min(Math.max(ratio, 0), 1) * 100}%`;
}

function revealVisibleScenes() {
  if (!("IntersectionObserver" in window)) {
    scenes.forEach((scene) => scene.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.28 }
  );

  scenes.forEach((scene) => observer.observe(scene));
}

function getPreloadSource(image) {
  if (mobileImageQuery.matches && image.dataset.mobileSrc) {
    return image.dataset.mobileSrc;
  }

  return image.currentSrc || image.getAttribute("src");
}

function getImageSources() {
  const sources = [...document.querySelectorAll("img")]
    .map((image) => getPreloadSource(image))
    .filter(Boolean);
  return [...new Set(sources)];
}

function setGateProgress(loaded, total) {
  const percent = total > 0 ? Math.round((loaded / total) * 100) : 100;
  gateProgress.style.width = `${percent}%`;
  return percent;
}

function preloadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve({ src, ok: true });
    image.onerror = () => resolve({ src, ok: false });
    image.src = src;
  });
}

async function preloadAllImages() {
  gateState = "loading";
  const sources = getImageSources();
  loadedImageCount = 0;
  gateStatus.classList.remove("is-error");
  gateStatus.textContent = `正在准备照片 0/${sources.length}`;
  gateButton.disabled = true;
  gateButton.textContent = "准备中...";
  setGateProgress(0, sources.length);

  await Promise.all(
    sources.map(async (src) => {
      await preloadImage(src);
      loadedImageCount += 1;
      const percent = setGateProgress(loadedImageCount, sources.length);
      gateStatus.textContent = `正在准备照片 ${loadedImageCount}/${sources.length}，${percent}%`;
    })
  );

  gateState = "ready";
  gateStatus.textContent = "照片准备好了，现在可以进入。";
  gateButton.disabled = false;
  gateButton.textContent = "进入拾光集";
  nameInput.disabled = true;
}

function enterPage() {
  gateState = "entered";
  entryGate.classList.add("is-hidden");
  document.documentElement.classList.remove("is-locked");
  document.body.classList.remove("is-locked");
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  updateScrollProgress();
}

function handleGateSubmit(event) {
  event.preventDefault();
  const typedName = nameInput.value.trim();

  if (gateState === "ready") {
    enterPage();
    return;
  }

  if (gateState === "loading") return;

  if (typedName !== unlockName) {
    gateStatus.classList.add("is-error");
    gateStatus.textContent = "名字不对，这一页只给赵霞看。";
    nameInput.select();
    return;
  }

  preloadAllImages();
}

function makePetal(x, y, offset) {
  const petal = document.createElement("span");
  petal.className = "floating-petal";
  petal.style.left = `${x}px`;
  petal.style.top = `${y}px`;
  petal.style.setProperty("--x", `${offset}px`);
  document.body.append(petal);
  petal.addEventListener("animationend", () => petal.remove(), { once: true });
}

function celebrate(button) {
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let index = 0; index < 18; index += 1) {
    const offset = (index - 9) * 14 + Math.round(Math.random() * 18 - 9);
    setTimeout(() => makePetal(centerX, centerY, offset), index * 22);
  }
}

function handleAnswer(event) {
  const button = event.currentTarget;
  const answer = button.dataset.answer;
  answerMessage.textContent =
    answer === "yes"
      ? "这句话，我终于可以认真说完了。"
      : "那就先抱一下，再把答案慢慢告诉我。";
  celebrate(button);
}

function init() {
  revealVisibleScenes();
  updateScrollProgress();
  nameInput.focus();
  gateForm.addEventListener("submit", handleGateSubmit);
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  answerButtons.forEach((button) => button.addEventListener("click", handleAnswer));
}

init();
