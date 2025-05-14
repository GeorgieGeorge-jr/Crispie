import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js';
import { setDoc, doc } from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyCikOCOzD55nzpnfU3QD-yB6qWATIyfhns",
  authDomain: "crispie-shopping-site.firebaseapp.com",
  projectId: "crispie-shopping-site",
  storageBucket: "crispie-shopping-site.appspot.com",
  messagingSenderId: "496876896314",
  appId: "1:496876896314:web:0114ed8a7e78676c7e7503"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Auth UI elements
const signupForm = document.getElementById('signup-form');
const signinForm = document.getElementById('signin-form');
const signupMsg = document.getElementById('signup-message');
const signinMsg = document.getElementById('signin-message');
const logoutBtn = document.getElementById('logout-btn');

// Check auth state
onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const username = userDoc.data()?.username || '';
      
      // Update UI to show username
      const usernameElements = document.querySelectorAll('.username-display');
      usernameElements.forEach(el => {
        el.textContent = username;
        el.style.display = 'inline';
      });

      if (window.location.pathname === '/index.html') {
        window.location.href = 'shop.html';
      }
    } else {
      const usernameElements = document.querySelectorAll('.username-display');
      usernameElements.forEach(el => {
        el.style.display = 'none';
      });
    }
  });

// Sign up
 if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const username = document.getElementById('signup-username').value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Store additional user info in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        username: username,
        email: email,
        createdAt: new Date()
      });
      
      signupMsg.textContent = 'Sign up successful!';
      signupMsg.className = 'message success';
      signupForm.reset();
    } catch (error) {
      signupMsg.textContent = error.message;
      signupMsg.className = 'message error';
    }
  });
}

// Sign in
if (signinForm) {
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        signinMsg.textContent = 'Sign in successful!';
        signinMsg.className = 'message success';
        setTimeout(() => {
          window.location.href = 'shop.html';
        }, 1000);
      })
      .catch((error) => {
        signinMsg.textContent = error.message;
        signinMsg.className = 'message error';
      });
  });
}

// Logout
if (logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      window.location.href = 'index.html';
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  });
}

// Toggle between sign in and sign up forms
// ... (keep all the Firebase config and imports the same)

// Update the toggleForm function
window.toggleForm = function () {
  const container = document.getElementById('form-box');
  container.classList.toggle('active');
  
  // For mobile view
  if (window.innerWidth <= 768) {
    const signinForm = document.querySelector('.signin-container');
    const signupForm = document.querySelector('.signup-container');
    const overlay = document.querySelector('.overlay');
    
    if (container.classList.contains('active')) {
      signinForm.classList.remove('active');
      signupForm.classList.add('active');
      overlay.style.display = 'none';
    } else {
      signinForm.classList.add('active');
      signupForm.classList.remove('active');
      overlay.style.display = 'flex';
    }
  }
  
  if (signupMsg) signupMsg.textContent = '';
  if (signinMsg) signinMsg.textContent = '';
};

// Initialize form display on mobile
document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 768) {
    const signinForm = document.querySelector('.signin-container');
    const overlay = document.querySelector('.overlay');
    signinForm.classList.add('active');
    overlay.style.display = 'flex';
  }
});