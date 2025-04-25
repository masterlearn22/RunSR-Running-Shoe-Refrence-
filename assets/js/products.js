/**
 * RunShoes - Products JavaScript
 * This file contains functionality specific to the products page
 */

document.addEventListener("DOMContentLoaded", () => {
  // Price slider
  const priceMinSlider = document.getElementById("price-min")
  const priceMaxSlider = document.getElementById("price-max")
  const priceRange = document.querySelector(".price-range")

  if (priceMinSlider && priceMaxSlider && priceRange) {
    const minSpan = priceRange.querySelector("span:first-child")
    const maxSpan = priceRange.querySelector("span:last-child")

    // Format price as Rupiah
    const formatPrice = (price) => {
      return "Rp" + price.toLocaleString("id-ID")
    }

    // Update min price display
    priceMinSlider.addEventListener("input", function () {
      const minValue = Number.parseInt(this.value)
      const maxValue = Number.parseInt(priceMaxSlider.value)

      if (minValue >= maxValue) {
        this.value = maxValue - 100000
        minSpan.textContent = formatPrice(maxValue - 100000)
      } else {
        minSpan.textContent = formatPrice(minValue)
      }
    })

    // Update max price display
    priceMaxSlider.addEventListener("input", function () {
      const minValue = Number.parseInt(priceMinSlider.value)
      const maxValue = Number.parseInt(this.value)

      if (maxValue <= minValue) {
        this.value = minValue + 100000
        maxSpan.textContent = formatPrice(minValue + 100000)
      } else {
        maxSpan.textContent = formatPrice(maxValue)
      }
    })
  }

  // Filter checkboxes
  const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]')
  const applyFilterBtn = document.querySelector(".products-sidebar .btn-primary")

  if (filterCheckboxes.length > 0 && applyFilterBtn) {
    // Apply filters when button is clicked
    applyFilterBtn.addEventListener("click", () => {
      // Get selected filters
      const selectedFilters = {
        type: [],
        brand: [],
        feature: [],
      }

      filterCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          const filterType = checkbox.name
          const filterValue = checkbox.value

          if (selectedFilters[filterType]) {
            selectedFilters[filterType].push(filterValue)
          }
        }
      })

      // Build query string
      const queryParams = []

      for (const [key, values] of Object.entries(selectedFilters)) {
        if (values.length > 0) {
          queryParams.push(`${key}=${values.join(",")}`)
        }
      }

      // Add price range if available
      if (priceMinSlider && priceMaxSlider) {
        queryParams.push(`min_price=${priceMinSlider.value}`)
        queryParams.push(`max_price=${priceMaxSlider.value}`)
      }

      // Redirect with filters
      if (queryParams.length > 0) {
        window.location.href = `?${queryParams.join("&")}`
      } else {
        window.location.href = window.location.pathname
      }
    })

    // Set initial filter values from URL
    const urlParams = new URLSearchParams(window.location.search)

    // Set type filters
    if (urlParams.has("type")) {
      const types = urlParams.get("type").split(",")
      types.forEach((type) => {
        const checkbox = document.querySelector(`input[name="type"][value="${type}"]`)
        if (checkbox) {
          checkbox.checked = true
        }
      })
    }

    // Set brand filters
    if (urlParams.has("brand")) {
      const brands = urlParams.get("brand").split(",")
      brands.forEach((brand) => {
        const checkbox = document.querySelector(`input[name="brand"][value="${brand}"]`)
        if (checkbox) {
          checkbox.checked = true
        }
      })
    }

    // Set feature filters
    if (urlParams.has("feature")) {
      const features = urlParams.get("feature").split(",")
      features.forEach((feature) => {
        const checkbox = document.querySelector(`input[name="feature"][value="${feature}"]`)
        if (checkbox) {
          checkbox.checked = true
        }
      })
    }

    // Set price range
    if (urlParams.has("min_price") && priceMinSlider) {
      priceMinSlider.value = urlParams.get("min_price")
      const event = new Event("input", { bubbles: true })
      priceMinSlider.dispatchEvent(event)
    }

    if (urlParams.has("max_price") && priceMaxSlider) {
      priceMaxSlider.value = urlParams.get("max_price")
      const event = new Event("input", { bubbles: true })
      priceMaxSlider.dispatchEvent(event)
    }
  }

  // Sort products
  const sortSelect = document.getElementById("sort-by")

  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      const urlParams = new URLSearchParams(window.location.search)
      urlParams.set("sort", this.value)

      window.location.href = `?${urlParams.toString()}`
    })

    // Set initial sort value from URL
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has("sort")) {
      sortSelect.value = urlParams.get("sort")
    }
  }

  // Search products
  const searchForm = document.querySelector(".search-box")
  const searchInput = searchForm ? searchForm.querySelector('input[type="search"]') : null
  const searchButton = searchForm ? searchForm.querySelector("button") : null

  if (searchForm && searchInput && searchButton) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const searchTerm = searchInput.value.trim()
      if (searchTerm) {
        const urlParams = new URLSearchParams(window.location.search)
        urlParams.set("search", searchTerm)

        window.location.href = `?${urlParams.toString()}`
      }
    })

    // Set initial search value from URL
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has("search")) {
      searchInput.value = urlParams.get("search")
    }
  }

  // Pagination
  const paginationButtons = document.querySelectorAll(".pagination-btn")

  if (paginationButtons.length > 0) {
    paginationButtons.forEach((button) => {
      if (!button.classList.contains("disabled")) {
        button.addEventListener("click", function () {
          const page = this.textContent
          const urlParams = new URLSearchParams(window.location.search)

          if (page === "<" || page === "‹") {
            const currentPage = Number.parseInt(urlParams.get("page") || "1")
            if (currentPage > 1) {
              urlParams.set("page", (currentPage - 1).toString())
            }
          } else if (page === ">" || page === "›") {
            const currentPage = Number.parseInt(urlParams.get("page") || "1")
            urlParams.set("page", (currentPage + 1).toString())
          } else {
            urlParams.set("page", page)
          }

          window.location.href = `?${urlParams.toString()}`
        })
      }
    })

    // Set active page from URL
    const urlParams = new URLSearchParams(window.location.search)
    const currentPage = urlParams.get("page") || "1"

    paginationButtons.forEach((button) => {
      if (button.textContent === currentPage) {
        button.classList.add("active")
      } else if (button.classList.contains("active") && button.textContent !== currentPage) {
        button.classList.remove("active")
      }
    })
  }
})
