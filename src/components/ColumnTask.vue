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
import type { Column, Task } from '../models';
import { useBoardStore } from '../stores';

defineProps<{
  task: Task;
  column: Column;
  columnIndex: number;
  taskIndex: number;
}>()

const board = useBoardStore();

const pickUpTask = (event: DragEvent, taskIndex: number, fromColumnIndex: number): void => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("type", "task");
    event.dataTransfer.setData("from-task-index", String(taskIndex));
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
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-600 no-underline;
}
</style>