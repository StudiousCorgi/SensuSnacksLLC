function loadCartFromStorage() {
    const stored = localStorage.getItem('sensuCart');
    return stored ? JSON.parse(stored) : {};
  }
  
  function renderCart() {
    const cart = loadCartFromStorage();
    const cartList = document.getElementById('cartList');
    const cartTotal = document.getElementById('cartTotal');
    cartList.innerHTML = '';
    let total = 0;
  
    for (const [item, data] of Object.entries(cart)) {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        <div>
          ${item} <small class="text-muted">(x${data.qty})</small>
        </div>
        <div>
          <strong>$${(data.price * data.qty).toFixed(2)}</strong>
          <button class="btn btn-sm btn-danger ms-3" onclick="removeItem('${item}')">Remove</button>
        </div>
      `;
      total += data.price * data.qty;
      cartList.appendChild(li);
    }
  
    cartTotal.textContent = total.toFixed(2);
  }
  
  function removeItem(item) {
    const cart = loadCartFromStorage();
    delete cart[item];
    localStorage.setItem('sensuCart', JSON.stringify(cart));
    renderCart();
  }
  
  renderCart();
  