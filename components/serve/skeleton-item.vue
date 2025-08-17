<script setup lang="ts"></script>

<template>
  <div class="item"></div>
</template>

<style scoped lang="scss">
  @keyframes skeleton {
    from {
      background-position: 100% 50%;
    }
    to {
      background-position: 0 50%;
    }
  }

  .item {
    --skeleton-from: rgb(200, 200, 200);
    --skeleton-to: rgb(155, 155, 155);

    background: linear-gradient(
      to right,
      var(--skeleton-from) 33%,
      var(--skeleton-to) 45%,
      var(--skeleton-from) 66%
    );
    background-size: 300% 100%;

    animation: skeleton 0.7s ease-in-out infinite;
  }
</style>
