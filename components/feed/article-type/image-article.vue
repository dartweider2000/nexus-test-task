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
          <image-wrapper :src="article.imageSrc!" />
        </a>
        <div class="content__body">
          <div class="content__title">{{ article.title }}</div>
          <div v-if="article.description" class="content__description">
            {{ article.description }}
          </div>
          <a :href="article.articleUrl" target="_blank" class="content__link"
            >Подробнее</a
          >
        </div>
      </div>
    </template>
  </base-article>
</template>

<style scoped lang="scss">
  .content {
    @apply grid px-[22px] pt-[20px] py-[15px] gap-[30px];
    @media (min-width: 769px) {
      @apply grid-cols-[200px,1fr] p-[30px];
    }

    // .content__image
    &__image {
      @apply overflow-hidden grid w-full aspect-[600/400];
      @media (min-width: 769px) {
        @apply w-[200px] h-[100px] aspect-auto;
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
    // .content__link
    &__link {
      @apply text-[14px] text-[--blue] underline justify-self-start;

      @media (min-width: 769px) {
        @apply hidden;
      }
    }
  }
</style>
