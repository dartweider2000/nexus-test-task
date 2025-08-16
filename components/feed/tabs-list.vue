<script setup lang="ts">
  import type { TTab } from "~/feed/types";

  const props = defineProps<{
    tabs: TTab[];
    currentTabMark: string;
  }>();

  const emit = defineEmits<{
    change: [mark: string];
  }>();

  const itemClickHandler = (mark: string) => {
    // Если одинаковые значения, то не надо эмитить изменение
    if (props.currentTabMark === mark) {
      return;
    }

    emit("change", mark);
  };
</script>

<template>
  <div class="tabs">
    <div class="tabs__inner">
      <button
        v-for="tab in tabs"
        :key="tab.mark"
        class="tabs__item"
        :class="{ 'is-active': tab.mark === currentTabMark }"
        @click="itemClickHandler(tab.mark)"
      >
        {{ tab.name }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .tabs {
    @apply grid overflow-hidden justify-start;
    // .tabs__inner
    &__inner {
      @apply grid grid-flow-col gap-[16px] items-center overflow-x-auto;
    }
    // .tabs__item
    &__item {
      @apply whitespace-nowrap text-[--blue] font-bold;

      &.is-active {
        @apply text-[--black] cursor-default;
      }
    }
  }
</style>
