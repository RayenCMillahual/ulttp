<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

const email = ref('');
const password = ref('');

const login = async () => {
  try {
    await authStore.loadCsrfToken();
    await authStore.login({ email: email.value, password: password.value });
  } catch (error) {
    console.error('Error during login:', error);
  }
};
</script>

<template>
  <div class="bg-gradient-to-r from-pink-300 to-rose-300 shadow-lg rounded-xl px-8 py-10 max-w-md mx-auto">
    <h1 class="text-3xl font-extrabold text-center text-white mb-6">Iniciar Sesión</h1>
    <form @submit.prevent="login">
      <div class="mb-6">
        <label for="email" class="block text-lg font-medium text-white mb-2">Correo electrónico</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="w-full px-4 py-3 border-none rounded-lg shadow-md focus:ring-4 focus:ring-rose-300"
          placeholder="Escribe tu correo electrónico"
          required
        />
      </div>
      <div class="mb-6">
        <label for="password" class="block text-lg font-medium text-white mb-2">Contraseña</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="w-full px-4 py-3 border-none rounded-lg shadow-md focus:ring-4 focus:ring-rose-300"
          placeholder="Escribe tu contraseña"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg transition duration-300"
      >
        Iniciar Sesión
      </button>
    </form>
  </div>
</template>
