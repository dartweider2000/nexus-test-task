<script setup lang="ts">
  const props = defineProps<{
    timestamp: number;
    siteDomain: string;
  }>();

  const href = computed(() => `https://${props.siteDomain}`);
  const time = computed(() => {
    const date = new Date(props.timestamp);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  });

  defineSlots<{
    content: () => void;
  }>();
</script>

<template>
  <div class="base">
    <div class="base__content">
      <slot name="content" />
    </div>
    <div class="base__footer footer">
      <a :href="href" target="_blank" class="footer__site">{{ siteDomain }}</a>
      <div class="footer__date">{{ time }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .base {
    @apply grid grid-rows-[1fr,auto] bg-[--white] shadow rounded-[3px];
    // .base__content
    &__content {
    }
    // .base__footer
    &__footer {
    }
  }
  .footer {
    @apply py-[4px] px-[30px] grid grid-flow-col justify-between items-center text-[--gray-400] bg-[--gray-200] rounded-[3px];
    font-size: 14px;

    @media (max-width: 768px) {
      @apply px-[22px];
    }
    // .footer__site
    &__site {
      @apply underline;
    }
    // .footer__date
    &__date {
    }
  }
</style>
