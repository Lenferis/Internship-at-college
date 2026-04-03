<script setup>
const baseUrl = import.meta.env.BASE_URL
import { ref, onMounted } from 'vue';
import { productsData } from '../data.js';

const cartItems = ref([]);
const contactFields = ref({
  name: '',
  company: '',
  position: '',
  city: '',
  country: '',
  telephone: '',
  email: '',
  userType: 'seed producer',
  otherSpecify: '',
  interestedIn: '',
  captcha: ''
});
const errors = ref({
  name: '',
  email: '',
  telephone: '',
  captcha: ''
});
const orderSubmitted = ref(false);

const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const loadCartItems = () => {
  const cart = getCart();
  const items = [];
  cart.forEach(cartItem => {
    const product = productsData.find(p => p.id === cartItem.id);
    if (product) items.push({ ...product, quantity: cartItem.quantity });
  });
  cartItems.value = items;
};

const removeFromCart = (id) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== id);
  saveCart(updatedCart);
  loadCartItems();
};

const clearCart = () => {
  if (confirm('Are you sure you want to remove all items from your cart?')) {
    saveCart([]);
    loadCartItems();
  }
};

const validateName = () => {
  if (!contactFields.value.name.trim()) {
    errors.value.name = 'Name is required';
    return false;
  } else if (contactFields.value.name.length < 2) {
    errors.value.name = 'Name must be at least 2 characters';
    return false;
  } else {
    errors.value.name = '';
    return true;
  }
};

const validateEmail = () => {
  const email = contactFields.value.email.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.value.email = 'Email is required';
    return false;
  } else if (!emailPattern.test(email)) {
    errors.value.email = 'Please enter a valid email address (e.g., name@example.com)';
    return false;
  } else {
    errors.value.email = '';
    return true;
  }
};

const validateTelephone = () => {
  const phone = contactFields.value.telephone.trim();
  if (phone === '') {
    errors.value.telephone = '';
    return true;
  }
  const phonePattern = /^[\+\s0-9\-\(\)]{5,20}$/;
  if (!phonePattern.test(phone)) {
    errors.value.telephone = 'Enter a valid phone number (digits, spaces, +, -, parentheses)';
    return false;
  } else {
    errors.value.telephone = '';
    return true;
  }
};

const validateCaptcha = () => {
  const expectedCaptcha = 'AGRI2026';
  if (!contactFields.value.captcha.trim()) {
    errors.value.captcha = 'Please enter the captcha code';
    return false;
  } else if (contactFields.value.captcha.trim() !== expectedCaptcha) {
    errors.value.captcha = `Captcha code is incorrect. Expected: ${expectedCaptcha}`;
    return false;
  } else {
    errors.value.captcha = '';
    return true;
  }
};

const validateForm = () => {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validateTelephone();
  const isCaptchaValid = validateCaptcha();
  return isNameValid && isEmailValid && isPhoneValid && isCaptchaValid;
};

