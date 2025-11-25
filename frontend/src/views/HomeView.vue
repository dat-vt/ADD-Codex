<template>
  <div>
    <section class="hero" :style="{ backgroundImage: `linear-gradient(120deg, rgba(0,0,0,0.4), rgba(10,14,30,0.75)), url(${heroImage})` }">
      <div class="hero-inner">
        <div class="hero-text">
          <p class="hero-kicker">Lifestyle | Travel Blog</p>
          <h1>EXPLORE</h1>
        </div>
      </div>
    </section>

    <main class="content">
      <section class="section">
        <div class="section-head">
          <div class="label-row"><span class="accent-line"></span><span>Highlighted Articles</span></div>
          <h2>Featured Posts</h2>
        </div>
        <div class="featured-grid">
          <article
            v-for="post in featuredPosts"
            :key="post.title"
            class="card featured"
            :style="{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.8)), url(${post.image})` }"
          >
            <div class="card-top">
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

      <section class="section">
        <div class="section-head">
          <div class="label-row"><span class="accent-line"></span><span>Recent Articles</span></div>
          <h2>Latest Posts</h2>
        </div>
        <div class="post-grid">
          <article v-for="post in latestPosts" :key="post.title" class="card compact">
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

      <section class="section categories">
        <div class="label-row"><span class="accent-line"></span><span>Categories</span></div>
        <div class="category-row">
          <button v-for="tag in categories" :key="tag" class="chip ghost">{{ tag }}</button>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div class="label-row"><span class="accent-line"></span><span>Popular Articles</span></div>
          <h2>Trending Posts</h2>
        </div>
        <div class="post-grid">
          <article v-for="post in trendingPosts" :key="post.title" class="card compact">
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

      <section class="section">
        <div class="section-head">
          <div class="label-row"><span class="accent-line"></span><span>Travel Shop</span></div>
          <h2>Curated gear picks</h2>
        </div>
        <div class="post-grid">
          <article v-for="item in shopItems" :key="item.title" class="card compact">
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

      <section class="newsletter" :style="{ backgroundImage: `linear-gradient(120deg, rgba(10,14,30,0.8), rgba(10,14,30,0.8)), url(${newsletterImage})` }">
        <div>
          <p class="label-row"><span class="accent-line"></span><span>Stay in the loop</span></p>
          <h3>Subscribe To Our Newsletter</h3>
          <p class="muted">Sed tempus porta lorem, id iaculis neque posuere a. Nam efficitur porta pellentesque.</p>
        </div>
        <form class="subscribe" @submit.prevent>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email address" />
          <button type="submit" class="button primary">Submit</button>
        </form>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchContent, type Post, type ShopItem } from "../services/content";

const heroImage =
  "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?auto=format&fit=crop&w=1600&q=80";
const newsletterImage =
  "https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=1600&q=80";

const featuredPosts = ref<Post[]>([]);
const latestPosts = ref<Post[]>([]);
const trendingPosts = ref<Post[]>([]);
const categories = ref<string[]>([]);
const shopItems = ref<ShopItem[]>([]);

const thumbStyle = (image: string) => ({
  backgroundImage: `linear-gradient(180deg, rgba(12,18,32,0.1), rgba(12,18,32,0.35)), url(${image})`
});

onMounted(async () => {
  const content = await fetchContent();
  featuredPosts.value = content.featured;
  latestPosts.value = content.latest;
  trendingPosts.value = content.trending;
  categories.value = content.categories;
  shopItems.value = content.shop;
});
</script>
