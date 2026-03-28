(function () {
  var toggle = document.getElementById("site-nav-toggle");
  var closeBtn = document.getElementById("site-nav-close");
  var drawer = document.getElementById("site-nav-drawer");
  var backdrop = document.getElementById("site-nav-backdrop");
  if (!toggle || !drawer || !backdrop) return;

  var TRANSITION_MS = 300;

  function open() {
    backdrop.removeAttribute("hidden");
    drawer.removeAttribute("hidden");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        backdrop.classList.add("is-open");
        drawer.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
        document.body.classList.add("site-nav-open");
      });
    });
  }

  function shut() {
    backdrop.classList.remove("is-open");
    drawer.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("site-nav-open");
    window.setTimeout(function () {
      if (!drawer.classList.contains("is-open")) {
        backdrop.setAttribute("hidden", "");
        drawer.setAttribute("hidden", "");
      }
    }, TRANSITION_MS);
  }

  toggle.addEventListener("click", function () {
    if (drawer.classList.contains("is-open")) shut();
    else open();
  });

  if (closeBtn) closeBtn.addEventListener("click", shut);
  backdrop.addEventListener("click", shut);

  drawer.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      shut();
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) shut();
  });

  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 768px)").matches) shut();
  });
})();
