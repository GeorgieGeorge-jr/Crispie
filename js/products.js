import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js';
import './dark-mode.js';

const firebaseConfig = {
  apiKey: "AIzaSyCikOCOzD55nzpnfU3QD-yB6qWATIyfhns",
  authDomain: "crispie-shopping-site.firebaseapp.com",
  projectId: "crispie-shopping-site",
  storageBucket: "crispie-shopping-site.appspot.com",
  messagingSenderId: "496876896314",
  appId: "1:496876896314:web:0114ed8a7e78676c7e7503"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample product data (in a real app, this would come from Firestore)
const products = [
  {
    id: '1',
    name: 'Tropical Smoothie',
    category: 'smoothie',
    price: 5000,
    description: 'A refreshing blend of mango, pineapple, banana and coconut milk',
    image: 'ng/images/smoothie.jpg',
    nutrition: {
      calories: 220,
      protein: '3g',
      carbs: '45g',
      fat: '2g'
    }
  },

  {
    id: '2',
    name: 'Strawberry Smoothie',
    category: 'smoothie',
    price: 5000,
    description: 'Creamy strawberry smoothie with almond milk and honey',
    image: 'ng/images/strawberry.jpg',
    nutrition: {
      calories: 220,
      protein: '5g',
      carbs: '35g',
      fat: '2g'
    }
  },
  
  {
    id: '3',
    name: 'Berry Blast Smoothie',
    category: 'smoothie',
    price: 4500,
    description: 'Mixed berries with Greek yogurt and almond milk',
    image: 'ng/images/berryblast.jpeg',
    nutrition: {
      calories: 180,
      protein: '5g',
      carbs: '30g',
      fat: '3g'
    }
  },
  {
    id: '4',
    name: 'Green Detox Smoothie',
    category: 'smoothie',
    price: 4500,
    description: 'Kale, spinach, apple, lemon and ginger for a healthy boost',
    image: 'ng/images/greendetox.jpg',
    nutrition: {
      calories: 4000,
      protein: '4g',
      carbs: '25g',
      fat: '1g'
    }
  },


  {
    id: '5',
    name: 'Peanut Butter Smoothie',
    category: 'smoothie',
    price: 5000,
    description: 'Creamy peanut butter with banana and almond milk',
    image: 'ng/images/pbutter.jpg',
    nutrition: {
      calories: 220,
      protein: '3g',
      carbs: '45g',
      fat: '2g'
    }
  },


  {
    id: '6',
    name: 'Greek Yogurt Parfait',
    category: 'yogurt',
    price: 4000,
    description: 'Layers of Greek yogurt, granola and mixed berries',
    image: 'ng/images/yogurtparfait.jpg',
    nutrition: {
      calories: 280,
      protein: '15g',
      carbs: '35g',
      fat: '8g'
    }
  },

  {
    id: '7',
    name: 'Fruit and Nut Yogurt Bowl',
    category: 'yogurt',
    price: 4500,
    description: 'Greek yogurt topped with seasonal fruits and nuts',
    image: 'ng/images/yogurtbowl.jpg',
    nutrition: {
      calories: 300,
      protein: '10g',
      carbs: '40g',
      fat: '10g'
    }
  },

  {
    id: '8',
    name: 'Vanilla Chia Yogurt',
    category: 'yogurt',
    price: 3500,
    description: 'Vanilla yogurt with chia seeds and fresh berries',
    image: 'ng/images/vanillachia.webp',
    nutrition: {
      calories: 200,
      protein: '6g',
      carbs: '30g',
      fat: '5g'
    }
  },

  {
    id: '9',
    name: 'Honey Almond Yogurt',
    category: 'yogurt',
    price: 4000,
    description: 'Creamy yogurt with honey, almonds and chia seeds',
    image: 'ng/images/honeyalmond.jpg',
    nutrition: {
      calories: 250,
      protein: '8g',
      carbs: '30g',
      fat: '9g'
    }
  },

  {
    id: '10',
    name: 'Mango Coconut Yogurt Bowl',
    category: 'yogurt',
    price: 5000,
    description: 'Mango yogurt with coconut flakes and chia seeds',
    image: 'ng/images/mangococonut.webp',
    nutrition: {
      calories: 320,
      protein: '6g',
      carbs: '45g',
      fat: '12g'
    }
  },

  {
    id: '11',
    name: 'Berry Bliss Yogurt Parfait',
    category: 'yogurt',
    price: 4500,
    description: 'Layers of yogurt, mixed berries and granola',
    image: 'ng/images/berrybliss.jpeg',
    nutrition: {
      calories: 280,
      protein: '10g',
      carbs: '35g',
      fat: '7g'
    }
  },

  {
    id: '12',
    name: 'Caesar Salad',
    category: 'salad',
    price: 6000,
    description:
      "Crisp romaine lettuce, grilled chicken, croutons, parmesan cheese and Caesar dressing",
    image:
      "ng/images/caesarsalad.jpg",
    nutrition:
      {
        calories:
          450,
        protein:
          "30g",
        carbs:
          "20g",
        fat:
          "25g"
      }
  },

  {
    id: '13',
    name: 'Quinoa Salad Bowl',
    category: 'salad',
    price: 5000,
    description: 'Quinoa with roasted vegetables, feta cheese and lemon dressing',
    image: 'ng/images/quinoasalad.avif',
    nutrition: {
      calories: 320,
      protein: '12g',
      carbs: '40g',
      fat: '12g'
    }
  },
  {
    id: '14',
    name: 'Avocado Toast',
    category: 'general',
    price: 7.49,
    description: 'Sourdough bread with smashed avocado, cherry tomatoes and feta',
    image: 'ng/images/cadotoast.jpg',
    nutrition: {
      calories: 350,
      protein: '8g',
      carbs: '30g',
      fat: '22g'
    }
  },
  {
    id: '15',
    name: 'Wedge Salad',
    category: 'general',
    price: 8000,
    description: 'Crisp iceberg lettuce with blue cheese dressing, bacon bits and tomatoes',
    image: 'ng/images/wedgesalad.jpg',
    nutrition: {
      calories: 280,
      protein: '10g',
      carbs: '40g',
      fat: '4g'
    }
  },
  {
    id: '16',
    name: 'Chia Pudding',
    category: 'general',
    price: 3000,
    description: 'Chia seeds soaked in almond milk with fresh berries',
    image: 'ng/images/chiapudding.webp',
    nutrition: {
      calories: 250,
      protein: '7g',
      carbs: '25g',
      fat: '12g'
    }
  }
];

// Load products on shop page
if (document.querySelector('#featured-products')) {
  loadProducts();
}

// Load single product on product page
if (document.querySelector('.product-details')) {
  loadProductDetails();
}

// Load related products on product page
if (document.querySelector('.related-container')) {
  loadRelatedProducts();
}

function loadProducts() {
  const featuredContainer = document.getElementById('featured-products');
  const saladContainer = document.getElementById('salad-products');
  const smoothieContainer = document.getElementById('smoothie-products');
  const yogurtContainer = document.getElementById('yogurt-products');
  
  // Get 5 random featured products from all categories
  const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
  const featuredProducts = shuffledProducts.slice(0, 5);
  
  featuredProducts.forEach(product => {
    featuredContainer.appendChild(createProductCard(product));
  });
  
  // Filter remaining products by category
  const salads = products.filter(p => p.category === 'salad');
  const smoothies = products.filter(p => p.category === 'smoothie');
  const yogurts = products.filter(p => p.category === 'yogurt');
  
  salads.forEach(product => {
    saladContainer.appendChild(createProductCard(product));
  });
  
  smoothies.forEach(product => {
    smoothieContainer.appendChild(createProductCard(product));
  });
  
  yogurts.forEach(product => {
    yogurtContainer.appendChild(createProductCard(product));
  });
  
  initCarousels();
}

function loadProductDetails() {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  if (!productId) {
    window.location.href = 'shop.html';
    return;
  }
  
  // Find product
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    window.location.href = 'shop.html';
    return;
  }
  
  // Populate product details
  document.getElementById('product-title').textContent = product.name;
  document.getElementById('product-price').textContent = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(product.price).replace('NGN', '₦')
  ;
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('main-product-image').src = product.image;
  
  // Populate nutrition facts
  const nutritionList = document.getElementById('nutrition-list');
  nutritionList.innerHTML = `
    <li><span>Calories</span><span>${product.nutrition.calories}</span></li>
    <li><span>Protein</span><span>${product.nutrition.protein}</span></li>
    <li><span>Carbs</span><span>${product.nutrition.carbs}</span></li>
    <li><span>Fat</span><span>${product.nutrition.fat}</span></li>
  `;
  
  // Set up add to cart button
  document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    const quantity = parseInt(document.getElementById('quantity').value);
    addToCart(product, quantity);
  });
}

