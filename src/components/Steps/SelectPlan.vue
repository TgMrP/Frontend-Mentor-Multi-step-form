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
  @apply grid select-none grid-cols-1 gap-3 pt-6   lg:grid-cols-3;

  .plan {
    @apply flex w-full cursor-pointer gap-4 rounded-2xl border border-lightgray p-4 transition-all duration-300 lg:flex-col lg:gap-10;

    &.active {
      @apply border-marine;
    }
    img {
      @apply h-10 w-10 cursor-pointer;
    }
    label {
      .name {
        @apply cursor-pointer font-bold;
      }

      .price {
        @apply cursor-pointer text-sm text-gray;

        .message {
          @apply text-xs text-marine;
        }
      }
    }
  }
}

.toggle {
  @apply mt-4 flex w-full justify-center gap-6 rounded-md bg-magnolia py-3 lg:col-span-3;
  .input {
    @apply relative inline-flex w-full max-w-[40px] cursor-pointer items-center rounded-full px-3 py-2;
    @apply bg-marine;
    &::before {
      @apply content-[''];
      @apply absolute h-4 w-4 rounded-full bg-white transition-all duration-300;

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
