import type { Task } from '../models';
import { useBoardStore } from '../stores';

export interface TransferData {
  type: string;
  fromColumnIndex: number;
  fromTaskIndex?: number;
}

interface UseBoard {
  addTask: (event: Event, tasks: Task[]) => void;
  moveTask: (
    transferData: TransferData & { fromTaskIndex: number },
    toColumnIndex: number,
    toTaskIndex?: number
  ) => void;
  moveColumn: (transferData: TransferData, toColumnIndex: number) => void;
  handleDrop: (
    transferData: TransferData,
    toColumnIndex: number,
    toTaskIndex?: number
  ) => void;
}

export const useBoard = (board = useBoardStore()): UseBoard => {

  const addTask: UseBoard["addTask"] = (event, tasks): void => {
    if ((event?.target as HTMLInputElement)?.value) {
      board.createTask({
        tasks,
        name: (event.target as HTMLInputElement).value,
      });
      (event.target as HTMLInputElement).value = "";
    }
  }

  const moveTask: UseBoard["moveTask"] = (
    { fromColumnIndex, fromTaskIndex },
    toColumnIndex,
    toTaskIndex,
  ) => {
    const fromTasks = board.columns[fromColumnIndex].tasks;
    const toTasks = board.columns[toColumnIndex].tasks;

    board.moveTask({
      fromTasks,
      toTasks,
      fromTaskIndex,
      toTaskIndex: toTaskIndex ?? toTasks.length,
    });
  };

  const moveColumn: UseBoard["moveColumn"] = (
    { fromColumnIndex },
    toColumnIndex,
  ): void => {
    board.moveColumn({
      fromColumnIndex,
      toColumnIndex,
    });
  };

  const handleDrop: UseBoard["handleDrop"] = (
    transferData,
    toColumnIndex,
    toTaskIndex
  ): void => {
    if (transferData.type === "task") {
      moveTask(transferData as TransferData & { fromTaskIndex: number }, toColumnIndex, toTaskIndex);
    } else {
      moveColumn(transferData, toColumnIndex);
    }
  };

  return {
    addTask,
    moveTask,
    moveColumn,
    handleDrop,
  };
};