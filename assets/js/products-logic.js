import { products } from '../js/products.js';

console.log("Current time:", new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }));
console.log("Total products loaded:", products.length);
if (products.length === 0) {
  console.error("No products loaded from products.js. Check the file or import path.");
} else {
  console.log("Sample product:", products[0]);
}

// Utility to format price
const formatPrice = (price) => {
  return "Rp" + price.toLocaleString("id-ID");
};

// Debounce utility (masih ada jika ingin pakai search, tapi search tidak aktif sekarang)
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded event fired at:", new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }));

  // DOM elements
  const filterButton = document.getElementById("open-filter-btn");
  const filterModal = document.getElementById("filter-modal");
  const closeFilterModal = document.getElementById("close-filter-modal");
  const applyFilterBtn = document.querySelector(".products-sidebar .btn-primary");
  const applyModalFilterBtn = document.getElementById("apply-filters");
  const priceMinSlider = document.getElementById("price-min");
  const priceMaxSlider = document.getElementById("price-max");
  const modalPriceMinSlider = document.getElementById("modal-price-min");
  const modalPriceMaxSlider = document.getElementById("modal-price-max");
  const priceRange = document.querySelector(".price-range");
  const modalPriceRange = document.querySelector(".filter-modal .price-range");
  const productsGrid = document.querySelector(".products-grid");
  const paginationContainer = document.querySelector(".pagination");
  const searchInput = document.querySelector(".search-box input[type='search']");
  const sortSelect = document.getElementById("sort-by");

  // Debugging: Check DOM elements
  console.log({
    filterButton, filterModal, closeFilterModal, applyFilterBtn, applyModalFilterBtn,
    priceMinSlider, priceMaxSlider, modalPriceMinSlider, modalPriceMaxSlider,
    priceRange, modalPriceRange, productsGrid, paginationContainer, searchInput, sortSelect
  });

  if (!productsGrid) {
    console.error("Products grid (.products-grid) not found in DOM.");
    return;
  }
  if (!paginationContainer) {
    console.error("Pagination container (.pagination) not found in DOM.");
    return;
  }

  // Reset filter UI (meskipun filter tidak aktif sekarang)
  if (priceMinSlider) priceMinSlider.value = 300000;
  if (priceMaxSlider) priceMaxSlider.value = 5000000;
  if (modalPriceMinSlider) modalPriceMinSlider.value = 300000;
  if (modalPriceMaxSlider) modalPriceMaxSlider.value = 5000000;
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = false;
  });

  // Pagination state
  let currentPage = 1;
  const productsPerPage = 9;
  let filteredProducts = [...products]; // Semua produk tampil tanpa filter

  // Fungsi untuk render produk ke grid
  function renderProducts() {
    if (!productsGrid) {
      console.error("Products grid not available for rendering.");
      return;
    }

    productsGrid.innerHTML = "";
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    console.log("Rendering:", paginatedProducts.length, "products for page", currentPage);

    if (paginatedProducts.length === 0) {
      productsGrid.innerHTML = `
        <div class="no-products">
          <p>Tidak ada produk yang sesuai.</p>
        </div>
      `;
      console.warn("No products to render on page", currentPage);
      return;
    }

    paginatedProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
          <div class="product-rating">
            <i class="fas fa-star"></i>
            <span>${product.rating}</span>
          </div>
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-footer">
            <span class="product-price">${formatPrice(product.price)}</span>
            <a href="../pages/product-detail.html?id=${product.id}" class="btn btn-sm">Detail <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
      `;
      productsGrid.appendChild(productCard);
    });
  }

  // Fungsi untuk update tombol pagination
  function updatePagination() {
    if (!paginationContainer) {
      console.error("Pagination container not found.");
      return;
    }

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    paginationContainer.innerHTML = `
      <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}"><i class="fas fa-arrow-left"></i></button>
      ${Array.from({ length: totalPages }, (_, i) => `
        <button class="pagination-btn ${currentPage === i + 1 ? 'active' : ''}">${i + 1}</button>
      `).join('')}
      <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}"><i class="fas fa-arrow-right"></i></button>
    `;

    console.log("Pagination updated for", totalPages, "pages");

    // Event listener pagination
    const paginationButtons = paginationContainer.querySelectorAll(".pagination-btn");
    paginationButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        if (button.classList.contains("disabled")) return;

        if (button.querySelector(".fa-arrow-left")) {
          if (currentPage > 1) currentPage--;
        } else if (button.querySelector(".fa-arrow-right")) {
          if (currentPage < totalPages) currentPage++;
        } else {
          currentPage = index; // index menyesuaikan karena tombol Previous di index 0
          if (currentPage > 0) currentPage--;
        }

        console.log("Page changed to:", currentPage + 1);
        renderProducts();
        updatePagination();
      });
    });
  }

  // Fungsi applyFilters dimodifikasi jadi hanya tampil semua produk tanpa filter
  function applyFilters() {
    console.debug("Applying filters (disabled) at:", new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }));
    filteredProducts = [...products]; // semua produk tanpa filter

    // Sorting bisa dipertahankan jika mau (atau hapus kalau mau)
    const sortValue = sortSelect ? sortSelect.value : 'popular';
    filteredProducts.sort((a, b) => {
      if (sortValue === 'price-low') return a.price - b.price;
      if (sortValue === 'price-high') return b.price - a.price;
      if (sortValue === 'newest') return b.id - a.id;
      if (sortValue === 'rating') return b.rating - a.rating;
      return b.rating - a.rating;
    });

    currentPage = 1;
    renderProducts();
    updatePagination();

    if (filterModal) filterModal.style.display = "none";
  }

  // Nonaktifkan tombol dan event filter (bisa dikomentari)
  if (applyFilterBtn) {
    applyFilterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // applyFilters(); // Tidak dijalankan
    });
  }
  if (applyModalFilterBtn) {
    applyModalFilterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // applyFilters(); // Tidak dijalankan
    });
  }

  // Nonaktifkan event search input
  if (searchInput) {
    searchInput.addEventListener("input", debounce(() => {
      // applyFilters(); // Tidak dijalankan
    }, 300));
  }

  // Sort option tetap bisa digunakan
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      console.debug("Sort option changed:", sortSelect.value);
      applyFilters();
    });
  }

  // Inisialisasi pertama: langsung tampilkan semua produk tanpa filter
  console.log("Initial render triggered");
  applyFilters();
});
