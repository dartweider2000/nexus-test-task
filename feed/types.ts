import { parse } from "rss-to-json";

export type TItem = {
  title: string;
  articleUrl: string;
  sourceSiteDomain: string;
  timestamp: number;
  description?: string;
  imageSrc?: string;
};

export type TRawImage = {
  url: string;
  type: string;
  length: string;
};

export type TRawItem = {
  title: string;
  link: string;
  published: number;
  enclosures: TRawImage[];
  description?: string;
};

export type TRawRss = Awaited<ReturnType<typeof parse>>;

export type SiteKeys = "www.mos.ru" | "lenta.ru";
export type TItemsMap = Record<SiteKeys, TItem[]>;

export interface IFeedApi {
  getMosRuRss(): Promise<TRawRss>;
  getLentaRuRss(): Promise<TRawRss>;
}
