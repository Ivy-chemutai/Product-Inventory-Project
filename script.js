const BASE_URL = "http://localhost:3000/products";

const productList = document.getElementById("productList");
const addForm = document.getElementById("addProductForm");
const searchInput = document.getElementById("searchInput");


document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

function fetchProducts() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(products => renderProducts(products))
    .catch(err => console.error("Failed to fetch:", err));
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
        <p>Rating: ${.repeat(product.review || 5)} 5/5</p>
        <p>Likes: ${product.likes ?? 2.5}</p>
        <div class="action-buttons">
          <button class="like-btn" data-id="${product.id}">Like</button>
          <button class="edit-btn" data-id="${product.id}">Edit</button>
          <button class="delete-btn" data-id="${product.id}">Delete</button>
        </div>
      </div>
    `;
    productList.appendChild(li);

    li.querySelector(".like-btn").addEventListener("click", () => {
      const newLikes = product.likes + 1;
      fetch(`${BASE_URL}/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: newLikes })
      }).then(() => fetchProducts());
    });

    li.querySelector(".edit-btn").addEventListener("click", () => editProduct(product));
    li.querySelector(".delete-btn").addEventListener("click", () => {
      fetch(`${BASE_URL}/${product.id}`, { method: "DELETE" })
        .then(() => fetchProducts());
    });
  });
}
function editProduct(product) {
  document.getElementById("productName").value = product.name;
  document.getElementById("productDescription").value = product.description || "";
  document.getElementById("productPrice").value = product.price || "";
  document.getElementById("productImage").value = product.image || "";

  addForm.onsubmit = function (event) {
    event.preventDefault();
    const updatedProduct = {
      name: productName.value,
      description: productDescription.value,
      price: parseFloat(productPrice.value),
      image: productImage.value,
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
    });
  };
}

function defaultSubmitHandler(event) {
  event.preventDefault();
  const newProduct = {
    name: productName.value,
    description: productDescription.value,
    price: parseFloat(productPrice.value),
    image: productImage.value,
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
  });
}
addForm.onsubmit = defaultSubmitHandler;

searchInput.addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  fetch(BASE_URL)
    .then(res => res.json())
    .then(products => {
      const filtered = products.filter(p => p.name.toLowerCase().includes(term));
      renderProducts(filtered);
    });
});


const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});


