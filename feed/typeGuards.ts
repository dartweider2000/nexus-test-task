import type { SiteKeys } from "~/feed/types";

export const isSiteKey = (data: unknown): data is SiteKeys => {
  const res = data === "list" || data === "cell";
  return res;
};
