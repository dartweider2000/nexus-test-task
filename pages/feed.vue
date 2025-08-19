<script setup lang="ts">
  import FeedSkeleton from "~/components/feed/feed-type/feed-skeleton.vue";
  import TabsList from "~/components/feed/tabs-list.vue";
  import ViewSwitchSkeleton from "~/components/feed/view-switch-skeleton.vue";
  import ViewSwitch from "~/components/feed/view-switch.vue";
  import IconLoupe from "~/components/icons/icon-loupe.vue";
  import PaginationSkeleton from "~/components/ui/pagination/pagination-skeleton.vue";
  import UiPagination from "~/components/ui/pagination/ui-pagination.vue";
  import UiInput from "~/components/ui/ui-input.vue";
  import UiRefresh from "~/components/ui/ui-refresh.vue";
  import FeedApi from "~/feed/FeedApi";
  import { normalizeRss } from "~/feed/helpers/normalizeRss";
  import type { TFeedKey, TItem, TItemsMap, TTab } from "~/feed/types";
  import { usePagination } from "~/feed/usePagination";
  import { useUrlParams } from "~/feed/useUrlParams";
  import { debounce } from "~/helpers/debounce";

  const { view } = storeToRefs(useFeedStore());

  const feedApi = new FeedApi();
  const {
    data: map,
    pending,
    refresh,
  } = await useAsyncData(
    async () => Promise.all([feedApi.getMosRuRss(), feedApi.getLentaRuRss()]),
    {
      transform: ([rawMosRss, rawLentaRss]): TItemsMap => {
        const mosItems = normalizeRss(rawMosRss);
        const lentaItems = normalizeRss(rawLentaRss);

        const allItems: TItem[] = [];
        let i = 0,
          k = 0;

        while (mosItems.length > i && lentaItems.length > k) {
          if (mosItems[i].timestamp > lentaItems[k].timestamp) {
            allItems.push(mosItems[i]);
            i++;
          } else {
            allItems.push(lentaItems[k]);
            k++;
          }
        }
        if (mosItems.length >= i) {
          allItems.push(...lentaItems.slice(k));
        } else if (lentaItems.length >= k) {
          allItems.push(...mosItems.slice(i));
        }

        const map: TItemsMap = {
          "mos.ru": mosItems,
          "lenta.ru": lentaItems,
          all: allItems,
        };

        return map;
      },
      lazy: true,
    }
  );

  const { page, q, tab } = useUrlParams();

  const search = ref<string>(q.value);
  const updateQ = debounce(() => {
    search.value = q.value;
  }, 400);
  watch(q, updateQ);

  const reset = () => {
    page.value = 1;
    q.value = "";
    tab.value = "all";
    search.value = "";
    refresh();
  };

  const { totalPages, viewList } = usePagination(map, tab, page, search);

  const changePageHandler = (_page: number) => {
    page.value = _page;
  };

  const tabs: TTab[] = [
    { name: "Всё", mark: "all" },
    { name: "Lenta.ru", mark: "lenta.ru" },
    { name: "Mos.ru", mark: "mos.ru" },
  ];
  const changeTabMark = (mark: TFeedKey) => {
    tab.value = mark;
  };
</script>

<template>
  <div class="page" data-allow-mismatch>
    <header class="page__header">
      <div class="container">
        <div class="page__header-top top-header">
          <div class="top-header__left">
            <h1 class="top-header__title">Список новостей</h1>
            <ui-refresh class="top-header__refresh" @refresh="reset" />
          </div>
          <div class="top-header__right">
            <div class="top-header__search">
              <ui-input v-model="q">
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
            :tabs="tabs"
            :currentTabMark="tab"
            @change="changeTabMark"
          />
          <client-only>
            <template #default>
              <view-switch v-model="view" class="bottom-header__switch" />
            </template>
            <template #fallback>
              <view-switch-skeleton />
            </template>
          </client-only>
        </div>
      </div>
    </header>
    <div class="page__content">
      <div class="container">
        <div class="page__nested">
          <client-only>
            <template #default>
              <feed-skeleton v-if="pending || !map" />
              <nuxt-page v-else :items="viewList" />
            </template>
            <template #fallback>
              <feed-skeleton />
            </template>
          </client-only>
        </div>
      </div>
    </div>
    <div class="page__pagination">
      <div class="container">
        <div class="page__pagination-inner">
          <pagination-skeleton v-if="pending" />
          <ui-pagination
            v-else
            :total="totalPages"
            :current="page"
            @change="changePageHandler"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .page {
    @apply grid grid-rows-[auto,1fr,auto] bg-[--gray-100] min-h-dvh;
    // .page__header
    &__header {
    }
    // .page__header-top
    &__header-top {
      @apply py-[25px] border-b-[1px] border-[--gray-300] border-solid;
      @media (min-width: 769px) {
        @apply py-[36px];
      }
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
      @apply pb-[124px] pt-[50px];
    }
    // .page__pagination-inner
    &__pagination-inner {
      @apply grid justify-center;
    }
  }
  .container {
    @apply max-w-[--container-width] px-[--container-padding-x] m-auto;
  }
  .top-header {
    @apply grid gap-[20px] items-center;

    @media (min-width: 769px) {
      @apply grid-cols-[1fr,auto];
    }
    // .top-header__left
    &__left {
      @apply grid grid-cols-[1fr,auto] gap-[30px] items-center;

      @media (min-width: 769px) {
        @apply grid-cols-[auto,auto] justify-start;
      }
    }
    // .top-header__title
    &__title {
      @apply text-[--black] text-[24px] leading-[100%] font-bold;

      @media (min-width: 769px) {
        @apply text-[36px];
      }
    }
    // .top-header__refresh
    &__refresh {
    }
    // .top-header__right
    &__right {
    }
    // .top-header__search
    &__search {
      @apply grid;
    }
    // .top-header__search-icon
    &__search-icon {
      @apply text-[--gray-400];
    }
  }
  .bottom-header {
    @apply py-[20px] grid grid-flow-col justify-between items-center;

    @media (min-width: 769px) {
      @apply py-[25px];
    }

    // .bottom-header__tabs
    &__tabs {
    }
    // .bottom-header__switch
    &__switch {
    }
  }
</style>
