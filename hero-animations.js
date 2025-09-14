// Hero Section Enhanced Animations and Interactions
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll for the scroll indicator
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    });
  }

  // Parallax effect for background elements
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".circles li");

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });

    // Hide scroll indicator when scrolling
    if (scrollIndicator) {
      if (scrolled > 100) {
        scrollIndicator.style.opacity = "0";
      } else {
        scrollIndicator.style.opacity = "1";
      }
    }
  });

  // Enhanced hover effects for hero stats
  const heroStats = document.querySelectorAll(".hero-stats");
  heroStats.forEach((stat) => {
    stat.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.05)";
      this.style.boxShadow = "0 20px 50px rgba(31, 38, 135, 0.4)";
    });

    stat.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 8px 32px rgba(31, 38, 135, 0.37)";
    });
  });

  // Typing animation for the main title
  const titleElement = document.querySelector("main h1");
  if (titleElement) {
    const text1 = "Créez un CV professionnel";
    const text2 = "pour booster votre carrière !";

    // Clear existing content
    titleElement.innerHTML = "";

    // Create spans for each line
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    span1.className = "block";
    span2.className = "block text-blue-700";

    titleElement.appendChild(span1);
    titleElement.appendChild(span2);

    // Typing effect function
    function typeText(element, text, delay = 0) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let i = 0;
          const timer = setInterval(() => {
            element.textContent = text.substring(0, i + 1);
            i++;
            if (i >= text.length) {
              clearInterval(timer);
              resolve();
            }
          }, 50);
        }, delay);
      });
    }

    // Start typing animation
    typeText(span1, text1, 500).then(() => {
      typeText(span2, text2, 200);
    });
  }

  // Interactive button effects
  const startBtn = document.getElementById("startedBtn");
  if (startBtn) {
    startBtn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)";
      this.style.boxShadow = "0 15px 35px rgba(238, 90, 36, 0.6)";
    });

    startBtn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 8px 25px rgba(238, 90, 36, 0.4)";
    });

    // Ripple effect on click
    startBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);

      // Navigate to form after ripple animation
      setTimeout(() => {
        const formSection = document.getElementById("formulaire");
        if (formSection) {
          // Show the form section
          formSection.style.display = "flex";
          // Hide the hero section
          const heroSection = document.getElementById("heroSection");
          if (heroSection) {
            heroSection.style.display = "none";
          }
          // Scroll to the form section
          formSection.scrollIntoView({ behavior: "smooth" });
        } else {
          console.error("Form section with ID 'formulaire' not found!");
        }
      }, 300);
    });
  }

  // Add navigation functionality for logo and brand links
  const logoLink = document.getElementById("logoLink");
  const brandLink = document.getElementById("brandLink");

  function showHeroSection() {
    const heroSection = document.getElementById("heroSection");
    const formSection = document.getElementById("formulaire");

    if (heroSection && formSection) {
      heroSection.style.display = "block";
      formSection.style.display = "none";
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  if (logoLink) {
    logoLink.addEventListener("click", function (e) {
      e.preventDefault();
      showHeroSection();
    });
  }

  if (brandLink) {
    brandLink.addEventListener("click", function (e) {
      e.preventDefault();
      showHeroSection();
    });
  }

  // Add ripple animation CSS
  const style = document.createElement("style");
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .hero-image-container img {
            animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        .feature-item {
            transition: all 0.3s ease;
        }
        
        .feature-item:hover {
            transform: translateX(10px);
            color: rgba(255, 255, 255, 1) !important;
        }
        
        .feature-item:hover svg {
            transform: scale(1.2);
            color: #4ade80 !important;
        }
    `;
  document.head.appendChild(style);

  // Progressive loading of images
  const heroImage = document.getElementById("heroImg1");
  if (heroImage) {
    heroImage.addEventListener("load", function () {
      this.style.opacity = "1";
      this.style.transform = "scale(1)";
    });

    // Add loading effect
    heroImage.style.opacity = "0";
    heroImage.style.transform = "scale(0.8)";
    heroImage.style.transition = "all 0.8s ease-out";
  }

  // Intersection Observer for animations on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  document.querySelectorAll(".hero-stats, .feature-item").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });

  // Mouse cursor trail effect (optional)
  let mouseTrail = [];
  document.addEventListener("mousemove", function (e) {
    mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

    // Remove old trail points
    mouseTrail = mouseTrail.filter((point) => Date.now() - point.time < 1000);
  });

  console.log("🎉 Hero section enhanced animations loaded successfully!");
});
