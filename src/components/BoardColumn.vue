<template>
  <drop-wrapper @drop="handleDrop($event, columnIndex)">
    <drag-wrapper
      :transfer-data="{ type: 'column', fromColumnIndex: columnIndex }"
    >
      <div class="column">
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <router-link
            v-for="(task, $taskIndex) of column.tasks"
            :key="task.id"
            :to="{ name: 'Task', params: { id: task.id } }"
          >
            <column-task
              :column="column"
              :task="task"
              :column-index="columnIndex"
              :task-index="$taskIndex"
            />
          </router-link>

          <input
            type="text"
            class="block p-2 w-full bg-transparent"
            placeholder="+ Enter new task"
            @keyup.enter="addTask($event, column.tasks)"
          >
        </div>
      </div>
    </drag-wrapper>
  </drop-wrapper>
</template>
<script setup lang="ts">
import { useBoard } from '../composables/board';
import type { Column, Task } from '../models';
import ColumnTask from '../components/ColumnTask.vue';
import DragWrapper from '../components/drag-and-drop/DragWrapper.vue';
import DropWrapper from '../components/drag-and-drop/DropWrapper.vue';

defineProps<{
  column: Column;
  columnIndex: number;
}>()

const { addTask, handleDrop } = useBoard();
</script>

<style>
.column {
  @apply bg-gray-100 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
