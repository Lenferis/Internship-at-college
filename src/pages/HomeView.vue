<script setup>

</script>

<template>
 <body class="home-page">

<div class="header-hero-wrapper">
    <header class="header">
        <input type="checkbox" id="burger-toggle" class="burger-checkbox" aria-label="Toggle navigation menu">
        <label for="burger-toggle" class="burger-label" aria-label="Open menu">
            <span></span>
        </label>
        <div class="menu-overlay" aria-hidden="true"></div>
        
        <nav class="side-drawer-nav" aria-label="Mobile navigation">
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/">Company Profile</router-link></li>
                <li><router-link to="/products">Products</router-link></li>
                <li><router-link to="/">Services</router-link></li>
                <li><router-link to="/">R &amp; D</router-link></li>
                <li><router-link to="/contact">Contact</router-link></li>
            </ul>
        </nav>

        <div class="header-container">
            <router-link to="/" class="header-logo" aria-label="Agridera home">
                <img src="../assets/Logo.png" alt="Agridera logo">
            </router-link>
            <div class="header-right">
                <form class="search-form" role="search">
                    <input type="text" placeholder="Search" aria-label="Search">
                    <button type="submit" class="search-btn" aria-label="Submit search">
                        <img src="../assets/icons/search ico.svg" alt="">
                    </button>
                </form>
                <nav aria-label="Main navigation">
                    <ul class="nav-list">
                        <li><router-link to="/">Home</router-link></li>
                        <li><router-link to="/">Company Profile</router-link></li>
                        <li><router-link to="/products">Products</router-link></li>
                        <li><router-link to="/">Services</router-link></li>
                        <li><router-link to="/">R &amp; D</router-link></li>
                        <li><router-link to="/contact">Contact</router-link></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    <section class="hero-section">
        <div class="container">
            <div class="hero-content">
                <h1 class="hero-title">Agridera Seeds and Agriculture Ltd</h1>
                <router-link to="/products" class="hero-btn">Read More</router-link>
            </div>
        </div>
    </section>
</div>

<section class="products-bar" aria-label="Product categories">
    <div class="products-container">
        <div class="product-item">
            <div class="product-icon"><img src="../assets/icons/products/Wheat.svg" alt="Wheat"></div>
            <span class="product-name">Wheat</span>
        </div>
        <div class="product-item">
            <div class="product-icon"><img src="../assets/icons/products/Confection watermelon.svg" alt="Watermelon"></div>
            <span class="product-name">Confection Watermelon</span>
        </div>
        <div class="product-item">
            <div class="product-icon"><img src="../assets/icons/products/Clover.svg" alt="Clover"></div>
            <span class="product-name">Clover</span>
        </div>
        <div class="product-item">
            <div class="product-icon"><img src="../assets/icons/products/Confection Sunflower.svg" alt="Sunflower"></div>
            <span class="product-name">Confection Sunflower</span>
        </div>
        <div class="product-item">
            <div class="product-icon"><img src="../assets/icons/products/Tomato.svg" alt="Tomato"></div>
            <span class="product-name">Tomato</span>
        </div>
        <div class="product-item">
            <div class="product-icon"><img src="../assets/icons/products/Eggplant PO.svg" alt="Eggplant"></div>
            <span class="product-name">Eggplant&nbsp;P/O</span>
        </div>
        <div class="product-item">
            <div class="product-icon"><img src="../assets/icons/products/Ornamental Sunflower.svg" alt="Sunflower"></div>
            <span class="product-name">Ornamental Sunflower</span>
        </div>
    </div>
</section>

<section class="vision-mission">
    <div class="vision-mission-bg">
        <div class="container">
            <div class="info-row">
                <div class="info-text">
                    <h2 class="info-title">Vision</h2>
                    <div class="crosses-decor">
                        <img src="../assets/crosses.svg" alt="" aria-hidden="true">
                    </div>
                    <p class="info-desc">We believe in long-term growth with an emphasis on the potential of emerging markets. We also support the global need of feeding the growing population.</p>
                </div>
                <div class="info-img">
                    <img class="photo" src="../assets/vission-mission/vission.png" alt="Vision concept">
                </div>
            </div>

            <div class="info-row reverse">
                <div class="info-text">
                    <h2 class="info-title">Mission</h2>
                    <div class="crosses-decor">
                        <img src="../assets/crosses.svg" alt="" aria-hidden="true">
                    </div>
                    <p class="info-desc">Breeding and marketing seeds for advanced field crops and vegetable varieties that provide an added value to all supply chain partners.</p>
                </div>
                <div class="info-img">
                    <img class="photo" src="../assets/vission-mission/mission.png" alt="Mission concept">
                    <button class="play-btn" aria-label="Play video">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="main-activities">
    <div class="container">
        <h2 class="activities-main-title">Agridera's main activities</h2>
        <div class="crosses-main">
            <img src="../assets/crosses.svg" alt="" aria-hidden="true">
        </div>
        <div class="activities-grid">
            <div class="activity-card">
                <div class="activity-img"><img src="../assets/activ/Open field crop seeds.png" alt="Open field crop seeds"></div>
                <h3 class="activity-title">Open field crop seeds</h3>
                <div class="line" aria-hidden="true"></div>
                <p class="activity-list">wheat, cotton, legumes, hybrid confection sunflower</p>
            </div>
            <div class="activity-card">
                <div class="activity-img"><img src="../assets/activ/Vegetable seeds.png" alt="Vegetable seeds"></div>
                <h3 class="activity-title">Vegetable seeds</h3>
                <div class="line" aria-hidden="true"></div>
                <p class="activity-list">hybrid open field tomatoes, eggplant, onion, paprika, etc.</p>
            </div>
            <div class="activity-card">
                <div class="activity-img"><img src="../assets/activ/Ornamental seeds.png" alt="Ornamental seeds"></div>
                <h3 class="activity-title">Ornamental seeds</h3>
                <div class="line" aria-hidden="true"></div>
                <p class="activity-list">hybrid cut sunflowers, hybrid patio tomatoes, Bells of Irland, etc.</p>
            </div>
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
            <a href="https://www.linkedin.com" aria-label="LinkedIn">
                <img src="../assets/icons/social networks/linkedin.svg" alt="LinkedIn">
            </a>
            <a href="https://www.instagram.com/" aria-label="Instagram">
                <img src="../assets/icons/social networks/instagram.svg" alt="Instagram">
            </a>
            <a href="https://www.youtube.com" aria-label="YouTube">
                <img src="../assets/icons/social networks/youtube.svg" alt="YouTube">
            </a>
            <a href="https://x.com" aria-label="Twitter">
                <img src="../assets/icons/social networks/twitter.svg" alt="Twitter">
            </a>
            <a href="https://www.facebook.com" aria-label="Facebook">
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
