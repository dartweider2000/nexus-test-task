<script setup lang="ts">
  import ImageArticle from "~/feed/ui/article-type/image-article.vue";
  import TextArticle from "~/feed/ui/article-type/text-article.vue";
  import FeedList from "~/feed/ui/feed-type/feed-list.vue";
  import FeedCell from "~/feed/ui/feed-type/feed-cell.vue";
  import type { TItem } from "~/feed/types";

  defineProps<{
    items: TItem[];
  }>();

  const { view } = storeToRefs(useFeedStore());
  const list = computed(() => (view.value === "list" ? FeedList : FeedCell));
  const item = computed(() =>
    view.value === "list" ? ImageArticle : TextArticle
  );
</script>

<template>
  <div class="inner-page">
    <component v-if="items.length" :is="list">
      <component
        :is="item"
        v-for="article in items"
        :key="`${article.timestamp}${article.title}`"
        :article="article"
      />
    </component>
    <div v-else class="inner-page__empty">Нет новостей</div>
  </div>
</template>

<style scoped lang="scss">
  .inner-page {
    @apply grid h-full;
    // .inner-page__empty
    &__empty {
      @apply justify-self-center self-center text-center font-semibold text-[18px];
    }
  }
</style>
