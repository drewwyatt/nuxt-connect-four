<script setup lang="ts">
import { A } from '@mobily/ts-belt'
import { BOARD_HEIGHT, BOARD_WIDTH } from '~/constants'
import Space from '~/components/space.vue'

const spaces = ref(A.range(0, BOARD_HEIGHT * BOARD_WIDTH - 1))
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
  border: none;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  row-gap: 10px;
}
</style>
