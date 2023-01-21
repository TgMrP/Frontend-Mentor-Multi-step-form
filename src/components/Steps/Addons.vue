<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Pick add-ons',
  sidebar: 'Add-Ons',
  description: 'Add-ons helps enhance your gaming experience',
});
</script>

<script setup lang="ts">
import { addons } from '@/database/data';
import useForm from '@/hook/useForm';

const { form } = useForm;
</script>

<template>
  <div class="flex flex-col gap-6">
    <label
      v-for="addon in addons"
      :key="addon.name"
      :for="addon.name"
      :class="{
        active: form.addons.find((a) => a.name === addon.name),
      }"
    >
      <input
        v-model="form.addons"
        type="checkbox"
        :name="addon.name"
        :id="addon.name"
        :value="addon"
      />
      <div class="data">
        <p class="name">
          {{ addon.name }}
        </p>
        <p class="description">{{ addon.description }}</p>
      </div>
      <div class="price">
        +
        <span v-if="!form.yearly"> ${{ addon.price }}/mo </span>
        <span v-else> ${{ addon.price * 10 }}/yr </span>
      </div>
    </label>
  </div>
</template>

<style lang="scss" scoped>
label {
  @apply flex cursor-pointer items-center gap-4 rounded-lg border border-lightgray p-4 text-sm lg:text-base;
  @apply transition-all duration-300;
  @apply select-none;
  &.active {
    @apply border-marine bg-magnolia;
  }

  input {
    @apply h-5 w-5 transition-all duration-300;
  }

  .data {
    @apply flex-1;
    .name {
      @apply font-bold text-marine;
    }

    .description {
      @apply text-xs text-gray lg:text-base;
    }
  }

  .price {
    @apply text-purplish;
  }
}
</style>
