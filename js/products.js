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

// Category display order + labels, matching the physical Crispie menu
const categories = [
  { key: 'smoothie',   label: 'Smoothies' },
  { key: 'milkshake',  label: 'Milkshakes' },
  { key: 'juice',      label: 'Fresh Juices & Juice Blends' },
  { key: 'mocktail',   label: 'Mocktails' },
  { key: 'coffee',     label: 'Coffee' },
  { key: 'tea',        label: 'Infusions & Herbal Teas' },
  { key: 'vegsalad',   label: 'Vegetable Salads' },
  { key: 'fruitsalad', label: 'Fruit Salad' },
  { key: 'parfait',    label: 'Parfaits' },
  { key: 'sandwich',   label: 'Sandwiches & Wraps' },
  { key: 'pastry',     label: 'Pastries' },
  { key: 'pancake',    label: 'Pancakes & Omelette' },
  { key: 'water',      label: 'Water' }
];

// Full product catalog, taken from the in-store Crispie menu (Aug 2026).
// NOTE: most items are using placeholder/repurposed photos from the old
// catalog since we don't have real shots for the new menu yet — swap
// `image` paths out once real product photography is ready.
const products = [
  // ---- Coffee ----
  { id: 'c1', name: 'Americano Coffee', category: 'coffee', price: 3500, description: 'Bold, straightforward espresso and hot water.', image: 'ng/images/general.jpg' },
  { id: 'c2', name: 'Single Espresso', category: 'coffee', price: 3000, description: 'A concentrated shot of espresso.', image: 'ng/images/general.jpg' },
  { id: 'c3', name: 'Double Espresso', category: 'coffee', price: 3000, description: 'Two shots of espresso for an extra kick.', image: 'ng/images/general.jpg' },
  { id: 'c4', name: 'Cappuccino', category: 'coffee', price: 3500, description: 'Espresso topped with steamed milk and foam.', image: 'ng/images/general.jpg' },
  { id: 'c5', name: 'Caffe Latte', category: 'coffee', price: 3000, description: 'Espresso with steamed milk.', image: 'ng/images/general.jpg' },
  { id: 'c6', name: 'Iced Latte', category: 'coffee', price: 3000, description: 'Chilled espresso and milk over ice.', image: 'ng/images/general.jpg' },
  { id: 'c7', name: 'Hot Chocolate', category: 'coffee', price: 3000, description: 'Rich, creamy hot chocolate.', image: 'ng/images/general.jpg' },

  // ---- Infusions & Herbal Teas ----
  { id: 't1', name: 'Apple Cinnamon Tea', category: 'tea', price: 3500, description: 'Black tea, apple, cinnamon, mint leaf, honey.', image: 'ng/images/general.jpg' },
  { id: 't2', name: 'Lemon Ginger Tea', category: 'tea', price: 3500, description: 'Green tea, honey, lemon, ginger.', image: 'ng/images/general.jpg' },
  { id: 't3', name: 'Brawny Ginger Tea', category: 'tea', price: 3500, description: 'Black tea, ginger, lemon.', image: 'ng/images/general.jpg' },
  { id: 't4', name: 'The Royal Chai', category: 'tea', price: 3500, description: 'Black tea, condensed milk, cardamom.', image: 'ng/images/general.jpg' },
  { id: 't5', name: 'Arabian Tea', category: 'tea', price: 4000, description: 'Ginger, cinnamon, mint, lemon, honey.', image: 'ng/images/general.jpg' },
  { id: 't6', name: 'Ginger Glimer', category: 'tea', price: 4000, description: 'Iced tea, ginger, lemon, honey.', image: 'ng/images/general.jpg' },
  { id: 't7', name: 'Special Tea', category: 'tea', price: 2500, description: 'Choice of karak, jasmine, top tea, ginseng and more, served with extra creamer and sweetener.', image: 'ng/images/general.jpg' },

  // ---- Mocktails ----
  { id: 'm1', name: 'V. Pina Colada', category: 'mocktail', price: 5500, description: 'Coconut milk, pineapple, cherry, coconut syrup.', image: 'ng/images/general.jpg' },
  { id: 'm2', name: 'V. Mojito', category: 'mocktail', price: 4000, description: 'Mint leaf, syrup, soda water, lemon wedges.', image: 'ng/images/general.jpg' },
  { id: 'm3', name: 'V. Daiquiri', category: 'mocktail', price: 4000, description: 'Lemon, strawberry syrup, vanilla syrup.', image: 'ng/images/strawberry.jpg' },
  { id: 'm4', name: 'V. Strawberry Fields', category: 'mocktail', price: 4500, description: 'Strawberry puree, cranberry, vanilla syrup, lime.', image: 'ng/images/strawberry.jpg' },
  { id: 'm5', name: 'Chapman', category: 'mocktail', price: 5000, description: 'Fanta, Sprite, bitter lemon, angostura, grenadine syrup.', image: 'ng/images/general.jpg' },
  { id: 'm6', name: 'Fruit Punch', category: 'mocktail', price: 5500, description: 'Banana, pineapple, papaya, watermelon.', image: 'ng/images/general.jpg' },

  // ---- Fresh Juices & Blends ----
  { id: 'j1', name: 'Orange Juice', category: 'juice', price: 3000, description: 'Freshly squeezed orange juice.', image: 'ng/images/general.jpg' },
  { id: 'j2', name: 'Pineapple Juice', category: 'juice', price: 3000, description: 'Freshly pressed pineapple juice.', image: 'ng/images/general.jpg' },
  { id: 'j3', name: 'Watermelon Juice', category: 'juice', price: 2500, description: 'Chilled fresh watermelon juice.', image: 'ng/images/general.jpg' },
  { id: 'j4', name: 'Carrot Juice', category: 'juice', price: 4500, description: 'Freshly pressed carrot juice.', image: 'ng/images/general.jpg' },
  { id: 'j5', name: 'Tigernut Juice', category: 'juice', price: 2500, description: 'Traditional creamy tigernut juice.', image: 'ng/images/general.jpg' },
  { id: 'j6', name: 'Hibiscus Drink (Zobo)', category: 'juice', price: 2000, description: 'Classic Nigerian hibiscus drink.', image: 'ng/images/general.jpg' },
  { id: 'j7', name: 'Elixir', category: 'juice', price: 3500, description: 'Orange, pineapple, apple, ginger.', image: 'ng/images/general.jpg' },
  { id: 'j8', name: 'Citrus Mix', category: 'juice', price: 3500, description: 'Pineapple, orange, lemon, ginger.', image: 'ng/images/general.jpg' },
  { id: 'j9', name: 'Carrot Glow', category: 'juice', price: 4500, description: 'Pineapple, carrot, ginger, orange, apple.', image: 'ng/images/general.jpg' },
  { id: 'j10', name: 'Apple Blast', category: 'juice', price: 5500, description: 'Apple, beetroot, carrots, pineapple.', image: 'ng/images/general.jpg' },
  { id: 'j11', name: 'Green Pouch', category: 'juice', price: 5000, description: 'Kale, apple, cucumber, ginger, lime.', image: 'ng/images/greendetox.jpg' },
  { id: 'j12', name: 'Pinage', category: 'juice', price: 5500, description: 'Carrots, apple, celery, lemon.', image: 'ng/images/general.jpg' },
  { id: 'j13', name: 'Infusion', category: 'juice', price: 5000, description: 'Apple, beetroot, carrot, pineapple, orange, ginger.', image: 'ng/images/general.jpg' },
  { id: 'j14', name: 'Sugarcane Twist', category: 'juice', price: 4000, description: 'Sugarcane, ginger, lemon.', image: 'ng/images/general.jpg' },
  { id: 'j15', name: 'Citrus Zest', category: 'juice', price: 4500, description: 'Lemon, orange, green apple, celery.', image: 'ng/images/general.jpg' },
  { id: 'j16', name: 'Immune Boost', category: 'juice', price: 3500, description: 'Beetroot, celery, watermelon, ginger.', image: 'ng/images/general.jpg' },
  { id: 'j17', name: 'Boss Detox', category: 'juice', price: 5000, description: 'Cucumber, lemon, celery, apple, ginger.', image: 'ng/images/general.jpg' },
  { id: 'j18', name: 'Red Ice', category: 'juice', price: 4500, description: 'Beetroot, red apples, watermelon.', image: 'ng/images/general.jpg' },
  { id: 'j19', name: 'Cucumber and Apple', category: 'juice', price: 5000, description: 'Cucumber and apple, cold-pressed.', image: 'ng/images/general.jpg' },

  // ---- Smoothies ----
  { id: 's1', name: 'Nonstop Energy', category: 'smoothie', price: 5000, description: 'Avocado, banana, milk, nuts, honey.', image: 'ng/images/honeyalmond.jpg' },
  { id: 's2', name: 'Smoothie Queen', category: 'smoothie', price: 4500, description: 'Avocado, honey, pineapple.', image: 'ng/images/smoothie.jpg' },
  { id: 's3', name: 'Green Guage', category: 'smoothie', price: 4500, description: 'Spinach, mint, pineapple.', image: 'ng/images/greendetox.jpg' },
  { id: 's4', name: 'HiBerry', category: 'smoothie', price: 5000, description: 'Watermelon, banana, pineapple, strawberry, apple.', image: 'ng/images/berryblast.jpeg' },
  { id: 's5', name: 'The Boost', category: 'smoothie', price: 4500, description: 'Beetroot, ginger, honey.', image: 'ng/images/general.jpg' },
  { id: 's6', name: 'Honey Pump', category: 'smoothie', price: 4500, description: 'Spinach, banana, peanut, pineapple, honey.', image: 'ng/images/pbutter.jpg' },
  { id: 's7', name: 'Power Workout', category: 'smoothie', price: 4500, description: 'Orange, lemon, mint, cashew nuts.', image: 'ng/images/general.jpg' },
  { id: 's8', name: 'Red Alert', category: 'smoothie', price: 5000, description: 'Strawberry, banana, ice-cream, honey, milk.', image: 'ng/images/strawberry.jpg' },
  { id: 's9', name: 'Avocado Bliss', category: 'smoothie', price: 4500, description: 'Avocado, mango, honey, milk.', image: 'ng/images/mangococonut.webp' },
  { id: 's10', name: 'Symphony', category: 'smoothie', price: 4500, description: 'Papaya, banana, cucumber, honey, coconut milk.', image: 'ng/images/general.jpg' },
  { id: 's11', name: 'Cream Delight', category: 'smoothie', price: 5000, description: 'Oats, banana, peanut, cashew nuts, dates, milk.', image: 'ng/images/vanillachia.webp' },
  { id: 's12', name: 'Twilight', category: 'smoothie', price: 4500, description: 'Beetroot, apple, banana, milk, honey.', image: 'ng/images/general.jpg' },
  { id: 's13', name: 'Green Power', category: 'smoothie', price: 5000, description: 'Avocado, banana, spinach, kale, Greek yogurt.', image: 'ng/images/yogurtbowl.jpg' },
  { id: 's14', name: 'Red Bliss', category: 'smoothie', price: 5000, description: 'Beetroot, chia seeds, banana, watermelon, Greek yoghurt.', image: 'ng/images/berrybliss.jpeg' },
  { id: 's15', name: 'Blush', category: 'smoothie', price: 5000, description: 'Banana, mango, chia seed, strawberry, honey, milk.', image: 'ng/images/chiapudding.webp' },
  { id: 's16', name: 'Nourish Blend', category: 'smoothie', price: 5000, description: 'Mango, banana, chia seed, Greek yoghurt, coconut water.', image: 'ng/images/yogurtparfait.jpg' },
  { id: 's17', name: 'Watermelon Blast', category: 'smoothie', price: 4500, description: 'Watermelon, dates, condensed milk, ice cubes.', image: 'ng/images/general.jpg' },

  // ---- Milkshakes ----
  { id: 'mk1', name: 'Vanilla Milkshake', category: 'milkshake', price: 6500, description: 'Classic creamy vanilla milkshake.', image: 'ng/images/general.jpg' },
  { id: 'mk2', name: 'Chocolate Milkshake', category: 'milkshake', price: 6500, description: 'Rich chocolate milkshake.', image: 'ng/images/general.jpg' },
  { id: 'mk3', name: 'Strawberry Milkshake', category: 'milkshake', price: 6500, description: 'Sweet strawberry milkshake.', image: 'ng/images/strawberry.jpg' },
  { id: 'mk4', name: 'Banana Milkshake', category: 'milkshake', price: 6800, description: 'Smooth banana milkshake.', image: 'ng/images/general.jpg' },
  { id: 'mk5', name: 'Oreo Milkshake', category: 'milkshake', price: 6800, description: 'Cookies-and-cream milkshake.', image: 'ng/images/general.jpg' },
  { id: 'mk6', name: 'Peanut Butter Milkshake', category: 'milkshake', price: 6800, description: 'Creamy peanut butter milkshake.', image: 'ng/images/pbutter.jpg' },
  { id: 'mk7', name: 'Caramel Milkshake', category: 'milkshake', price: 6500, description: 'Sweet caramel milkshake.', image: 'ng/images/general.jpg' },

  // ---- Pastries ----
  { id: 'p1', name: 'Meat Pie', category: 'pastry', price: 1500, description: 'Savoury baked meat pie.', image: 'ng/images/general.jpg' },
  { id: 'p2', name: 'Chicken Pie', category: 'pastry', price: 1500, description: 'Savoury baked chicken pie.', image: 'ng/images/general.jpg' },
  { id: 'p3', name: 'Banana Cake', category: 'pastry', price: 3000, description: 'Moist banana cake slice.', image: 'ng/images/general.jpg' },
  { id: 'p4', name: 'Vanilla Cake', category: 'pastry', price: 2500, description: 'Classic vanilla cake slice.', image: 'ng/images/general.jpg' },
  { id: 'p5', name: 'Chocolate Cake', category: 'pastry', price: 2500, description: 'Rich chocolate cake slice.', image: 'ng/images/general.jpg' },
  { id: 'p6', name: 'Carrot Cake', category: 'pastry', price: 3500, description: 'Spiced carrot cake slice.', image: 'ng/images/general.jpg' },
  { id: 'p7', name: 'Red Velvet Cake', category: 'pastry', price: 2500, description: 'Classic red velvet cake slice.', image: 'ng/images/general.jpg' },

  // ---- Sandwiches & Wraps ----
  { id: 'sw1', name: 'Chicken Mayo Sandwich', category: 'sandwich', price: 4800, description: 'Chicken and mayo sandwich.', image: 'ng/images/cadotoast.jpg' },
  { id: 'sw2', name: 'Club Sandwich', category: 'sandwich', price: 5000, description: 'Classic layered club sandwich.', image: 'ng/images/general.jpg' },
  { id: 'sw3', name: 'Tortilla Chicken Wrap', category: 'sandwich', price: 6500, description: 'Grilled chicken tortilla wrap.', image: 'ng/images/general.jpg' },
  { id: 'sw4', name: 'Plantain Wrap', category: 'sandwich', price: 7000, description: 'Sweet plantain wrap.', image: 'ng/images/general.jpg' },

  // ---- Pancakes & Omelette ----
  { id: 'pc1', name: 'Pancakes', category: 'pancake', price: 4000, description: 'Fluffy stacked pancakes.', image: 'ng/images/general.jpg' },
  { id: 'pc2', name: 'Omelette', category: 'pancake', price: 2000, description: 'Freshly made omelette.', image: 'ng/images/general.jpg' },

  // ---- Fruit Salad ----
  { id: 'fs1', name: 'Fruit Salad (Big)', category: 'fruitsalad', price: 6500, description: 'A generous bowl of fresh seasonal fruit.', image: 'ng/images/general.jpg' },
  { id: 'fs2', name: 'Fruit Salad (Small)', category: 'fruitsalad', price: 4500, description: 'A light bowl of fresh seasonal fruit.', image: 'ng/images/general.jpg' },

  // ---- Parfaits (sold by volume) ----
  { id: 'pf1', name: 'Parfait 350ml', category: 'parfait', price: 4000, description: 'Layered yoghurt, granola and fruit parfait.', image: 'ng/images/yogurtparfait.jpg' },
  { id: 'pf2', name: 'Parfait 450ml', category: 'parfait', price: 5000, description: 'Layered yoghurt, granola and fruit parfait.', image: 'ng/images/yogurtbowl.jpg' },
  { id: 'pf3', name: 'Parfait 550ml', category: 'parfait', price: 7000, description: 'Layered yoghurt, granola and fruit parfait.', image: 'ng/images/berrybliss.jpeg' },
  { id: 'pf4', name: 'Parfait 750ml', category: 'parfait', price: 9000, description: 'Layered yoghurt, granola and fruit parfait.', image: 'ng/images/chiapudding.webp' },
  { id: 'pf5', name: 'Parfait 1 Litre', category: 'parfait', price: 14000, description: 'Layered yoghurt, granola and fruit parfait — great for sharing.', image: 'ng/images/vanillachia.webp' },
  { id: 'pf6', name: 'Parfait 1.5 Litres', category: 'parfait', price: 18000, description: 'Layered yoghurt, granola and fruit parfait — family size.', image: 'ng/images/general.jpg' },
  { id: 'pf7', name: 'Parfait 2 Litres', category: 'parfait', price: 28000, description: 'Layered yoghurt, granola and fruit parfait — party size.', image: 'ng/images/general.jpg' },

  // ---- Vegetable Salads ----
  { id: 'vs1', name: 'Chicken Avocado Salad (Big)', category: 'vegsalad', price: 9000, description: 'Grilled chicken, avocado and fresh greens.', image: 'ng/images/general.jpg' },
  { id: 'vs2', name: 'Chicken Avocado Salad (Small)', category: 'vegsalad', price: 6000, description: 'Grilled chicken, avocado and fresh greens.', image: 'ng/images/general.jpg' },
  { id: 'vs3', name: 'Chicken Salad (Big)', category: 'vegsalad', price: 8000, description: 'Grilled chicken over fresh mixed greens.', image: 'ng/images/caesarsalad.jpg' },
  { id: 'vs4', name: 'Chicken Salad (Small)', category: 'vegsalad', price: 5500, description: 'Grilled chicken over fresh mixed greens.', image: 'ng/images/caesarsalad.jpg' },
  { id: 'vs5', name: 'Mexican Salad (Big)', category: 'vegsalad', price: 9000, description: 'Mexican-style salad with beans, corn and peppers.', image: 'ng/images/quinoasalad.avif' },
  { id: 'vs6', name: 'Mexican Salad (Small)', category: 'vegsalad', price: 6000, description: 'Mexican-style salad with beans, corn and peppers.', image: 'ng/images/quinoasalad.avif' },
  { id: 'vs7', name: 'Mixed Vegetable Salad (Big)', category: 'vegsalad', price: 6000, description: 'Fresh seasonal mixed vegetable salad.', image: 'ng/images/wedgesalad.jpg' },
  { id: 'vs8', name: 'Mixed Vegetable Salad (Small)', category: 'vegsalad', price: 4000, description: 'Fresh seasonal mixed vegetable salad.', image: 'ng/images/wedgesalad.jpg' },

  // ---- Water ----
  { id: 'w1', name: 'Water', category: 'water', price: 500, description: 'Bottled water.', image: 'ng/images/general.jpg' }
];

