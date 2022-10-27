import { createRouter, createWebHashHistory } from "vue-router";
import TheBoard from "../views/TheBoard.vue"

const routes = [
  {
    path: '/',
    component: TheBoard,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
