<template>
  <div
    draggable="true"
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="onDrag"
    @dragend="isDragging = false"
    :class="{ 'bg-gradient-to-r from-red-500': isDragging }"
  >
    <slot :is-dragging="isDragging" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  transferData: unknown;
}>();

const isDragging = ref(false);

const onDrag = (event: DragEvent): void => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.dropEffect = "copy";
    event.dataTransfer.setData("payload", JSON.stringify(props.transferData));
    isDragging.value = true;
  }
};
</script>