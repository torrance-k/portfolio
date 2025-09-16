import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: () => import("../pages/Home.vue") },
    {
      path: "/projects",
      name: "projects",
      component: () => import("../components/Projects.vue"),
    },
    {
      path: "/projects/:id",
      name: "project",
      props: true,
      component: () => import("../pages/ProjectDetail.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../pages/NotFound.vue"),
    },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved;
    if (to.hash) return { el: to.hash, top: 96, behavior: "smooth" };
    return { top: 0 };
  },
});

export default router;
