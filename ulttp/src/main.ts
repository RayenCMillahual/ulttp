import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { useAuthStore } from '@/stores/authStore';
import './assets/main.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
const authStore = useAuthStore();
authStore.loadCsrfToken()
  .then(() => console.log('[Main] CSRF Token inicializado correctamente.'))
  .catch((error) => console.error('[Main] Error al inicializar CSRF Token:', error));

app.mount('#app');
