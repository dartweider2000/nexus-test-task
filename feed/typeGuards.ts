import type { TFeedKey, TView } from "~/feed/types";
import { feedKeysMap, feedView } from "~/feed/config";

export const isFeedKey = (data: unknown): data is TFeedKey => {
  const res = feedKeysMap[data as TFeedKey];
  return !!res;
};

export const isFeedView = (data: unknown): data is TView => {
  const res = feedView[data as TView];
  return !!res;
};
