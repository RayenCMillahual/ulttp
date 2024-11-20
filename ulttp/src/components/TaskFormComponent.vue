<script setup lang="ts">
import { ref } from 'vue';
import { useTasksStore } from '@/stores/tasksStore';

const tasksStore = useTasksStore();
const title = ref('');
const description = ref('');

const createTask = async () => {
  try {
    await tasksStore.createTask({ title: title.value, description: description.value });
    title.value = '';
    description.value = '';
  } catch (error) {
    console.error('Error while creating task in the component:', error);
  }
};
</script>

<template>
  <div class="bg-gradient-to-b from-indigo-400 to-purple-500 rounded-xl p-8 shadow-lg">
    <h2 class="text-2xl font-bold text-white mb-6">Crea</h2>
    <form @submit.prevent="createTask">
      <div class="mb-4">
        <label for="title" class="block text-lg font-medium text-white mb-2">Titulo</label>
        <input
          v-model="title"
          type="text"
          id="title"
          class="w-full px-4 py-3 border-none rounded-lg shadow-md focus:ring-4 focus:ring-purple-300"
          placeholder="Enter task title"
          required
        />
      </div>
      <div class="mb-4">
        <label for="description" class="block text-lg font-medium text-white mb-2">Descripcion</label>
        <textarea
          v-model="description"
          id="description"
          rows="4"
          class="w-full px-4 py-3 border-none rounded-lg shadow-md focus:ring-4 focus:ring-purple-300"
          placeholder="Enter task description"
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition duration-300"
      >
        Añadir
      </button>
    </form>
  </div>
</template>
