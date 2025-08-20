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
  import { tabs } from "~/feed/config";
  import FeedApi from "~/feed/FeedApi";
  import type {
    TFeedKey,
    TPaginationBackendResponse,
    TPaginationParams,
  } from "~/feed/types";
  import { useUrlParams } from "~/feed/useUrlParams";
  import { debounce } from "~/helpers/debounce";

  const feedStore = useFeedStore();
  const { view } = storeToRefs(feedStore);
  const { saveView, getView } = feedStore;

  const { page, q, tab } = useUrlParams();
  const changePageHandler = (_page: number) => {
    page.value = _page;
  };
  const changeTabMark = (mark: TFeedKey) => {
    tab.value = mark;
  };

  const search = ref<string>(q.value);
  const updateQ = debounce(() => {
    search.value = q.value;
  }, 400);
  watch(q, updateQ);

  // При вереходе между лентами и когда изменяем значение в поиске, то сбрасываем страницу
  watch([tab, search], () => {
    page.value = 1;
    debouncedRefresh();
  });

  let shouldLoadNewItems: boolean = false;

  const feedApi = new FeedApi();
  const {
    data: response,
    pending,
    refresh,
    error,
  } = await useAsyncData<TPaginationBackendResponse>(
    async () => {
      const params: TPaginationParams = {
        page: page.value,
        q: search.value,
        mark: tab.value,
      };

      // Указываем брать значение из кэша или запросить новое
      if (shouldLoadNewItems) {
        shouldLoadNewItems = false;

        params.refresh = 1;
      }

      return await feedApi.getRss(params);
    },
    {
      lazy: true,
    }
  );

  const debouncedRefresh = debounce(refresh, 50);
  // subscribeUrlUpdate(debouncedRefresh);

  // Проверка на то не выходил ли значение page за пределы totalPages
  watch(page, (value) => {
    if (response.value && response.value.totalPages < value) {
      page.value = response.value.totalPages;
    } else {
      debouncedRefresh();
    }
  });

  const reset = () => {
    page.value = 1;
    q.value = "";
    tab.value = "all";
    search.value = "";
    shouldLoadNewItems = true;
    debouncedRefresh();
  };

  watch(view, (newView) => {
    saveView(newView);
  });

  onMounted(() => {
    // После гидратации беру значение из localStorage
    view.value = getView();
  });
</script>

<template>
  <div class="page">
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
              <feed-skeleton v-if="pending || !response" />
              <nuxt-page v-else-if="!error" :items="response.items" />
              <div v-else class="page__nested-error">Произошла ошибка</div>
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
          <pagination-skeleton v-if="pending || !response" />
          <ui-pagination
            v-else-if="!error && response.totalPages"
            :total="response.totalPages"
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
      @apply grid h-full;
    }
    // .page__nested-error
    &__nested-error {
      @apply self-center justify-self-center text-[18px];
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
    @apply max-w-[--container-width] px-[--container-padding-x] m-auto h-full;
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
