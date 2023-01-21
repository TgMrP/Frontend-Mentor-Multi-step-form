import { plans } from '@/database/data';
import { reactive } from 'vue';

export default {
  form: reactive<{
    name: string;
    email: string;
    phone: string;
    plan: { name: string; image: string; price: number };
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
    plan: plans[0],
    addons: [],
    yearly: false,
  }),
  errors: reactive({
    name: '',
    email: '',
    phone: '',
  }),
};
