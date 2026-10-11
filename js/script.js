document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  // Lightweight accessible hero carousel.
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const dots = Array.from(document.querySelectorAll(".hero-dot"));
  const title = document.getElementById("heroTitle");
  const description = document.getElementById("heroDescription");
  const copy = [
    ["Big beginnings<br>for little people", "A warm, playful and nurturing place for children aged 2+ and 3+ to explore, make friends and take their first confident steps into learning."],
    ["Every little step<br>is worth celebrating", "Playful experiences that nurture confidence, communication, independence and a lifelong love of discovery."],
    ["Growing together,<br>one day at a time", "A close partnership between families and educators helps children feel safe, settled and ready to explore."]
  ];
  let current = 0;
  let timer;
  function showSlide(index) {
    current = index;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
      dot.setAttribute("aria-pressed", String(i === index));
    });
    if (title) title.innerHTML = copy[index][0];
    if (description) description.textContent = copy[index][1];
  }
  function restartTimer() {
    window.clearInterval(timer);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = window.setInterval(() => showSlide((current + 1) % slides.length), 6500);
    }
  }
  dots.forEach(dot => dot.addEventListener("click", () => {
    showSlide(Number(dot.dataset.slide));
    restartTimer();
  }));
  if (slides.length && dots.length) restartTimer();

  // Search is a simple on-page section finder; no data is sent anywhere.
  const panel = document.getElementById("searchPanel");
  const searchToggle = document.querySelector(".search-toggle");
  const closeSearch = document.getElementById("closeSearch");
  const input = document.getElementById("siteSearch");
  const feedback = document.getElementById("searchFeedback");
  const runSearch = document.getElementById("runSearch");
  function openSearch() {
    panel.hidden = false;
    input.focus();
  }
  function hideSearch() {
    panel.hidden = true;
    feedback.textContent = "";
  }
  function findSection() {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      feedback.textContent = "Enter a topic to search this page.";
      return;
    }
    const targets = Array.from(document.querySelectorAll("main section, footer"));
    const match = targets.find(el => el.innerText.toLowerCase().includes(query));
    if (match) {
      hideSearch();
      match.scrollIntoView({ behavior: "smooth", block: "start" });
      feedback.textContent = "";
    } else {
      feedback.textContent = "No matching section found. Try “ages 2+”, “ages 3+”, “families” or “enrolment”.";
    }
  }
  if (searchToggle) searchToggle.addEventListener("click", openSearch);
  if (closeSearch) closeSearch.addEventListener("click", hideSearch);
  if (runSearch) runSearch.addEventListener("click", findSection);
  if (input) input.addEventListener("keydown", event => {
    if (event.key === "Enter") findSection();
    if (event.key === "Escape") hideSearch();
  });
});
