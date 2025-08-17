import type { TFeedKey, TItemsMap } from "~/feed/types";

export const usePagination = (
  map: Ref<TItemsMap | null>,
  tab: Ref<TFeedKey>,
  page: Ref<number>,
  q: Ref<string>,
  pageSize: number = 4
) => {
  const currentList = computed(() => map.value?.[tab.value] || []);

  const filteredList = computed(() =>
    currentList.value.filter(
      ({ description, title }) =>
        title.toLowerCase().includes(q.value.toLowerCase()) ||
        description?.toLowerCase().includes(q.value.toLowerCase())
    )
  );

  const totalPages = computed(
    () => Math.ceil(filteredList.value.length / pageSize) || 1
  );
  watch(
    page,
    (value) => {
      if (value > totalPages.value) {
        page.value = totalPages.value;
      } else if (page.value < 1) {
        page.value = 1;
      }
    },
    { immediate: true }
  );

  // При переходе между вкладками и вводом текста сбрасываю страницу
  watch([tab, q], () => {
    page.value = 1;
  });

  const viewList = computed(() =>
    filteredList.value.slice(pageSize * (page.value - 1), pageSize * page.value)
  );

  return {
    totalPages,
    viewList,
  };
};
