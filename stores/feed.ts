import { defineStore } from "pinia";
import type { TView } from "~/feed/types";

export const useFeedStore = defineStore("feedStore", () => {
  const _view = ref<TView>("list");
  const view = computed<TView>({
    set: (v: TView) => {
      saveView(v);
      _view.value = v;
    },
    get: () => {
      _view.value = getView();
      return _view.value;
    },
  });
  const viewKey = "view-key";

  const saveView = (view: TView) => {
    localStorage.setItem(viewKey, view);
  };

  const getView = (): TView => {
    const view = localStorage.getItem(viewKey);
    if (view && (view === "list" || view === "cell")) {
      return view;
    }

    const newView: TView = "list";
    saveView(newView);
    return newView;
  };

  return {
    view,
  };
});
