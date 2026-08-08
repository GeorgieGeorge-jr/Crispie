import { addToCart, updateCartCount, formatPrice } from './products.js';
import './dark-mode.js';

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#cart-items')) {
    loadCartItems();
  }
  
  updateCartCount();
});

function loadCartItems() {
  const cartContainer = document.getElementById('cart-items');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-basket"></i>
        <p>Your cart is empty</p>
        <a href="shop.html" class="shop-btn">Start Shopping</a>
      </div>
    `;
    updateOrderSummary(cart);
    return;
  }
  
  cartContainer.innerHTML = '';
  
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p class="cart-item-price">${formatPrice(item.price)}</p>
        <div class="cart-item-controls">
          <div class="quantity-control">
            <button class="quantity-btn minus"><i class="fas fa-minus"></i></button>
            <input type="number" class="quantity-input" value="${item.quantity}" min="1">
            <button class="quantity-btn plus"><i class="fas fa-plus"></i></button>
          </div>
          <span class="remove-item">Remove</span>
        </div>
      </div>
      <div class="cart-item-total">
        <p class="cart-item-total-price">${formatPrice(item.price * item.quantity)}</p>
      </div>
    `;
    
    // Add event listeners for quantity controls
    const minusBtn = cartItem.querySelector('.minus');
    const plusBtn = cartItem.querySelector('.plus');
    const quantityInput = cartItem.querySelector('.quantity-input');
    const removeBtn = cartItem.querySelector('.remove-item');
    
    minusBtn.addEventListener('click', () => {
      if (item.quantity > 1) {
        item.quantity--;
        quantityInput.value = item.quantity;
        updateCartItem(item, cartItem);
      }
    });
    
    plusBtn.addEventListener('click', () => {
      item.quantity++;
      quantityInput.value = item.quantity;
      updateCartItem(item, cartItem);
    });
    
    quantityInput.addEventListener('change', () => {
      const newQuantity = parseInt(quantityInput.value);
      if (newQuantity >= 1) {
        item.quantity = newQuantity;
        updateCartItem(item, cartItem);
      } else {
        quantityInput.value = item.quantity;
      }
    });
    
    removeBtn.addEventListener('click', () => {
      removeCartItem(item.id);
      cartItem.remove();
      if (cart.length === 1) { // If this was the last item
        loadCartItems(); // Reload to show empty cart
      }
    });
    
    cartContainer.appendChild(cartItem);
  });
  
  updateOrderSummary(cart);
  
  // Set up checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      window.location.href = 'checkout.html';
    });
  }
}

function updateCartItem(item, cartItemElement) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cart.findIndex(cartItem => cartItem.id === item.id);
  
  if (index !== -1) {
    cart[index] = item;
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update total price display
    const totalPriceElement = cartItemElement.querySelector('.cart-item-total-price');
    totalPriceElement.textContent = formatPrice(item.price * item.quantity);
    
    updateOrderSummary(cart);
    updateCartCount();
  }
}

function removeCartItem(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  updateOrderSummary(cart);
}

function updateOrderSummary(cart) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = subtotal > 0 ? 1500 : 0;
  const total = subtotal + delivery;
  
  document.getElementById('subtotal').textContent = formatPrice(subtotal);
  document.getElementById('delivery').textContent = formatPrice(delivery);
  document.getElementById('total').textContent = formatPrice(total);
  
  // Also update checkout page if exists
  if (document.getElementById('checkout-items')) {
    updateCheckoutItems(cart, subtotal, delivery, total);
  }
}

function updateCheckoutItems(cart, subtotal, delivery, total) {
  const checkoutItems = document.getElementById('checkout-items');
  checkoutItems.innerHTML = '';
  
  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'checkout-item';
    itemElement.innerHTML = `
      <div class="checkout-item-info">
        <h4>${item.name} × ${item.quantity}</h4>
        <p>${formatPrice(item.price)} each</p>
      </div>
      <div class="checkout-item-price">
        ${formatPrice(item.price * item.quantity)}
      </div>
    `;
    checkoutItems.appendChild(itemElement);
  });
  
  document.getElementById('checkout-subtotal').textContent = formatPrice(subtotal);
  document.getElementById('checkout-delivery').textContent = formatPrice(delivery);
  document.getElementById('checkout-total').textContent = formatPrice(total);
}


// Logout

