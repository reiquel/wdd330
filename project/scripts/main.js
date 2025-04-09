import { renderProducts } from './ui.js';
import { renderCartItems, setupCheckout, updateCart } from './cart.js';
import { setupOrderConfirmation } from './confirmation.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize cart
  updateCart();
  
  // Set up navigation
  const sideNav = document.getElementById('sideNavbar');
  const openNav = document.getElementById('openNav');
  const closeNav = document.getElementById('closeNav');
  
  if (openNav) {
    openNav.addEventListener('click', () => {
      sideNav.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (closeNav) {
    closeNav.addEventListener('click', () => {
      sideNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.side-navbar') && 
        !e.target.closest('.nav-toggle') &&
        sideNav.classList.contains('active')) {
      sideNav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Determine which page we're on
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
      setupCheckout();
      break;
    case 'order-confirmation.html':
      setupOrderConfirmation();
      break;
    default:
      renderProducts();
  }
  
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
});
