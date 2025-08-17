<script setup lang="ts">
  import ImageArticle from "~/components/feed/article-type/image-article.vue";
  import TextArticle from "~/components/feed/article-type/text-article.vue";
  import FeedList from "~/components/feed/feed-type/feed-list.vue";
  import FeedCell from "~/components/feed/feed-type/feed-cell.vue";
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
    <component :is="list">
      <component
        :is="item"
        v-for="article in items"
        :key="`${article.timestamp}${article.title}`"
        :article="article"
      />
    </component>
  </div>
</template>

<style scoped lang="scss"></style>
