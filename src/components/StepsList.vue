<script setup lang="ts">
import useMultiStepForm from '@/hook/useMultiStepForm';

const { formSteps, currentIndex } = useMultiStepForm;
const steps = formSteps.map((x) => x.sidebar);
</script>

<template>
  <ul v-if="steps" class="sidebar">
    <li v-for="(step, stepIndex) in steps" :key="step" class="sidebar-content">
      <div
        class="number"
        :class="{
          active: currentIndex === stepIndex,
        }"
      >
        {{ stepIndex + 1 }}
      </div>
      <div class="text">
        <div class="title">step {{ stepIndex + 1 }}</div>
        <div class="info">{{ step }}</div>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.sidebar {
  @apply bg-cover bg-bottom bg-no-repeat lg:rounded-2xl;
  @apply flex justify-center gap-6 lg:flex-col lg:justify-start;
  @apply h-full w-full;

  background-image: url('/images/bg-sidebar-mobile.svg');

  @screen desktop {
    background-image: url('/images/bg-sidebar-desktop.svg');
  }

  @apply p-8;
  .sidebar-content {
    @apply items-center gap-6 lg:flex;

    .number {
      @apply flex items-center justify-center;
      @apply h-10 w-10 rounded-full border border-white;
      @apply text-lg font-bold;
      @apply transition-all duration-300;
      @apply text-white;

      &.active {
        @apply bg-magnolia;
        @apply text-marine;
      }
    }

    .text {
      @apply hidden uppercase lg:block;
      .title {
        @apply text-sm text-gray;
      }
      .info {
        @apply font-medium text-white;
      }
    }
  }
}
</style>
