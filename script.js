// Initialize AOS (Animate On Scroll)
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: "ease",
    once: true,
    offset: 100,
  })

  // Navbar scroll behavior
  const navbar = document.querySelector(".navbar")
  const footer = document.querySelector(".glass-footer")

  // Initially set navbar and footer to fully transparent
  navbar.style.backgroundColor = "transparent"
  footer.style.backgroundColor = "transparent"

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
      footer.style.backgroundColor = "rgba(1, 1, 1, 0.5)"
    } else {
      navbar.classList.remove("scrolled")
      footer.style.backgroundColor = "transparent"
    }
  })

  // Video Modal Functionality
  const playButtons = document.querySelectorAll(".play-button")
  const videoModal = document.getElementById("videoModal")

  if (playButtons.length > 0 && videoModal) {
    const videoModalTitle = document.getElementById("videoModalLabel")
    const videoIframe = videoModal.querySelector("iframe")
    const videoModalInstance = new bootstrap.Modal(videoModal)

    playButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const videoId = this.getAttribute("data-video-id")
        const videoTitle = this.closest(".video-card").querySelector("h3").textContent

        // In a real implementation, you would set the actual YouTube video URL
        // For this example, we're just updating the title
        videoModalTitle.textContent = videoTitle

        // Show the modal
        videoModalInstance.show()
      })
    })

    // Reset iframe when modal is closed
    videoModal.addEventListener("hidden.bs.modal", () => {
      videoIframe.src = videoIframe.src
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault()

        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // Animate elements when they come into view
  const animateElements = document.querySelectorAll(".animate-on-scroll")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeIn")
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  animateElements.forEach((element) => {
    observer.observe(element)
  })

  // Add creative background elements
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    if (!section.classList.contains("hero-section") && !section.classList.contains("page-header")) {
      section.classList.add("creative-bg")
    }
  })

  // Contact form validation
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simple validation
      let isValid = true
      const nameInput = document.getElementById("name")
      const emailInput = document.getElementById("email")
      const messageInput = document.getElementById("message")

      if (!nameInput.value.trim()) {
        isValid = false
        nameInput.classList.add("is-invalid")
      } else {
        nameInput.classList.remove("is-invalid")
      }

      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        isValid = false
        emailInput.classList.add("is-invalid")
      } else {
        emailInput.classList.remove("is-invalid")
      }

      if (!messageInput.value.trim()) {
        isValid = false
        messageInput.classList.add("is-invalid")
      } else {
        messageInput.classList.remove("is-invalid")
      }

      if (isValid) {
        // In a real implementation, you would submit the form data to a server
        // For this example, we'll just show a success message
        const formElements = contactForm.elements
        for (let i = 0; i < formElements.length; i++) {
          formElements[i].disabled = true
        }

        const successMessage = document.createElement("div")
        successMessage.className = "alert alert-success mt-3"
        successMessage.textContent = "Your message has been sent successfully!"
        contactForm.appendChild(successMessage)

        // Reset form after 3 seconds
        setTimeout(() => {
          contactForm.reset()
          successMessage.remove()
          for (let i = 0; i < formElements.length; i++) {
            formElements[i].disabled = false
          }
        }, 3000)
      }
    })
  }

  // Helper function to validate email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Handle hover dropdown for desktop and make About link work
  const aboutDropdown = document.querySelector(".dropdown")
  const aboutLink = document.querySelector(".dropdown-toggle")

  if (aboutDropdown && aboutLink) {
    // For mobile - prevent click from toggling dropdown
    aboutLink.addEventListener("click", (e) => {
      if (window.innerWidth >= 992) {
        // On desktop, clicking "About" goes to about.html
        window.location.href = "about.html"
      }
    })

    // For mobile - make sure clicking About in mobile view works properly
    if (window.innerWidth < 992) {
      aboutLink.setAttribute("data-bs-toggle", "dropdown")
    } else {
      aboutLink.removeAttribute("data-bs-toggle")
    }

    // Update on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth < 992) {
        aboutLink.setAttribute("data-bs-toggle", "dropdown")
      } else {
        aboutLink.removeAttribute("data-bs-toggle")
      }
    })
  }
})

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const logo = document.querySelector(".navbar-brand img.logo");
  const navLinks = document.querySelectorAll(".navbar-dark .navbar-nav .nav-link");

  window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
          logo.src = "./assets/images/logo.png"; // Change to colored logo
          navLinks.forEach(link => link.style.color = "purple");
      } else {
          navbar.classList.remove("scrolled");
          logo.src = "./assets/images/wite.png"; // Change back to white logo
          navLinks.forEach(link => link.style.color = "white");
      }
  });
});

