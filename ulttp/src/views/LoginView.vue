<script setup lang="ts">
import { ref } from 'vue';
import SignInComponent from '@/components/SignInComponent.vue';
import RegisterComponent from '@/components/RegisterComponent.vue';

const isSignInVisible = ref(true);

function toggleComponent() {
  isSignInVisible.value = !isSignInVisible.value;
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-gray-100">
    <!-- Main Content -->
    <main class="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
      <h1 class="text-4xl font-extrabold text-indigo-400 mb-8">Bienvenido</h1>

      <!-- Auth Components -->
      <div>
        <SignInComponent v-if="isSignInVisible" />
        <RegisterComponent v-else />
      </div>

      <!-- Toggle Button -->
      <button
        @click="toggleComponent"
        class="mt-4 text-sm font-semibold text-indigo-400 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
      >
        {{ isSignInVisible ? 'Create Account' : 'Sign In' }}
      </button>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-gray-400 py-4">
      <div class="container mx-auto text-center">
        <p class="text-sm">
          &copy; 2024 - Creado por Rayen. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  </div>
</template>


<style scoped>
/* Estilos adicionales para animaciones (opcional) */
</style>
