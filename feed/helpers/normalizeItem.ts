import type { TItem, TRawItem } from "@/feed/types";

export const normalizeItem = (rawItem: TRawItem): TItem => {
  const url = new URL(rawItem.link);
  const { host: sourceSiteDomain } = url;

  const imageSrc = rawItem.enclosures[0]?.url;

  const item: TItem = {
    title: rawItem.title,
    timestamp: rawItem.published,
    articleUrl: rawItem.link,
    description: rawItem.description,
    sourceSiteDomain,
    imageSrc,
  };

  return item;
};
