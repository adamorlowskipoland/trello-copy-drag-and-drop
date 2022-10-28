<template>
  <div
    class="task"
    draggable="true"
    @dragover.prevent
    @dragenter.prevent
    @dragstart="pickUpTask($event, taskIndex, columnIndex)"
    @drop.stop="handleDrop($event, column.tasks, columnIndex, taskIndex)"
  >
    <span class="w-full shrink-0 font-bold">
      {{ task.name }}
    </span>
    <p
      v-if="task.description"
      class="w-full shrink-0 mt-1 text-sm"
    >
      {{ task.description }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useBoard } from '../composables/board';
import type { Column, Task } from '../models';

defineProps<{
  task: Task;
  column: Column;
  columnIndex: number;
  taskIndex: number;
}>()

const { pickUpTask, handleDrop } = useBoard();
</script>

<style scoped>
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-600 no-underline;
}
</style>