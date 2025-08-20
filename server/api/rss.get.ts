import pkg from "rss-to-json";
import {
  feedTabsLinkedList,
  feedKeysMap,
  feedPageSize,
  serverCacheExpiredDelta,
} from "~/feed/config";
import {
  TFeedKey,
  TItem,
  TPaginationBackendResponse,
  TPaginationParamsBack,
  TServerCache,
  TServerCacheData,
} from "~/feed/types";
import { normalizeQuery } from "~/server/helpers/normalizeQuery";
import { normalizeRss } from "~/feed/helpers/normalizeRss";
// Необходимый костыль, т.к у библиотеки проблема с типизацией
const { parse } = pkg as unknown as { parse: typeof pkg };

const cache = Object.fromEntries(
  Object.keys(feedKeysMap).map<[TFeedKey, TServerCacheData | undefined]>(
    (key) => [key as TFeedKey, undefined]
  )
) as TServerCache;

const shouldUseCache = (mark: TFeedKey): boolean => {
  const feedCache = cache[mark];
  if (!feedCache) {
    return false;
  }

  const { expired } = feedCache;
  const isValid = Date.now() < expired;
  return isValid;
};

const updateCache = (mark: TFeedKey, items: TItem[]) => {
  const expired = Date.now() + serverCacheExpiredDelta;

  const data: TServerCacheData = {
    items,
    expired,
  };

  cache[mark] = data;
};

const getSingleFeed = async (
  mark: TFeedKey,
  shouldRefresh: boolean
): Promise<TItem[]> => {
  if (!shouldRefresh && shouldUseCache(mark)) {
    return cache[mark]!.items;
  }

  const { link } = feedKeysMap[mark];
  const rss = await parse(link);
  const items = normalizeRss(rss);

  updateCache(mark, items);
  return items;
};

const getAll = async (shouldRefresh: boolean): Promise<TItem[]> => {
  if (!shouldRefresh && shouldUseCache("all")) {
    return cache.all!.items;
  }

  const promises = feedTabsLinkedList.map(({ mark }) =>
    getSingleFeed(mark, shouldRefresh)
  );
  const allSettledList = await Promise.allSettled<TItem[]>(promises);
  const allItemsList = allSettledList
    .filter((res) => res.status === "fulfilled")
    .map(({ value }) => value)
    .flat(1)
    .sort(({ timestamp: tA }, { timestamp: tB }) => tB - tA);

  updateCache("all", allItemsList);
  return allItemsList;
};

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery<TPaginationParamsBack>(event);
    const params = normalizeQuery(query);

    const shouldRefresh = !!params.refresh;

    const items =
      params.mark === "all"
        ? await getAll(shouldRefresh)
        : await getSingleFeed(params.mark, shouldRefresh);

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
