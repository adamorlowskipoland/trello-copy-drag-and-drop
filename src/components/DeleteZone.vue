<template>
  <div class="bg-rose-100 bg-stripes bg-04 rounded p-2 absolute bottom-0 left-0 right-0">
    <p class="text-sm text-center font-medium leading-6 text-rose-400 tracking-widest">
      <span><slot>Delete task</slot></span>
      <img
        src="@/assets/bin.svg"
        class="w-4 inline"
        alt="bin icon"
        title="Delete"
      >
    </p>
  </div>
</template>
