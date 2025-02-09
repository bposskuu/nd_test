import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import NotesView from "@/views/NotesView.vue";
import {useUserStore} from "@/stores/user.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/notes',
      component: NotesView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/:catchAll(.*)",
      redirect: '/'
    },
  ],
})

router.beforeEach((to, from, next) => {
  const user = useUserStore()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (user.user.id !== -1) next()
    else next('/')
  }
  else {
    next()
  }
})

export default router