const makeOrder = () => {
  if (!validateForm()) {
    const firstErrorField = document.querySelector('.error-message');
    if (firstErrorField) {
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
  
  console.log("Order Details:", { ...contactFields.value, products: cartItems.value });
  saveCart([]);
  orderSubmitted.value = true;
};


onMounted(() => {
  loadCartItems();
});
</script>

<template>
<body class="contact-page">
    <div id="app">
        <header class="header">
            <input type="checkbox" id="burger-toggle" class="burger-checkbox" aria-label="Toggle navigation menu">
            <label for="burger-toggle" class="burger-label" aria-label="Open menu">
                <span></span>
            </label>
            <div class="menu-overlay" aria-hidden="true"></div>
            
            <nav class="side-drawer-nav" aria-label="Mobile navigation">
                <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/company">Company Profile</router-link></li>
                    <li><router-link to="/products">Products</router-link></li>
                    <li><router-link to="/services">Services</router-link></li>
                    <li><router-link to="/rd">R &amp; D</router-link></li>
                    <li><router-link to="/contact">Contact</router-link></li>
                </ul>
            </nav>

            <div class="header-container">
                <router-link to="/" class="header-logo" aria-label="Agridera home">
                    <img src="../assets/Logo.png" alt="Agridera logo">
                </router-link>
                <div class="header-right">
                    <form class="search-form" role="search" @submit.prevent>
                        <input type="text" placeholder="Search" aria-label="Search">
                        <button type="submit" class="search-btn" aria-label="Submit search">
                            <img src="../assets/icons/search ico.svg" alt="">
                        </button>
                    </form>
                    <nav aria-label="Main navigation">
                        <ul class="nav-list">
                            <li><router-link to="/">Home</router-link></li>
                            <li><router-link to="/company">Company Profile</router-link></li>
                            <li><router-link to="/products">Products</router-link></li>
                            <li><router-link to="/services">Services</router-link></li>
                            <li><router-link to="/rd">R &amp; D</router-link></li>
                            <li><router-link to="/contact">Contact</router-link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>

        <main>
            <div class="contact-banner">
                <div class="banner-img"></div>
            </div>

            <div class="contact-main">
                <h1>Contact us</h1>
                <div class="crosses-decor">
                    <img src="../assets/crosses.svg" alt="">
                </div>

                <div v-if="cartItems.length > 0" class="cart-table-container">
                    <div class="cart-header">
                        <h2>Your Cart Items</h2>
                        <button @click="clearCart" class="clear-cart-btn" title="Clear entire cart">Clear Cart</button>
                    </div>
                    <div class="cart-table-wrapper">
                        <table class="cart-table">
                            <thead>
                                <tr><th>Image</th><th>Product Name</th><th>Short Description</th><th>Action</th></tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in cartItems" :key="item.id">
                                    <td class="cart-image" data-label="Image">
                                        <img :src="`${baseUrl}img/products/potato/${item.image}`" :alt="item.title" width="60">
                                    </td>
                                    <td class="cart-title" data-label="Product Name">{{ item.title }}</td>
                                    <td class="cart-desc" data-label="Description">{{ item.short_text }}</td>
                                    <td class="cart-remove" data-label="Remove">
                                        <button @click="removeFromCart(item.id)" class="remove-btn">✕</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <form v-if="!orderSubmitted" @submit.prevent="makeOrder" class="contact-form">
                    <div class="left-column">
                        <div class="form-group">
                            <label>Name *</label>
                            <input type="text" v-model="contactFields.name" @blur="validateName" class="input-field" :class="{ 'error': errors.name }" required>
                            <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
                        </div>
                        <div class="form-group">
                            <label>Company Name</label>
                            <input type="text" v-model="contactFields.company" class="input-field">
                        </div>
                        <div class="form-group">
                            <label>Position</label>
                            <input type="text" v-model="contactFields.position" class="input-field">
                        </div>
                        <div class="form-group">
                            <label>City</label>
                            <input type="text" v-model="contactFields.city" class="input-field">
                        </div>
                        <div class="form-group">
                            <label>Country</label>
                            <input type="text" v-model="contactFields.country" class="input-field">
                        </div>
                        <div class="form-group">
                            <label>Telephone</label>
                            <input type="tel" v-model="contactFields.telephone" @blur="validateTelephone" class="input-field" :class="{ 'error': errors.telephone }">
                            <span class="error-message" v-if="errors.telephone">{{ errors.telephone }}</span>
                        </div>
                        <div class="form-group">
                            <label>Email *</label>
                            <input type="email" v-model="contactFields.email" @blur="validateEmail" class="input-field" :class="{ 'error': errors.email }" required>
                            <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
                        </div>
                    </div>

                    <div class="right-column">
                        <div class="form-group">
                            <label>You are a</label>
                            <select v-model="contactFields.userType" class="input-field select-field">
                                <option>seed producer</option>
                                <option>distributor</option>
                                <option>grower</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>If other, please specify</label>
                            <input type="text" v-model="contactFields.otherSpecify" class="input-field">
                        </div>
                        <div class="form-group">
                            <label>You are interested in</label>
                            <textarea v-model="contactFields.interestedIn" class="textarea-field"></textarea>
                        </div>

                        <div class="captcha-submit-wrapper">
                            <span class="error-message" v-if="errors.captcha">{{ errors.captcha }}</span>
                            <div class="captcha-row">
                                <div class="captcha-group">
                                    <label>Please type this code *</label>
                                    <div class="captcha-code-wrapper">
                                        <div class="captcha-code"><img src="../assets/captcha code.png" alt="Captcha"></div>
                                        <input type="text" v-model="contactFields.captcha" @blur="validateCaptcha" class="input-field input-captcha" :class="{ 'error': errors.captcha }" required>
                                    </div>
                                    
                                </div>
                                <button type="submit" class="submit-btn">Send Message</button>
                                
                            </div>
                        </div>
                    </div>
                </form>

                <div v-else class="order-success">
                    <h2>Thank you for your order!</h2>
                    <div class="order-details">
                        <h3>Order Details:</h3>
                        <p><strong>Name:</strong> {{ contactFields.name }}</p>
                        <p><strong>Email:</strong> {{ contactFields.email }}</p>
                        <p><strong>Company:</strong> {{ contactFields.company || 'Not specified' }}</p>
                        <p><strong>Position:</strong> {{ contactFields.position || 'Not specified' }}</p>
                        <p><strong>City:</strong> {{ contactFields.city || 'Not specified' }}</p>
                        <p><strong>Country:</strong> {{ contactFields.country || 'Not specified' }}</p>
                        <p><strong>Telephone:</strong> {{ contactFields.telephone || 'Not specified' }}</p>
                        <p><strong>User Type:</strong> {{ contactFields.userType }}</p>
                        <p><strong>Other Specify:</strong> {{ contactFields.otherSpecify || 'Not specified' }}</p>
                        <p><strong>Interested In:</strong> {{ contactFields.interestedIn || 'Not specified' }}</p>
                        <h3>Ordered Products:</h3>
                        <ul>
                            <li v-for="item in cartItems" :key="item.id">
                                {{ item.title }} - {{ item.short_text }}
                            </li>
                        </ul>
                    </div>
                    <router-link to="/products" class="continue-shopping-btn" >Continue Shopping</router-link>
                </div>
            </div>

            <section class="address-section">
                <div class="address-container">
                    <h2 class="address-title">Our Address</h2>
                    <div class="address-line"></div>
                    <div class="address-content">
                        <p>AGRIDERA Seeds & Agriculture Ltd.</p>
                        <p>P.O Box 103,</p>
                        <p>Gedera 70750, Israel.</p>
                        <p>Telephone: <span class="phone-number">+972 8 944 9222</span></p>
                    </div>
                </div>
            </section>
        </main>

        <footer class="footer">
            <div class="footer-container">
                <nav class="footer-menu">
                    <router-link to="/">PROFILE</router-link>
                    <router-link to="/">MANAGEMENT</router-link>
                    <router-link to="/products">PRODUCTS</router-link>
                    <router-link to="/">R&amp;D</router-link>
                    <router-link to="/">LINKS</router-link>
                    <router-link to="/">SITEMAP</router-link>
                    <router-link to="/contact">CONTACT</router-link>
                </nav>
                <div class="social-icons">
                    <a href="https://www.linkedin.com" target="_blank" aria-label="LinkedIn"><img src="../assets/icons/social networks/linkedin.svg" alt="LinkedIn"></a>
                    <a href="https://www.instagram.com/" target="_blank" aria-label="Instagram"><img src="../assets/icons/social networks/instagram.svg" alt="Instagram"></a>
                    <a href="https://www.youtube.com" target="_blank" aria-label="YouTube"><img src="../assets/icons/social networks/youtube.svg" alt="YouTube"></a>
                    <a href="https://x.com" target="_blank" aria-label="Twitter"><img src="../assets/icons/social networks/twitter.svg" alt="Twitter"></a>
                    <a href="https://www.facebook.com" target="_blank" aria-label="Facebook"><img src="../assets/icons/social networks/facebook.svg" alt="Facebook"></a>
                </div>
            </div>
            <div class="footer-bottom">
                AGRIDERA SEEDS & AGRICULTURE LTD. © 2020
            </div>
        </footer>
    </div>
</body>
</template>
