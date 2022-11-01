<template>
  <div
    :class="{ 'bg-green-100 bg-stripes bg-07': isOver && canDrop }"
    @dragenter.stop.prevent="dragEnter"
    @dragleave.stop.prevent="dragLeave"
    @dragover.prevent
    @drop.stop="drop"
  >
    <slot :is-over="isOver" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import type { TransferData } from "@/composables/board";

const props = withDefaults(
  defineProps<{ canDrop?: boolean; }>(),
  { canDrop: true }
);

const emit = defineEmits<{
  (eventName: "drop", payload: TransferData): void,
}>();

const enteredTarget = ref<DragEvent["target"] | null>(null);

const isOver = computed(() => !!enteredTarget.value);

const dragEnter = (event: DragEvent): void => {
  if (props.canDrop) {
    enteredTarget.value = event.target;
  }
};

const dragLeave = (event: DragEvent): void => {
  if (enteredTarget.value === event.target) {
    enteredTarget.value = null;
  }
};

const drop = (event: DragEvent): void => {
  if (props.canDrop && event.dataTransfer) {
    const payload = event.dataTransfer.getData("payload");
    if (payload) {
      const transferData = JSON.parse(payload);
      emit("drop", transferData);
    }
    enteredTarget.value = null;
  }
};
</script>