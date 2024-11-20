<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import TaskFormComponent from '@/components/TaskFormComponent.vue';
import TaskListComponent from '@/components/TaskListComponent.vue';

const authStore = useAuthStore();

const logout = async () => {
  await authStore.logout();
};
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
    <header class="h-16 px-6 flex items-center justify-between bg-gray-800 shadow-lg">
      <div class="flex items-center space-x-3">
        <h1 class="text-2xl font-extrabold text-indigo-400">Task Manager</h1>
      </div>
      <button
        v-if="authStore.isAuthenticated"
        @click="logout"
        class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
      >
        Logout
      </button>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8 lg:flex lg:space-x-6">
      <section class="lg:w-1/3 mb-8 lg:mb-0">
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
          <TaskFormComponent />
        </div>
      </section>
      <section class="lg:w-2/3">
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
          <TaskListComponent />
        </div>
      </section>
    </main>
    <footer class="bg-gray-800 text-gray-400 py-4">
      <div class="container mx-auto px-4 text-center">
        <p class="text-sm">
          &copy; 2024 - Creado por Rayen. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  </div>
</template>
