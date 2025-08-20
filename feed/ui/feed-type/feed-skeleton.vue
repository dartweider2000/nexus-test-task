<script setup lang="ts">
  import SkeletonItem from "~/components/serve/skeleton-item.vue";
</script>

<template>
  <div class="skeleton">
    <div v-for="item in 4" :key="item" class="skeleton__item">
      <skeleton-item />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .skeleton {
    @apply grid gap-[20px];
    // .skeleton__item
    &__item {
      @apply rounded-[3px] overflow-hidden h-[190px] w-full grid;
    }
  }
</style>
