<script setup>
const baseUrl = import.meta.env.BASE_URL
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { productsData } from '../data.js';

const route = useRoute();

const products = ref(productsData);
const product = ref([]);
const btnVisible = ref(0);

const getProduct = () => {
  let productId = route.params.id;
  
  if (!productId) {
    const hash = window.location.hash.substring(1);
    if (hash) {
      productId = parseInt(hash);
    }
  } else {
    productId = parseInt(productId);
  }
  
  if (productId) {
    const foundProduct = products.value.find(item => item.id === productId);
    if (foundProduct) {
      product.value = [foundProduct];
      document.title = `Agridera - ${foundProduct.title}`;
      console.log("Знайдено товар:", foundProduct);
    } else {
      product.value = [];
      console.log("Товар не знайдено");
    }
  } else {
    product.value = [];
  }
};

const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const addToCart = (id) => {
  const cart = getCart();
  const existingProduct = cart.find(item => item.id === id);
  if (!existingProduct) {
    cart.push({ id: id, quantity: 1 });
    saveCart(cart);
    btnVisible.value = 1;
    console.log("Товар додано до кошика");
  } else {
    console.log("Товар вже є в кошику");
  }
};

const checkInCart = () => {
  if (product.value.length > 0) {
    const cart = getCart();
    const currentProductId = product.value[0].id;
    btnVisible.value = cart.some(item => item.id === currentProductId) ? 1 : 0;
  }
};

const addItem = (id) => {
  window.localStorage.setItem('prod', id);
};

const goBack = () => {
  window.location.href = 'products';
};

onMounted(() => {
  getProduct();
  checkInCart();
});
</script>

<template>
<body class="potato-one-page">
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

    <main class="main-content" v-if="product.length > 0">
        <div class="container">
            <router-link to="/products" class="back-link">← Return to all potatoes</router-link>
            <div class="product-header">
                <div class="info-column">
                    <div class="info-top">
                        <h1 class="product-id">{{ product[0].title }}</h1>
                        <h2 class="product-title">{{ product[0].short_text }}</h2>
                        
                        <div class="crosses-decor">
                            <img src="../assets/crosses.svg" alt="" aria-hidden="true">
                        </div>

                        <div class="promo-box">
                            <div class="promo-circle">
                                <img src="../assets/icons/promo-circle.svg" alt="">
                            </div>
                            <p class="promo-text">Very high yield and <br> excellent fruits quality!</p>
                        </div>
                    </div>

                    <div class="info-bottom">
                        <div class="section-label">Characteristics</div>
                        <div class="resistance-item">
                            <strong>Description</strong>
                            <p>{{ product[0].desc || product[0].description || 'No description available' }}</p>
                        </div>
                    </div>
                </div>

                <div class="media-column">
                        <img :src="`${baseUrl}img/products/potato/${product[0].image}`" :alt="product[0].title" class="main-img">                    <a href="#" class="pdf-btn" @click.prevent>
                        <img src="../assets/icons/pdf.svg" alt="pdf">
                        Download PDF
                    </a>
                    <button v-if="btnVisible === 0" @click="addToCart(product[0].id)" class="cart-btn add-to-cart-btn">
                        Add to cart
                    </button>
                    <router-link v-if="btnVisible === 1" to="/contact" class="cart-btn go-to-cart-btn">
                        Go to cart
                    </router-link>
                </div>

            </div>

            <div class="specs-grid">
                <div class="spec-group" v-if="product[0].plant && product[0].plant.length">
                    <h4>Plant</h4>
                    <ul>
                        <li v-for="(item, index) in product[0].plant" :key="index">{{ item }}</li>
                    </ul>
                </div>
                <div class="spec-group" v-if="product[0].cycle && product[0].cycle.length">
                    <h4>Cycle</h4>
                    <ul>
                        <li v-for="(item, index) in product[0].cycle" :key="index">{{ item }}</li>
                    </ul>
                </div>
                <div class="spec-group" v-if="product[0].fruit && product[0].fruit.length">
                    <h4>Fruit</h4>
                    <ul>
                        <li v-for="(item, index) in product[0].fruit" :key="index">{{ item }}</li>
                    </ul>
                </div>
                <div class="spec-group" v-if="product[0].color">
                    <h4>Color</h4>
                    <p>{{ product[0].color }}</p>
                </div>
            </div>
        </div>
    </main>

    <div v-else class="container" style="text-align: center; padding: 100px 20px;">
        <h2>Loading product information...</h2>
        <p>Please wait or </p><router-link to="/products" class="back-link">return to catalog</router-link>
    </div>

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
                <a href="https://www.linkedin.com" target="_blank" aria-label="LinkedIn">
                    <img src="../assets/icons/social networks/linkedin.svg" alt="LinkedIn">
                </a>
                <a href="https://www.instagram.com/" target="_blank" aria-label="Instagram">
                    <img src="../assets/icons/social networks/instagram.svg" alt="Instagram">
                </a>
                <a href="https://www.youtube.com" target="_blank" aria-label="YouTube">
                    <img src="../assets/icons/social networks/youtube.svg" alt="YouTube">
                </a>
                <a href="https://x.com" target="_blank" aria-label="Twitter">
                    <img src="../assets/icons/social networks/twitter.svg" alt="Twitter">
                </a>
                <a href="https://www.facebook.com" target="_blank" aria-label="Facebook">
                    <img src="../assets/icons/social networks/facebook.svg" alt="Facebook">
                </a>
            </div>
        </div>

        <div class="footer-bottom">
            AGRIDERA SEEDS & AGRICULTURE LTD. © 2020
        </div>
    </footer>
</body>
</template>
