<script setup lang="ts">
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

  onMounted(() => {
    console.log(data.value);
  });
</script>

<template>
  <div class="page">
    <pre>{{ data }}</pre>
  </div>
</template>

<style scoped lang="scss"></style>
