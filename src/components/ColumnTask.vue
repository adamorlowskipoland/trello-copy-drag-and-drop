<template>
  <drop-wrapper class="mb-2" @drop="handleDrop($event, columnIndex, taskIndex)" v-slot="{ isOver }">
    <drag-wrapper
      :transfer-data="{ type: 'task', fromColumnIndex: columnIndex, fromTaskIndex: taskIndex }"
      v-slot="{ isDragging }"
    >
      <div class="task">
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
    </drag-wrapper>
  </drop-wrapper>
</template>

<script lang="ts" setup>
import { useBoard } from '../composables/board';
import type { Column, Task } from '../models';
import DragWrapper from '../components/drag-and-drop/DragWrapper.vue';
import DropWrapper from '../components/drag-and-drop/DropWrapper.vue';

defineProps<{
  task: Task;
  column: Column;
  columnIndex: number;
  taskIndex: number;
}>()

const { handleDrop } = useBoard();
</script>

<style scoped>
.task {
  @apply flex items-center flex-wrap shadow p-2 rounded bg-white text-gray-600 no-underline;
}
</style>