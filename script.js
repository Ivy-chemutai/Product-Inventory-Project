const BASE_URL = "http://localhost:3000/products";

const productList = document.getElementById("productList");
const addForm = document.getElementById("addProductForm");
const searchInput = document.getElementById("searchInput");


document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
  initNavigation();
});

function initNavigation() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
      // Close mobile menu after clicking
      const navLinks = document.querySelector('.nav-links');
      if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
      }
    });
  });
}

function fetchProducts() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(products => renderProducts(products))
    .catch(error => console.error('Error fetching products:', error));
}

function repeat(n) {
  // Returns a string of n filled stars (★) for rating
  return "★".repeat(Math.round(n));
}

function renderProducts(products) {
  productList.innerHTML = "";
  products.forEach(product => {
    const li = document.createElement("li");
    li.className = "product-item";
    li.innerHTML = `
      <div>
        <img src="${product.image}" alt="${product.name}" class="product-img">
        <h2>${product.name}</h2>
        <p>${product.description || "No description"}</p>
        <p>Price: $${product.price}</p>
        <p>Rating: ${ repeat(product.review || 5)} (${product.review || 5}/5)</p>
        <p>Likes: ${product.likes ?? 0}</p>
        <div class="action-buttons">
          <button class="like-btn" data-id="${product.id}">Like</button>
          <button class="edit-btn" data-id="${product.id}">Edit</button>
          <button class="delete-btn" data-id="${product.id}">Delete</button>
        </div>
      </div>
    `;
    productList.appendChild(li);

    li.querySelector(".like-btn").addEventListener("click", () => {
      const newLikes = (product.likes || 0) + 1;
      fetch(`${BASE_URL}/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: newLikes })
      }).then(() => fetchProducts())
        .catch(error => console.error('Error updating likes:', error));
    });

    li.querySelector(".edit-btn").addEventListener("click", () => editProduct(product));
    li.querySelector(".delete-btn").addEventListener("click", () => {
      fetch(`${BASE_URL}/${product.id}`, { method: "DELETE" })
        .then(() => fetchProducts())
        .catch(error => console.error('Error deleting product:', error));
    });
  });
}
function editProduct(product) {
  const nameField = document.getElementById("productName");
  const descField = document.getElementById("productDescription");
  const priceField = document.getElementById("productPrice");
  const imageField = document.getElementById("productImage");

  nameField.value = product.name;
  descField.value = product.description || "";
  priceField.value = product.price || "";
  imageField.value = product.image || "";

  addForm.onsubmit = function (event) {
    event.preventDefault();
    const updatedProduct = {
      name: nameField.value,
      description: descField.value,
      price: parseFloat(priceField.value),
      image: imageField.value,
      likes: product.likes,
      review: product.review
    };
    fetch(`${BASE_URL}/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct)
    }).then(() => {
      fetchProducts();
      addForm.reset();
      addForm.onsubmit = defaultSubmitHandler;
    })
    .catch(error => console.error('Error updating product:', error));
  };
}

function defaultSubmitHandler(event) {
  event.preventDefault();
  const newProduct = {
    name: document.getElementById("productName").value,
    description: document.getElementById("productDescription").value,
    price: parseFloat(document.getElementById("productPrice").value),
    image: document.getElementById("productImage").value,
    likes: 0,
    review: 5
  };
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct)
  }).then(() => {
    fetchProducts();
    addForm.reset();
  })
  .catch(error => console.error('Error adding product:', error));
}
addForm.onsubmit = defaultSubmitHandler;

searchInput.addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  if (!term) {
    fetchProducts();
    return;
  }
  fetch(BASE_URL)
    .then(res => res.json())
    .then(products => {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(term) || 
        (p.description && p.description.toLowerCase().includes(term))
      );
      renderProducts(filtered);
    })
    .catch(error => console.error('Error searching products:', error));
});


// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// Active navigation highlighting
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  
  navLinksAll.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});




