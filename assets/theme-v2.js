(function () {
  var STORAGE_KEY = "lh-theme-v2";

  function getStored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function preferredTheme() {
    var s = getStored();
    if (s === "dark" || s === "light") return s;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
      return "dark";
    return "light";
  }

  function applyTheme(theme) {
    var root = document.documentElement;
    var isDark = theme === "dark";
    root.classList.remove("light");
    root.classList.toggle("dark", isDark);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
    document.querySelectorAll(".theme-toggle-btn").forEach(function (btn) {
      btn.setAttribute("aria-pressed", isDark ? "true" : "false");
      btn.setAttribute(
        "title",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    });
  }

  function toggleTheme() {
    applyTheme(document.documentElement.classList.contains("dark") ? "light" : "dark");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    applyTheme(preferredTheme());
    document.querySelectorAll(".theme-toggle-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        toggleTheme();
      });
    });
  }
})();
