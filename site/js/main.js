/* ==========================================================================
   KVG Enterprises — main.js
   Vanilla JS, zero dependencies. Implements the interactive behaviour
   required by DESIGN_SYSTEM_RECOMMENDATIONS.md §5 and Appendix A.
   Features:
     1. Sticky header scrolled class
     2. Mobile nav toggle (drawer + backdrop)
     3. Mega-menu / dropdown click + keyboard open, focus containment, Escape
     4. IntersectionObserver count-up counters (respects reduced-motion)
     5. Quick-contact slide-out
     6. Enquiry-form product pre-select from ?product= + scroll-to-form
     7. Client-side validation with inline errors
     8. Dynamic copyright year
     9. Lazy reveal-on-scroll
   ========================================================================== */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var isDesktop = function () { return window.innerWidth > 1024; };

  document.addEventListener("DOMContentLoaded", function () {
    initStickyHeader();
    initMobileNav();
    initNavDisclosures();
    initCounters();
    initQuickContact();
    initEnquiryPreselect();
    initFormValidation();
    initCopyrightYear();
    initReveal();
    initFaqAccordion();
    initFileUpload();
  });

  /* ----------------------------------------------------------------------
     1. Sticky header — toggle .is-scrolled past a threshold
     ---------------------------------------------------------------------- */
  function initStickyHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ----------------------------------------------------------------------
     2. Mobile nav toggle
     ---------------------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".primary-nav");
    if (!toggle || !nav) return;

    var backdrop = document.querySelector(".nav-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "nav-backdrop";
      document.body.appendChild(backdrop);
    }

    var open = function () {
      nav.classList.add("is-open");
      backdrop.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };
    var close = function () {
      nav.classList.remove("is-open");
      backdrop.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      // collapse any open disclosures inside the drawer
      var openItems = nav.querySelectorAll(".nav-item.is-open");
      Array.prototype.forEach.call(openItems, function (i) {
        i.classList.remove("is-open");
        var t = i.querySelector(".nav-caret");
        if (t) t.setAttribute("aria-expanded", "false");
      });
    };

    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) close();
      else open();
    });
    backdrop.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        close();
        toggle.focus();
      }
    });
    // Reset on resize to desktop
    window.addEventListener("resize", function () {
      if (isDesktop()) close();
    });
  }

  /* ----------------------------------------------------------------------
     3. Nav disclosures — mega-menu + simple dropdowns
        The nav LABEL is a plain link that always navigates. A separate caret
        <button aria-expanded> toggles the panel for keyboard/touch. Desktop
        hover / focus-within opening is handled in CSS. Escape closes.
     ---------------------------------------------------------------------- */
  function initNavDisclosures() {
    var items = document.querySelectorAll(".nav-item.has-panel");
    if (!items.length) return;

    var closeAll = function (except) {
      Array.prototype.forEach.call(items, function (item) {
        if (item === except) return;
        item.classList.remove("is-open");
        var c = item.querySelector(".nav-caret");
        if (c) c.setAttribute("aria-expanded", "false");
      });
    };

    Array.prototype.forEach.call(items, function (item) {
      var caret = item.querySelector(".nav-caret");
      var panel = item.querySelector(".mega-menu, .nav-dropdown");
      if (!caret || !panel) return;

      caret.setAttribute("aria-haspopup", "true");
      caret.setAttribute("aria-expanded", "false");

      var openPanel = function () {
        closeAll(item);
        item.classList.add("is-open");
        caret.setAttribute("aria-expanded", "true");
      };
      var closePanel = function () {
        item.classList.remove("is-open");
        caret.setAttribute("aria-expanded", "false");
      };
      var togglePanel = function () {
        if (item.classList.contains("is-open")) closePanel();
        else openPanel();
      };

      // Caret toggles the panel (keyboard/touch); the label link navigates.
      caret.addEventListener("click", function (e) {
        e.preventDefault();
        togglePanel();
      });

      // Keyboard on the caret: ArrowDown opens and enters the panel.
      caret.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          openPanel();
          focusFirst(panel);
        } else if (e.key === "Escape") {
          closePanel();
        }
      });

      // Focus containment + Escape within the panel
      panel.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          closePanel();
          caret.focus();
          return;
        }
        if (e.key === "Tab" && isDesktop()) {
          trapFocus(e, panel, caret, closePanel);
        }
      });
    });

    // Click outside closes all
    document.addEventListener("click", function (e) {
      var inside = false;
      Array.prototype.forEach.call(items, function (item) {
        if (item.contains(e.target)) inside = true;
      });
      if (!inside) closeAll(null);
    });
    // Global Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAll(null);
    });
  }

  function focusFirst(panel) {
    var el = panel.querySelector(getFocusableSelector());
    if (el) el.focus();
  }

  function getFocusableSelector() {
    return 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  }

  function trapFocus(e, panel, trigger, closePanel) {
    var focusable = panel.querySelectorAll(getFocusableSelector());
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      // Shift+Tab from first -> back to trigger, close panel
      e.preventDefault();
      closePanel();
      trigger.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      // Tab from last -> close and let focus continue to next nav item
      closePanel();
    }
  }

  /* ----------------------------------------------------------------------
     4. Count-up counters (IntersectionObserver), respect reduced-motion
     ---------------------------------------------------------------------- */
  function initCounters() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    var run = function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      if (isNaN(target)) return;
      var prefix = el.getAttribute("data-count-prefix") || "";
      var suffix = el.getAttribute("data-count-suffix") || "";
      var decimals = parseInt(el.getAttribute("data-count-decimals") || "0", 10);

      if (prefersReducedMotion) {
        el.textContent = prefix + target.toFixed(decimals) + suffix;
        return;
      }
      var duration = 1600;
      var start = null;
      var step = function (ts) {
        if (start === null) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        var value = target * eased;
        el.textContent = prefix + value.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = prefix + target.toFixed(decimals) + suffix;
      };
      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(counters, run);
      return;
    }
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            run(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    Array.prototype.forEach.call(counters, function (c) { obs.observe(c); });
  }

  /* ----------------------------------------------------------------------
     5. Quick-contact slide-out
     ---------------------------------------------------------------------- */
  function initQuickContact() {
    var qc = document.querySelector(".quick-contact");
    if (!qc) return;
    var tab = qc.querySelector(".quick-contact__tab");
    var close = qc.querySelector(".quick-contact__close");

    var open = function () {
      qc.classList.add("is-open");
      if (tab) tab.setAttribute("aria-expanded", "true");
      var firstInput = qc.querySelector(getFocusableSelector());
      if (firstInput) firstInput.focus();
    };
    var doClose = function () {
      qc.classList.remove("is-open");
      if (tab) { tab.setAttribute("aria-expanded", "false"); tab.focus(); }
    };

    if (tab) {
      tab.setAttribute("aria-expanded", "false");
      tab.addEventListener("click", open);
    }
    if (close) close.addEventListener("click", doClose);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && qc.classList.contains("is-open")) doClose();
    });
  }

  /* ----------------------------------------------------------------------
     6. Enquiry-form product pre-select from ?product= + scroll-to-form
     ---------------------------------------------------------------------- */
  function initEnquiryPreselect() {
    var params = new URLSearchParams(window.location.search);
    var product = params.get("product");
    if (!product) return;

    var form = document.querySelector("[data-enquiry-form]");
    if (!form) return;

    // product may be a slug; match against checkbox value or data-slug
    var slugs = product.split(",").map(function (s) { return s.trim().toLowerCase(); });
    var boxes = form.querySelectorAll('input[type="checkbox"][data-product]');
    var matched = false;
    Array.prototype.forEach.call(boxes, function (box) {
      var slug = (box.getAttribute("data-product") || box.value || "").toLowerCase();
      if (slugs.indexOf(slug) !== -1) {
        box.checked = true;
        matched = true;
      }
    });

    if (matched) {
      // Scroll the form into view after layout settles
      window.setTimeout(function () {
        form.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start"
        });
      }, 120);
    }
  }

  /* ----------------------------------------------------------------------
     7. Client-side validation with inline errors
     ---------------------------------------------------------------------- */
  function initFormValidation() {
    var forms = document.querySelectorAll("[data-validate]");
    if (!forms.length) return;

    Array.prototype.forEach.call(forms, function (form) {
      form.setAttribute("novalidate", "novalidate");

      var validateField = function (field) {
        var wrap = field.closest(".form-field");
        if (!wrap) return true;
        var valid = true;
        var value = (field.value || "").trim();

        if (field.hasAttribute("required") && !value) {
          valid = false;
        } else if (field.type === "email" && value) {
          valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        } else if (field.type === "checkbox" && field.hasAttribute("required")) {
          valid = field.checked;
        }

        wrap.classList.toggle("is-invalid", !valid);
        wrap.classList.toggle("is-valid", valid && value !== "");
        field.setAttribute("aria-invalid", valid ? "false" : "true");
        return valid;
      };

      var fields = form.querySelectorAll("input, select, textarea");
      Array.prototype.forEach.call(fields, function (field) {
        if (field.type === "hidden") return;
        field.addEventListener("blur", function () { validateField(field); });
        field.addEventListener("input", function () {
          var wrap = field.closest(".form-field");
          if (wrap && wrap.classList.contains("is-invalid")) validateField(field);
        });
      });

      form.addEventListener("submit", function (e) {
        var allValid = true;
        var firstInvalid = null;
        Array.prototype.forEach.call(fields, function (field) {
          if (field.type === "hidden") return;
          if (!validateField(field)) {
            allValid = false;
            if (!firstInvalid) firstInvalid = field;
          }
        });
        if (!allValid) {
          e.preventDefault();
          if (firstInvalid) firstInvalid.focus();
          return;
        }
        // Demo success state (no backend in the prototype)
        if (form.hasAttribute("data-demo-success")) {
          e.preventDefault();
          var success = form.querySelector(".form-success");
          if (success) {
            success.classList.add("is-visible");
            success.setAttribute("role", "status");
            success.scrollIntoView({
              behavior: prefersReducedMotion ? "auto" : "smooth",
              block: "center"
            });
          }
          form.reset();
          Array.prototype.forEach.call(
            form.querySelectorAll(".form-field"),
            function (w) { w.classList.remove("is-valid", "is-invalid"); }
          );
        }
      });
    });
  }

  /* ----------------------------------------------------------------------
     8. Dynamic copyright year
     ---------------------------------------------------------------------- */
  function initCopyrightYear() {
    var els = document.querySelectorAll("[data-year]");
    var year = new Date().getFullYear();
    Array.prototype.forEach.call(els, function (el) { el.textContent = year; });
  }

  /* ----------------------------------------------------------------------
     9. Lazy reveal-on-scroll
     ---------------------------------------------------------------------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(els, function (el) { el.classList.add("is-visible"); });
      return;
    }
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    Array.prototype.forEach.call(els, function (el) { obs.observe(el); });
  }

  /* ----------------------------------------------------------------------
     FAQ accordion (§5.11) — single-open pattern, ARIA managed
     ---------------------------------------------------------------------- */
  function initFaqAccordion() {
    var items = document.querySelectorAll(".faq-item");
    if (!items.length) return;
    Array.prototype.forEach.call(items, function (item) {
      var btn = item.querySelector(".faq-item__q");
      var panel = item.querySelector(".faq-item__a");
      if (!btn || !panel) return;
      btn.setAttribute("aria-expanded", "false");
      btn.addEventListener("click", function () {
        var isOpen = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
        panel.style.maxHeight = isOpen ? "0px" : panel.scrollHeight + "px";
      });
    });
  }

  /* ----------------------------------------------------------------------
     File upload — reflect chosen filename, drag-over state
     ---------------------------------------------------------------------- */
  function initFileUpload() {
    var wraps = document.querySelectorAll(".file-upload");
    if (!wraps.length) return;
    Array.prototype.forEach.call(wraps, function (wrap) {
      var input = wrap.querySelector('input[type="file"]');
      var nameEl = wrap.querySelector(".file-upload__name");
      if (!input) return;
      input.addEventListener("change", function () {
        if (nameEl) {
          nameEl.textContent = input.files && input.files.length
            ? Array.prototype.map.call(input.files, function (f) { return f.name; }).join(", ")
            : "";
        }
      });
      ["dragenter", "dragover"].forEach(function (evt) {
        wrap.addEventListener(evt, function (e) { e.preventDefault(); wrap.classList.add("is-dragover"); });
      });
      ["dragleave", "drop"].forEach(function (evt) {
        wrap.addEventListener(evt, function (e) { e.preventDefault(); wrap.classList.remove("is-dragover"); });
      });
      wrap.addEventListener("drop", function (e) {
        if (e.dataTransfer && e.dataTransfer.files.length) {
          input.files = e.dataTransfer.files;
          input.dispatchEvent(new Event("change"));
        }
      });
    });
  }
})();
