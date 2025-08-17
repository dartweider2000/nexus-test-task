<script setup lang="ts">
  import SkeletonItem from "~/components/serve/skeleton-item.vue";
</script>

<template>
  <div class="skeleton">
    <skeleton-item class="skeleton__item" />
  </div>
</template>

<style scoped lang="scss">
  .skeleton {
    @apply w-[46px] h-[20px] rounded-[4px] overflow-hidden grid;
    // .skeleton__item
    &__item {
    }
  }
</style>
