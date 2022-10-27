import { defineStore } from 'pinia';
import defaultBoard from '../helpers/default-board';
import { Board } from '../models';

const savedBoard = localStorage.getItem("board");
const board: Board = savedBoard ? JSON.parse(savedBoard) : defaultBoard;

export const useBoardStore = defineStore("boardStore", {
  state: () => board,
  getters: {},
  actions: {},
});
