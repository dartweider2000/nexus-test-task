import type { IFeedApi, TRawRss } from "@/feed/types";

export default class FeedApi implements IFeedApi {
  public async getMosRuRss(): Promise<TRawRss> {
    return await $fetch<TRawRss>("/api/mos.ru-rss", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  }
  public async getLentaRuRss(): Promise<TRawRss> {
    return await $fetch("/api/lenta.ru-rss", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  }
}