// Format a naira amount consistently across the whole site
export function formatPrice(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount).replace('NGN', '₦');
}

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
  const sectionsWrap = document.getElementById('category-sections');

  // Get 5 random featured products from all categories
  const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
  const featuredProducts = shuffledProducts.slice(0, 5);

  featuredProducts.forEach(product => {
    featuredContainer.appendChild(createProductCard(product));
  });

  // Build one carousel section per category that has products
  categories.forEach(cat => {
    const items = products.filter(p => p.category === cat.key);
    if (items.length === 0) return;

    const section = document.createElement('section');
    section.className = 'category-section slide-up';
    section.innerHTML = `
      <h2 class="section-title">${cat.label}</h2>
      <div class="product-carousel">
        <button class="carousel-btn prev"><i class="fas fa-chevron-left"></i></button>
        <div class="product-container"></div>
        <button class="carousel-btn next"><i class="fas fa-chevron-right"></i></button>
      </div>
    `;

    const container = section.querySelector('.product-container');
    items.forEach(product => {
      container.appendChild(createProductCard(product));
    });

    sectionsWrap.appendChild(section);
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
  document.getElementById('product-price').textContent = formatPrice(product.price);
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('main-product-image').src = product.image;

  const thumbnails = document.querySelectorAll('.thumbnail img');
  thumbnails.forEach(img => { img.src = product.image; });

  // Populate nutrition facts if we have them, otherwise hide the section
  const nutritionSection = document.getElementById('nutrition-section');
  if (product.nutrition && nutritionSection) {
    const nutritionList = document.getElementById('nutrition-list');
    nutritionList.innerHTML = `
      <li><span>Calories</span><span>${product.nutrition.calories}</span></li>
      <li><span>Protein</span><span>${product.nutrition.protein}</span></li>
      <li><span>Carbs</span><span>${product.nutrition.carbs}</span></li>
      <li><span>Fat</span><span>${product.nutrition.fat}</span></li>
    `;
    nutritionSection.style.display = '';
  } else if (nutritionSection) {
    nutritionSection.style.display = 'none';
  }

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
  let related = products
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

  card.innerHTML = `
    <a href="product.html?id=${product.id}" class="product-image">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
    </a>
    <div class="product-info">
      <a href="product.html?id=${product.id}" class="product-title-link">
        <h3 class="product-title">${product.name}</h3>
      </a>
      <p class="product-price">${formatPrice(product.price)}</p>
      <p class="product-description">${product.description}</p>
      <button class="add-to-cart" data-id="${product.id}"><i class="fas fa-cart-plus"></i> Add to Cart</button>
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
        <p class="related-price">${formatPrice(product.price)}</p>
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
