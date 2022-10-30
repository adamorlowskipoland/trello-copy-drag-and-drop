<template>
  <router-view></router-view>
  <div id="modals"/>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores";
import { saveStatePlugin } from "@/helpers/utils";

saveStatePlugin(useBoardStore());
</script>

<style>
* {
  box-sizing: border-box;
}

body, html {
  height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
