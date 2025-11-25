<template>
  <div class="page">
    <header class="topbar">
      <div class="topbar-inner">
        <div class="brand">
          <span class="logo-dot"></span>
          Wanderlust
        </div>
        <nav class="menu">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/blog">Blog</RouterLink>
          <RouterLink to="/categories">Categories</RouterLink>
          <RouterLink to="/shop">Shop</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
          <button class="icon-btn" aria-label="Cart">🛒</button>
        </nav>
      </div>
    </header>

    <RouterView />

    <footer class="footer">
      <div class="footer-inner">
        <div class="brand">Wanderlust</div>
        <div class="footer-columns">
          <div>
            <h4>Main</h4>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
            <RouterLink to="/blog">Blog</RouterLink>
            <RouterLink to="/contact">Contact</RouterLink>
          </div>
          <div>
            <h4>Pages</h4>
            <RouterLink to="/categories">Categories</RouterLink>
            <RouterLink to="/shop">Shop</RouterLink>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div>
            <h4>Utilities</h4>
            <a href="#">Style Guide</a>
            <a href="#">Licenses</a>
            <a href="#">Instructions</a>
            <a href="#">Changelog</a>
          </div>
          <div class="footer-card">
            <span class="pill">Activities</span>
            <h4>Camping Survival Tips</h4>
            <a href="#" class="read-more">Read more</a>
          </div>
        </div>
        <div class="footer-meta">
          <p>© 2023 Wanderlust. All Rights Reserved.</p>
          <p>Built for the ADD Codex demo.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "./router";
</script>
