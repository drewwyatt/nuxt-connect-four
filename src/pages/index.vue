<script setup lang="ts">
import Board from '~/components/board.vue'
</script>

<template>
  <h1 class="title">Connect Four</h1>
  <article class="game">
    <Board />
  </article>
</template>

<style>
.title {
  margin: 40px;
}

.game {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
