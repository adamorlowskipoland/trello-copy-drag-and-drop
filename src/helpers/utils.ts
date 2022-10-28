import type { Store } from 'pinia';
import type { Board } from '../models';

export function uuid () {
  return Math.random().toString(16).slice(2)
}

export function saveStatePlugin (store: Store<"boardStore", Board>) {
  store.$subscribe(
    (mutation, state) => {
      localStorage.setItem(
        'board',
        JSON.stringify(state)
      )
    },
    { detached: true },
  )
}
