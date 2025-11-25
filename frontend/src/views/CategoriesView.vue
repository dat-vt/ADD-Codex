<template>
  <div>
    <section class="page-hero">
      <div class="hero-inner">
        <p class="label-row"><span class="accent-line"></span><span>Categories</span></p>
        <h1>Pick your lane</h1>
        <p class="page-subtitle">Browse stories by mood—food, nature, culture, or quick-hit travel tips.</p>
      </div>
    </section>

    <main class="content">
      <section class="section categories">
        <div class="category-row">
          <button v-for="tag in tags" :key="tag" class="chip ghost">{{ tag }}</button>
        </div>
      </section>

      <section class="section">
        <div class="post-grid">
          <article v-for="item in featured" :key="item.title" class="card compact">
            <div class="thumb" :style="thumbStyle(item.image)">
              <span class="pill">{{ item.category }}</span>
            </div>
            <div class="card-body">
              <h3>{{ item.title }}</h3>
              <p class="muted">{{ item.description }}</p>
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchContent, type Post } from "../services/content";

type Feature = {
  title: string;
  description: string;
  category: string;
  image: string;
};

const tags = ref<string[]>([]);
const featured = ref<Feature[]>([]);

const thumbStyle = (image: string) => ({
  backgroundImage: `linear-gradient(180deg, rgba(12,18,32,0.1), rgba(12,18,32,0.35)), url(${image})`
});

onMounted(async () => {
  const content = await fetchContent();
  tags.value = content.categories;
  featured.value = content.trending.map((item: Post) => ({
    title: item.title,
    description: "Fresh routes, guides, and lists pulled from the API.",
    category: item.category,
    image: item.image
  }));
});
</script>
