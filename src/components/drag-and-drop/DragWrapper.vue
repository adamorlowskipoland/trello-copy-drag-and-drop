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
import { useDragAndDrop } from "@/composables/dragAndDrop";
import type { TransferData } from "@/composables/board";

const props = defineProps<{
  transferData: TransferData;
}>();

const { draggedItem } = useDragAndDrop();

const isDragging = ref(false);

const drag = (event: DragEvent): void => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "all";
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("payload", JSON.stringify(props.transferData));
    draggedItem.value = props.transferData;
    isDragging.value = true;
  }
};
</script>