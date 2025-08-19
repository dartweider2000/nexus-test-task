import pkg from "rss-to-json";
import { feedTabsLinkedList, feedKeysMap, feedPageSize } from "~/feed/config";
import {
  TItemsMap,
  TPaginationBackendResponse,
  TPaginationParamsBack,
  TRawRss,
} from "~/feed/types";
import { normalizeQuery } from "~/server/helpers/normalizeQuery";
import { normalizeRss } from "~/feed/helpers/normalizeRss";
// Необходимый костыль, т.к у библиотеки проблема с типизацией
const { parse } = pkg as unknown as { parse: typeof pkg };

const cache = Object.fromEntries(
  Object.keys(feedKeysMap).map((key) => [key, []])
) as unknown as TItemsMap;
let isInited = false;

const refreshData = async (): Promise<void> => {
  const promises = feedTabsLinkedList.map(({ link }) => parse(link));
  const allSettledList = await Promise.allSettled<TRawRss>(promises);
  const rssList = allSettledList
    .filter((res) => res.status === "fulfilled")
    .map(({ value }) => value);

  const normalizedRssList = rssList.map((rss) => normalizeRss(rss));

  feedTabsLinkedList.forEach(({ mark }, index) => {
    const items = normalizedRssList[index];
    cache[mark] = items;
  });

  const allRssList = normalizedRssList
    .flat(1)
    .sort(({ timestamp: tA }, { timestamp: tB }) => tB - tA);

  cache.all = allRssList;
};

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery<TPaginationParamsBack>(event);
    const params = normalizeQuery(query);

    if (!isInited || params.refresh) {
      await refreshData();

      if (!isInited) {
        isInited = true;
      }
    }

    const items = cache[params.mark];
    const servedQ = params.q.toLowerCase().trim();
    const filteredItems = items.filter(
      ({ title, description }) =>
        title.toLowerCase().includes(servedQ) ||
        description?.toLowerCase().includes(servedQ)
    );
    const totalPages = Math.ceil(filteredItems.length / feedPageSize);

    const currentPageItems = filteredItems.slice(
      feedPageSize * (params.page - 1),
      feedPageSize * params.page
    );

    const response: TPaginationBackendResponse = {
      items: currentPageItems,
      totalPages,
    };

    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
});
