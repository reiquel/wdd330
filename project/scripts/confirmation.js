// In order-confirmation.js, ensure we're getting the total correctly:
export function setupOrderConfirmation() {
  // Get total from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  let total = urlParams.get('total') || localStorage.getItem('lastOrderTotal') || '0.00';
  
  // Format the total to 2 decimal places
  total = parseFloat(total).toFixed(2);
  
  // Update the display
  document.getElementById('orderTotal').textContent = total;
  
  // Rest of your confirmation code...
  document.getElementById('orderNumber').textContent = Math.floor(Math.random() * 1000000);
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('orderDate').textContent = new Date().toLocaleDateString('en-US', options);
  
  document.getElementById('cartCount').textContent = '0';
}

setupOrderConfirmation();