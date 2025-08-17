<script setup lang="ts">
  import type { TItem } from "~/feed/types";
  import BaseArticle from "./base-article.vue";
  import ImageWrapper from "~/components/serve/image-wrapper.vue";

  defineProps<{
    article: TItem;
  }>();
</script>

<template>
  <base-article
    :site-domain="article.sourceSiteDomain"
    :timestamp="article.timestamp"
  >
    <template #content>
      <div class="content">
        <a :href="article.articleUrl" target="_blank" class="content__image">
          <!-- <img :src="article.imageSrc" alt="image" /> -->
          <image-wrapper :src="article.imageSrc!" />
        </a>
        <div class="content__body">
          <div class="content__title">{{ article.title }}</div>
          <div class="content__description">{{ article.description }}</div>
        </div>
      </div>
    </template>
  </base-article>
</template>

<style scoped lang="scss">
  .content {
    @apply grid grid-cols-[200px,1fr] p-[30px] gap-[30px];
    // .content__image
    &__image {
      @apply w-[200px] h-[100px] overflow-hidden grid;
      & > * {
        @apply w-full h-full;
      }
    }
    // .content__body
    &__body {
      @apply grid gap-[20px];
    }
    // .content__title
    &__title {
      @apply text-[--blue] font-bold leading-[22px];
      font-size: 18px;
    }
    // .content__description
    &__description {
      @apply text-[--black] leading-[20px];
      font-size: 14px;
    }
  }
</style>
