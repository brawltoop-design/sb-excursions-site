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
          const inPlanner = !!wa.closest(
            "#sbAiResultsGrid, .sb-ai-results, .sb-place-card, .sb-ai-result-card",
          );
          const card = wa.closest(".sb-place-card, .sb-ai-result-card");
          const titleNode = card ? card.querySelector(".sb-place-title, h4, h3") : null;
          sbTrack(inPlanner ? "planner_whatsapp" : "whatsapp_click", {
            place: titleNode ? titleNode.textContent.trim().slice(0, 120) : "",
            context: inPlanner ? "ai_planner" : "site",
            page_path: location.pathname,
          });
        }
      },
      true,
    );
  };

  const start = () => {
    if (!document.documentElement || window.__sbStaticParityStarted) return;
    window.__sbStaticParityStarted = true;

    rewriteTree(document);
    hideBadge();
    applyOverflowGuard();
    initPlannerAnalytics();

    const observer = new MutationObserver((mutations) => {
      hideBadge();
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
