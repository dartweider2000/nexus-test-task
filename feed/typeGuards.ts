import type { TFeedKey } from "~/feed/types";

export const isFeedKey = (data: unknown): data is TFeedKey => {
  switch (data as TFeedKey) {
    case "all":
    case "lenta.ru":
    case "mos.ru":
      return true;
    default:
      return false;
  }
};
