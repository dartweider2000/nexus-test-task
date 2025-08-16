<script setup lang="ts">
  import IconRefresh from "~/components/icons/icon-refresh.vue";

  const emit = defineEmits<{
    refresh: [];
  }>();

  const isAnimation = ref<boolean>(false);
  const animationDuration = 300;
  const animationDurationCssVar = `${animationDuration}ms`;

  const clickHandler = () => {
    if (isAnimation.value) {
      return;
    }

    isAnimation.value = true;
    emit("refresh");
  };

  const animationEndHandler = () => {
    isAnimation.value = false;
  };
</script>

<template>
  <button
    class="refresh"
    :class="{ 'is-animation': isAnimation }"
    :disabled="isAnimation"
    @click="clickHandler"
    @animationend="animationEndHandler"
  >
    <icon-refresh />
  </button>
</template>

<style scoped lang="scss">
  @keyframes round {
    to {
      transform: rotate(1turn);
    }
  }

  .refresh {
    @apply px-[10px] py-[12px] rounded-full shadow text-[--blue] bg-[--white] w-[40px] h-[40px];

    &.is-animation > * {
      animation: round v-bind("animationDurationCssVar") linear forwards;
    }
  }
</style>
