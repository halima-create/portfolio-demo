// js/filter.js
(function () {
  const products = [
    // Electronics
    {
      id: 1,
      name: "Smartphone",
      category: "electronics",
      price: 15999,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Laptop",
      category: "electronics",
      price: 45999,
      rating: 4.7,
    },
    {
      id: 3,
      name: "Wireless Headphones",
      category: "electronics",
      price: 2999,
      rating: 4.3,
    },
    {
      id: 4,
      name: "Smart Watch",
      category: "electronics",
      price: 3999,
      rating: 4.2,
    },
    {
      id: 5,
      name: "Power Bank",
      category: "electronics",
      price: 1299,
      rating: 4.4,
    },

    // Clothing
    {
      id: 6,
      name: "Cotton Kurta",
      category: "clothing",
      price: 899,
      rating: 4.3,
    },
    { id: 7, name: "Jeans", category: "clothing", price: 1299, rating: 4.1 },
    { id: 8, name: "Saree", category: "clothing", price: 2499, rating: 4.8 },
    { id: 9, name: "T-shirt", category: "clothing", price: 399, rating: 4.2 },
    {
      id: 10,
      name: "Dhoti Kurta Set",
      category: "clothing",
      price: 1899,
      rating: 4.5,
    },

    // Grocery
    {
      id: 11,
      name: "Basmati Rice (5kg)",
      category: "grocery",
      price: 499,
      rating: 4.6,
    },
    {
      id: 12,
      name: "Toor Dal (1kg)",
      category: "grocery",
      price: 129,
      rating: 4.4,
    },
    {
      id: 13,
      name: "Wheat Flour (5kg)",
      category: "grocery",
      price: 299,
      rating: 4.3,
    },
    {
      id: 14,
      name: "Masala Set",
      category: "grocery",
      price: 399,
      rating: 4.7,
    },
    {
      id: 15,
      name: "Cooking Oil (1L)",
      category: "grocery",
      price: 149,
      rating: 4.2,
    },

    // Home & Kitchen
    {
      id: 16,
      name: "Pressure Cooker",
      category: "home",
      price: 1899,
      rating: 4.6,
    },
    {
      id: 17,
      name: "Non-stick Pan",
      category: "home",
      price: 699,
      rating: 4.3,
    },
    {
      id: 18,
      name: "Storage Containers",
      category: "home",
      price: 449,
      rating: 4.1,
    },
    { id: 19, name: "Bedsheet Set", category: "home", price: 899, rating: 4.4 },
    { id: 20, name: "Curtains", category: "home", price: 1299, rating: 4.2 },

    // Books
    {
      id: 21,
      name: "Wings of Fire",
      category: "books",
      price: 299,
      rating: 4.9,
    },
    { id: 22, name: "The Guide", category: "books", price: 199, rating: 4.5 },
    {
      id: 23,
      name: "Python Programming",
      category: "books",
      price: 449,
      rating: 4.6,
    },
    {
      id: 24,
      name: "Indian Mythology",
      category: "books",
      price: 399,
      rating: 4.4,
    },
    { id: 25, name: "Dictionary", category: "books", price: 249, rating: 4.3 },
  ];

  const categoryFilter = document.getElementById("categoryFilter");
  const priceFilter = document.getElementById("priceFilter");
  const sortSelect = document.getElementById("sortSelect");
  const productsContainer = document.getElementById("productsContainer");
  const noProductsMsg = document.getElementById("noProductsMsg");

  if (!productsContainer) return;

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function filterAndSortProducts() {
    const cat = categoryFilter ? categoryFilter.value : "all";
    const maxPrice = priceFilter ? parseFloat(priceFilter.value) || 5000 : 5000;
    const sortBy = sortSelect ? sortSelect.value : "default";

    let filtered = products.filter((product) => {
      if (cat !== "all" && product.category !== cat) return false;
      if (product.price > maxPrice) return false;
      return true;
    });

    switch (sortBy) {
      case "priceAsc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "ratingDesc":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "nameAsc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered.sort((a, b) => a.id - b.id);
    }

    renderProducts(filtered);
  }

  function renderProducts(productsToRender) {
    productsContainer.innerHTML = "";

    if (productsToRender.length === 0) {
      noProductsMsg.style.display = "block";
      return;
    }

    noProductsMsg.style.display = "none";

    productsToRender.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";

      productCard.innerHTML = `
                <div class="product-name">${escapeHTML(product.name)}</div>
                <div class="product-category">${escapeHTML(product.category)}</div>
                <div class="product-price">₹${product.price.toLocaleString("en-IN")}</div>
                <span class="product-rating">★ ${product.rating.toFixed(1)}</span>
            `;

      productsContainer.appendChild(productCard);
    });
  }

  if (categoryFilter)
    categoryFilter.addEventListener("change", filterAndSortProducts);
  if (priceFilter) priceFilter.addEventListener("input", filterAndSortProducts);
  if (sortSelect) sortSelect.addEventListener("change", filterAndSortProducts);

  filterAndSortProducts();
})();
