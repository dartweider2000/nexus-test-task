import type {
  IFeedApi,
  TPaginationBackendResponse,
  TPaginationParams,
  TRawRss,
} from "@/feed/types";
import { convertObjectToSearchParams } from "./helpers/convertObjectToSearchParams";

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

  public async getRss(
    params: TPaginationParams
  ): Promise<TPaginationBackendResponse> {
    const searchParams = convertObjectToSearchParams(params);

    return await $fetch(`/api/rss?${searchParams.toString()}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  }
}
