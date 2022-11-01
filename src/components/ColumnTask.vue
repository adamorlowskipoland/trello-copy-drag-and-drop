<template>
  <drop-wrapper
    v-slot="{ isOver }"
    :can-drop="draggedItem?.type === 'task'"
    class="mb-2"
    @drop="handleDrop($event, columnIndex, taskIndex)"
  >
    <drag-wrapper
      v-slot="{ isDragging }"
      :transfer-data="{ type: 'task', fromColumnIndex: columnIndex, fromTaskIndex: taskIndex }"
      @dragstart="showDeleteZone = true"
      @dragend="showDeleteZone = false"
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
    </drag-wrapper>
    <drop-wrapper
      v-if="showDeleteZone"
      @drop="board.deleteTask(columnIndex, taskIndex)"
    >
      <delete-zone />
    </drop-wrapper>
  </drop-wrapper>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useBoard } from "@/composables/board";
import DragWrapper from "@/components/drag-and-drop/DragWrapper.vue";
import DropWrapper from "@/components/drag-and-drop/DropWrapper.vue";
import DeleteZone from "@/components/DeleteZone.vue";
import { useBoardStore } from "@/stores";
import type { Column, Task } from "@/models";
import { useDragAndDrop } from "@/composables/dragAndDrop";

defineProps<{
  task: Task;
  column: Column;
  columnIndex: number;
  taskIndex: number;
}>();

const board = useBoardStore();
const { handleDrop } = useBoard();
const { draggedItem } = useDragAndDrop();

const showDeleteZone = ref(false);
</script>

<style scoped>
.task {
  @apply flex items-center flex-wrap shadow p-2 rounded text-gray-600 no-underline;
}
</style>