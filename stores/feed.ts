import { defineStore } from "pinia";
import { feedViewKey } from "~/feed/config";
import { isFeedView } from "~/feed/typeGuards";
import type { TView } from "~/feed/types";

export const useFeedStore = defineStore("feedStore", () => {
  const saveView = (view: TView) => {
    localStorage.setItem(feedViewKey, view);
  };
  const getView = (): TView => {
    const _view = localStorage.getItem(feedViewKey);
    if (_view && isFeedView(_view)) {
      return _view;
    }

    return "list";
  };

  const view = ref<TView>("list");

  return {
    view,
    saveView,
    getView,
  };
});
