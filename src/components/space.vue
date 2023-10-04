<script setup lang="ts">
const { index } = defineProps<{
  index: number
}>()

const checked = ref(index % 2 === 0)

function drop() {
  console.log(`You clicked index: ${index}`)
}
</script>

<template>
  <input class="space" type="checkbox" :checked="checked" @change="drop" />
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

.space:checked.playerOne {
  --color: var(--lime);
}

.space:checked.playerTwo {
  --color: var(--purple);
}
</style>
