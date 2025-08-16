<script setup lang="ts">
  import TabsList from "~/components/feed/tabs-list.vue";
  import ViewSwitch from "~/components/feed/view-switch.vue";
  import IconLoupe from "~/components/icons/icon-loupe.vue";
  import UiInput from "~/components/ui/ui-input.vue";
  import UiRefresh from "~/components/ui/ui-refresh.vue";
  import FeedApi from "~/feed/FeedApi";
  import { normalizeRss } from "~/feed/helpers/normalizeRss";
  import type { TItemsMap, TTab } from "~/feed/types";

  const { view } = storeToRefs(useFeedStore());

  const feedApi = new FeedApi();
  const promise = useAsyncData(
    async () => Promise.all([feedApi.getMosRuRss(), feedApi.getLentaRuRss()]),
    {
      transform: ([rawMosRss, rawLentaRss]): TItemsMap => {
        const mosItems = normalizeRss(rawMosRss);
        const lentaItems = normalizeRss(rawLentaRss);

        const map: TItemsMap = {
          "mos.ru": mosItems,
          "lenta.ru": lentaItems,
        };

        return map;
      },
    }
  );

  if (process.server) {
    await promise;
  }

  const { data } = promise;

  const search = ref<string>("");
  const tabsList: TTab[] = [
    { name: "Всё", mark: "all" },
    { name: "Lenta.ru", mark: "lenta.ru" },
    { name: "Mos.ru", mark: "mos.ru" },
  ];
  const currentTabMark = ref<string>("all");

  onMounted(() => {
    console.log(data.value);
  });
</script>

<template>
  <div class="page">
    <header class="page__header">
      <div class="container">
        <div class="page__header-top top-header">
          <div class="top-header__left">
            <h1 class="top-header__title">Список новостей</h1>
            <ui-refresh class="top-header__refresh" />
          </div>
          <div class="top-header__right">
            <div class="top-header__search">
              <ui-input v-model="search">
                <template #postfix>
                  <icon-loupe class="top-header__search-icon" />
                </template>
              </ui-input>
            </div>
          </div>
        </div>
        <div class="page__header-bottom bottom-header">
          <tabs-list
            class="bottom-header__tabs"
            :tabs="tabsList"
            :currentTabMark="currentTabMark"
          />
          <view-switch v-model="view" class="bottom-header__switch" />
        </div>
      </div>
    </header>
    <div class="page__content">
      <div class="container">
        <div class="page__nested">
          <nuxt-page />
        </div>
        <div class="page__loader"></div>
      </div>
    </div>
    <div class="page__pagination">
      <div class="container"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .page {
    @apply bg-[--gray-100] min-h-dvh;
    // .page__header
    &__header {
    }
    // .page__header-top
    &__header-top {
    }
    // .page__header-bottom
    &__header-bottom {
    }
    // .page__content
    &__content {
    }
    // .page__nested
    &__nested {
    }
    // .page__loader
    &__loader {
    }
    // .page__pagination
    &__pagination {
    }
  }
  .container {
    @apply max-w-[--container-width] px-[--container-padding] m-auto;
  }
  .top-header {
    // .top-header__left
    &__left {
    }
    // .top-header__title
    &__title {
    }
    // .top-header__refresh
    &__refresh {
    }
    // .top-header__right
    &__right {
    }
    // .top-header__search
    &__search {
    }
    // .top-header__search-icon
    &__search-icon {
      @apply text-[--gray-400];
    }
  }
  .bottom-header {
    // .bottom-header__tabs
    &__tabs {
    }
    // .bottom-header__switch
    &__switch {
    }
  }
</style>
