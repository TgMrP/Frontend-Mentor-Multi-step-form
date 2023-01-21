<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Select your plan',
  sidebar: 'Select Plan',
  description: 'You have the option of monthly or yearly billing',
});
</script>

<script setup lang="ts">
import { plans } from '@/database/data';
import useForm from '@/hook/useForm';
import {
  calculateYearlyPrice,
  yearlyPriceMessage,
} from '@/hook/useYearlyPrice';

const { form } = useForm;
</script>

<template>
  <div class="plans">
    <div
      v-for="plan in plans"
      :key="plan.name"
      :for="plan.name"
      @click="form.plan = plan"
      class="plan"
      :class="{
        active: form?.plan?.name === plan.name,
      }"
    >
      <img :src="plan.image" :alt="plan.name" />
      <label :for="plan.name">
        <p class="name">{{ plan.name }}</p>
        <Transition mode="out-in">
          <p class="price" v-if="!form.yearly">${{ plan.price }}/mo</p>
          <div class="price" v-else>
            <p>${{ calculateYearlyPrice(plan.price) }}/yr</p>
            <p class="message">{{ yearlyPriceMessage }}</p>
          </div>
        </Transition>
      </label>
    </div>

    <!--  -->
    <div class="toggle">
      <div
        class="transition-all duration-300"
        :class="{
          'text-gray-cool': form.yearly,
          'text-primary-blue-marine font-bold': !form.yearly,
        }"
      >
        Monthly
      </div>
      <div
        @click="form.yearly = !form.yearly"
        class="input"
        :class="{
          yearly: form.yearly,
          monthly: !form.yearly,
        }"
      ></div>
      <div
        class="transition-all duration-300"
        :class="{
          'text-gray-cool': !form.yearly,
          'text-primary-blue-marine font-bold': form.yearly,
        }"
      >
        Yearly
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.plans {
  @apply grid grid-cols-1 lg:grid-cols-3 gap-3 pt-6   select-none;

  .plan {
    @apply border border-lightgray rounded-2xl w-full p-4 flex lg:flex-col gap-4 lg:gap-10 cursor-pointer transition-all duration-300;

    &.active {
      @apply border-marine;
    }
    img {
      @apply w-10 h-10 cursor-pointer;
    }
    label {
      .name {
        @apply font-bold cursor-pointer;
      }

      .price {
        @apply text-gray text-sm cursor-pointer;

        .message {
          @apply text-xs text-marine;
        }
      }
    }
  }
}

.toggle {
  @apply lg:col-span-3 w-full flex justify-center gap-6 bg-magnolia rounded-md mt-4 py-3;
  .input {
    @apply relative w-full max-w-[40px] inline-flex items-center px-3 py-2 rounded-full cursor-pointer;
    @apply bg-marine;
    &::before {
      @apply content-[''];
      @apply absolute w-4 h-4 bg-white rounded-full transition-all duration-300;

      &.yearly {
        @apply left-[90%] -translate-x-full;
      }

      &.monthly {
        @apply left-1;
      }
    }
  }
}
</style>
