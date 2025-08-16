import type { TFeedKey } from "~/feed/types";

export const isFeedKey = (data: unknown): data is TFeedKey => {
  const res = (["all", "lenta.ru", "mos.ru"] as TFeedKey[]).includes(
    data as TFeedKey
  );
  return res;
};
