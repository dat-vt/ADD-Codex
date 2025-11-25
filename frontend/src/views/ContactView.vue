<template>
  <div>
    <section class="page-hero">
      <div class="hero-inner">
        <p class="label-row"><span class="accent-line"></span><span>Contact</span></p>
        <h1>Say hello</h1>
        <p class="page-subtitle">Pitch a story, share a tip, or ask about partnerships. We read every note.</p>
      </div>
    </section>

    <main class="content">
      <section class="section">
        <div class="contact-grid">
          <form class="card contact-card" @submit.prevent>
            <div class="field">
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div class="field">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" />
            </div>
            <div class="field">
              <label>Message</label>
              <textarea rows="4" placeholder="What can we help with?"></textarea>
            </div>
            <button class="button primary" type="submit">Send</button>
          </form>
          <div class="card contact-card info">
            <h3>Editorial</h3>
            <p class="muted">pitches@wanderlust.fm</p>
            <h3>Partnerships</h3>
            <p class="muted">partners@wanderlust.fm</p>
            <h3>Social</h3>
            <p class="muted">@wanderlust.fm on all platforms</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
