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
    @apply grid grid-flow-col justify-center gap-[16px];
    // .skeleton__item
    &__item {
      @apply grid w-[20px] h-[20px] rounded-[4px] overflow-hidden;
    }
  }
</style>
