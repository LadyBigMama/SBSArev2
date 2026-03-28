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
      var targetPath;
      var currentPath;

      if (link.textContent.trim() !== "FLYING SITES") {
        return;
      }

      targetPath = new URL(getHomeUrl(link), window.location.href).pathname;
      currentPath = window.location.pathname;

      link.addEventListener("click", function(event) {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
          return;
        }

        if (isHomePage() && targetPath === currentPath) {
          event.preventDefault();
          forceTopScroll();
          window.setTimeout(function() {
            clearHomeUrl();
          }, 220);
          return;
        }

        if (targetPath === currentPath) {
          event.preventDefault();
          window.location.href = getHomeUrl(link) + "?navtop=" + Date.now();
        }
      });
    });
  }

  function bindWaiverLinks() {
    var links = document.querySelectorAll(".topbar-nav a");
    var inSplitDir = window.location.pathname.indexOf("/paragliding-pages-split/") !== -1;
    var waiverHref = inSplitDir ? "./17-waiver.html" : "./paragliding-pages-split/17-waiver.html";

    links.forEach(function(link) {
      if (link.textContent.trim() !== "WAIVER") {
        return;
      }

      link.setAttribute("href", waiverHref);
    });
  }

  function bindLoginLinks() {
    var links = document.querySelectorAll(".topbar-nav a");
    var inSplitDir = window.location.pathname.indexOf("/paragliding-pages-split/") !== -1;
    var loginHref = inSplitDir ? "./18-login.html" : "./paragliding-pages-split/18-login.html";

    links.forEach(function(link) {
      if (link.textContent.trim() !== "LOG IN") {
        return;
      }

      link.setAttribute("href", loginHref);
    });
  }

  function removeHomeLinks() {
    var links = document.querySelectorAll(".topbar-nav a");

    links.forEach(function(link) {
      if (link.textContent.trim() === "HOME") {
        link.remove();
      }
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
    var path = window.location.pathname || "";
    var file = path.split("/").pop();
    var disclaimerTitle = "DISCLAIMER";
    var disclaimerText = 'Last updated March 23, 2026. The information provided by Santa Barbara Soaring Association ("we," "us," or "our") on sbsa.info (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site. UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.';
    var block;
    var title;
    var body;

    if (file === "17-waiver.html" || file === "18-login.html") {
      return;
    }

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

  function ensureLastUpdatedFooter() {
    var footer = document.querySelector("footer");
    var block;
    var title;
    var body;

    if (!footer) {
      footer = document.createElement("footer");
      footer.className = "site-generated-footer";
      document.body.appendChild(footer);
    }

    if (footer.querySelector(".site-last-updated")) {
      return;
    }

    block = document.createElement("section");
    block.className = "site-last-updated";

    title = document.createElement("p");
    title.className = "site-last-updated-title";
    title.textContent = "LAST UPDATED";

    body = document.createElement("p");
    body.className = "site-last-updated-body";
    body.textContent = "March 28, 2026";

    block.appendChild(title);
    block.appendChild(body);
    footer.appendChild(block);
  }

  function wrapSiteDetailContent() {
    var body = document.body;
    var header;
    var shell;
    var card;
    var footer;
    var node;
    var next;

    if (!body || !body.classList.contains("site-detail-page")) {
      return;
    }

    if (body.querySelector(".elings-shell") || body.querySelector(".site-detail-shell") || body.querySelector("main.shell")) {
      return;
    }

    header = body.querySelector("header.topbar");
    footer = body.querySelector("footer");

    if (!header) {
      return;
    }

    shell = document.createElement("main");
    shell.className = "site-detail-shell";

    card = document.createElement("article");
    card.className = "site-detail-card";

    shell.appendChild(card);

    node = header.nextSibling;

    while (node) {
      next = node.nextSibling;

      if (node === footer) {
        break;
      }

      if (node.nodeType !== Node.COMMENT_NODE) {
        card.appendChild(node);
      }

      node = next;
    }

    body.insertBefore(shell, footer || null);
  }

  function enforceSiteDetailFont() {
    var body = document.body;
    var style;

    if (!body || !body.classList.contains("site-detail-page")) {
      return;
    }

    if (document.getElementById("site-detail-font-override")) {
      return;
    }

    style = document.createElement("style");
    style.id = "site-detail-font-override";
    style.textContent = [
      '.site-detail-page,',
      '.site-detail-page p,',
      '.site-detail-page li,',
      '.site-detail-page a,',
      '.site-detail-page span,',
      '.site-detail-page b,',
      '.site-detail-page strong,',
      '.site-detail-page div,',
      '.site-detail-page section,',
      '.site-detail-page article,',
      '.site-detail-page p.p1,',
      '.site-detail-page p.p2,',
      '.site-detail-page p.p3,',
      '.site-detail-page p.p4,',
      '.site-detail-page p.p5 {',
      '  font-family: "Avenir Next", "Trebuchet MS", "Gill Sans", sans-serif !important;',
      '}'
    ].join('\n');

    document.head.appendChild(style);
  }

  function ensureLocalPilotNote() {
    var body = document.body;
    var path = window.location.pathname || "";
    var file = path.split("/").pop();
    var container;
    var card;
    var paragraph;
    var cardClass = "";
    var tagName = "section";
    var noteHtml = 'Like for all our other sites, due to the sensitive nature of flying over Santa Barbara, out-of-town pilots are advised to <b>contact an experienced local pilot</b> to get a site intro in addition to this page.';

    if (!body || !body.classList.contains("site-detail-page")) {
      return;
    }

    if (path.indexOf("/paragliding-pages-split/") === -1) {
      return;
    }

    if (file === "03-elings-flight-park.html" || file === "05-visiting-pilots.html" || file === "10-flying-sites-in-santa-barbara.html" || file === "17-waiver.html" || file === "18-login.html") {
      return;
    }

    if (body.textContent.indexOf("Like for all our other sites, due to the sensitive nature of flying over Santa Barbara, out-of-town pilots are advised to contact an experienced local pilot to get a site intro in addition to this page.") !== -1) {
      return;
    }

    if (document.querySelector(".local-pilot-note-card")) {
      return;
    }

    if (document.querySelector(".vor-shell")) {
      container = document.querySelector(".vor-shell");
      cardClass = "vor-card";
    } else if (document.querySelector(".elings-shell")) {
      container = document.querySelector(".elings-shell");
      cardClass = "elings-card";
    } else if (document.querySelector(".skyport-shell")) {
      container = document.querySelector(".skyport-shell");
      cardClass = "skyport-card";
    } else if (document.querySelector(".marco-shell")) {
      container = document.querySelector(".marco-shell");
      cardClass = "marco-card";
    } else if (document.querySelector(".ej-shell")) {
      container = document.querySelector(".ej-shell");
      cardClass = "ej-card";
    } else if (document.querySelector(".site-detail-shell")) {
      container = document.querySelector(".site-detail-shell");
      cardClass = "site-detail-card";
      tagName = "article";
    }

    if (!container) {
      return;
    }

    card = document.createElement(tagName);
    card.className = cardClass + " local-pilot-note-card";

    paragraph = document.createElement("p");
    if (cardClass !== "site-detail-card") {
      paragraph.className = "p2";
    }
    paragraph.innerHTML = noteHtml;

    card.appendChild(paragraph);
    container.appendChild(card);
  }

  function ensureSpecWindowMedia() {
    var body = document.body;
    var path = window.location.pathname || "";
    var file = path.split("/").pop();
    var firstCard;
    var media;
    var imageMap = {
      "06-jays-knob.html": { src: "../assets/jays-knob.jpg", alt: "Jay's Knob" },
      "09-bates.html": { src: "../assets/bates-launch.jpg", alt: "Bates launch" },
      "11-east-beach-landing.html": { src: "../assets/east-beach.jpg", alt: "East Beach" },
      "14-ej.html": { src: "../assets/ej-launch.jpg", alt: "EJ launch" },
      "15-pine-mountain.html": { src: "../assets/pine-mountain.jpg", alt: "Pine Mountain" }
    };
    var placeholderLabelMap = {
      "01-the-t-at-the-san-marcos-preserve.html": "The T at the San Marcos Preserve",
      "04-parma.html": "Parma",
      "08-marco-polo-toro-ridge.html": "Marco Polo - Toro Ridge",
      "12-wilcox-douglas-family-preserve.html": "Wilcox / Douglas Family Preserve",
      "13-more-mesa.html": "More Mesa",
      "16-the-nuthouse.html": "The Nuthouse"
    };

    if (!body || !body.classList.contains("site-detail-page")) {
      return;
    }

    if (file === "05-visiting-pilots.html" || file === "10-flying-sites-in-santa-barbara.html" || file === "17-waiver.html" || file === "18-login.html") {
      return;
    }

    firstCard = document.querySelector(".vor-shell .vor-card, .elings-shell .elings-card, .skyport-shell .skyport-card, .marco-shell .marco-card, .ej-shell .ej-card, .site-detail-shell .site-detail-card");

    if (!firstCard || firstCard.querySelector("img")) {
      return;
    }

    if (imageMap[file]) {
      media = document.createElement("img");
      media.className = "spec-window-media";
      media.src = imageMap[file].src;
      media.alt = imageMap[file].alt;
      firstCard.insertBefore(media, firstCard.firstChild);
      return;
    }

    media = document.createElement("div");
    media.className = "spec-window-placeholder";
    media.innerHTML = "<div><strong>Photo Pending</strong><span>" + (placeholderLabelMap[file] || "Site image coming soon") + "</span></div>";
    firstCard.insertBefore(media, firstCard.firstChild);
  }

  document.addEventListener("DOMContentLoaded", function() {
    removeHomeLinks();
    bindFlyingSitesLinks();
    bindLoginLinks();
    bindWaiverLinks();
    bindSiteCards();
    resetHomePageOnEntry();
    wrapSiteDetailContent();
    enforceSiteDetailFont();
    ensureSpecWindowMedia();
    ensureLocalPilotNote();
    ensureLastUpdatedFooter();
    ensureDisclaimerFooter();
  });
}());
