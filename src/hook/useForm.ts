import { reactive } from 'vue';

export default {
  form: reactive<{
    name: string;
    email: string;
    phone: string;
    plan: null | { name: string; image: string; price: number };
    addons: {
      name: string;
      description: string;
      price: number;
    }[];
    yearly: boolean;
  }>({
    name: '',
    email: '',
    phone: '',
    plan: null,
    addons: [],
    yearly: false,
  }),
  errors: reactive({
    name: '',
    email: '',
    phone: '',
  }),
};
