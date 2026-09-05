/* Navigation and presentation stay independent of playlist and playback state. */
const EchoRoomUI = (() => {
  function icon(element, name) {
    if (!element || !window.lucide) return;
    const key = name.replace(/(^|-)(\w)/g, (_, dash, letter) => letter.toUpperCase());
    const node = window.lucide.icons[key];
    if (node) element.replaceChildren(window.lucide.createElement(node, { class: "lucide", "aria-hidden": "true", focusable: "false" }));
  }

  function view(name, scroll = true) {
    document.body.dataset.mobileView = name;
    document.querySelectorAll("[data-view]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.view === name)));
    const selector = { mix: ".music-control-section", now: ".now-panel", queue: ".queue-panel" }[name];
    if (scroll && window.matchMedia("(max-width: 1100px)").matches) window.scrollTo({ top: 0, behavior: "smooth" });
    else if (scroll) document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function collection(name) {
    document.querySelectorAll("[data-collection]").forEach((button) => {
      const active = button.dataset.collection === name;
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
      document.getElementById(button.getAttribute("aria-controls")).hidden = !active;
    });
  }

  function openDialog(id) {
    const dialog = document.getElementById(id);
    if (!dialog || dialog.open) return;
    if (id === "accountDialog") document.getElementById("accountPanel").open = true;
    dialog.showModal();
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Dialogs must not inherit display:none from a mobile navigation pane.
    document.querySelectorAll(".settings-dialog").forEach((dialog) => document.body.append(dialog));
    document.querySelectorAll("[data-icon]").forEach((element) => icon(element, element.dataset.icon));
    Object.entries({ prevBtn:"skip-back", nextBtn:"skip-forward", reloadBtn:"shuffle", loveCurrentBtn:"heart", playPauseBtn:"play", miniLoveBtn:"heart", miniPrevBtn:"skip-back", miniNextBtn:"skip-forward", miniPlayPauseBtn:"play" })
      .forEach(([id, name]) => icon(document.getElementById(id), name));
    document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => view(button.dataset.view)));
    document.querySelectorAll("[data-collection]").forEach((button) => {
      button.addEventListener("click", () => collection(button.dataset.collection));
      button.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const name = event.key === "Home" ? "styles" : event.key === "End" ? "programs" : button.dataset.collection === "styles" ? "programs" : "styles";
        collection(name);
        document.querySelector(`[data-collection="${name}"]`).focus();
      });
    });
    document.querySelectorAll("[data-dialog]").forEach((button) => button.addEventListener("click", () => openDialog(button.dataset.dialog)));
    document.querySelectorAll("[data-close-dialog]").forEach((button) => button.addEventListener("click", () => button.closest("dialog").close()));
    document.querySelectorAll(".settings-dialog").forEach((dialog) => {
      dialog.addEventListener("click", (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
      });
    });
  });
  return { icon, view, collection, openDialog };
})();
