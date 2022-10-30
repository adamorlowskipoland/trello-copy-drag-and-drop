<template>
  <drop-wrapper
    v-slot="{ isOver }"
    class="mb-2"
    @drop="handleDrop($event, columnIndex, taskIndex)"
  >
    <drag-wrapper
      v-slot="{ isDragging }"
      :transfer-data="{ type: 'task', fromColumnIndex: columnIndex, fromTaskIndex: taskIndex }"
    >
      <div
        class="task"
        :class="{ 'bg-white': !isDragging && !isOver }"
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
      <drop-wrapper
        v-if="isDragging"
        @drop="board.deleteTask(columnIndex, taskIndex)"
      >
        <div class="bg-rose-100 rounded border-2 border-dashed border-rose-300 p-2 absolute bottom-0 left-0 right-0">
          <p class="text-sm text-center font-medium leading-6 text-rose-400 tracking-widest">
            Delete task
            <img
              src="@/assets/bin.svg"
              class="w-4 inline"
              alt="bin icon"
              title="Delete"
            >
          </p>
        </div>
      </drop-wrapper>
    </drag-wrapper>
  </drop-wrapper>
</template>

<script lang="ts" setup>
import { useBoard } from "@/composables/board";
import DragWrapper from "@/components/drag-and-drop/DragWrapper.vue";
import DropWrapper from "@/components/drag-and-drop/DropWrapper.vue";
import { useBoardStore } from "@/stores";
import type { Column, Task } from "@/models";

defineProps<{
  task: Task;
  column: Column;
  columnIndex: number;
  taskIndex: number;
}>();

const board = useBoardStore();
const { handleDrop } = useBoard();
</script>

<style scoped>
.task {
  @apply flex items-center flex-wrap shadow p-2 rounded text-gray-600 no-underline;
}
</style>