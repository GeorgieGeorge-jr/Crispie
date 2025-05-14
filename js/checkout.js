import { updateCartCount } from './products.js';

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  
  const shippingForm = document.getElementById('shipping-form');
  if (shippingForm) {
    shippingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      proceedToPayment();
    });
  }
});

function proceedToPayment() {
  // In a real app, you would save shipping info and proceed to payment
  // For this demo, we'll just show an alert
  alert('Shipping information saved! Proceeding to payment...');
  
  // Here you would typically:
  // 1. Save shipping info to database
  // 2. Redirect to payment page or show payment form
  // 3. Process payment with Stripe, PayPal, etc.
  
  // For demo purposes, we'll just show a success message
  document.querySelector('.checkout-steps .step:nth-child(1)').classList.remove('active');
  document.querySelector('.checkout-steps .step:nth-child(2)').classList.add('active');
  
  document.querySelector('.shipping-form').style.display = 'none';
  
  // Show payment form (simplified for demo)
  const paymentForm = document.createElement('div');
  paymentForm.className = 'payment-form';
  paymentForm.innerHTML = `
    <h2>Payment Information</h2>
    <form id="payment-form">
      <div class="form-group">
        <label for="card-number">Card Number</label>
        <input type="text" id="card-number" placeholder="1234 5678 9012 3456" required>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="expiry">Expiry Date</label>
          <input type="text" id="expiry" placeholder="MM/YY" required>
        </div>
        
        <div class="form-group">
          <label for="cvc">CVC</label>
          <input type="text" id="cvc" placeholder="123" required>
        </div>
      </div>
      
      <div class="form-group">
        <label for="name-on-card">Name on Card</label>
        <input type="text" id="name-on-card" required>
      </div>
      
      <button type="submit" class="continue-btn">Complete Order</button>
    </form>
  `;
  
  document.querySelector('.checkout-content').appendChild(paymentForm);
  
  // Handle payment form submission
  document.getElementById('payment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    completeOrder();
  });
}

function completeOrder() {
  // In a real app, you would process payment here
  // For demo, we'll just show confirmation
  
  document.querySelector('.checkout-steps .step:nth-child(2)').classList.remove('active');
  document.querySelector('.checkout-steps .step:nth-child(3)').classList.add('active');
  
  document.querySelector('.payment-form').style.display = 'none';
  
  const confirmation = document.createElement('div');
  confirmation.className = 'confirmation';
  confirmation.innerHTML = `
    <div class="confirmation-icon">
      <i class="fas fa-check-circle"></i>
    </div>
    <h2>Order Confirmed!</h2>
    <p>Thank you for your purchase. Your order has been placed successfully.</p>
    <p>A confirmation email has been sent to your email address.</p>
    <a href="shop.html" class="shop-btn">Continue Shopping</a>
  `;
  
  document.querySelector('.checkout-content').appendChild(confirmation);
  
  // Clear cart after successful order
  localStorage.removeItem('cart');
  updateCartCount();
}