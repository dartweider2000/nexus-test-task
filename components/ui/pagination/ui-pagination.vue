<script setup lang="ts">
  import type { TPaginationBullet } from "~/components/ui/pagination/types";
  import UiPaginationBullet from "~/components/ui/pagination/ui-pagination-bullet.vue";

  const props = withDefaults(
    defineProps<{
      total: number;
      current: number;
      viewedNumbers?: number;
    }>(),
    { viewedNumbers: 3 }
  );

  const emit = defineEmits<{
    change: [num: number];
  }>();

  const paginationBullets = computed<TPaginationBullet[]>(() => {
    // Если слишком мало страниц
    if (props.total <= 1 + props.viewedNumbers) {
      return Array.from({ length: props.total }).map<TPaginationBullet>(
        (_, index) => ({ num: index + 1, type: "num" })
      );
    }

    // Если в самом начале пагинации
    if (props.current <= props.viewedNumbers) {
      const list = Array.from({
        length: 1 + props.viewedNumbers,
      }).map<TPaginationBullet>((_, index) => ({
        num: index + 1,
        type: "num",
      }));
      list.push({ type: "empty" });
      list.push({ type: "num", num: props.total });

      return list;
    }

    if (props.total - props.current < props.viewedNumbers) {
      const list: TPaginationBullet[] = [
        { type: "num", num: 1 },
        { type: "empty" },
      ];

      const endlist = Array.from({
        length: 1 + props.viewedNumbers,
      })
        .map<TPaginationBullet>((_, index) => ({
          num: props.total - index,
          type: "num",
        }))
        .reverse();

      return [...list, ...endlist];
    }

    const list: TPaginationBullet[] = [
      { type: "num", num: 1 },
      { type: "empty" },
    ];

    const startNum = props.current - ~~(props.viewedNumbers / 2);
    const endNum = props.current + ~~(props.viewedNumbers / 2);
    for (let num = startNum; num <= endNum; num++) {
      list.push({ type: "num", num });
    }

    list.push({ type: "empty" }, { type: "num", num: props.total });

    return list;
  });

  const bulletClickHandler = (bullet: TPaginationBullet) => {
    // Не эмичу если нет изменений и если это пустое место
    if (bullet.type === "empty" || bullet.num === props.current) {
      return;
    }

    emit("change", bullet.num);
  };
</script>

<template>
  <div class="pagination">
    <ui-pagination-bullet
      v-for="(bullet, index) in paginationBullets"
      :key="index"
      :bullet="bullet"
      :is-active="bullet.type === 'num' && bullet.num === current"
      @click="bulletClickHandler(bullet)"
    />
  </div>
</template>

<style scoped lang="scss">
  .pagination {
    @apply grid grid-flow-col items-center justify-center gap-[10px];
  }
</style>
