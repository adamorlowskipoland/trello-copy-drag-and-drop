<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div
        v-for="(column, $columnIndex) in board.columns"
        :key="$columnIndex"
        class="column"
      >
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
            class="task"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBoardStore } from '../stores';

const board = useBoardStore();
</script>

<style>
.board {
  @apply p-4 bg-teal-100 h-screen overflow-auto;
}
.column {
  @apply bg-gray-100 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
.task-bg {
  @apply inset-0 absolute;
  background: rgba(0,0,0,0.5);
}
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-600 no-underline;
}
</style>
