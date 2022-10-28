import { defineStore } from 'pinia';
import defaultBoard from '../helpers/default-board';
import { Board } from '../models';

const savedBoard = localStorage.getItem("board");
const board: Board = savedBoard ? JSON.parse(savedBoard) : defaultBoard;

export const useBoardStore = defineStore("boardStore", {
  state: () => board,
  getters: {
    getTask: (state) => (id: string) => {
      for (const column of state.columns) {
        for (const task of column.tasks) {
          if (task.id === id) {
            return task;
          }
        }
      }
    }
  },
  actions: {},
});
