<script lang="ts">
import { defineComponent } from 'vue';
import useForm from '@/hook/useForm';

export default defineComponent({
  name: 'Personal Info',
  sidebar: 'Your Info',
  description: 'Please provide your name, email address, and phone number',
  validate: () => {
    const { form, errors } = useForm;
    let error = false;

    errors.name = '';
    errors.email = '';
    errors.phone = '';

    if (!form.name) {
      errors.name = 'Name is required';
      error = true;
    }

    if (!form.email) {
      errors.email = 'Email is required';
      error = true;
    }

    if (!form.phone) {
      errors.phone = 'Phone is required';
      error = true;
    }

    return error;
  },
});
</script>

<script setup lang="ts">
const { form, errors } = useForm;
</script>

<template>
  <div class="form">
    <div class="form-row">
      <label for="name">
        Name
        <span class="error" v-if="errors?.name">{{ errors.name }}</span>
      </label>
      <input
        autofocus
        type="text"
        id="name"
        placeholder="e.g. Stephen King"
        v-model="form.name"
        :class="{
          error: errors?.name,
        }"
      />
    </div>
    <div class="form-row">
      <label for="email">
        Email Address
        <span class="error" v-if="errors?.email">{{ errors.email }}</span>
      </label>
      <input
        type="email"
        id="email"
        placeholder="e.g. stephenking@lorem.com"
        v-model="form.email"
        :class="{
          error: errors?.email,
        }"
      />
    </div>
    <div class="form-row">
      <label for="phone">
        Phone Number
        <span class="error" v-if="errors?.phone">{{ errors.phone }}</span>
      </label>
      <input
        type="tel"
        id="phone"
        placeholder="e.g. +1 234 567 890"
        v-model="form.phone"
        :class="{
          error: errors?.phone,
        }"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form {
  @apply flex flex-col gap-3 lg:gap-4;
  .form-row {
    @apply flex flex-col;
    label {
      @apply flex items-center justify-between pb-1 text-sm text-marine lg:text-base;

      .error {
        @apply font-bold text-strawberry;
      }
    }

    input {
      @apply rounded-lg border border-lightgray px-4 py-2 text-sm font-medium text-gray lg:px-5 lg:py-3 lg:text-base;
      @apply outline-none;

      &.error {
        @apply border-strawberry;
      }
    }
  }
}
</style>
