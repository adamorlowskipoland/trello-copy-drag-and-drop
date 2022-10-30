<template>
  <drop-wrapper class="mr-4" @drop="handleDrop($event, columnIndex)">
    <drag-wrapper
      :transfer-data="{ type: 'column', fromColumnIndex: columnIndex }"
      @dragstart="isDragging = true"
    >
      <div class="column">
        <div class="flex justify-between items-center mb-2 font-bold">
          <input
            v-show="isEditingColumnName"
            type="text"
            ref="refColumnNameInput"
            class="bg-transparent w-full mr-1"
            v-model="columnName"
            @focusout="isEditingColumnName = false"
            @change="board.updateColumnName(column, columnName); isEditingColumnName = false"
            @keyup.enter="board.updateColumnName(column, columnName); isEditingColumnName = false"
          >
          <span v-show="!isEditingColumnName" class="inline-block" @dblclick="toggleColumnNameEdition">
            {{ column.name }}
          </span>
          <button v-show="!isEditingColumnName" @click="board.deleteColumn(columnIndex)">
            <img src="../assets/bin.svg" class="w-4 hover:scale-125" alt="bin icon" title="Delete" />
          </button>
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
              @dragend="isDragging = false"
              @drop="isDragging = false"
              @dragover.stop
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
  <teleport to="#modals">
    <drop-wrapper v-if="isDragging" @drop="handleDelete">
      <div class="bg-rose-100 rounded border-4 border-dashed border-rose-300 p-4 fixed bottom-0 left-0 right-0 z-50">
        <h3 class="text-lg font-medium leading-6 text-rose-400 tracking-widest">
          DELETE
          <img src="../assets/bin.svg" class="w-4 inline" alt="bin icon" title="Delete" />
        </h3>
      </div>
    </drop-wrapper>
  </teleport>
</template>
<script setup lang="ts">
import { TransferData, useBoard } from '../composables/board';
import type { Column, Task } from '../models';
import ColumnTask from '../components/ColumnTask.vue';
import DragWrapper from '../components/drag-and-drop/DragWrapper.vue';
import DropWrapper from '../components/drag-and-drop/DropWrapper.vue';
import { useBoardStore } from '../stores';
import { nextTick, ref } from 'vue';

const props = defineProps<{
  column: Column;
  columnIndex: number;
}>()

const board = useBoardStore();
const { addTask, handleDrop } = useBoard();
const refColumnNameInput = ref<HTMLInputElement | null>(null);
const isEditingColumnName = ref(false);
const columnName = ref(props.column.name);

const isDragging = ref(false);

const handleDelete = ({ type, fromColumnIndex, fromTaskIndex }: TransferData) => {
  if (type === "task" && fromTaskIndex !== undefined) {
    board.deleteTask(fromColumnIndex, fromTaskIndex);
  } else {
    board.deleteColumn(fromColumnIndex);
  }
  isDragging.value = false;
}

const toggleColumnNameEdition = async (): Promise<void> => {
  isEditingColumnName.value = true;
  await nextTick();
  refColumnNameInput.value?.focus();
};
</script>

<style>
.column {
  @apply bg-gray-100 p-2 text-left shadow rounded;
  min-width: 350px;
}
</style>
