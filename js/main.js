// ==============================
// MathJax Configuration
// ==============================
window.MathJax = {
  tex: {
    packages: { "[+]": ["textmacros"] },
  },
  chtml: {
    matchFontHeight: true,
  },
};

// ==============================
// Mermaid Initialization
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  mermaid.initialize({
    startOnLoad: true,
    theme: "default", // options: "dark", "neutral", etc.
    securityLevel: "loose", // allows <br/> and <strong> in labels
  });
});

// ==============================
// Common Meta Info (applies to all pages)
// ==============================
const metaData = {
  author: "Prachurjya Hazarika",
  institute: "IISER Pune",
  description: "Portfolio of Prachurjya Hazarika - PhD student in Particle Physics, CMS Collaboration.",
  keywords: "Prachurjya Hazarika, Particle Physics, CMS, IISER Pune, Research, Outreach",
};

for (const [name, content] of Object.entries(metaData)) {
  const meta = document.createElement("meta");
  meta.name = name;
  meta.content = content;
  document.head.appendChild(meta);
}

// ==============================
// Utility: Load HTML into Element
// ==============================
function loadHTML(id, file) {
  fetch(file)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load " + file);
      return response.text();
    })
    .then((data) => {
      document.getElementById(id).innerHTML = data;
    })
    .catch((err) => console.error(err));
}

// ==============================
// Main Initialization
// ==============================
document.addEventListener("DOMContentLoaded", function () {
  // --- Load header and footer ---
  loadHTML("header", "/header.html");
  loadHTML("footer", "/footer.html");

  // --- Navigation buttons toggle ---
  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      btn.classList.toggle("active");
    });
  });

  // --- Clean up code blocks (trim extra newlines) ---
  document.querySelectorAll("pre code").forEach((block) => {
    block.textContent = block.textContent.replace(/^\s*\n/, "").replace(/\n\s*$/, "");
  });

  // --- Highlight.js initialization ---
  hljs.highlightAll();
  hljs.initLineNumbersOnLoad();

  // --- Add global favicon ---
  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/png"; // change to "image/png" if using PNG
  link.href = "/images/favicon.png";
  document.head.appendChild(link);

  // --- Add inline self-links for all h2 and h3 with id  ---
  document.querySelectorAll("h2[id], h3[id]").forEach((header) => {
    const anchor = document.createElement("a");
    anchor.href = "#" + header.id;
    anchor.innerHTML = ' <i class="bi bi-link-45deg"></i>'; // space keeps it inline
    anchor.style.textDecoration = "none";
    anchor.style.fontSize = "0.9em";
    anchor.style.color = "var(--primary-color)";
    //header.prepend(anchor); //For adding it in the end
    header.appendChild(anchor); //For adding it in the beginning
  });
});
