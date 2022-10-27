<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useBoardStore } from './stores';
import { saveStatePlugin } from './helpers/utils';

const store = useBoardStore();
saveStatePlugin(store);
</script>

<style>
body, html {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.container {
  @apply mx-auto;
}
</style>
