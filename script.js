/* =====================================================================
  
   ===================================================================== */

(function () {
  "use strict";

  /* ---------- scroll-spy nav ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".ruler-nav__list a"));
  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  function setActiveLink() {
    var scrollPos = window.scrollY + window.innerHeight * 0.35;
    var currentIndex = 0;

    sections.forEach(function (section, i) {
      if (section.offsetTop <= scrollPos) currentIndex = i;
    });

    navLinks.forEach(function (link, i) {
      link.classList.toggle("is-active", i === currentIndex);
    });
  }

  if ("IntersectionObserver" in window) {
    window.addEventListener("scroll", throttle(setActiveLink, 100));
    setActiveLink();
  }

  function throttle(fn, wait) {
    var last = 0;
    return function () {
      var now = Date.now();
      if (now - last >= wait) {
        last = now;
        fn();
      }
    };
  }

  /* ---------- animated skill gauges ---------- */
  var gauges = document.querySelectorAll(".gauge");

  gauges.forEach(function (gauge) {
    var level = gauge.getAttribute("data-level") || "0";
    gauge.style.setProperty("--fill", level + "%");
  });

  if ("IntersectionObserver" in window) {
    var gaugeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            gaugeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    gauges.forEach(function (g) { gaugeObserver.observe(g); });
  } else {
    gauges.forEach(function (g) { g.classList.add("in-view"); });
  }

  /* ---------- mobile nav toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var rulerNav = document.querySelector(".ruler-nav");

  if (navToggle && rulerNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = rulerNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        rulerNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- contact form ---------- */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();

      if (!name || !email || !message) {
        status.textContent = "Please fill in every field before sending.";
        status.style.color = "#C77D4A";
        return;
      }

      // NOTE: this is a front-end only stub. Connect it to a real
      // endpoint (e.g. Formspree, Netlify Forms, or your own API)
      // to actually deliver messages.
      status.textContent = "Message ready to send — connect this form to your backend or a service like Formspree.";
      status.style.color = "#6FA8B8";
      form.reset();
    });
  }
})();
