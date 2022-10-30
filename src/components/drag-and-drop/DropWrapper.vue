<template>
  <div
    :class="{ 'bg-green-100 bg-stripes bg-07': isOver }"
    @dragenter.prevent
    @dragleave.prevent="isOver = false"
    @dragover.prevent="isOver = true"
    @drop.stop="drop"
  >
    <slot :is-over="isOver" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits<{
  (eventName: "drop", payload: unknown): void,
}>();

const isOver = ref(false);

const drop = (event: DragEvent): void => {
  if (event.dataTransfer) {
    const payload = event.dataTransfer.getData("payload");
    if (payload) {
      const transferData = JSON.parse(payload);
      emit("drop", transferData);
    }
    isOver.value = false;
  }
};
</script>