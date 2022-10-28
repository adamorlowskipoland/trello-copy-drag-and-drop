<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      {{ task.name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBoardStore } from "../stores";

const props = defineProps<{
  id: string
}>()

const board = useBoardStore();
const task = board.getTask(props.id);
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white inset-0 px-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>