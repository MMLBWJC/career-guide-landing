const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 960;
const MIN_VIEWPORT_WIDTH = 1280;
const stage = document.getElementById("stage");
const profileButton = document.querySelector(".profile-button");
const menuButton = document.querySelector(".menu-button");
const profilePanel = document.getElementById("profile-panel");
const menuPanel = document.getElementById("menu-panel");
const toast = document.querySelector(".toast");
let toastTimer = 0;

function fitStage() {
  const layoutWidth = Math.max(window.innerWidth, MIN_VIEWPORT_WIDTH);
  const scale = layoutWidth / DESIGN_WIDTH;
  stage.style.setProperty("--scale", scale.toString());
  stage.style.left = `${(layoutWidth - DESIGN_WIDTH * scale) / 2}px`;
  stage.style.top = `${(window.innerHeight - DESIGN_HEIGHT * scale) / 2}px`;
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
}

function setExpanded(button, panel, expanded) {
  button.setAttribute("aria-expanded", String(expanded));
  panel.hidden = !expanded;
}

function closeFloating(except) {
  if (except !== "profile") {
    setExpanded(profileButton, profilePanel, false);
  }
  if (except !== "menu") {
    setExpanded(menuButton, menuPanel, false);
  }
}

profileButton.addEventListener("click", () => {
  const expanded = profileButton.getAttribute("aria-expanded") === "true";
  closeFloating("profile");
  setExpanded(profileButton, profilePanel, !expanded);
});

menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  closeFloating("menu");
  setExpanded(menuButton, menuPanel, !expanded);
});

document.querySelector(".primary-action").addEventListener("click", () => {
  showToast("评估即将开始");
});

document.querySelectorAll(".is-locked").forEach((card) => {
  const handler = () => {
    const step = card.dataset.step;
    showToast(step === "2" ? "完成评估后解锁职业路径" : "确认路径后解锁岗位推荐");
  };
  card.addEventListener("click", handler);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handler();
    }
  });
});

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".user-area") && !event.target.closest(".profile-panel") && !event.target.closest(".menu-panel")) {
    closeFloating();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeFloating();
  }
});

window.addEventListener("resize", fitStage);
fitStage();
