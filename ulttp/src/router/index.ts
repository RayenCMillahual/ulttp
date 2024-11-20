import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const routes = [
  { path: '/', component: () => import('@/views/HomeView.vue') },
  { path: '/login', component: () => import('@/views/LoginView.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  await authStore.loadCsrfToken();

  if (!authStore.isAuthenticated && to.path !== '/login') {
    return next('/login'); // Redirigir a login si no está autenticado
  }

  next();
});

export default router;
