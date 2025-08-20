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
  }
</style>
