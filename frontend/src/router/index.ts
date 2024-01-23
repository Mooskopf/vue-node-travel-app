import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Index.vue'
import Destination from '@/pages/Destination.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Profile from '@/pages/Profile.vue'
import { useAuthStore } from '@/stores/authstore'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/destination/:destination',
      name: 'destination',
      component: Destination
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ]
})

router.beforeEach(to => {
  const authStore = useAuthStore();

  if (to.path !== "/register" && to.path !== "/login" && !authStore.token) {
    return '/login';
  }
});

export default router
