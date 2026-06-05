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

  const start = () => {
    if (!document.documentElement || window.__sbStaticParityStarted) return;
    window.__sbStaticParityStarted = true;

    rewriteTree(document);
    hideBadge();
    applyOverflowGuard();

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
