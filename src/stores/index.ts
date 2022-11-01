import { defineStore } from "pinia";
import defaultBoard from "@/helpers/default-board";
import { uuid } from "@/helpers/utils";
import type { Board, Column, Task } from "@/models";

const savedBoard = localStorage.getItem("trello-copy-board");
const board: Board = savedBoard ? JSON.parse(savedBoard) : defaultBoard;

export const useBoardStore = defineStore("boardStore", {
  state: () => board,
  getters: {
    getTask: (state) => (id: string): Partial<Task> => {
      let result = {};
      for (const column of state.columns) {
        for (const task of column.tasks) {
          if (task.id === id) {
            result = task;
          }
        }
      }
      return result;
    }
  },
  actions: {
    createColumn(name: string) {
      this.columns.push({
        name,
        tasks: [],
      });
    },
    deleteColumn(columnIndex: number) {
      this.columns.splice(columnIndex, 1);
    },
    createTask({ tasks, name }: { tasks: Task[]; name: string }) {
      tasks.push({
        name,
        id: uuid(),
        description: "",
        userAssigned: null,
      });
    },
    deleteTask(columnIndex: number, taskIndex: number): void {
      this.columns[columnIndex]?.tasks.splice(taskIndex, 1);
    },
    updateColumnName(column: Column, updatedName: string) {
      column.name = updatedName;
    },
    updateTaskProperty({ task, key, value }: { task: Task; key: keyof Task; value: string }) {
      task[key] = value as never;
    },
    moveColumn(
      { fromColumnIndex, toColumnIndex }:
        { fromColumnIndex: number; toColumnIndex: number }
    ) {
      const columnToMove = this.columns.splice(fromColumnIndex, 1)[0];
      this.columns.splice(toColumnIndex, 0, columnToMove);
    },
    moveTask(
      { fromTasks, toTasks, fromTaskIndex, toTaskIndex }:
        { fromTasks: Task[]; toTasks: Task[]; fromTaskIndex: number; toTaskIndex: number }
    ) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0];
      toTasks.splice(toTaskIndex, 0, taskToMove);
    },
  },
});
