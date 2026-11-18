// Keep links accessible when JavaScript is disabled.
const menu = document.querySelector(".menu");
const nav = document.querySelector("#nav");
const mobile = matchMedia("(max-width: 700px)");
function setMenu(open) {
  nav.hidden = mobile.matches && !open;
  menu.setAttribute("aria-expanded", String(open));
}
function fitMenu() {
  menu.hidden = !mobile.matches;
  setMenu(false);
}
menu.addEventListener("click", () => setMenu(nav.hidden));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && mobile.matches && !nav.hidden) {
    setMenu(false);
    menu.focus();
  }
});
mobile.addEventListener("change", fitMenu);
fitMenu();

const filters = document.querySelector(".filters");
if (filters) {
  filters.hidden = false;
  const cards = [...document.querySelectorAll("[data-category]")];
  const announce = document.querySelector("#result");
  for (const button of filters.querySelectorAll("button")) {
    button.addEventListener("click", () => {
      const category = button.textContent;
      for (const other of filters.querySelectorAll("button")) {
        other.setAttribute("aria-pressed", String(other === button));
      }
      for (const card of cards) {
        card.hidden = category !== "All" && card.dataset.category !== category;
      }
      announce.textContent = cards.filter(card => !card.hidden).length + " projects shown";
    });
  }
}

// Preserve bookmarks to sections of the previous single-page site.
if (nav.querySelector('[href="index.html"][aria-current]')) {
  const routes = {
    "#projects": "projects.html", "#experience": "experience.html",
    "#skills": "skills.html", "#expertise": "skills.html",
    "#contact": "contact.html", "#upwork": "contact.html"
  };
  if (Object.hasOwn(routes, location.hash)) location.replace(routes[location.hash]);
}

const portraitScene = document.querySelector(".visual");
if (portraitScene) {
  const motion = matchMedia("(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)");
  function resetPortrait() {
    for (const property of ["--tilt-x", "--tilt-y", "--depth-x"]) {
      portraitScene.style.removeProperty(property);
    }
  }
  portraitScene.addEventListener("pointermove", event => {
    if (!motion.matches) return;
    const bounds = portraitScene.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    portraitScene.style.setProperty("--tilt-x", x * 14 + "deg");
    portraitScene.style.setProperty("--tilt-y", -y * 10 + "deg");
    portraitScene.style.setProperty("--depth-x", x * 12 + "px");
  });
  portraitScene.addEventListener("pointerleave", resetPortrait);
  motion.addEventListener("change", resetPortrait);
}
