// BillKaro landing page interactions
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  // nav shadow once you scroll
  var nav = document.getElementById("siteNav");
  var toTop = document.getElementById("toTop");

  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 8);
    toTop.hidden = window.scrollY < 600;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // mobile menu
  var menuToggle = document.getElementById("menuToggle");
  var navLinks = document.getElementById("navLinks");

  function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  }

  menuToggle.addEventListener("click", function () {
    var open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  navLinks.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  // spotlight follows the mouse in the hero
  var hero = document.querySelector(".hero");
  var spotlight = document.getElementById("heroSpotlight");
  if (finePointer && !prefersReducedMotion) {
    hero.addEventListener("pointermove", function (e) {
      var rect = hero.getBoundingClientRect();
      spotlight.style.setProperty("--mx", ((e.clientX - rect.left) / rect.width) * 100 + "%");
      spotlight.style.setProperty("--my", ((e.clientY - rect.top) / rect.height) * 100 + "%");
    });
  } else {
    spotlight.style.display = "none";
  }

  // scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // highlight the section you're reading in the nav
  var sections = ["features", "how", "pricing", "faq", "contact"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var navAnchors = navLinks.querySelectorAll('a[href^="#"]');

  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  // animated stat counters
  var counters = document.querySelectorAll(".count");
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (prefersReducedMotion || isNaN(target)) {
      el.textContent = target.toLocaleString("en-IN");
      return;
    }
    var start = null;
    var duration = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString("en-IN");
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { countObserver.observe(c); });
  } else {
    counters.forEach(animateCount);
  }

  // gentle 3D tilt on bento cards (desktop mice only)
  if (finePointer && !prefersReducedMotion) {
    document.querySelectorAll(".tilt").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = "perspective(700px) rotateX(" + (-y * 5) + "deg) rotateY(" + (x * 5) + "deg) translateY(-2px)";
      });
      card.addEventListener("pointerleave", function () {
        card.style.transform = "";
      });
    });
  }

  // monthly / yearly pricing toggle
  var optMonthly = document.getElementById("optMonthly");
  var optYearly = document.getElementById("optYearly");
  var amounts = document.querySelectorAll(".price .amount");

  function setBilling(yearly) {
    optMonthly.classList.toggle("active", !yearly);
    optYearly.classList.toggle("active", yearly);
    optMonthly.setAttribute("aria-pressed", String(!yearly));
    optYearly.setAttribute("aria-pressed", String(yearly));
    amounts.forEach(function (a) {
      a.style.opacity = "0";
      setTimeout(function () {
        a.textContent = yearly ? a.getAttribute("data-yearly") : a.getAttribute("data-monthly");
        a.style.opacity = "1";
      }, 150);
    });
  }
  optMonthly.addEventListener("click", function () { setBilling(false); });
  optYearly.addEventListener("click", function () { setBilling(true); });

  // plan buttons scroll to the form and prefill the message
  var planPicks = document.querySelectorAll(".plan-pick");
  var msgField = document.getElementById("cfMsg");
  var nameField = document.getElementById("cfName");
  planPicks.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var plan = btn.getAttribute("data-plan");
      msgField.value = "I'd like to start with the " + plan + " plan.";
      clearError(msgField, "errMsg");
      document.getElementById("contact").scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      setTimeout(function () { nameField.focus({ preventScroll: true }); }, prefersReducedMotion ? 0 : 600);
    });
  });

  // faq accordion, one open at a time
  var faqButtons = document.querySelectorAll(".faq-q");
  faqButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var answer = btn.nextElementSibling;
      var isOpen = btn.getAttribute("aria-expanded") === "true";
      faqButtons.forEach(function (other) {
        other.setAttribute("aria-expanded", "false");
        other.nextElementSibling.style.maxHeight = null;
      });
      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // contact form validation
  var form = document.getElementById("contactForm");
  var emailField = document.getElementById("cfEmail");
  var honeypot = document.getElementById("cfCompany");
  var submitBtn = document.getElementById("cfSubmit");
  var formNote = document.getElementById("formNote");
  var formSuccess = document.getElementById("formSuccess");
  var successText = document.getElementById("successText");
  var sendAnother = document.getElementById("sendAnother");
  var lastSubmitAt = 0;

  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setError(input, errId, message) {
    var err = document.getElementById(errId);
    err.textContent = message;
    err.hidden = false;
    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
  }

  function clearError(input, errId) {
    var err = document.getElementById(errId);
    err.hidden = true;
    input.classList.remove("invalid");
    input.removeAttribute("aria-invalid");
  }

  function validateName() {
    var value = nameField.value.trim();
    if (value.length < 2) {
      setError(nameField, "errName", "Please tell us your name (at least 2 letters).");
      return false;
    }
    clearError(nameField, "errName");
    return true;
  }

  function validateEmail() {
    var value = emailField.value.trim();
    if (!emailRe.test(value)) {
      setError(emailField, "errEmail", "That email doesn't look right. Mind checking it?");
      return false;
    }
    clearError(emailField, "errEmail");
    return true;
  }

  function validateMessage() {
    var value = msgField.value.trim();
    if (value.length < 10) {
      setError(msgField, "errMsg", "A line or two more would help us answer properly.");
      return false;
    }
    clearError(msgField, "errMsg");
    return true;
  }

  // check as they type, but wait until they pause
  var debounceTimers = {};
  function debouncedValidate(input, fn) {
    input.addEventListener("input", function () {
      clearTimeout(debounceTimers[input.id]);
      debounceTimers[input.id] = setTimeout(fn, 450);
    });
    input.addEventListener("blur", fn);
  }
  debouncedValidate(nameField, validateName);
  debouncedValidate(emailField, validateEmail);
  debouncedValidate(msgField, validateMessage);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    formNote.classList.remove("error");
    formNote.textContent = "";

    // bots fill hidden fields, people don't
    if (honeypot.value) return;

    var now = Date.now();
    if (now - lastSubmitAt < 10000) {
      formNote.textContent = "Easy there, one message at a time. Try again in a few seconds.";
      formNote.classList.add("error");
      return;
    }

    var ok = [validateName(), validateEmail(), validateMessage()].every(Boolean);
    if (!ok) {
      formNote.textContent = "Please fix the fields marked above.";
      formNote.classList.add("error");
      return;
    }

    lastSubmitAt = now;
    submitBtn.classList.add("loading");
    submitBtn.textContent = "Sending…";

    // no backend on a static page, so we fake the round trip
    setTimeout(function () {
      var name = nameField.value.trim().split(" ")[0];
      successText.textContent = "Thanks, " + name + "! We'll write back within a day.";
      form.hidden = true;
      formSuccess.hidden = false;
      submitBtn.classList.remove("loading");
      submitBtn.textContent = "Send message";
    }, 900);
  });

  sendAnother.addEventListener("click", function () {
    form.reset();
    form.hidden = false;
    formSuccess.hidden = true;
    formNote.textContent = "";
    nameField.focus();
  });

  // back to top + footer year
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
  document.getElementById("year").textContent = new Date().getFullYear();
})();
