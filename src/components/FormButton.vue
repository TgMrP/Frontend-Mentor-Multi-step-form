<script setup lang="ts">
import useMultiStepForm from '../hook/useMultiStepForm';
const {
  formSteps,
  currentStep,
  currentIndex,
  goForwards,
  goBackwards,
  isFirstStep,
  isLastStep,
} = useMultiStepForm;
</script>

<template>
  <div class="flex justify-between">
    <div class="">
      <transition>
        <button
          v-if="!isFirstStep"
          type="button"
          @click="goBackwards"
          class="px-5 py-3 font-medium text-gray"
        >
          Go Back
        </button>
      </transition>
    </div>
    <button
      type="button"
      @click="goForwards"
      class="rounded-lg bg-marine px-5 py-3 text-white"
    >
      {{ isLastStep ? 'Confirm' : 'Next Step' }}
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
