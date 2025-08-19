import { parse } from "rss-to-json";
import type { feedTabsList, feedView } from "~/feed/config";

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

export type TFeedKey = (typeof feedTabsList)[number]["mark"];
export type TItemsMap = Record<TFeedKey, TItem[]>;
export type TView = keyof typeof feedView;

export type TTab = {
  name: string;
  mark: TFeedKey;
};

export type TFeedData = {
  name: string;
  link: string;
  mark: TFeedKey;
};

export type TPaginationParams = {
  page: number;
  q: string;
  mark: TFeedKey;
  refresh?: 1;
};

export type TPaginationParamsBack = Partial<
  Record<keyof TPaginationParams, string>
>;

export type TPaginationBackendResponse = {
  totalPages: number;
  items: TItem[];
};

export interface IFeedApi {
  getMosRuRss(): Promise<TRawRss>;
  getLentaRuRss(): Promise<TRawRss>;
  getRss(params: TPaginationParams): Promise<TPaginationBackendResponse>;
}
