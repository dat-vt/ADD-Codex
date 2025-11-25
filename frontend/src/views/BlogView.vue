<template>
  <div>
    <section class="page-hero">
      <div class="hero-inner">
        <p class="label-row"><span class="accent-line"></span><span>Blog</span></p>
        <h1>Latest field notes</h1>
        <p class="page-subtitle">Fresh drops from the road—trails, food maps, and culture reads for your next escape.</p>
      </div>
    </section>

    <main class="content">
      <section class="section">
        <div class="post-grid">
          <article v-for="post in posts" :key="post.title" class="card compact">
            <div class="thumb" :style="thumbStyle(post.image)">
              <span class="pill">{{ post.category }}</span>
            </div>
            <div class="card-body">
              <h3>{{ post.title }}</h3>
              <p class="muted">by {{ post.author }}</p>
              <div class="meta-row">
                <a href="#" class="read-more">Read more</a>
                <span class="date">{{ post.date }}</span>
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
import { fetchContent, type Post } from "../services/content";

const posts = ref<Post[]>([]);

const thumbStyle = (image: string) => ({
  backgroundImage: `linear-gradient(180deg, rgba(12,18,32,0.1), rgba(12,18,32,0.35)), url(${image})`
});

onMounted(async () => {
  const content = await fetchContent();
  posts.value = [...content.latest, ...content.trending];
});
</script>
