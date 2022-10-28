<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <board-column
        v-for="(column, $columnIndex) in board.columns"
        :key="$columnIndex"
        :column="column"
        :column-index="$columnIndex"
      />

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
import BoardColumn from '../components/BoardColumn.vue';

const board = useBoardStore();
const newColumnName = ref("");
</script>

<style>
.board {
  @apply p-4 bg-teal-100 h-screen overflow-auto;
}

.task-bg {
  @apply inset-0 absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
