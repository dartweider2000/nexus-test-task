<script setup lang="ts">
  import IconLoupe from "~/components/icons/icon-loupe.vue";
  import IconRefresh from "~/components/icons/icon-refresh.vue";
  import UiInput from "~/components/ui/ui-input.vue";
  import FeedApi from "~/feed/FeedApi";
  import { normalizeRss } from "~/feed/helpers/normalizeRss";
  import type { TItemsMap } from "~/feed/types";

  const feedApi = new FeedApi();
  const promise = useAsyncData(
    async () => Promise.all([feedApi.getMosRuRss(), feedApi.getLentaRuRss()]),
    {
      transform: ([rawMosRss, rawLentaRss]): TItemsMap => {
        const mosItems = normalizeRss(rawMosRss);
        const lentaItems = normalizeRss(rawLentaRss);

        const map: TItemsMap = {
          "www.mos.ru": mosItems,
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

  onMounted(() => {
    console.log(data.value);
  });
</script>

<template>
  <div class="page">
    <header class="page__header">
      <div class="page__header-top top-header">
        <div class="top-header__left">
          <h1 class="top-header__title">Список новостей</h1>
          <button class="top-header__refresh">
            <icon-refresh />
          </button>
        </div>
        <div class="top-header__right">
          <div class="top-header__search">
            <ui-input v-model="search">
              <template #postfix>
                <icon-loupe />
              </template>
            </ui-input>
          </div>
        </div>
      </div>
      <div class="page__header-bottom bottom-header"></div>
    </header>
    <div class="page__content">
      <div class="page__nested">
        <nuxt-page />
      </div>
      <div class="page__loader"></div>
    </div>
    <div class="page__pagination"></div>
  </div>
</template>

<style scoped lang="scss"></style>
