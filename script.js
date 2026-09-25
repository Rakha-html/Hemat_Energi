document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("nav-links");
  const navbar = document.getElementById("navbar");
  const navItems = document.querySelectorAll(".nav-item");
  const themeToggleBtn = document.getElementById("theme-toggle");

  // Theme Toggle Functionality
  function updateThemeAria(theme) {
    if (!themeToggleBtn) return;
    const isDark = theme === "dark";
    const newLabel = isDark ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap";
    themeToggleBtn.setAttribute("aria-label", newLabel);
    themeToggleBtn.setAttribute("title", newLabel);
  }

  // Set initial aria label based on current active theme
  const initialTheme = document.documentElement.getAttribute("data-theme") || "light";
  updateThemeAria(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const targetTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", targetTheme);
      localStorage.setItem("theme", targetTheme);
      updateThemeAria(targetTheme);
    });
  }

  // Listen for system color-scheme changes if user has no saved preference
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        const autoTheme = e.matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", autoTheme);
        updateThemeAria(autoTheme);
      }
    });
  }

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
    });
  });

  window.addEventListener("scroll", () => {
    if (navbar) {
      if (window.scrollY > 20) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    }
  });

  const sections = document.querySelectorAll("section[id]");

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute("id");

      const targetLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add("active");
        } else {
          targetLink.classList.remove("active");
        }
      }
    });
  }

  window.addEventListener("scroll", highlightNavOnScroll);
});