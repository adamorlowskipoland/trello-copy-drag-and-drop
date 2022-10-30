<template>
  <div
    draggable="true"
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="onDrag"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  transferData: unknown;
}>()

const onDrag = (event: DragEvent): void => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.dropEffect = "copy";
    event.dataTransfer.setData("payload", JSON.stringify(props.transferData));
  }
};
</script>