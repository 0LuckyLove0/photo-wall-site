const progress = document.querySelector("#scrollProgress");
const scenes = [...document.querySelectorAll(".scene")];
const answerButtons = [...document.querySelectorAll("[data-answer]")];
const answerMessage = document.querySelector("#answerMessage");

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
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  answerButtons.forEach((button) => button.addEventListener("click", handleAnswer));
}

init();
