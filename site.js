(function() {
  function getHomeUrl(link) {
    var href = link.getAttribute("href") || "";
    return href.split("#")[0].split("?")[0];
  }

  function isHomePage() {
    return document.body && document.body.dataset.page === "home";
  }

  function forceTopScroll() {
    window.scrollTo(0, 0);
    window.requestAnimationFrame(function() {
      window.scrollTo(0, 0);
    });
    window.setTimeout(function() {
      window.scrollTo(0, 0);
    }, 60);
    window.setTimeout(function() {
      window.scrollTo(0, 0);
    }, 180);
  }

  function clearHomeUrl() {
    history.replaceState(null, "", window.location.pathname);
  }

  function resetHomePageOnEntry() {
    if (!isHomePage()) {
      return;
    }

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    forceTopScroll();
    window.addEventListener("load", forceTopScroll);
    window.addEventListener("pageshow", forceTopScroll);
    window.setTimeout(forceTopScroll, 0);
    window.setTimeout(forceTopScroll, 120);
    window.setTimeout(forceTopScroll, 260);
    window.setTimeout(forceTopScroll, 420);

    var params = new URLSearchParams(window.location.search);
    if (!params.has("navtop") && window.location.hash !== "#page-top") {
      return;
    }

    window.setTimeout(function() {
      clearHomeUrl();
    }, 320);
  }

  function bindFlyingSitesLinks() {
    var links = document.querySelectorAll(".topbar-nav a");

    links.forEach(function(link) {
      if (link.textContent.trim() !== "FLYING SITES") {
        return;
      }

      link.addEventListener("click", function(event) {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
          return;
        }

        event.preventDefault();

        if (isHomePage()) {
          forceTopScroll();
          window.setTimeout(function() {
            clearHomeUrl();
          }, 220);
          return;
        }

        window.location.href = getHomeUrl(link) + "?navtop=" + Date.now();
      });
    });
  }

  function openCardLink(link, openInNewTab) {
    if (openInNewTab) {
      window.open(link.href, "_blank", "noopener");
      return;
    }

    window.location.href = link.href;
  }

  function bindSiteCards() {
    var cards = document.querySelectorAll(".site-card");

    cards.forEach(function(card) {
      var primaryLink = card.querySelector(".site-image[href]");
      var image = primaryLink ? primaryLink.querySelector("img") : null;
      var label = primaryLink && primaryLink.textContent ? primaryLink.textContent.trim() : "";

      if (!primaryLink) {
        return;
      }

      card.classList.add("site-card-clickable");
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "link");
      card.setAttribute("aria-label", label || (image && image.alt) || "Open site page");

      card.addEventListener("click", function(event) {
        if (event.target.closest("a")) {
          return;
        }

        openCardLink(primaryLink, event.metaKey || event.ctrlKey);
      });

      card.addEventListener("keydown", function(event) {
        if (event.key !== "Enter" && event.key !== " ") {
          return;
        }

        event.preventDefault();
        openCardLink(primaryLink, event.metaKey || event.ctrlKey);
      });
    });
  }

  function ensureDisclaimerFooter() {
    var footer = document.querySelector("footer");
    var disclaimerTitle = "DISCLAIMER";
    var disclaimerText = 'Last updated March 23, 2026. The information provided by Santa Barbara Soaring Association ("we," "us," or "our") on sbsa.info (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site. UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.';
    var block;
    var title;
    var body;

    if (!footer) {
      footer = document.createElement("footer");
      footer.className = "site-generated-footer";
      document.body.appendChild(footer);
    }

    if (footer.querySelector(".site-disclaimer")) {
      return;
    }

    block = document.createElement("section");
    block.className = "site-disclaimer";

    title = document.createElement("p");
    title.className = "site-disclaimer-title";
    title.textContent = disclaimerTitle;

    body = document.createElement("p");
    body.className = "site-disclaimer-body";
    body.textContent = disclaimerText;

    block.appendChild(title);
    block.appendChild(body);
    footer.appendChild(block);
  }

  document.addEventListener("DOMContentLoaded", function() {
    bindFlyingSitesLinks();
    bindSiteCards();
    resetHomePageOnEntry();
    ensureDisclaimerFooter();
  });
}());
