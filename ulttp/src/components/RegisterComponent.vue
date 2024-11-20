<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const username = ref('');
const email = ref('');
const password = ref('');
const authStore = useAuthStore();

async function handleRegister() {
  try {
    await authStore.loadCsrfToken();
    await authStore.registerUser({
      username: username.value,
      email: email.value,
      password: password.value,
    });
  } catch (error) {
    throw new Error(error);

    alert.error()
    console.error('[RegisterComponent] Error al registrar:', error);
  }
}
</script>

<template>
  <div class="bg-gradient-to-br from-pink-100 via-rose-200 to-rose-300 rounded-xl shadow-lg p-8 w-full max-w-md mx-auto">
    <h2 class="text-3xl font-extrabold text-rose-700 text-center mb-6">
      Registrarse
    </h2>
    <form @submit.prevent="handleRegister" class="space-y-6">
      <div>
        <label for="username" class="block text-sm font-medium text-rose-700">Nombre de usuario</label>
        <input
          v-model="username"
          type="text"
          id="username"
          class="mt-2 block w-full rounded-lg border-rose-300 shadow-sm focus:ring-rose-500 focus:border-rose-500 text-rose-900"
          placeholder="Escribe tu nombre de usuario"
          required
        />
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-rose-700">Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="mt-2 block w-full rounded-lg border-rose-300 shadow-sm focus:ring-rose-500 focus:border-rose-500 text-rose-900"
          placeholder="Escribe tu correo electrónico"
          required
        />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-rose-700">Contraseña</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="mt-2 block w-full rounded-lg border-rose-300 shadow-sm focus:ring-rose-500 focus:border-rose-500 text-rose-900"
          placeholder="Escribe tu contraseña"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
      >
        Registrarse
      </button>
    </form>
  </div>
</template>
