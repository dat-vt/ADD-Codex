<template>
  <div class="page">
    <header class="topbar">
      <div class="brand">
        <span class="logo-dot"></span>
        Wanderlust
      </div>
      <nav class="menu">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Blog</a>
        <a href="#">Categories</a>
        <a href="#">Shop</a>
        <a href="#">Contact</a>
        <button class="icon-btn" aria-label="Cart">🛒</button>
      </nav>
    </header>

    <section class="hero" :style="{ backgroundImage: `linear-gradient(120deg, rgba(0,0,0,0.4), rgba(10,14,30,0.75)), url(${heroImage})` }">
      <div class="hero-text">
        <p class="hero-kicker">Lifestyle | Travel Blog</p>
        <h1>EXPLORE</h1>
      </div>
    </section>

    <main class="content">
      <section class="section">
        <div class="section-head">
          <div class="label-row"><span class="accent-line"></span><span>Highlighted Articles</span></div>
          <h2>Featured Posts</h2>
        </div>
        <div class="featured-grid">
          <article v-for="post in featuredPosts" :key="post.title" class="card featured" :style="{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.8)), url(${post.image})` }">
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
            <div class="thumb" :style="{ backgroundImage: `url(${post.image})` }">
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
            <div class="thumb" :style="{ backgroundImage: `url(${post.image})` }">
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

    <footer class="footer">
      <div class="brand">Wanderlust</div>
      <div class="footer-columns">
        <div>
          <h4>Main</h4>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Author Story</a>
          <a href="#">Contact</a>
        </div>
        <div>
          <h4>Pages</h4>
          <a href="#">Blog</a>
          <a href="#">Categories</a>
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
    </footer>
  </div>
</template>

<script setup lang="ts">
type Post = {
  title: string;
  author: string;
  date: string;
  category: string;
  image: string;
};

const heroImage =
  "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?auto=format&fit=crop&w=1600&q=80";
const newsletterImage =
  "https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=1600&q=80";

const featuredPosts: Post[] = [
  {
    title: "Camping Survival Tips",
    author: "Mike Smith",
    date: "Oct 17, 2023",
    category: "Activities",
    image:
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Top 10 Lakes for Kayaking",
    author: "Mike Smith",
    date: "Oct 1, 2023",
    category: "Activities",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80"
  }
];

const latestPosts: Post[] = [
  {
    title: "Yosemite National Park",
    author: "Jane White",
    date: "18 Oct",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1508262022320-5b02f8ffb4fd?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Sizzling Adventures",
    author: "John Doe",
    date: "18 Oct",
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1514516430032-7f40ed986722?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Wonders of Nature",
    author: "Jane White",
    date: "18 Oct",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1508261306213-0f325d13a8a5?auto=format&fit=crop&w=900&q=80"
  }
];

const trendingPosts: Post[] = [
  {
    title: "Tips for Traveling",
    author: "Mike Smith",
    date: "17 Oct",
    category: "Tips",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "The Mystical Realm",
    author: "John Doe",
    date: "17 Oct",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Cultural Kaleidoscope",
    author: "Jane White",
    date: "17 Oct",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=900&q=80"
  }
];

const categories = ["All", "Food", "Activities", "Nature", "Tips", "Culture", "Outdoors"];
</script>
