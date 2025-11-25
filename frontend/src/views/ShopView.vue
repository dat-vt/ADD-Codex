<template>
  <div>
    <section class="page-hero">
      <div class="hero-inner">
        <p class="label-row"><span class="accent-line"></span><span>Shop</span></p>
        <h1>Travel gear we use</h1>
        <p class="page-subtitle">Packs, notebooks, and photo tools we actually carry on assignment.</p>
      </div>
    </section>

    <main class="content">
      <section class="section">
        <div class="post-grid">
          <article v-for="item in items" :key="item.title" class="card compact">
            <div class="thumb" :style="thumbStyle(item.image)">
              <span class="pill">{{ item.tag }}</span>
            </div>
            <div class="card-body">
              <h3>{{ item.title }}</h3>
              <p class="muted">{{ item.subtitle }}</p>
              <div class="meta-row">
                <a href="#" class="read-more">View</a>
                <span class="date">${{ item.price }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchContent, type ShopItem } from "../services/content";

const items = ref<ShopItem[]>([]);

const thumbStyle = (image: string) => ({
  backgroundImage: `linear-gradient(180deg, rgba(12,18,32,0.1), rgba(12,18,32,0.35)), url(${image})`
});

onMounted(async () => {
  const content = await fetchContent();
  items.value = content.shop;
});
</script>
