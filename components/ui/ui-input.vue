<script setup lang="ts">
  const value = defineModel<string>({ required: true });

  defineSlots<{
    postfix: () => void;
  }>();

  const inputEl = ref<HTMLInputElement | null>(null);
  const prefixEl = ref<HTMLElement | null>(null);

  // Обработчик для того, чтобы фокус на инпте появлялся не только при клике на сам элемент.
  const uiInputClickHandler = (e: Event) => {
    const target = e.target as HTMLElement;

    if (
      !inputEl.value ||
      inputEl.value.contains(document.activeElement) ||
      (prefixEl.value && prefixEl.value.contains(target))
    ) {
      return;
    }

    inputEl.value.focus();
  };
</script>

<template>
  <div
    class="ui-input"
    :class="{ 'is-postfix': $slots.postfix }"
    @click="uiInputClickHandler"
  >
    <div class="ui-input__input-wrapper">
      <input
        ref="inputEl"
        v-model="value"
        type="text"
        class="ui-input__inner"
      />
    </div>
    <div ref="prefixEl" v-if="$slots.postfix" class="ui-input__postfix">
      <slot name="postfix" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .ui-input {
    @apply inline-grid grid-flow-col grid-cols-[1fr] items-center px-[13px] py-[10px] rounded-[4px] bg-[--white] shadow leading-[1];
    &.is-postfix {
      @apply grid-cols-[1fr,auto];
    }
    // .ui-input__input-wrapper
    &__input-wrapper {
      .is-postfix & {
        @apply pr-[13px];
      }
    }
    // .ui-input__inner
    &__inner {
      @apply min-w-0 outline-none w-full;
    }
    // .ui-input__postfix
    &__postfix {
    }
  }
</style>
