import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import AboutView from "./views/AboutView.vue";
import BlogView from "./views/BlogView.vue";
import CategoriesView from "./views/CategoriesView.vue";
import ShopView from "./views/ShopView.vue";
import ContactView from "./views/ContactView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/about", name: "about", component: AboutView },
    { path: "/blog", name: "blog", component: BlogView },
    { path: "/categories", name: "categories", component: CategoriesView },
    { path: "/shop", name: "shop", component: ShopView },
    { path: "/contact", name: "contact", component: ContactView }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