function loadRelatedProducts() {
  const relatedContainer = document.querySelector('.related-container');
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  if (!productId) return;
  
  // Get current product category
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  // Get 3 random products from same category (excluding current)
  const related = products
    .filter(p => p.category === product.category && p.id !== productId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  
  if (related.length === 0) {
    // If no related in same category, get any 3 random
    related = products
      .filter(p => p.id !== productId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }
  
  related.forEach(product => {
    relatedContainer.appendChild(createRelatedProductCard(product));
  });
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(product.price).replace('NGN', '₦');
  
  card.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
    </div>
    <div class="product-info">
      <h3 class="product-title">${product.name}</h3>
      <p class="product-price">${formattedPrice}</p>
      <p class="product-description">${product.description}</p>
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    </div>
  `;

  
  card.querySelector('.add-to-cart').addEventListener('click', () => {
    addToCart(product, 1);
  });
  
  return card;
}

function createRelatedProductCard(product) {
  const card = document.createElement('div');
  card.className = 'related-card';
  card.innerHTML = `
    <a href="product.html?id=${product.id}">
      <div class="related-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="related-info">
        <h4 class="related-title">${product.name}</h4>
        <p class="related-price">$${product.price.toFixed(2)}</p>
      </div>
    </a>
  `;
  
  return card;
}

function initCarousels() {
    const carousels = document.querySelectorAll('.product-carousel');
    
    carousels.forEach(carousel => {
      const container = carousel.querySelector('.product-container');
      const prevBtn = carousel.querySelector('.prev');
      const nextBtn = carousel.querySelector('.next');
      
      // Only add button events if not on mobile
      if (window.innerWidth > 768) {
        prevBtn.addEventListener('click', () => {
          container.scrollBy({ left: -300, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', () => {
          container.scrollBy({ left: 300, behavior: 'smooth' });
        });
      }
      
      // Improved touch events for mobile
      let isDragging = false;
      let startX = 0;
      let scrollLeft = 0;
      let velocity = 0;
      let animationFrame;
      let lastTime = 0;
  
      const handleTouchStart = (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        velocity = 0;
        lastTime = performance.now();
        cancelAnimationFrame(animationFrame);
      };
  
      const handleTouchMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5; // Adjust multiplier for sensitivity
        container.scrollLeft = scrollLeft - walk;
        
        // Calculate velocity for momentum scrolling
        const time = performance.now();
        const deltaTime = time - lastTime;
        if (deltaTime > 0) {
          velocity = (container.scrollLeft - scrollLeft) / deltaTime;
          lastTime = time;
          scrollLeft = container.scrollLeft;
        }
      };
  
      const handleTouchEnd = () => {
        isDragging = false;
        
        // Apply momentum scrolling
        if (Math.abs(velocity) > 0.1) {
          const momentumDuration = 1000; // ms
          const startTime = performance.now();
          const startScroll = container.scrollLeft;
          
          const animateMomentum = (time) => {
            const elapsed = time - startTime;
            if (elapsed < momentumDuration) {
              const deceleration = Math.exp(-elapsed / momentumDuration);
              container.scrollLeft = startScroll + velocity * deceleration * 100;
              animationFrame = requestAnimationFrame(animateMomentum);
            }
          };
          animationFrame = requestAnimationFrame(animateMomentum);
        }
      };
  
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);
    });
  }


// Cart functionality (shared with cart.js)
export function addToCart(product, quantity = 1) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  
  // Show notification
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.textContent = `${quantity} ${product.name} added to cart`;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

export function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  
  const countElements = document.querySelectorAll('#cart-count');
  countElements.forEach(el => {
    el.textContent = count;
  });
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);