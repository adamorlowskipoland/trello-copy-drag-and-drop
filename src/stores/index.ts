import { defineStore } from 'pinia';
import defaultBoard from '../helpers/default-board';
import type { Board, Column, Task } from '../models';
import { uuid } from '../helpers/utils';

const savedBoard = localStorage.getItem("board");
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
    createTask({ tasks, name }: { tasks: Task[]; name: string }) {
      tasks.push({
        name,
        id: uuid(),
        description: '',
        userAssigned: null,
      });
    },
    updateTaskProperty({ task, key, value }: { task: Task; key: keyof Task; value: string }) {
      task[key] = value as never;
    },
    moveTask(
      { fromTasks, toTasks, taskIndex }:
        { fromTasks: Task[]; toTasks: Task[]; taskIndex: number }
    ) {
      const taskToMove = fromTasks.splice(taskIndex, 1)[0];
      toTasks.push(taskToMove);
    }
  },
});
