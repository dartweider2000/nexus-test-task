import type { TFeedKey, TTab } from "~/feed/types";

// Источник истины, в нём определяются все ленты, а также их порядок. All обязательна в приложении
export const feedTabsList = [
  { name: "Всё", link: "-", mark: "all" },
  { name: "Lenta.ru", link: "https://lenta.ru/rss", mark: "lenta.ru" },
  { name: "Mos.ru", link: "https://www.mos.ru/rss", mark: "www.mos.ru" },
] as const;

// Объект с ключами, для того, чтобы быстро определять существует ли запрашиваемая лента или нет
export const feedKeysMap = Object.fromEntries(
  feedTabsList.map(({ mark }) => [mark, 1])
) as Record<TFeedKey, 1>;

// Массив исключительно из реальных лент
export const feedTabsLinkedList = feedTabsList.filter(
  ({ link }) => link != "-"
);

export const tabs = feedTabsList.map(({ mark, name }) => ({
  mark,
  name,
})) as TTab[];

export const feedPageSize = 4;

export const feedView = {
  list: 1,
  cell: 1,
} as const;

export const feedViewKey = "view-key";
