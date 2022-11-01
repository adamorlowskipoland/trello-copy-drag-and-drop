<template>
  <div
    :class="{ 'bg-gray-100 bg-stripes bg-07': isDragging }"
    draggable="true"
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="drag"
    @dragend="isDragging = false"
  >
    <slot :is-dragging="isDragging" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { TransferData } from "@/composables/board";

const props = defineProps<{
  transferData: TransferData;
}>();

const isDragging = ref(false);

const drag = (event: DragEvent): void => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.dropEffect = "copy";
    event.dataTransfer.setData("payload", JSON.stringify(props.transferData));
    isDragging.value = true;
  }
};
</script>