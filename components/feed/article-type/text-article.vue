<script setup lang="ts">
  import BaseArticle from "~/components/feed/article-type/base-article.vue";
  import type { TItem } from "~/feed/types";

  defineProps<{
    article: TItem;
  }>();
</script>

<template>
  <base-article
    class="text-article"
    :site-domain="article.sourceSiteDomain"
    :timestamp="article.timestamp"
  >
    <template #content>
      <div class="content">
        <div class="content__title">{{ article.title }}</div>
        <div v-if="article.description" class="content__description">
          {{ article.description }}
        </div>
        <a :href="article.articleUrl" target="_blank" class="content__link"
          >Подробнее</a
        >
      </div>
    </template>
  </base-article>
</template>

<style scoped lang="scss">
  .text-article {
    &:deep(.footer) {
      @media (min-width: 769px) {
        @apply bg-[--white] pb-[16px];
      }
    }
  }

  .content {
    @apply grid px-[22px] pt-[30px] pb-[15px] h-full content-start;
    @media (min-width: 769px) {
      @apply p-[30px] pb-[20px];
    }
    // .content__title
    &__title {
      @apply text-[--blue] font-bold text-ellipsis overflow-hidden;
      font-size: 18px;

      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    // .content__description
    &__description {
      @apply mt-[25px] text-[14px] text-ellipsis overflow-hidden;

      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    // .content__link
    &__link {
      @apply mt-[20px] text-[14px] text-[--blue] underline justify-self-start;
    }
  }
</style>
