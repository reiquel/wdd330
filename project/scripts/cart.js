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
  return true;
}

export function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
  saveCart();
  renderCartItems();
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
    cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    document.getElementById('cartTotal').textContent = '0.00';
    return;
  }
  
  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
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
    cartTotal.textContent = getCartTotal().toFixed(2);
  }
}

export function setupCheckout() {
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checkout.');
        return;
      }
      const total = getCartTotal().toFixed(2);
      localStorage.setItem('lastOrderTotal', total);
      localStorage.removeItem('cart');
      window.location.href = `order-confirmation.html?total=${total}`;
    });
  }
}
