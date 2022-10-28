import type { Task } from '../models';
import { useBoardStore } from '../stores';

interface UseBoard {
  pickUpTask: (event: DragEvent, taskIndex: number, fromColumnIndex: number) => void;
  pickUpColumn: (event: DragEvent, fromColumnIndex: number) => void;
  addTask: (event: Event, tasks: Task[]) => void;
  moveTask: (event: DragEvent, toTasks: Task[], toTaskIndex: number) => void;
  moveColumn: (event: DragEvent, toColumnIndex: number) => void;
  handleDrop: (
    event: DragEvent,
    toTasks: Task[],
    toColumnIndex: number,
    toTaskIndex: number,
  ) => void;
}

export const useBoard = (board = useBoardStore()): UseBoard => {

  const pickUpTask = (event: DragEvent, taskIndex: number, fromColumnIndex: number): void => {
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.setData("type", "task");
      event.dataTransfer.setData("from-task-index", String(taskIndex));
      event.dataTransfer.setData("from-column-index", String(fromColumnIndex));
    }
  };

  const pickUpColumn = (event: DragEvent, fromColumnIndex: number): void => {
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.setData("type", "column");
      event.dataTransfer.setData("from-column-index", String(fromColumnIndex));
    }
  };

  const addTask = (event: Event, tasks: Task[]): void => {
    if ((event?.target as HTMLInputElement)?.value) {
      board.createTask({
        tasks,
        name: (event.target as HTMLInputElement).value,
      });
      (event.target as HTMLInputElement).value = "";
    }
  }

  const moveTask = (event: DragEvent, toTasks: Task[], toTaskIndex: number): void => {
    if (event.dataTransfer) {
      const fromTaskIndex = Number(event.dataTransfer.getData("from-task-index"));
      const fromColumnIndex = Number(event.dataTransfer.getData("from-column-index"));
      const fromTasks = board.columns[fromColumnIndex].tasks;
      board.moveTask({
        fromTasks,
        toTasks,
        fromTaskIndex,
        toTaskIndex,
      });
    }
  };

  const moveColumn = (event: DragEvent, toColumnIndex: number): void => {
    if (event.dataTransfer) {
      const fromColumnIndex = Number(event.dataTransfer.getData("from-column-index"));
      board.moveColumn({
        fromColumnIndex,
        toColumnIndex,
      });
    }
  };

  const handleDrop = (
    event: DragEvent,
    toTasks: Task[],
    toColumnIndex: number,
    toTaskIndex: number = toTasks.length
  ): void => {
    if (event.dataTransfer) {
      const type = event.dataTransfer.getData("type");
      if (type === "task") {
        moveTask(event, toTasks, toTaskIndex);
      } else {
        moveColumn(event, toColumnIndex);
      }
    }
  };

  return {
    pickUpTask,
    pickUpColumn,
    addTask,
    moveTask,
    moveColumn,
    handleDrop,
  };
};