import type { Task } from '../models';
import { useBoardStore } from '../stores';

interface TransferData {
  type: string;
  fromColumnIndex: number;
}

interface TransferDataTask extends TransferData {
  fromTaskIndex: number;
}

interface UseBoard {
  addTask: (event: Event, tasks: Task[]) => void;
  moveTask: (
    transferData: TransferDataTask,
    toColumnIndex: number,
    toTaskIndex: number
  ) => void;
  moveColumn: (transferData: TransferData, toColumnIndex: number) => void;
  handleDrop: (
    transferData: TransferData | TransferDataTask,
    toColumnIndex: number,
    toTaskIndex: number
  ) => void;
}

export const useBoard = (board = useBoardStore()): UseBoard => {

  const addTask = (event: Event, tasks: Task[]): void => {
    if ((event?.target as HTMLInputElement)?.value) {
      board.createTask({
        tasks,
        name: (event.target as HTMLInputElement).value,
      });
      (event.target as HTMLInputElement).value = "";
    }
  }

  const moveTask = (
    { fromColumnIndex, fromTaskIndex }: TransferDataTask,
    toColumnIndex: number,
    toTaskIndex: number
  ): void => {
    const fromTasks = board.columns[fromColumnIndex].tasks;
    const toTasks = board.columns[toColumnIndex].tasks;

    board.moveTask({
      fromTasks,
      toTasks,
      fromTaskIndex,
      toTaskIndex,
    });
  };

  const moveColumn = ({ fromColumnIndex }: TransferData, toColumnIndex: number): void => {
    board.moveColumn({
      fromColumnIndex,
      toColumnIndex,
    });
  };

  const handleDrop = (
    transferData: TransferData | TransferDataTask,
    toColumnIndex: number,
    toTaskIndex: number
  ): void => {
    if (transferData.type === "task") {
      moveTask(transferData as TransferDataTask, toColumnIndex, toTaskIndex);
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