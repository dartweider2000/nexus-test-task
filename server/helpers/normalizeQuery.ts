import { isFeedKey } from "~/feed/typeGuards";
import { TPaginationParams, TPaginationParamsBack } from "~/feed/types";

export const normalizeQuery = (query: TPaginationParamsBack) => {
  const params: TPaginationParams = {
    page: 1,
    mark: "all",
    q: "",
  };

  if (query.page && /^\d+$/.test(query.page)) {
    params.page = +query.page;
  }

  if (query.mark && isFeedKey(query.mark)) {
    params.mark = query.mark;
  }

  if (query.q) {
    params.q = query.q;
  }

  if (query.refresh && 1 === +query.refresh) {
    params.refresh = 1;
  }

  return params;
};