// Cursor animation with scroll position fix
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.cursor');
  const cursorTrail = document.querySelector('.cursor-trail');
  
  let mouseX = 0;
  let mouseY = 0;
  let trailX = 0;
  let trailY = 0;
  let isTouch = false;
  let lastX = 0;
  let lastY = 0;
  let lastNoteTime = 0;
  let isMoving = false;
  
  // Music notes array - only well-supported symbols to avoid rendering boxes
  const musicNotes = ['♪', '♫', '♬', '♩', '♭', '♮', '♯'];
  
  // Check if device supports touch
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Mouse move event with controlled note creation
  document.addEventListener('mousemove', (e) => {
      if (!isTouch) {
          // Store mouse position relative to the viewport
          mouseX = e.clientX;
          mouseY = e.clientY;
          
          // Calculate distance moved
          const distance = Math.sqrt(
              Math.pow(mouseX - lastX, 2) + 
              Math.pow(mouseY - lastY, 2)
          );
          
          const now = Date.now();
          
          // Only create notes when moving significantly and not too frequently
          if (distance > 8 && now - lastNoteTime > 60) {
              isMoving = true;
              lastX = mouseX;
              lastY = mouseY;
              lastNoteTime = now;
              
              // Create 1-2 notes based on distance
              const noteCount = Math.min(Math.floor(distance / 20) + 1, 2);
              for (let i = 0; i < noteCount; i++) {
                  // Add slight offset for multiple notes
                  const offsetX = mouseX + (Math.random() - 0.5) * 15;
                  const offsetY = mouseY + (Math.random() - 0.5) * 15;
                  createMusicNote(offsetX, offsetY);
              }
          }
          
          // Reset moving flag if stopped
          if (distance < 2 && isMoving) {
              setTimeout(() => {
                  isMoving = false;
              }, 100);
          }
      }
  });
  
  // Touch events for mobile with optimized note creation
  document.addEventListener('touchstart', () => {
      isTouch = true;
      cursor.style.width = '30px';
      cursor.style.height = '30px';
  }, { passive: true });
  
  document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
          isTouch = true;
          mouseX = e.touches[0].clientX;
          mouseY = e.touches[0].clientY;
          
          // Calculate distance moved
          const distance = Math.sqrt(
              Math.pow(mouseX - lastX, 2) + 
              Math.pow(mouseY - lastY, 2)
          );
          
          const now = Date.now();
          
          // Create notes based on movement - less frequently on mobile
          if (distance > 10 && now - lastNoteTime > 80) {
              lastX = mouseX;
              lastY = mouseY;
              lastNoteTime = now;
              
              // Create a single note for better mobile performance
              createMusicNote(mouseX, mouseY);
          }
      }
  }, { passive: true });
  
  document.addEventListener('touchend', () => {
      setTimeout(() => {
          isTouch = false;
          cursor.style.width = '20px';
          cursor.style.height = '20px';
      }, 100);
      
      // Create a wave effect on touch end
      createWave(mouseX, mouseY);
      
      // Create a small burst of notes
      createNoteBurst(mouseX, mouseY, 4);
  }, { passive: true });
  
  // Click events with note burst
  document.addEventListener('mousedown', () => {
      cursor.style.width = '15px';
      cursor.style.height = '15px';
      createWave(mouseX, mouseY);
  });
  
  document.addEventListener('mouseup', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      
      // Create a small burst of notes on click release
      createNoteBurst(mouseX, mouseY, 3);
  });
  
  // Create music note element
  function createMusicNote(x, y) {
      const note = document.createElement('div');
      note.className = 'music-note';
      
      // Randomly choose between purple and orange
      if (Math.random() > 0.5) {
          note.classList.add('purple');
      } else {
          note.classList.add('orange');
      }
      
      // Random note
      note.textContent = musicNotes[Math.floor(Math.random() * musicNotes.length)];
      
      // Random direction and rotation with smoother values
      const xMove = (Math.random() - 0.5) * 100;
      const yMove = -Math.random() * 100 - 20; // Mostly upward
      const rotation = (Math.random() - 0.5) * 180;
      
      note.style.setProperty('--x', `${xMove}px`);
      note.style.setProperty('--y', `${yMove}px`);
      note.style.setProperty('--r', `${rotation}deg`);
      
      // Position relative to the viewport, not the document
      note.style.position = 'fixed';
      note.style.left = `${x}px`;
      note.style.top = `${y}px`;
      
      document.body.appendChild(note);
      
      // Remove note after animation completes
      setTimeout(() => {
          if (note.parentNode) {
              note.remove();
          }
      }, 2000);
  }
  
  // Create a burst of notes (for clicks and touch end)
  function createNoteBurst(x, y, count) {
      for (let i = 0; i < count; i++) {
          setTimeout(() => {
              const offsetX = x + (Math.random() - 0.5) * 30;
              const offsetY = y + (Math.random() - 0.5) * 30;
              createMusicNote(offsetX, offsetY);
          }, i * 70); // Stagger the creation for a more natural effect
      }
  }
  
  // Create wave effect
  function createWave(x, y) {
      const wave = document.createElement('div');
      wave.className = 'wave';
      
      // Randomly choose between purple and orange
      if (Math.random() > 0.5) {
          wave.classList.add('purple');
      } else {
          wave.classList.add('orange');
      }
      
      // Position relative to the viewport, not the document
      wave.style.position = 'fixed';
      wave.style.left = `${x}px`;
      wave.style.top = `${y}px`;
      
      document.body.appendChild(wave);
      
      // Remove wave after animation completes
      setTimeout(() => {
          if (wave.parentNode) {
              wave.remove();
          }
      }, 1800);
  }
  
  // Animation loop for smooth cursor movement using RAF
  function animateCursor() {
      // Smooth trail effect with easing
      trailX += (mouseX - trailX) * 0.25;
      trailY += (mouseY - trailY) * 0.25;
      
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
      
      cursorTrail.style.left = `${trailX}px`;
      cursorTrail.style.top = `${trailY}px`;
      
      requestAnimationFrame(animateCursor);
  }
  
  // Start animation
  animateCursor();
  
  // Initial position for mobile
  if (isTouchDevice) {
      mouseX = window.innerWidth / 2;
      mouseY = window.innerHeight / 2;
  }
});