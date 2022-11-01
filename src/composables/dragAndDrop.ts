import { ref, watch } from "vue";
import { TransferData } from "@/composables/board";

const draggedItem = ref<TransferData | null>(null);
watch(draggedItem, (newVal, oldValue) => {
  console.log("%c Line: old, msg: : ", "color: yellow", oldValue);
  console.log("%c Line: new, msg: : ", "color: lightseagreen", newVal);
});
export const useDragAndDrop = () => {
  return {
    draggedItem,
  };
};
