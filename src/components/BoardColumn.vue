<template>
  <div
    class="column"
    draggable="true"
    @drop="handleDrop($event, column.tasks, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="pickUpColumn($event, columnIndex)"
  >
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
        class="block p-2 w-full bg-transparent outline-0"
        placeholder="+ Enter new task"
        @keyup.enter="addTask(column.tasks, $event)"
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { useBoardStore } from '../stores';
import type { Column, Task } from '../models';
import ColumnTask from '../components/ColumnTask.vue';

defineProps<{
  column: Column;
  columnIndex: number;
}>()

const board = useBoardStore();

const addTask = (tasks: Task[], event: Event): void => {
  if ((event?.target as HTMLInputElement)?.value) {
    board.createTask({
      tasks,
      name: (event.target as HTMLInputElement).value,
    });
    (event.target as HTMLInputElement).value = "";
  }
}

const pickUpColumn = (event: DragEvent, fromColumnIndex: number): void => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("type", "column");
    event.dataTransfer.setData("from-column-index", String(fromColumnIndex));
  }
};

const moveTask = (event: DragEvent, toTasks: Task[], toTaskIndex: number): void => {
  if (event.dataTransfer) {
    const fromTaskIndex = Number(event.dataTransfer.getData("from-task-index"));
    const fromColumnIndex = Number(event.dataTransfer.getData("from-column-index"));
    const fromTasks = board.columns[fromColumnIndex].tasks;
    board.moveTask({
      fromTasks,
      toTasks,
      fromTaskIndex,
      toTaskIndex,
    });
  }
};

const moveColumn = (event: DragEvent, toColumnIndex: number): void => {
  if (event.dataTransfer) {
    const fromColumnIndex = Number(event.dataTransfer.getData("from-column-index"));
    board.moveColumn({
      fromColumnIndex,
      toColumnIndex,
    });
  }
};

const handleDrop = (
  event: DragEvent,
  toTasks: Task[],
  toColumnIndex: number,
  toTaskIndex: number = toTasks.length
): void => {
  if (event.dataTransfer) {
    const type = event.dataTransfer.getData("type");
    if (type === "task") {
      moveTask(event, toTasks, toTaskIndex);
    } else {
      moveColumn(event, toColumnIndex);
    }
  }
};
</script>

<style scoped>
.column {
  @apply bg-gray-100 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
