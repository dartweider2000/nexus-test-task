<script setup lang="ts">
  defineSlots<{
    default: () => void;
  }>();
</script>

<template>
  <div class="list">
    <slot />
  </div>
</template>

<style scoped lang="scss">
  .list {
    @apply grid gap-[20px];

    @media (min-width: 769px) {
      @apply grid-cols-[repeat(2,1fr)];
      grid-auto-rows: 256px;
    }
  }
</style>
