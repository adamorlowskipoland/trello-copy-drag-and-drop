<template>
  <drop-wrapper
    class="mr-4"
    @drop="handleDrop($event, columnIndex)"
  >
    <drag-wrapper
      v-slot="{ isDragging }"
      :transfer-data="{ type: 'column', fromColumnIndex: columnIndex }"
    >
      <div class="column">
        <div class="flex justify-between items-center mb-2 font-bold">
          <input
            v-show="isEditingColumnName"
            ref="refColumnNameInput"
            v-model="columnName"
            type="text"
            class="bg-transparent w-full mr-1"
            @focusout="isEditingColumnName = false"
            @change="board.updateColumnName(column, columnName); isEditingColumnName = false"
            @keyup.enter="board.updateColumnName(column, columnName); isEditingColumnName = false"
          >
          <span
            v-show="!isEditingColumnName"
            class="inline-block"
            @dblclick="toggleColumnNameEdition"
          >
            {{ column.name }}
          </span>
          <button
            v-show="!isEditingColumnName"
            @click="board.deleteColumn(columnIndex)"
          >
            <img
              src="@/assets/bin.svg"
              class="w-4 hover:scale-125"
              alt="bin icon"
              title="Delete column"
            >
          </button>
        </div>
        <div class="list-reset">
          <column-task
            v-for="(task, $taskIndex) of column.tasks"
            :key="task.id"
            :column="column"
            :task="task"
            :column-index="columnIndex"
            :task-index="$taskIndex"
            @dragover.stop
            @click="$router.push({ name: 'Task', params: { id: task.id } })"
          />

          <input
            type="text"
            class="block p-2 w-full bg-transparent"
            placeholder="+ Enter new task"
            @keyup.enter="addTask($event, column.tasks)"
          >
        </div>
      </div>
      <drop-wrapper
        v-if="isDragging"
        @drop="board.deleteColumn(columnIndex)"
      >
        <div class="bg-rose-100 rounded border-2 border-dashed border-rose-300 p-2 absolute bottom-0 left-0 right-0">
          <p class="text-sm text-center font-medium leading-6 text-rose-400 tracking-widest">
            Delete column
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
<script setup lang="ts">
import { nextTick, ref } from "vue";
import { useBoard } from "@/composables/board";
import ColumnTask from "@/components/ColumnTask.vue";
import DragWrapper from "@/components/drag-and-drop/DragWrapper.vue";
import DropWrapper from "@/components/drag-and-drop/DropWrapper.vue";
import { useBoardStore } from "@/stores";
import type { Column } from "@/models";

const props = defineProps<{
  column: Column;
  columnIndex: number;
}>();

const board = useBoardStore();
const { addTask, handleDrop } = useBoard();
const refColumnNameInput = ref<HTMLInputElement | null>(null);
const isEditingColumnName = ref(false);
const columnName = ref(props.column.name);

const toggleColumnNameEdition = async (): Promise<void> => {
  isEditingColumnName.value = true;
  await nextTick();
  refColumnNameInput.value?.focus();
};
</script>

<style>
.column {
  @apply bg-gray-100 p-2 text-left shadow rounded relative;
  min-width: 350px;
}
</style>
