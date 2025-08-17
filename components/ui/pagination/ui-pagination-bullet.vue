<script setup lang="ts">
  import type { TPaginationBullet } from "~/components/ui/pagination/types";

  defineProps<{
    bullet: TPaginationBullet;
    isActive: boolean;
  }>();
</script>

<template>
  <div
    class="bullet"
    :class="{ [`is-${bullet.type}`]: bullet.type, 'is-active': isActive }"
  >
    {{ bullet.type === "empty" ? "..." : bullet.num }}
  </div>
</template>

<style scoped lang="scss">
  .bullet {
    @apply font-bold text-[18px] select-none;

    &.is-num {
      @apply cursor-pointer px-[4px];
    }

    &.is-active {
      @apply text-[--blue];
    }
  }
</style>
