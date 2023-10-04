<script setup lang="ts">
import { BOARD_HEIGHT, BOARD_WIDTH } from '~/constants'
import Space from '~/components/space.vue'
</script>

<template>
  <article class="board">
    <fieldset class="spaces">
      <Space v-for="index in BOARD_HEIGHT * BOARD_WIDTH" :index="index" :key="index" />
    </fieldset>
  </article>
</template>

<style>
.board {
  border: 2px solid var(--kiwi);
  border-radius: var(--border-radius);
  padding: 25px;
  width: var(--board-width);
}

.spaces {
  border: none;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  row-gap: 10px;
}
</style>
