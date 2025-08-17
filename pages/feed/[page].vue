<script setup lang="ts">
  import ImageArticle from "~/components/feed/article-type/image-article.vue";
  import FeedList from "~/components/feed/feed-type/feed-list.vue";
  import type { TItem } from "~/feed/types";

  defineProps<{
    items: TItem[];
  }>();
</script>

<template>
  <div class="page">
    <feed-list>
      <image-article
        v-for="article in items"
        :key="`${article.timestamp}${article.title}`"
        :article="article"
      />
    </feed-list>
  </div>
</template>

<style scoped lang="scss"></style>
