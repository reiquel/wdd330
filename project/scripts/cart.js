let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCart();
  saveCart();
}

export function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
  saveCart();
}

export function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

export function getCartCount() {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateCart() {
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    cartCount.textContent = getCartCount();
  }
}

export function renderCartItems() {
  const cartContainer = document.getElementById('cartItems');
  if (!cartContainer) return;
  
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty</p>';
    return;
  }
  
  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
      </div>
      <button class="remove-item" data-id="${item.id}">Remove</button>
    </div>
  `).join('');
  
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', (e) => {
      removeFromCart(parseInt(e.target.dataset.id));
    });
  });
  
  const cartTotal = document.getElementById('cartTotal');
  if (cartTotal) {
    cartTotal.textContent = `$${getCartTotal().toFixed(2)}`;
  }
}
