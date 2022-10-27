import { defineStore } from 'pinia';
import defaultBoard from '../helpers/default-board';

export const useBoardStore = defineStore("boardStore", {
  state: () => defaultBoard,
  getters: {},
  actions: {},
});
