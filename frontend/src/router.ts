import {
  App,
  Component,
  InjectionKey,
  defineComponent,
  h,
  inject,
  shallowRef
} from "vue";
import HomeView from "./views/HomeView.vue";
import AboutView from "./views/AboutView.vue";
import BlogView from "./views/BlogView.vue";
import CategoriesView from "./views/CategoriesView.vue";
import ShopView from "./views/ShopView.vue";
import ContactView from "./views/ContactView.vue";

type RouteRecord = {
  path: string;
  name?: string;
  component: Component;
};

type RouterOptions = {
  history?: unknown;
  routes: RouteRecord[];
  scrollBehavior?: () => { top?: number } | void;
};

type Router = {
  currentRoute: ReturnType<typeof shallowRef<RouteRecord | null>>;
  push: (path: string) => void;
  install: (app: App) => void;
};

const RouterSymbol: InjectionKey<Router> = Symbol("router");

export const RouterLink = defineComponent({
  name: "RouterLink",
  props: {
    to: { type: String, required: true }
  },
  setup(props, { slots }) {
    const router = inject(RouterSymbol);

    const onNavigate = (event: MouseEvent) => {
      event.preventDefault();
      router?.push(props.to);
    };

    return () =>
      h(
        "a",
        {
          href: props.to,
          onClick: onNavigate
        },
        slots.default ? slots.default() : props.to
      );
  }
});

export const RouterView = defineComponent({
  name: "RouterView",
  setup() {
    const router = inject(RouterSymbol);

    return () => {
      const matched = router?.currentRoute.value;
      const ViewComponent = matched?.component;

      return ViewComponent ? h(ViewComponent) : null;
    };
  }
});

export const createWebHistory = () => ({});

export const createRouter = (options: RouterOptions): Router => {
  const matchRoute = (path: string) =>
    options.routes.find((route) => route.path === path) ||
    options.routes.find((route) => route.path === "/") ||
    null;

  const currentRoute = shallowRef<RouteRecord | null>(matchRoute(window.location.pathname));

  const setRoute = (path: string) => {
    const matched = matchRoute(path);
    currentRoute.value = matched;
  };

  const handlePopState = () => setRoute(window.location.pathname);

  window.addEventListener("popstate", handlePopState);

  const push = (path: string) => {
    if (path === window.location.pathname) {
      options.scrollBehavior?.();
      return;
    }

    window.history.pushState({}, "", path);
    setRoute(path);

    const position = options.scrollBehavior?.();
    if (position?.top !== undefined) {
      window.scrollTo({ top: position.top, behavior: "auto" });
    }
  };

  return {
    currentRoute,
    push,
    install(app: App) {
      app.provide(RouterSymbol, { currentRoute, push, install: () => {} });
      app.component("RouterLink", RouterLink);
      app.component("RouterView", RouterView);
    }
  };
};

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
