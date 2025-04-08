// scripts/order-confirmation.js
export function setupOrderConfirmation() {
    // Generate random order number
    document.getElementById('orderNumber').textContent = Math.floor(Math.random() * 1000000);
    
    // Display current date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('orderDate').textContent = new Date().toLocaleDateString('en-US', options);
    
    // Get total from URL parameter or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const total = urlParams.get('total') || localStorage.getItem('lastOrderTotal') || '0.00';
    document.getElementById('orderTotal').textContent = parseFloat(total).toFixed(2);
    
    // Update cart count to 0
    document.getElementById('cartCount').textContent = '0';
  }