<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div
        v-for="(column, $columnIndex) in board.columns"
        :key="$columnIndex"
        class="column"
        draggable="true"
        @drop="handleDrop($event, column.tasks, $columnIndex)"
        @dragover.prevent
        @dragenter.prevent
        @dragstart.self="pickUpColumn($event, $columnIndex)"
      >
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <router-link
            v-for="(task, $taskIndex) of column.tasks"
            :key="task.id"
            :to="{ name: 'Task', params: { id: task.id } }"
            tag="div"
            class="task"
            draggable="true"
            @dragover.prevent
            @dragenter.prevent
            @dragstart="pickUpTask($event, $taskIndex, $columnIndex)"
            @drop.stop="handleDrop($event, column.tasks, $columnIndex, $taskIndex)"
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
          </router-link>

          <input
            type="text"
            class="block p-2 w-full bg-transparent outline-0"
            placeholder="+ Enter new task"
            @keyup.enter="addTask(column.tasks, $event)"
          >
        </div>
      </div>

      <div class="column">
        <input
          type="text"
          class="block p-2 w-full bg-transparent outline-0"
          placeholder="+ Enter new column name"
          v-model="newColumnName"
          @keyup.enter="board.createColumn(newColumnName); newColumnName = ''"
        >
      </div>
    </div>

    <!--    task-->
    <div
      v-if="$route.name === 'Task'"
      class="task-bg"
      @click.self="$router.push({ name: 'Board' })"
    >
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useBoardStore } from '../stores';
import type { Task } from '../models';

const board = useBoardStore();
const newColumnName = ref("");

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
  background: rgba(0, 0, 0, 0.5);
}

.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-600 no-underline;
}
</style>
