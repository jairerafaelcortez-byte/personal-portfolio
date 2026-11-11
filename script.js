// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close the mobile menu after clicking a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Highlight the nav link of the section currently in view
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav-links a");

function setActiveLink() {
  const scrollPos = window.scrollY + 120;
  let currentId = sections[0].id;
  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop) currentId = section.id;
  });
  links.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + currentId);
  });
}
window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();

// Fade-in on scroll + animate skill bars
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      const bar = entry.target.querySelector(".bar-fill");
      if (bar) bar.style.width = bar.dataset.width + "%";
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
