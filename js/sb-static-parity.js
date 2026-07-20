(() => {
  const badgeSelectors = "#tildacopy, .t-tildalabel, .t-tildalabel-free";
  const sbDomainPattern = /^https?:\/\/(?:www\.)?sbexcursion\.com(?=\/|$)/i;
  const MAX_OVERFLOW_PX = 420;
  const EXTRA_PAD_PX = 10;
  const SKIP_RECORD_IDS = new Set([
    "rec2121233163",
    "rec2121221993",
    "rec2121222013",
    "rec2121222043",
    "rec2122133073",
  ]);

  const hideBadge = () => {
    document.querySelectorAll(badgeSelectors).forEach((node) => {
      node.style.setProperty("display", "none", "important");
      node.style.setProperty("visibility", "hidden", "important");
      node.style.setProperty("opacity", "0", "important");
      node.style.setProperty("pointer-events", "none", "important");
      node.style.setProperty("max-height", "0", "important");
      node.style.setProperty("min-height", "0", "important");
      node.style.setProperty("overflow", "hidden", "important");
      node.remove();
    });
  };

  const rewriteAnchor = (anchor) => {
    if (!anchor || typeof anchor.getAttribute !== "function") return;
    const href = anchor.getAttribute("href");
    if (!href || !sbDomainPattern.test(href)) return;

    try {
      const url = new URL(href);
      anchor.setAttribute("href", `${url.pathname}${url.search}${url.hash}`);
    } catch {}
  };

  const rewriteTree = (root) => {
    if (!root || typeof root.querySelectorAll !== "function") return;
    root.querySelectorAll("a[href]").forEach(rewriteAnchor);
  };

  const applyOverflowGuard = () => {
    document.querySelectorAll('.r.t-rec[data-record-type="396"]').forEach((record) => {
      if (SKIP_RECORD_IDS.has(record.id)) return;
      const artboard = record.querySelector(".t396__artboard");
      const carrier = record.querySelector(".t396__carrier");
      const filter = record.querySelector(".t396__filter");
      if (!artboard || !carrier || !filter) return;

      const artRect = artboard.getBoundingClientRect();
      if (!artRect.height) return;

      const contentNodes = Array.from(record.querySelectorAll(".t396__elem, .t396__group")).filter((node) => {
        const rect = node.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
      if (!contentNodes.length) return;

      const maxBottom = contentNodes.reduce((maxValue, node) => {
        return Math.max(maxValue, node.getBoundingClientRect().bottom - artRect.top);
      }, 0);

      const overflow = maxBottom - artRect.height;
      if (overflow <= 4 || overflow >= MAX_OVERFLOW_PX) return;

      const extraPad = window.innerWidth <= 639 ? 18 : EXTRA_PAD_PX;
      const targetHeight = `${Math.ceil(maxBottom + extraPad)}px`;
      [artboard, carrier, filter].forEach((node) => {
        node.style.setProperty("height", targetHeight, "important");
      });
    });
  };

  // --- AI-planner conversion analytics -----------------------------------
  // Fire one named event into every analytics system already on the page:
  // Yandex.Metrika (goal), GA4 (gtag), and the GTM dataLayer. Each call is
  // guarded so a missing system never throws.
  const YM_COUNTER_ID = 106783251;
  const sbTrack = (name, params) => {
    const data = params || {};
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: name }, data));
    } catch {}
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", name, Object.assign({ transport_type: "beacon" }, data));
      }
    } catch {}
    try {
      if (typeof window.ym === "function") window.ym(YM_COUNTER_ID, "reachGoal", name, data);
    } catch {}
  };

  const daysBetween = (startStr, endStr) => {
    if (!startStr || !endStr) return null;
    const a = new Date(startStr);
    const b = new Date(endStr);
    if (isNaN(a) || isNaN(b)) return null;
    return Math.max(1, Math.round((b - a) / 86400000) + 1);
  };

  const initPlannerAnalytics = () => {
    if (window.__sbPlannerAnalytics) return;
    window.__sbPlannerAnalytics = true;
    const val = (id) => {
      const el = document.getElementById(id);
      return el && typeof el.value === "string" ? el.value.trim() : "";
    };

    document.addEventListener(
      "click",
      (event) => {
        const target = event.target && event.target.closest ? event.target : null;
        if (!target) return;

        // "Build my plan" click — the planner engagement signal.
        const buildBtn = target.closest("#sbAiBuild");
        if (buildBtn) {
          sbTrack("planner_build", {
            planner_area: val("sbAiArea"),
            planner_group: val("sbAiGroup"),
            planner_budget: val("sbAiBudget"),
            planner_days: daysBetween(val("sbAiStart"), val("sbAiEnd")),
          });
          return;
        }

        // Any WhatsApp click — the actual conversion signal.
        const wa = target.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
        if (wa) {
          const isFullPlan = wa.id === "sbPlanWaBtn";
          const inPlanner =
            isFullPlan ||
            !!wa.closest("#sbAiResultsGrid, .sb-ai-results, .sb-place-card, .sb-ai-result-card");
          const card = wa.closest(".sb-place-card, .sb-ai-result-card");
          const titleNode = card ? card.querySelector(".sb-place-title, h4, h3") : null;
          sbTrack(inPlanner ? "planner_whatsapp" : "whatsapp_click", {
            place: isFullPlan
              ? "FULL PLAN"
              : titleNode
                ? titleNode.textContent.trim().slice(0, 120)
                : "",
            context: isFullPlan ? "full_plan" : inPlanner ? "ai_planner" : "site",
            page_path: location.pathname,
          });
        }
      },
      true,
    );
  };

  // --- "Send my whole plan to WhatsApp" button ---------------------------
  // The planner already lets guests message about one place at a time. This
  // adds a single button under the generated plan that packs the whole
  // itinerary (exactly what the guest sees) into one WhatsApp message.
  const WA_FALLBACK_NUMBER = "6285333685020";
  const PLAN_I18N = {
    en: {
      button: "📲 Send my whole plan to WhatsApp",
      intro: "Hi! Here is the Bali plan I built on your website. Please help me arrange and book it:",
      day: "Day",
      details: "My details:",
      days: "days",
    },
    ru: {
      button: "📲 Отправить весь план в WhatsApp",
      intro: "Здравствуйте! Вот план по Бали, который я собрал на вашем сайте. Помогите, пожалуйста, его организовать и забронировать:",
      day: "День",
      details: "Мои данные:",
      days: "дн.",
    },
    es: {
      button: "📲 Enviar todo mi plan por WhatsApp",
      intro: "¡Hola! Este es el plan de Bali que armé en su web. ¿Pueden ayudarme a organizarlo y reservarlo?:",
      day: "Día",
      details: "Mis datos:",
      days: "días",
    },
    fr: {
      button: "📲 Envoyer tout mon plan sur WhatsApp",
      intro: "Bonjour ! Voici le plan de Bali que j'ai créé sur votre site. Pouvez-vous m'aider à l'organiser et à le réserver :",
      day: "Jour",
      details: "Mes infos :",
      days: "jours",
    },
    zh: {
      button: "📲 把我的整个行程发到 WhatsApp",
      intro: "你好！这是我在你们网站上制定的巴厘岛行程，请帮我安排并预订：",
      day: "第",
      details: "我的信息：",
      days: "天",
    },
  };

  const detectLocale = () => {
    const m = location.pathname.match(/\/bali\/(en|ru|es|fr|zh)(?:\/|$)/i);
    if (m) return m[1].toLowerCase();
    const lang = (document.documentElement.lang || "").slice(0, 2).toLowerCase();
    return PLAN_I18N[lang] ? lang : "en";
  };

  const getWaNumber = () => {
    const anchor =
      document.querySelector('#sbAiResultsGrid a[href*="wa.me/"]') ||
      document.querySelector('a[href*="wa.me/"]');
    if (anchor) {
      const m = (anchor.getAttribute("href") || "").match(/wa\.me\/(\d+)/);
      if (m) return m[1];
    }
    return WA_FALLBACK_NUMBER;
  };

  const selectText = (id) => {
    const el = document.getElementById(id);
    if (!el) return "";
    if (el.tagName === "SELECT" && el.selectedIndex >= 0) {
      return (el.options[el.selectedIndex].textContent || "").trim();
    }
    return (el.value || "").trim();
  };

  const buildPlanMessage = (locale) => {
    const grid = document.getElementById("sbAiResultsGrid");
    if (!grid) return "";
    const t = PLAN_I18N[locale] || PLAN_I18N.en;
    const lines = [t.intro, ""];
    let n = 0;
    grid.querySelectorAll("article").forEach((art) => {
      const heading = art.querySelector(".sb-ai-day-heading");
      if (!heading) return;
      n += 1;
      lines.push(t.day + " " + n + ": " + heading.textContent.trim());
      const places = Array.from(art.querySelectorAll(".sb-place-title"))
        .map((p) => p.textContent.trim())
        .filter(Boolean);
      if (places.length) lines.push("   • " + places.join(", "));
    });
    const parts = [selectText("sbAiArea"), selectText("sbAiGroup"), selectText("sbAiBudget")].filter(
      Boolean,
    );
    const dayCount = daysBetween(selectText("sbAiStart"), selectText("sbAiEnd"));
    if (dayCount) parts.push(dayCount + " " + t.days);
    if (parts.length) lines.push("", t.details + " " + parts.join(", "));
    return lines.join("\n");
  };

  const injectPlanWaStyle = () => {
    if (document.getElementById("sb-plan-wa-style")) return;
    const style = document.createElement("style");
    style.id = "sb-plan-wa-style";
    style.textContent =
      ".sb-plan-wa-bar{display:flex;justify-content:center;margin:20px auto 6px;padding:0 8px;}" +
      ".sb-plan-wa-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;" +
      "min-height:52px;max-width:560px;width:100%;text-align:center;padding:14px 26px;" +
      "border-radius:999px;border:2px solid #191919 !important;background:#fff !important;color:#191919 !important;" +
      "font-weight:700;font-size:15px;line-height:1.2;text-decoration:none !important;" +
      "box-shadow:0 8px 20px rgba(0,0,0,0.05);cursor:pointer;" +
      "transition:transform .2s ease,background .2s ease,color .2s ease,border-color .2s ease,box-shadow .2s ease;}" +
      ".sb-plan-wa-btn:hover,.sb-plan-wa-btn:focus{transform:translateY(-2px);" +
      "background:#2f6bff !important;border-color:#2f6bff !important;color:#fff !important;" +
      "box-shadow:0 14px 30px rgba(47,107,255,0.16);}";
    document.head.appendChild(style);
  };

  const ensurePlanWaButton = () => {
    const grid = document.getElementById("sbAiResultsGrid");
    if (!grid) return;
    const hasPlan = !!grid.querySelector("article .sb-ai-day-heading");
    let bar = document.getElementById("sbPlanWaBar");
    if (!hasPlan) {
      if (bar) bar.remove();
      return;
    }
    const locale = detectLocale();
    const t = PLAN_I18N[locale] || PLAN_I18N.en;
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "sbPlanWaBar";
      bar.className = "sb-plan-wa-bar";
      const btn = document.createElement("a");
      btn.id = "sbPlanWaBtn";
      btn.className = "sb-plan-wa-btn";
      btn.rel = "noopener";
      btn.target = "_blank";
      bar.appendChild(btn);
      grid.parentNode.insertBefore(bar, grid.nextSibling);
    }
    const btn = bar.querySelector("#sbPlanWaBtn");
    btn.textContent = t.button;
    const refresh = () => {
      btn.setAttribute(
        "href",
        "https://wa.me/" + getWaNumber() + "?text=" + encodeURIComponent(buildPlanMessage(locale)),
      );
    };
    refresh();
    btn.onclick = refresh; // guarantee the freshest plan at click time
  };

  const initPlanWaButton = () => {
    if (window.__sbPlanWaButton) return;
    const grid = document.getElementById("sbAiResultsGrid");
    if (!grid) return;
    window.__sbPlanWaButton = true;
    injectPlanWaStyle();
    ensurePlanWaButton();
    new MutationObserver(() => ensurePlanWaButton()).observe(grid, { childList: true });
  };

  const start = () => {
    if (!document.documentElement || window.__sbStaticParityStarted) return;
    window.__sbStaticParityStarted = true;

    rewriteTree(document);
    hideBadge();
    applyOverflowGuard();
    initPlannerAnalytics();
    initPlanWaButton();

    const observer = new MutationObserver((mutations) => {
      hideBadge();
      initPlanWaButton();
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!node || node.nodeType !== Node.ELEMENT_NODE) return;
          if (typeof node.matches === "function" && node.matches("a[href]")) {
            rewriteAnchor(node);
          }
          rewriteTree(node);
        });
      });
      applyOverflowGuard();
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

    let overflowTimer = 0;
    const scheduleOverflowGuard = () => {
      window.clearTimeout(overflowTimer);
      overflowTimer = window.setTimeout(applyOverflowGuard, 90);
    };

    const intervalId = window.setInterval(hideBadge, 500);
    const stopCleanup = () => {
      window.clearInterval(intervalId);
      observer.disconnect();
    };

    window.addEventListener("load", () => {
      rewriteTree(document);
      hideBadge();
      applyOverflowGuard();
    }, { once: true });
    window.addEventListener("pageshow", () => {
      rewriteTree(document);
      hideBadge();
      applyOverflowGuard();
    });
    window.addEventListener("resize", scheduleOverflowGuard, { passive: true });
    window.setTimeout(hideBadge, 100);
    window.setTimeout(hideBadge, 700);
    window.setTimeout(() => {
      hideBadge();
      applyOverflowGuard();
    }, 1800);
    window.setTimeout(stopCleanup, 30000);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
