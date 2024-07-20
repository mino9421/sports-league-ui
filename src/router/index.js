import { createRouter, createWebHistory } from "vue-router";
import Leaderboard from "@/views/Leaderboard.vue";
import Schedule from "@/views/Schedule.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";

const routes = [
  { path: "/", component: Schedule },
  { path: "/schedule", component: Schedule },
  { path: "/leaderboard", component: Leaderboard },
  { path: "/:catchAll(.*)", component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
