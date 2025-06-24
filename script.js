// script.js
const BASE_URL = "http://localhost:3000/products";

// DOM Elements
const productList = document.getElementById("productList");
const addForm = document.getElementById("addProductForm");
const searchInput = document.getElementById("searchInput");

// Load all products
document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

function fetchProducts() {
  fetch(BASE_URL)
    .then(response => response.json())
    .then(products => {
      if (Array.isArray(products)) {
        renderProducts(products);
      } else {
        console.error("Fetched data is not an array:", products);
        renderProducts([]);
      }
    })
    .catch(error => console.error("error fetching products:", error));
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
        <p>Rating: ${"⭐".repeat(product.review)} 5/5</p>
        <p>Likes: ${product.likes ?? 2.5} </p>
        <div class="action-buttons">
          <button class="like-btn" data-id="${product.id}">Like</button>
          <button class="edit-btn" data-id="${product.id}">Edit</button>
          <button class="delete-btn" data-id="${product.id}">Delete</button>
        </div>
      </div>
    `;
    productList.appendChild(li);

    li.querySelector(".delete-btn").addEventListener("click", () => deleteProduct(product.id));
    li.querySelector(".edit-btn").addEventListener("click", () => editProduct(product));
    li.querySelector(".like-btn").addEventListener("click", () => {
      const newLikes = product.likes + 1;
      fetch(`${BASE_URL}/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: newLikes })
      }).then(() => fetchProducts());
    });
  });
}

function deleteProduct(id) {
  fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
    .then(() => fetchProducts());
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
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedProduct)
    })
      .then(() => {
        fetchProducts();
        addForm.reset();
        addForm.onsubmit = defaultSubmitHandler;
      });
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
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newProduct)
  })
    .then(res => res.json())
    .then(() => {
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
