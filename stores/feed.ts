import { defineStore } from "pinia";
import type { TView } from "~/feed/types";

export const useFeedStore = defineStore("feedStore", () => {
  const viewKey = "view-key";
  const saveView = (view: TView) => {
    localStorage.setItem(viewKey, view);
  };
  const getView = (): TView => {
    const _view = localStorage.getItem(viewKey);
    if (_view && (_view === "list" || _view === "cell")) {
      return _view;
    }

    const newView: TView = "list";
    return newView;
  };

  const view = ref<TView>("list");
  watch(view, (newView) => {
    saveView(newView);
  });

  onMounted(() => {
    // После гидратации беру значение из localStorage
    view.value = getView();
  });
  return {
    view,
  };
});
