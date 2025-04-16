let cart = [];

function displayProducts() {
  const container = document.getElementById("products");
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" width="150">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const item = cart.find(item => item.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  displayCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  displayCart();
}

function displayCart() {
  const container = document.getElementById("cart");
  container.innerHTML = "";
  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <h4>${item.name}</h4>
      <p>Price: $${item.price.toFixed(2)}</p>
      <p>Qty: ${item.qty}</p>
      <p>Subtotal: $${(item.price * item.qty).toFixed(2)}</p>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    container.appendChild(div);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>
    <button onclick="checkout()">Checkout</button>`;
  container.appendChild(totalDiv);
}

function checkout() {
  alert("Checkout not implemented yet. Add Stripe or local logic here.");
}

displayProducts();
