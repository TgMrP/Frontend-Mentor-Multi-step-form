<script setup lang="ts">
import StepsList from '@/components/StepsList.vue';
import StepTitle from '@/components/StepTitle.vue';
import FormButton from '@/components/FormButton.vue';

import useMultiStepForm from '@/hook/useMultiStepForm';
import useForm from '@/hook/useForm';
import Confirmation from './components/Steps/Confirmation.vue';

const { formSteps, currentIndex, currentStep, isSubmitted } = useMultiStepForm;
const { form } = useForm;
</script>

<template>
  <div class="page">
    <div class="form-container">
      <div class="aSide">
        <StepsList />
      </div>
      <!--  -->
      <div class="content" v-if="!isSubmitted">
        <div class="main">
          <StepTitle
            v-if="currentStep?.name && currentStep?.description"
            :name="currentStep?.name"
            :description="currentStep?.description"
          />
          <div class="step">
            <Component :is="currentStep" />
          </div>
        </div>
        <div class="hidden pt-8 lg:block">
          <FormButton />
        </div>
      </div>
      <div v-else class="content">
        <Confirmation />
      </div>
    </div>

    <div
      class="fixed left-0 right-0 bottom-0 bg-white px-4 py-4 lg:hidden"
      v-if="!isSubmitted"
    >
      <FormButton />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  @apply h-screen w-screen;
  @apply flex flex-col items-center lg:justify-center;
  @apply mx-auto;
  @apply bg-magnolia;

  .form-container {
    @apply w-full;
    @apply mx-auto lg:rounded-2xl lg:bg-white lg:p-4 lg:shadow-lg;
    @apply flex flex-col items-center lg:flex-row;

    max-width: 900px;
    @screen lg {
      min-height: 568px;
    }

    .aSide {
      @apply h-full w-full lg:w-4/12;
      min-height: 200px;
    }

    .content {
      @apply -mt-20 lg:mt-0;
      @apply bg-white;

      @apply rounded-2xl py-6 shadow-lg lg:rounded-none lg:p-0 lg:shadow-none;

      @apply h-full w-11/12 lg:w-8/12;
      @apply px-6 lg:px-10;
      @apply flex flex-col justify-between;

      .main {
        @apply flex flex-1 flex-col justify-center;

        .step {
          @apply pt-4 lg:pt-10;
        }
      }
    }
  }
}
</style>
