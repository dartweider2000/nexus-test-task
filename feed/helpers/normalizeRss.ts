import type { TItem, TRawRss } from "@/feed/types";
import { normalizeItem } from "@/feed/helpers/normalizeItem";

export const normalizeRss = (rss: TRawRss): TItem[] => {
  const items = rss.items.map<TItem>((rawItem) => normalizeItem(rawItem));
  return items;
};
