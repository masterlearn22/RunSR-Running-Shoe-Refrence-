/**
 * RunShoes - Cart JavaScript
 * This file contains functionality specific to the cart page
 */

document.addEventListener("DOMContentLoaded", () => {
  // Cart item quantity
  const quantitySelectors = document.querySelectorAll(".quantity-selector")

  if (quantitySelectors.length > 0) {
    quantitySelectors.forEach((selector) => {
      const minusBtn = selector.querySelector(".minus")
      const plusBtn = selector.querySelector(".plus")
      const input = selector.querySelector(".quantity-input")
      const row = selector.closest("tr")
      const priceCell = row ? row.querySelector("td:nth-child(2)") : null
      const totalCell = row ? row.querySelector(".cart-product-total") : null

      if (minusBtn && plusBtn && input && priceCell && totalCell) {
        // Get price value
        const price = Number.parseFloat(priceCell.textContent.replace(/[^\d]/g, ""))

        // Update total when quantity changes
        const updateTotal = () => {
          const quantity = Number.parseInt(input.value)
          const total = price * quantity

          totalCell.textContent = `Rp${total.toLocaleString("id-ID")}`

          // Update cart summary
          updateCartSummary()
        }

        minusBtn.addEventListener("click", updateTotal)
        plusBtn.addEventListener("click", updateTotal)
        input.addEventListener("change", updateTotal)
      }
    })
  }

  // Remove cart item
  const removeButtons = document.querySelectorAll(".remove-item")

  if (removeButtons.length > 0) {
    removeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const row = this.closest("tr")

        if (row) {
          // Animate removal
          row.style.transition = "all 0.3s ease"
          row.style.opacity = "0"
          row.style.height = "0"

          setTimeout(() => {
            row.remove()
            updateCartSummary()
            updateCartCount()
          }, 300)
        }
      })
    })
  }

  // Apply coupon
  const couponForm = document.querySelector(".coupon-form")
  const couponInput = couponForm ? couponForm.querySelector(".coupon-input") : null
  const couponButton = couponForm ? couponForm.querySelector("button") : null

  if (couponForm && couponInput && couponButton) {
    couponForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const couponCode = couponInput.value.trim()
      if (couponCode) {
        // Simulate coupon application
        // In a real application, this would be an API call
        setTimeout(() => {
          // Example: 10% discount for "WELCOME10" coupon
          if (couponCode.toUpperCase() === "WELCOME10") {
            // Update discount in summary
            const subtotalElement = document.querySelector(".summary-item:first-child span:last-child")
            const discountElement = document.querySelector(".summary-item:nth-child(3) span:last-child")

            if (subtotalElement && discountElement) {
              const subtotal = Number.parseFloat(subtotalElement.textContent.replace(/[^\d]/g, ""))
              const discount = Math.round(subtotal * 0.1)

              discountElement.textContent = `-Rp${discount.toLocaleString("id-ID")}`

              // Update total
              updateCartSummary()

              // Show success message
              alert("Kupon berhasil diterapkan! Anda mendapatkan diskon 10%.")
            }
          } else {
            // Show error message
            alert("Kode kupon tidak valid atau sudah kadaluarsa.")
          }
        }, 500)
      }
    })
  }

  // Update cart summary
  function updateCartSummary() {
    const totalElements = document.querySelectorAll(".cart-product-total")
    const subtotalElement = document.querySelector(".summary-item:first-child span:last-child")
    const shippingElement = document.querySelector(".summary-item:nth-child(2) span:last-child")
    const discountElement = document.querySelector(".summary-item:nth-child(3) span:last-child")
    const totalElement = document.querySelector(".summary-total span:last-child")

    if (totalElements.length > 0 && subtotalElement && shippingElement && discountElement && totalElement) {
      // Calculate subtotal
      let subtotal = 0
      totalElements.forEach((element) => {
        subtotal += Number.parseFloat(element.textContent.replace(/[^\d]/g, ""))
      })

      // Get shipping cost
      const shipping = Number.parseFloat(shippingElement.textContent.replace(/[^\d]/g, "")) || 0

      // Get discount
      const discountText = discountElement.textContent
      const discount = discountText !== "-" ? Number.parseFloat(discountText.replace(/[^\d]/g, "")) || 0 : 0

      // Calculate total
      const total = subtotal + shipping - discount

      // Update elements
      subtotalElement.textContent = `Rp${subtotal.toLocaleString("id-ID")}`
      totalElement.textContent = `Rp${total.toLocaleString("id-ID")}`
    }
  }

  // Update cart count
  function updateCartCount() {
    const cartItems = document.querySelectorAll(".cart-table tbody tr")
    const cartCountElements = document.querySelectorAll(".cart-count")
    const cartCountText = document.querySelector(".cart-count-text")

    if (cartCountElements.length > 0) {
      const itemCount = cartItems.length

      cartCountElements.forEach((element) => {
        element.textContent = itemCount.toString()
      })

      if (cartCountText) {
        cartCountText.textContent = `${itemCount} item`
      }

      // Show empty cart message if no items
      if (itemCount === 0) {
        const cartItems = document.querySelector(".cart-items")
        const cartActions = document.querySelector(".cart-actions")

        if (cartItems) {
          cartItems.innerHTML = `
                        <div class="empty-cart">
                            <i class="fas fa-shopping-bag"></i>
                            <h3>Keranjang Anda kosong</h3>
                            <p>Sepertinya Anda belum menambahkan apapun ke keranjang.</p>
                            <a href="products.html" class="btn btn-primary">Mulai Belanja</a>
                        </div>
                    `
        }

        if (cartActions) {
          cartActions.style.display = "none"
        }
      }
    }
  }

  // Initialize cart summary on page load
  updateCartSummary()
})
