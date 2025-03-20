// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.padding = "10px 0"
      navbar.style.backgroundColor = "rgba(0, 0, 0, 0.9)"
    } else {
      navbar.style.padding = "15px 0"
      navbar.style.backgroundColor = "var(--black)"
    }
  })

  // Video thumbnail click handler
  const videoThumbnails = document.querySelectorAll(".video-thumbnail")

  videoThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      const videoLink = this.closest(".video-card").querySelector("a").getAttribute("href")
      window.open(videoLink, "_blank")
    })
  })

  // Contact form submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Here you would typically send the form data to a server
      // For now, we'll just show an alert
      alert(`Thank you for your message, ${name}! We will get back to you soon.`)

      // Reset the form
      contactForm.reset()
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
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // Animation for achievement counters
  const achievementCounts = document.querySelectorAll(".achievement-count")

  if (achievementCounts.length > 0) {
    const animateCounters = () => {
      achievementCounts.forEach((counter) => {
        const target = Number.parseInt(counter.textContent)
        let count = 0
        const duration = 2000 // 2 seconds
        const increment = target / (duration / 20)

        const timer = setInterval(() => {
          count += increment
          if (count >= target) {
            clearInterval(timer)
            counter.textContent = target + "+"
          } else {
            counter.textContent = Math.floor(count) + "+"
          }
        }, 20)
      })
    }

    // Check if element is in viewport
    const isInViewport = (element) => {
      const rect = element.getBoundingClientRect()
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      )
    }

    // Animate counters when they come into view
    const checkCounters = () => {
      if (isInViewport(achievementCounts[0])) {
        animateCounters()
        window.removeEventListener("scroll", checkCounters)
      }
    }

    window.addEventListener("scroll", checkCounters)
    checkCounters() // Check on page load
  }
})

