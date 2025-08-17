import { isFeedKey } from "./typeGuards";
import type { TFeedKey } from "./types";

export const useUrlParams = () => {
  const router = useRouter();
  const setParams = (page: number, q: string, tab: TFeedKey) => {
    router.replace({
      params: { page },
      query: { q, tab },
    });
  };

  const _q = ref<string>("");
  const q = computed<string>({
    get: () => _q.value,
    set: (v: string) => {
      setParams(page.value, v, tab.value);
      _q.value = v;
    },
  });

  const _page = ref<number>(1);
  const page = computed<number>({
    get: () => _page.value,
    set: (p: number) => {
      setParams(p, q.value, tab.value);
      _page.value = p;
    },
  });

  const _tab = ref<TFeedKey>("all");
  const tab = computed<TFeedKey>({
    get: () => _tab.value,
    set: (t: TFeedKey) => {
      setParams(page.value, q.value, t);
      _tab.value = t;
    },
  });

  watch(
    () => router.currentRoute.value,
    ({ query, params }) => {
      const { page } = params;
      const { tab, q } = query;

      if (/^\d+$/.test(page.toString()) && +page > 0) {
        _page.value = +page;
      }

      if (isFeedKey(tab)) {
        _tab.value = tab;
      }

      _q.value = q?.toString() || "";

      setParams(_page.value, _q.value, _tab.value);
    },
    { immediate: true }
  );

  return {
    q,
    page,
    tab,
  };
};
