<script setup lang="ts">
defineProps<{
  name: string;
  description: string;
}>();
</script>

<template>
  <div>
    <h1 class="text-3xl lg:text-4xl text-marine font-bold">
      {{ name }}
    </h1>
    <h2 class="text-gray pt-2">
      {{ description }}
    </h2>
  </div>
</template>

<style lang="scss" scoped></style>
