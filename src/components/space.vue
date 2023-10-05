<script setup lang="ts">
import { Space } from '~/models'
import { useGameStore } from '~/store'

const { index } = defineProps<{
  index: number
}>()

const store = useGameStore()
const token = computed(() => store.getTokenForSpace(index))
const checked = computed(() => store.spaces[index] !== Space.empty)
const colIsFull = computed(() => store.getIsColumnFull(index))

function onChange(event: Event) {
  // Reset the clicked element to what its final checkstate will be this turn
  const target = event.target as HTMLInputElement
  target.checked =
    store.nextEmptySpaces.includes(index) || store.spaces[index] !== Space.empty

  store.drop(index)
}
</script>

<template>
  <input
    type="checkbox"
    @change="onChange"
    :data-index="index"
    :data-checked="checked"
    :class="['space', token]"
    :checked="checked"
    :disabled="colIsFull"
  />
</template>

<style>
.space {
  --color: var(--kiwi);

  appearance: none;
  background: none;
  border: 1px solid var(--color);
  border-radius: 50%;
  cursor: pointer;
  width: var(--space-size);
  height: var(--space-size);
}

.space:disabled {
  cursor: default;
}

.space:checked {
  background-color: var(--color);
}

.space:checked.player-one {
  --color: var(--lime);
}

.space:checked.player-two {
  --color: var(--purple);
}
</style>
