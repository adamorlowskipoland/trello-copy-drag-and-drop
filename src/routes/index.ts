import { createRouter, createWebHistory } from "vue-router";
import TheBoard from "../views/TheBoard.vue"
import TheTask from "../views/TheTask.vue"

const routes = [
  {
    path: '/',
    name: 'Board',
    component: TheBoard,
    children: [
      {
        path: 'task/:id',
        name: 'Task',
        component: TheTask,
        props: true,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
