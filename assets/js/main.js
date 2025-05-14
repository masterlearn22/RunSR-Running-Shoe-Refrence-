/**
 * RunShoes - Main JavaScript
 * This file contains common functionality used across the site
 */

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mainNav = document.querySelector(".main-nav")

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener("click", function () {
      mainNav.classList.toggle("active")
      this.classList.toggle("active")
    })
  }

  // Handle dropdown menus
  const dropdowns = document.querySelectorAll(".dropdown")

  if (dropdowns.length > 0) {
    dropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector(".dropdown-trigger")
      const menu = dropdown.querySelector(".dropdown-menu")

      if (trigger && menu) {
        trigger.addEventListener("click", (e) => {
          e.preventDefault()
          menu.classList.toggle("active")

          // Close other dropdowns
          dropdowns.forEach((otherDropdown) => {
            if (otherDropdown !== dropdown) {
              const otherMenu = otherDropdown.querySelector(".dropdown-menu")
              if (otherMenu) {
                otherMenu.classList.remove("active")
              }
            }
          })
        })

        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
          if (!dropdown.contains(e.target)) {
            menu.classList.remove("active")
          }
        })
      }
    })
  }

  // Product quantity selector
  const quantitySelectors = document.querySelectorAll(".quantity-selector")

  if (quantitySelectors.length > 0) {
    quantitySelectors.forEach((selector) => {
      const minusBtn = selector.querySelector(".minus")
      const plusBtn = selector.querySelector(".plus")
      const input = selector.querySelector(".quantity-input")

      if (minusBtn && plusBtn && input) {
        minusBtn.addEventListener("click", () => {
          const currentValue = Number.parseInt(input.value)
          if (currentValue > Number.parseInt(input.min || 1)) {
            input.value = currentValue - 1
            // Trigger change event for any listeners
            const event = new Event("change", { bubbles: true })
            input.dispatchEvent(event)
          }
        })

        plusBtn.addEventListener("click", () => {
          const currentValue = Number.parseInt(input.value)
          const max = Number.parseInt(input.max)
          if (!max || currentValue < max) {
            input.value = currentValue + 1
            // Trigger change event for any listeners
            const event = new Event("change", { bubbles: true })
            input.dispatchEvent(event)
          }
        })
      }
    })
  }

  // Product tabs
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  if (tabBtns.length > 0 && tabContents.length > 0) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab")

        // Remove active class from all buttons and contents
        tabBtns.forEach((btn) => btn.classList.remove("active"))
        tabContents.forEach((content) => content.classList.remove("active"))

        // Add active class to current button and content
        this.classList.add("active")
        document.getElementById(tabId).classList.add("active")
      })
    })
  }

  // Product thumbnails
  const thumbnails = document.querySelectorAll(".thumbnail")
  const mainProductImage = document.getElementById("main-product-image")

  if (thumbnails.length > 0 && mainProductImage) {
    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", function () {
        const imageUrl = this.getAttribute("data-image")

        // Update main image
        mainProductImage.src = imageUrl

        // Update active thumbnail
        thumbnails.forEach((thumb) => thumb.classList.remove("active"))
        this.classList.add("active")
      })
    })
  }

  // Auth tabs (login/register)
  const authTabs = document.querySelectorAll(".auth-tab")
  const authContents = document.querySelectorAll(".auth-content")

  if (authTabs.length > 0 && authContents.length > 0) {
    authTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab")

        // Remove active class from all tabs and contents
        authTabs.forEach((tab) => tab.classList.remove("active"))
        authContents.forEach((content) => content.classList.remove("active"))

        // Add active class to current tab and content
        this.classList.add("active")
        document.getElementById(tabId).classList.add("active")
      })
    })
  }

  // Toggle password visibility
  const togglePasswordBtns = document.querySelectorAll(".toggle-password")

  if (togglePasswordBtns.length > 0) {
    togglePasswordBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const input = this.previousElementSibling
        const icon = this.querySelector("i")

        if (input.type === "password") {
          input.type = "text"
          icon.classList.remove("fa-eye")
          icon.classList.add("fa-eye-slash")
        } else {
          input.type = "password"
          icon.classList.remove("fa-eye-slash")
          icon.classList.add("fa-eye")
        }
      })
    })
  }

  // Sticky header
  const header = document.querySelector(".header")

  if (header) {
    const headerHeight = header.offsetHeight
    const scrollThreshold = 100

    window.addEventListener("scroll", () => {
      if (window.scrollY > scrollThreshold) {
        header.classList.add("sticky")
        document.body.style.paddingTop = headerHeight + "px"
      } else {
        header.classList.remove("sticky")
        document.body.style.paddingTop = "0"
      }
    })
  }
})

// Tambahkan kode untuk menampilkan indikator scroll pada mobile
document.addEventListener("DOMContentLoaded", () => {
  // Fungsi untuk menambahkan indikator scroll pada container yang bisa di-scroll
  function addScrollIndicator(container) {
    if (!container) return

    // Cek apakah container bisa di-scroll secara horizontal
    if (container.scrollWidth > container.clientWidth) {
      container.classList.add("can-scroll")

      // Tambahkan event listener untuk menghapus indikator saat user mulai scroll
      container.addEventListener("scroll", function () {
        if (this.scrollLeft > 20) {
          this.classList.remove("can-scroll")
        } else if (this.scrollLeft === 0) {
          this.classList.add("can-scroll")
        }
      })
    }
  }

  // Tambahkan indikator pada products-grid dan articles-grid
  const productsGrid = document.querySelector(".products-grid")
  const articlesGrid = document.querySelector(".articles-grid")

  if (window.innerWidth < 768) {
    addScrollIndicator(productsGrid)
    addScrollIndicator(articlesGrid)
  }

  // Update saat window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
      addScrollIndicator(productsGrid)
      addScrollIndicator(articlesGrid)
    }
  })
})
