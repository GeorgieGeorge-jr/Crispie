// Animation on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.slide-up, .slide-down, .fade-in');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add click animation to buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart') || 
          e.target.classList.contains('continue-btn') || 
          e.target.classList.contains('checkout-btn')) {
        const btn = e.target;
        btn.classList.add('clicked');
        setTimeout(() => btn.classList.remove('clicked'), 300);
      }
    });
  });
  
  // Add CSS for button click animation
  const style = document.createElement('style');
  style.textContent = `
    .add-to-cart.clicked, 
    .continue-btn.clicked, 
    .checkout-btn.clicked {
      transform: scale(0.95) !important;
    }
    
    .cart-notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 15px 25px;
      border-radius: 5px;
      box-shadow: 0 3px 10px rgba(0,0,0,0.2);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    }
    
    .cart-notification.fade-out {
      animation: fadeOut 0.3s ease-out forwards;
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes fadeOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);