import { ref } from "vue";
import { TransferData } from "@/composables/board";

const draggedItem = ref<TransferData | null>(null);

export const useDragAndDrop = () => {
  return {
    draggedItem,
  };
};
