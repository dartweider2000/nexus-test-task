import type { TFeedData, TFeedKey, TTab } from "~/feed/types";

// Источник истины, в нём определяются все ленты, а также их порядок. All обязательна в приложении
export const feedTabsList = [
  { name: "Всё", link: "-", mark: "all" },
  { name: "Lenta.ru", link: "https://lenta.ru/rss", mark: "lenta.ru" },
  { name: "Mos.ru", link: "https://www.mos.ru/rss", mark: "www.mos.ru" },
  { name: "VC.ru", link: "https://vc.ru/rss", mark: "vc.ru" },
  { name: "RT.com", link: "https://rt.com/rss", mark: "www.rt.com" },
  {
    name: "RIA.ru",
    link: "https://ria.ru/export/rss2/index.xml",
    mark: "ria.ru",
  },
] as const;

// Объект с ключами, для того, чтобы быстро определять существует ли запрашиваемая лента или нет
export const feedKeysMap = Object.fromEntries(
  feedTabsList.map(({ mark, link, name }) => [mark, { link, name }])
) as Record<TFeedKey, Omit<TFeedData, "mark">>;

// Массив исключительно из реальных лент
export const feedTabsLinkedList = feedTabsList.filter(
  ({ link }) => link != "-"
);

export const tabs = feedTabsList.map(({ mark, name }) => ({
  mark,
  name,
})) as TTab[];

export const feedPageSize = 4;
export const serverCacheExpiredDelta = 10_000;
export const searchDebounceDuration = 400;
export const refreshDebounceDuration = 50;

export const feedView = {
  list: 1,
  cell: 1,
} as const;

export const feedViewKey = "view-key";
