<template>
  <div
    @dragenter.prevent
    @dragleave.prevent="isOver = false"
    @dragover.prevent="isOver = true"
    @drop.stop="onDrop"
    :class="{ 'bg-gradient-to-r from-green-500': isOver }"
  >
    <slot :is-over="isOver" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits<{
  (eventName: "drop", payload: unknown): void,
}>()

const isOver = ref(false);

const onDrop = (event: DragEvent): void => {
  console.log('%c Line: ondrop, msg: : ', 'color: skyblue', event);
  if (event.dataTransfer) {
    const transferData = JSON.parse(event.dataTransfer.getData("payload"));
    emit("drop", transferData);
    isOver.value = false;
  }
};
</script>