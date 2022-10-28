<template>
  <div
    @dragover.prevent
    @dragenter.prevent
    @drop.stop="onDrop"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (eventName: "drop", payload: unknown): void,
}>()

const onDrop = (event: DragEvent): void => {
  if (event.dataTransfer) {
    const transferData = JSON.parse(event.dataTransfer.getData("payload"));
    emit("drop", transferData);
  }
};
</script>