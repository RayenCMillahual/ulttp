<template>
  <div class="bg-white shadow-xl rounded-lg p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-700">Tasks</h2>
      <div class="flex space-x-2">
        <button
          @click="setFilter('all')"
          :class="['px-4 py-2 rounded-md', filter === 'all' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700']"
        >
          All
        </button>
        <button
          @click="setFilter('completed')"
          :class="['px-4 py-2 rounded-md', filter === 'completed' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700']"
        >
          Completed
        </button>
        <button
          @click="setFilter('incompleted')"
          :class="['px-4 py-2 rounded-md', filter === 'incompleted' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700']"
        >
          Incomplete
        </button>
      </div>
    </div>
    <div v-if="tasksStore.loading" class="flex justify-center items-center">
      <div class="loader"></div>
    </div>
    <div v-else class="space-y-4">
      <div
        v-for="task in filteredTasks"
        :key="task.id"
        class="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow"
      >
        <div>
          <h3 class="text-lg font-medium text-gray-800">{{ task.title }}</h3>
          <p class="text-sm text-gray-600">{{ task.description }}</p>
        </div>
        <div class="flex space-x-2">
          <button
            @click="tasksStore.markAsCompletedLocally(task.id)"
            class="px-3 py-1 text-sm bg-green-500 text-white rounded"
            :disabled="task.isCompleted"
          >
            {{ task.isCompleted ? 'Completed' : 'Complete' }}
          </button>
          <button
            @click="tasksStore.deleteTask(task.id)"
            class="px-3 py-1 text-sm bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTasksStore } from '@/stores/tasksStore';
import { ref, computed } from 'vue';

const tasksStore = useTasksStore();
const filter = ref('all');

const filteredTasks = computed(() => {
  if (filter.value === 'completed') {
    return tasksStore.tasks.filter(task => task.isCompleted);
  } else if (filter.value === 'incompleted') {
    return tasksStore.tasks.filter(task => !task.isCompleted);
  }
  return tasksStore.tasks;
});

const setFilter = (newFilter: string) => {
  filter.value = newFilter;
};
</script>
