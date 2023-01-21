import { computed, ref } from "vue";

import YourInfo from "@/components/Steps/YourInfo.vue";
import SelectPlan from "@/components/Steps/SelectPlan.vue";
import Addons from "@/components/Steps/Addons.vue";
import FinishingUp from "@/components/Steps/FinishingUp.vue";

const formSteps = [YourInfo, SelectPlan, Addons, FinishingUp];

type d = (typeof formSteps)[0];

type MyComponent = d & {
  sidebar?: string;
  description?: string;
  validate?: any;
};

const useMultiStepForm = (formSteps: MyComponent[]) => {
  const currentIndex = ref(0);
  const isSubmitted = ref(false);

  const goForwards = async () => {
    if (formSteps[currentIndex.value].validate) {
      const errors = await formSteps[currentIndex.value].validate();
      if (errors) return;
    }

    if (currentIndex.value < formSteps.length - 1) {
      currentIndex.value++;
    } else {
      isSubmitted.value = true;
    }
  };

  const goBackwards = () => {
    if (currentIndex.value > 0) currentIndex.value--;
  };

  const currentStep = computed(() => formSteps[currentIndex.value]);

  const isFirstStep = computed(() => currentIndex.value === 0);

  const isLastStep = computed(() =>
    currentIndex.value === formSteps.length - 1 ? true : false
  );

  return {
    formSteps,
    currentIndex,
    currentStep,
    goForwards,
    goBackwards,
    isFirstStep,
    isLastStep,
    isSubmitted,
  };
};

export default useMultiStepForm(formSteps);

export type useMultiStepForm = typeof useMultiStepForm;
