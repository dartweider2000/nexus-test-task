<script setup lang="ts">
  import type { TView } from "~/feed/types";
  import IconListView from "~/components/icons/icon-list-view.vue";
  import IconCellView from "~/components/icons/icon-cell-view.vue";

  const view = defineModel<TView>({ required: true });

  watch(view, () => {
    console.log(view, "In switch");
  });

  const setView = (newView: TView) => {
    view.value = newView;
  };

  onMounted(() => {
    console.log("Switch", localStorage.getItem("view-key"));
  });
</script>

<template>
  <div class="switch" :class="{ [`is-${view}`]: view }">
    <button class="switch__list" @click="setView('list')">
      <icon-list-view />
    </button>
    <button class="switch__cell" @click="setView('cell')">
      <icon-cell-view />
    </button>
  </div>
</template>

<style scoped lang="scss">
  .switch {
    @apply grid gap-[10px] grid-flow-col justify-center items-center;
    & > * {
      @apply text-[--gray-500];
      transition: color 0.15s ease 0s;
    }
    // .switch__list
    &__list {
      .is-list & {
        @apply text-[--blue];
      }
    }
    // .switch__cell
    &__cell {
      .is-cell & {
        @apply text-[--blue];
      }
    }
  }
</style>
