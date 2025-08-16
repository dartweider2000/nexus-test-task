<script setup lang="ts">
  const value = defineModel<string>({ required: true });

  defineSlots<{
    postfix: () => void;
  }>();
</script>

<template>
  <div class="ui-input">
    <div class="ui-input__input-wrapper">
      <input v-model="value" type="text" class="ui-input__inner" />
    </div>
    <div v-if="$slots.postfix" class="ui-input__postfix">
      <slot name="postfix" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
