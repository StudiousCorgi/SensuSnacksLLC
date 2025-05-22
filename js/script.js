// script.js
const products = {
  popcorn: [
    { name: "Theatre Butter", price: 5.99, img: "./Placeholder_Popcorn.jpg" },
    { name: "Caramel Kettle", price: 5.99, img: "./Placeholder_Popcorn.jpg" },
    { name: "Double Cheddar", price: 5.99, img: "./Placeholder_Popcorn.jpg" },
    { name: "Buffalo Ranch", price: 5.99, img: "./Placeholder_Popcorn.jpg" },
    { name: "Cheesy Buffalo Wings", price: 5.99, img: "./Placeholder_Popcorn.jpg" },
    { name: "Spicy Dill Pickle", price: 5.99, img: "./Placeholder_Popcorn.jpg" },
    { name: "White Cheddar", price: 5.99, img: "./Placeholder_Popcorn.jpg" },
    { name: "Southern Grits", price: 5.99, img: "./Placeholder_Popcorn.jpg" },
    { name: "Crawfish Boil", price: 5.99, img: "./Placeholder_Popcorn.jpg" },
    { name: "Cinnamon Toast", price: 5.99, img: "./Placeholder_Popcorn.jpg" },
    { name: "Chocolate Drizzle", price: 5.99, img: "./Placeholder_Popcorn.jpg" },
    { name: "Pop'n'Fruit", price: 5.99, img: "./Placeholder_Popcorn.jpg" },
  ],
  candies: [
    { name: "Jolly Rancher", price: 3.99, img: "./Placeholder_Candy.png" },
    { name: "Lemon Heads", price: 4.99, img: "./Placeholder_Candy.png" },
    { name: "Skittles", price: 3.99, img: "./Placeholder_Candy.png" },
    { name: "Classic Coffee Bites", price: 4.99, img: "./Placeholder_Candy.png" },
    { name: "Mocha Coffee Bites", price: 3.99, img: "./Placeholder_Candy.png" },
    { name: "Fruit Roll-Ups", price: 4.99, img: "./Placeholder_Candy.png" },
  ],
  drinks: [
    { name: "Mocha Frappe", price: 2.99, img: "./Placeholder_Cup.jpg" },
    { name: "Matcha", price: 1.99, img: "./Placeholder_Cup.jpg" },
    { name: "Sippy Mud", price: 2.99, img: "./Placeholder_Cup.jpg" },
    { name: "Lemonade", price: 1.99, img: "./Placeholder_Cup.jpg" },
  ]
};

let cart = {};

function saveCart() {
  localStorage.setItem('sensuCart', JSON.stringify(cart));
}

function loadCart() {
  const storedCart = localStorage.getItem('sensuCart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCart();
  }
}

function renderProducts(category, elementId) {
  const container = document.getElementById(elementId);
  container.innerHTML = '';
  products[category].forEach((item, index) => {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    col.innerHTML = 
      <div class="card h-100 shadow-sm">
        <img src="${item.img}" class="card-img-top" alt="${item.name}">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">$${item.price.toFixed(2)}</p>
          <div class="input-group mb-3">
            <input type="number" class="form-control quantity-input" id="qty-${category}-${index}" value="1" min="1">
            <button class="btn btn-primary add-to-cart" onclick="addToCart('${item.name}', ${item.price}, 'qty-${category}-${index}')">Add to Cart</button>
          </div>
        </div>
      </div>
    ;
    container.appendChild(col);
  });
}

function addToCart(item, price, inputId) {
  const qtyInput = document.getElementById(inputId);
  const quantity = qtyInput ? parseInt(qtyInput.value) || 1 : 1;

  if (cart[item]) {
    cart[item].qty += quantity;
  } else {
    cart[item] = { price, qty: quantity };
  }
  updateCart();
  saveCart();
  animateCart();
}

function updateCart() {
  const cartList = document.getElementById('cartItems');
  const total = document.getElementById('cartTotal');
  const cartCount = document.getElementById('cartCount');
  cartList.innerHTML = '';
  let totalPrice = 0;
  let itemCount = 0;

  for (const [item, data] of Object.entries(cart)) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      ${item} <span class="badge bg-primary rounded-pill">${data.qty} x $${data.price.toFixed(2)}</span>
    `;
    cartList.appendChild(li);
    totalPrice += data.qty * data.price;
    itemCount += data.qty;
  }

  total.textContent = totalPrice.toFixed(2);
  cartCount.textContent = itemCount;
  cartCount.style.display = itemCount > 0 ? 'inline-block' : 'none';
}

function animateCart() {
  const cartBtn = document.getElementById('toggleCart');
  cartBtn.classList.add('cart-bounce');
  setTimeout(() => cartBtn.classList.remove('cart-bounce'), 500);
}

const cartSidebar = new bootstrap.Offcanvas(document.getElementById('cartSidebar'));
document.getElementById('toggleCart').addEventListener('click', () => cartSidebar.toggle());

renderProducts('popcorn', 'popcornProducts');
renderProducts('candies', 'candiesProducts');
renderProducts('drinks', 'drinksProducts');
loadCart();
