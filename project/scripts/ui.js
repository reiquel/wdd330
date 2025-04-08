import { products } from './products.js';
import { addToCart } from './cart.js';

export function renderProducts(category) {
  const productGrid = document.getElementById('productGrid');
  if (!productGrid) return;
  
  const categoryProducts = products[category] || 
                         Object.values(products).flat();
  
  productGrid.innerHTML = categoryProducts.map(product => `
    <div class="product-card">
      <img src="images/${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');
  
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = parseInt(e.target.dataset.id);
      const product = Object.values(products)
        .flat()
        .find(p => p.id === productId);
      if (product) {
        if (addToCart(product)) {
          // Animation for added item
          const card = e.target.closest('.product-card');
          card.style.transform = 'scale(1.05)';
          setTimeout(() => {
            card.style.transform = '';
          }, 300);
        }
      }
    });
  });
}