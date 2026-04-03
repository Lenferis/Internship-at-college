<script setup>
const baseUrl = import.meta.env.BASE_URL
import { ref, onMounted } from 'vue';
import { productsData } from '../data'; // импорт данных о продуктах

// Реактивные данные
const products = ref([]);

// Функция для получения данных о продуктах
const loadProducts = () => {
  products.value = productsData;
};

// Функция для добавления товара в localStorage (для перехода на страницу товара)
const goToProduct = (productId) => {
  localStorage.setItem('selectedProductId', productId);
  // Используем router-link вместо прямого перехода
  // Но для совместимости с вашим текущим кодом оставляем
  window.location.href = `product#${productId}`;
};

// Загрузка данных при монтировании компонента
onMounted(() => {
  loadProducts();
});
</script>

<template>
<body class="potato-all-page">
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
                <form class="search-form" role="search" @submit.prevent="handleSearch">
                    <input type="text" v-model="searchQuery" placeholder="Search" aria-label="Search">
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

    <section class="potato-image-section" aria-label="potato image"></section>

    <section class="potato-text-section">
        <div class="container-potato">
            <h1 class="title">Agridera Fresh Market potato Hybrids</h1>
            <div class="crosses-decor">
                <img src="../assets/crosses.svg" alt="" aria-hidden="true">
            </div>
            
            <div class="content">
                <p>
                    Agridera aims to be one of the world's leading companies in the breeding, production, and marketing of potato seeds. 
                    <strong>We invest intensively in research and development to provide solutions to growers and consumers in numerous countries around the world.</strong> 
                    In particular, we breed improved disease-resistant cultivars adapted to different markets globally.
                </p>

                <p>
                    Currently, emphasis is placed on combining potato Yellow Leaf Curl Virus (TYLCV) and potato Spotted Wilt Virus (TSWV) resistances 
                    with other soil borne diseases into superior potato breeding lines and hybrids. Moreover, comprehensive efforts are being undertaken to 
                    develop varieties resistance to TBRFV virus (potato Brown Rugose Fruit Virus).
                </p>

                <p>
                    In terms of horticultural traits, breeding is for earliness, different fruit sizes, firmness, red fruit color, flavor, crack resistance, shelf life, 
                    and high/low temperature fruit set. Combinations of quality features and disease resistance are sought in a variety of types, namely 
                    round and elongated shapes.
                </p>

                <div class="highlight-box">
                    Agirdera potato breeding programs are focusing on three main segments: Greenhouse Indeterminate potatoes, Open-field Indeterminate potatoes, and Bush Type Open-field potatoes.
                </div>
            </div>
        </div>
    </section>

    <section class="potato-breeding-grid">
        <div class="grid-container">
            <div class="grid-column">
                <h2>Greenhouse potato Breeding Program</h2>
                <div class="hr-line"></div>
                <p>
                    <strong>This breeding is aimed for the Spanish and Turkish markets.</strong> For single and cluster picks, round fruit shape and resistances of TYLCV, TSWV, Nematodes and FORL (Fusarium oxysporum f.sp. radicis-lycopersici). Some hybrids may include more resistances, such as Cladosporium and Leveillula Taurica (Lv).
                </p>
            </div>

            <div class="grid-column">
                <h2>Open-field Indeterminate potatoes</h2>
                <div class="hr-line"></div>
                <p>
                    <strong>This breeding is for Brazilian, Moroccan, and Turkish markets.</strong> The main focus is on large round shape fruits (200 grams plus); and resistances of TYLCV, TSWV, Nematodes and FORL. In the near future, F3 (Fusarium oxysporum f.sp. lycopersici) will be included as basic resistance in our cultivars.
                </p>
            </div>

            <div class="grid-column">
                <h2>Open-field Bush Type potatoes</h2>
                <div class="hr-line"></div>
                <p>
                    <strong>This breeding is for Mediterranean markets.</strong> We breed round and elongated shapes, standard sizes (140-180 grams), and beef sizes (min. 180 grams up to 300 grams and more). We combine the resistances of TYLCV, TSWV and Nematodes as basic resistances in our hybrids. However, some hybrids may include more resistances, such as Cladosporium and Leveillula Taurica (Lv).
                </p>
            </div>
        </div>
    </section>

    <section class="distributors-section">
        <div class="limited-container">
            <div class="highlight-box-simple">
                Agridera operates through international and local distributers around the world.
            </div>
        </div>
    </section>

    <section class="potato-catalog-section">
        <div class="container-potato">
            <div class="catalog-grid" v-if="products.length > 0">
                <router-link 
                    v-for="product in products" 
                    :to="'/product/' + product.id" 
                    class="catalog-item" 
                    :key="product.id">
                    <div class="item-img">
                        <img :src="`${baseUrl}img/products/potato/${product.image}`" :alt="product.title">                    </div>
                    <div class="item-text">
                        <h3 class="item-title">{{ product.title }}</h3>
                        <p class="item-desc">{{ product.short_text }}</p>
                    </div>
                </router-link>
            </div>
            <div v-else class="loading">
                Loading products...
            </div>
        </div>
    </section>

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
