import { ref } from 'vue';
import HeightFitter from '@/helpers/textareaHeightFitter';

export default function useTextareaHeightFitter(): object {
  const minimumHeight = ref(0);

  function fitTextareaHeight(e: Event): void {
    if (minimumHeight.value === 0) {
      minimumHeight.value = (<HTMLInputElement>e.target).clientHeight;
    }
    HeightFitter.fit(<HTMLInputElement>e.target, minimumHeight.value);
  }

  return {
    fitTextareaHeight,
  };
}
