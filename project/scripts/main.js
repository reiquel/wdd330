import { renderProducts } from './ui.js';
import { renderCartItems, updateCart } from './cart.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize cart
  updateCart();
  
  // Set up navigation
  const sideNav = document.getElementById('sideNavbar');
  document.getElementById('openNav').addEventListener('click', () => {
    sideNav.classList.add('active');
  });
  
  document.getElementById('closeNav').addEventListener('click', () => {
    sideNav.classList.remove('active');
  });
  
  // Determine which page we're on and render appropriate content
  const path = window.location.pathname.split('/').pop();
  
  switch(path) {
    case 'mens.html':
      renderProducts('men');
      break;
    case 'womens.html':
      renderProducts('women');
      break;
    case 'accessories.html':
      renderProducts('accessories');
      break;
    case 'cart.html':
      renderCartItems();
      break;
    default:
      renderProducts();
  }
  
  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.side-navbar') && !e.target.closest('.nav-toggle')) {
      sideNav.classList.remove('active');
    }
  });
});
