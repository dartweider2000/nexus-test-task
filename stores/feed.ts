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
    if (process.server) {
      return;
    }

    localStorage.setItem(viewKey, view);
  };

  const getView = (): TView => {
    const view = process.client ? localStorage.getItem(viewKey) : null;
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
