<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'Finishing up',
  sidebar: 'Summary',
  description: 'Double-check everything looks OK before confirming',
});
</script>

<script setup lang="ts">
import useForm from '@/hook/useForm';
import { calculateYearlyPrice } from '@/hook/useYearlyPrice';

const { form } = useForm;

const calculateTotal = computed(() => {
  const basePrice = form.plan?.price || 0;
  const addonsPrice = form.addons.reduce((acc, addon) => acc + addon.price, 0);
  const total = basePrice + addonsPrice;
  return total;
});
</script>

<template>
  <div>
    <div v-if="form.plan" class="rounded-lg bg-magnolia p-6">
      <div class="flex items-center justify-between">
        <div class="flex flex-1 flex-col">
          <span class="font-bold text-marine">
            {{ form?.plan?.name }} ({{ form.yearly ? 'Yearly' : 'Monthly' }})
          </span>
          <button type="button" class="w-fit text-left text-gray underline">
            Change
          </button>
        </div>
        <div class="font-bold text-marine">
          <span v-if="!form.yearly"> ${{ form.plan.price }}/mo </span>
          <span v-else> ${{ calculateYearlyPrice(form.plan.price) }}/yr </span>
        </div>
      </div>
      <!--  -->
      <template v-if="form.addons.length > 0">
        <div class="mt-6 mb-3 border border-lightgray"></div>
        <div
          class="flex items-center justify-between py-2"
          v-for="addon in form.addons"
          :key="addon.name"
        >
          <div class="flex flex-1 flex-col">
            <span class="text-gray">
              {{ addon.name }}
            </span>
          </div>
          <div class="text-marine">
            <span v-if="!form.yearly">+${{ addon.price }}/mo </span>
            <span v-else>+${{ calculateYearlyPrice(addon.price) }}/yr </span>
          </div>
        </div>
      </template>
      <!--  -->
    </div>
    <!--  -->
    <div class="flex items-center justify-between p-6 py-2 pt-6">
      <div class="flex-1">
        <span class="text-gray">
          Total (per {{ form.yearly ? 'year' : 'month' }})
        </span>
      </div>
      <div class="text-lg font-bold text-purplish">
        <span v-if="!form.yearly">${{ calculateTotal }}/mo </span>
        <span v-else>${{ calculateYearlyPrice(calculateTotal) }}/yr </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
