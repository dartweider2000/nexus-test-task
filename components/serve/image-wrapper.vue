<script setup lang="ts">
  import SkeletonItem from "~/components/serve/skeleton-item.vue";

  defineProps<{
    src: string;
  }>();

  const emit = defineEmits<{
    loaded: [];
  }>();

  const isLoading = ref<boolean>(true);

  const imageLoadHandler = () => {
    isLoading.value = false;
    emit("loaded");
  };
</script>

<template>
  <div class="image">
    <skeleton-item v-if="isLoading" class="image__skeleton" />
    <img
      class="image__img"
      loading="lazy"
      :src="src"
      @load="imageLoadHandler"
    />
  </div>
</template>

<style scoped lang="scss">
  .image {
    @apply relative;
    & > img {
      @apply max-w-full;
    }
    // .image__skeleton
    &__skeleton {
      @apply absolute top-0 left-0 w-full h-full grid;
    }
    // .image__img
    &__img {
      @apply cursor-pointer;
    }
  }
</style>
