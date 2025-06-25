# Product Inventory Manager

## Description
This project enables users to track and manage a list of products easily. Users can add new items with detailed information, edit existing entries, delete products, and quickly search through the inventory. The UI updates dynamically, providing a smooth user experience, and all data changes persist via the mock API.
---

## Overview
An **interactive web application** built with HTML, CSS, and JavaScript to manage a product inventory. It uses `json-server` as a mock backend, enabling full (Create, Read, Update, Delete) operations without reloading the page.

## Features
-  **View Products**: Fetch and display all products in a responsive grid on load.
- **Add Product**: Use the form to create new products with name, description, price, and image URL.
-  **Edit Product**: Inline editing via the same form, with fields pre-populated for updates.
- **Delete Product**: Remove unwanted products with one click.
-  **Live Search**: Filter products by name in real time as you type.
-  **Responsive Design**: Adapts seamlessly from mobile to desktop.

## Getting Started
Follow these steps to run the project locally.

### Prerequisites
- Node.js and npm installed
- Basic knowledge of the command line

### Installation
1. **Clone the repository**
   ```bash
   git clonehttps://github.com/Ivy-chemutai/Product-Inventory-Project.git
   cd product-inventory
   ```
2. **Install `json-server`**
   ```bash
   npm install -g json-server
   ```
3. **Start the JSON server**
   ```bash
   json-server --watch db.json --port 3000
   ```
4. **Open the app**
   - Open `index.html` in your browser
   - Or use a simple HTTP server:  
     ```bash
     npx http-server.
     ```

## Usage
1. **View** existing products listed in the grid.
2. **Add** a new product using the form and click **Add Product**.
3. **Edit** a product by clicking its **Edit** button; update the fields and submit.
4. **Delete** a product by clicking its **Delete** button.
5. **Search** products by typing a name in the search bar.

## Code Structure
```
- index.html         # Main HTML markup
- style.css          # Custom styles and layout
-script.js             # Fetch logic and event handlers
-db.json            # Sample data for json-server
- README.md          # Project documentation
```
## Features
Full CRUD functionality (Create, Read, Update, Delete)

Real-time search and sorting

Likes and star-based rating display

Responsive layout with a mobile-friendly navbar

Clean and modern design with a styled landing page



## Technologies
- **HTML5** & **CSS3**
- **JavaScript (ES6+)**
- **json-server** for mock REST API

## Tips & Best Practices
- Keep `json-server` running on port 3000.
- Use browser dev tools to monitor network requests.
- Modularize JavaScript code to stay DRY.

---

---

### Step 4: Save and Push to GitHub

Open your terminal and run:
-git add README.md
-git commit -m "Add full README with setup instructions and project info"
-git push


## Author
Lavi

 Happy coding!  
MIT License © 2025 Ivy Chemutai. All rights reserved.
