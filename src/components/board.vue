<script setup lang="ts">
import range from 'lodash/range'
import { BOARD_HEIGHT, BOARD_WIDTH } from '~/constants'
import Space from '~/components/space.vue'

const spaces = ref(range(BOARD_HEIGHT * BOARD_WIDTH))
</script>

<template>
  <article class="board">
    <fieldset class="spaces">
      <Space v-for="index in spaces" :index="index" :key="index" />
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
