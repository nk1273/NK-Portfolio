const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const revealTargets = document.querySelectorAll(
  ".section:not(.intro-strip), .project-card, .skill-panel, .resume-card, .timeline-item"
);

document.getElementById("current-year").textContent = new Date().getFullYear();

revealTargets.forEach((target) => target.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealTargets.forEach((target) => revealObserver.observe(target));

const activeSectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
  }
);

sections.forEach((section) => activeSectionObserver.observe(section));

document.querySelectorAll("[data-placeholder-project]").forEach((card) => {
  card.addEventListener("click", () => {
    const contact = document.querySelector("#contact");

    if (!contact) {
      return;
    }

    contact.classList.remove("attention");
    window.setTimeout(() => contact.classList.add("attention"), 120);
  });
});
