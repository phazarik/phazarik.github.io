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
});
