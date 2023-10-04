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
  --num-colums: v-bind('BOARD_WIDTH');
  --num-rows: v-bind('BOARD_HEIGHT');

  border: none;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(var(--num-colums), 1fr);
  grid-template-rows: repeat(var(--num-rows), 1fr);
  row-gap: 10px;
}
</style>
