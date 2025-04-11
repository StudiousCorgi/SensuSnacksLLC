const products = {
    popcorn: [
        { name: "Theatre Butter Blast", price: 5.99, img: "./Placeholder_Poppcorn.jpg" },
        { name: "Caramel Kettle", price: 6.99 },
        { name: "Double Cheddar", price: 6.99 },
        { name: "Cheesy Buffalo Wings", price: 6.99 },
        { name: "Buffalo Ranch", price: 6.99 },
        { name: "Sour Cream & Onion", price: 6.99 },
        { name: "Cheddar Cheese", price: 6.99 },
        { name: "Cajun Spice", price: 6.99 },
        { name: "Sweet & Spicy", price: 6.99 },
        { name: "Spicy Dill Pickle", price: 6.99 },
        { name: "White Cheddar", price: 6.99 },
        { name: "Buffalo Ranch", price: 6.99 },
        { name: "Cinnamon Toast Crunch", price: 6.99 },
        { name: "Chocolate Drizzle", price: 6.99 },
        { name: "Southern Grits", price: 6.99 },
        { name: "Crawfish Boil", price: 6.99 },
    ],
    candies: [
      { name: "Jolly Rancher", price: 3.99, img: "../SensuSnacksLLC/Placeholder_Candy.png" },
      { name: "Lemon Heads", price: 4.99, img: "../SensuSnacksLLC/Placeholder_Candy.png" },
      { name: "Skittles", price: 3.99, img: "../SensuSnacksLLC/Placeholder_Candy.png" },
      { name: "Classic Coffee Bites", price: 4.99, img: "../SensuSnacksLLC/Placeholder_Candy.png" },
      { name: "Mocha Coffee Bites", price: 3.99, img: "../SensuSnacksLLC/Placeholder_Candy.png" },
      { name: "Fruit Roll-Ups", price: 4.99, img: "../SensuSnacksLLC/Placeholder_Candy.png" },
    ],
    drinks: [
      { name: "Mocha Frappe", price: 2.99, img: "../SensuSnacksLLC/Placeholder_Cup.jpg" },
      { name: "Matcha", price: 1.99, img: "../SensuSnacksLLC/Placeholder_Cup.jpg" },
      { name: "Sippy Mud", price: 2.99, img: "../SensuSnacksLLC/Placeholder_Cup.jpg" },
      { name: "Lemonade", price: 1.99, img: "../SensuSnacksLLC/Placeholder_Cup.jpg" },
    ]
  };
  
  const cart = {};

function renderProducts(category, elementId) {
  const container = document.getElementById(elementId);
  container.innerHTML = '';
  products[category].forEach((item) => {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${item.img}" class="card-img-top" alt="${item.name}">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">$${item.price.toFixed(2)}</p>
          <button class="btn btn-primary w-100" onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

function addToCart(item, price) {
  if (cart[item]) {
    cart[item].qty++;
  } else {
    cart[item] = { price, qty: 1 };
  }
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cartItems');
  const total = document.getElementById('cartTotal');
  cartList.innerHTML = '';
  let totalPrice = 0;

  for (const [item, data] of Object.entries(cart)) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      ${item} <span class="badge bg-primary rounded-pill">${data.qty} x $${data.price.toFixed(2)}</span>
    `;
    cartList.appendChild(li);
    totalPrice += data.qty * data.price;
  }

  total.textContent = totalPrice.toFixed(2);
}

const cartSidebar = new bootstrap.Offcanvas(document.getElementById('cartSidebar'));
document.getElementById('toggleCart').addEventListener('click', () => cartSidebar.toggle());

renderProducts('popcorn', 'popcornProducts');
renderProducts('candies', 'candiesProducts');
renderProducts('drinks', 'drinksProducts');
