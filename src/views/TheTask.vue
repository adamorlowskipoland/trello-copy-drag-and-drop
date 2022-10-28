<template>
  <div v-if="task" class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <input
        type="text"
        class="p-2 w-full mr-2 flex-grow text-xl font-bold "
        :value="task.name"
        @change="updateTaskProperty($event, 'name')"
        @keyup.enter="updateTaskProperty($event, 'name')"
      >
      <textarea
        name="task"
        class="relative bg-transparent px-2 mt-2 h-64 border-0 leading-normal w-full "
        :value="task.description"
        @change="updateTaskProperty($event, 'description')"
        @keyup.enter="updateTaskProperty($event, 'description')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBoardStore } from "../stores";
import type { Task } from '../models';

const props = defineProps<{
  id: string
}>()

const board = useBoardStore();
const task = board.getTask(props.id) as Task;

const updateTaskProperty = (event: Event, key: keyof Task) => {
  if ((event?.target as HTMLInputElement)?.value) {
    board.updateTaskProperty({
      task,
      key,
      value: (event.target as HTMLInputElement).value,
    });
  }
}
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white inset-0 px-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>