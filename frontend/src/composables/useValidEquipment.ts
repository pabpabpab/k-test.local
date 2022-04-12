/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint max-len: ["error", { "code": 120 }] */
/* eslint no-param-reassign: off */

import { useStore } from '@/store';
import {
  computed,
  onMounted,
  reactive,
  watch,
} from 'vue';
import { EquipmentActionTypes as AT, EquipmentObject } from '@/store/equipment/equipment_types';
import {
  FormErrorGetterTypes as GT,
  FormErrorMutationTypes as MT,
} from '@/store/formError/formError_types';

export default function useSaveEquipment(localEquipment: EquipmentObject): object {
  const store = useStore();

  const getMismatchingSerialNumber = computed(() => [...store.getters[GT.GET_MISMATCHING_SERIAL_NUMBERS]]);
  const getNonUniqueSerialNumber = computed(() => [...store.getters[GT.GET_NON_UNIQUE_SERIAL_NUMBERS]]);
  const getRepeatedSerialNumber = computed(() => [...store.getters[GT.GET_REPEATED_SERIAL_NUMBERS]]);
  const getUserSerialNumber = computed(() => localEquipment.serialNumber);

  const error = reactive({
    typeId: computed(() => store.getters[GT.GET_FORM_ERROR]('typeId')),
    serialNumber: computed(() => store.getters[GT.GET_FORM_ERROR]('serialNumber')),
    repeatedSerialNumber: getRepeatedSerialNumber,
    mismatchingSerialNumber: getMismatchingSerialNumber,
    nonUniqueSerialNumber: getNonUniqueSerialNumber,
  });

  watch(getUserSerialNumber, (value) => {
    let serialNumber = value.replaceAll(' ', '');
    serialNumber = serialNumber.replaceAll(',', '\n');
    serialNumber = serialNumber.replaceAll('\n\n', '\n');
    if (localEquipment.id) {
      // при редактировании допустимо только одно значение
      [serialNumber] = serialNumber.split('\n');
    }
    localEquipment.serialNumber = serialNumber;
  });

  watch(getMismatchingSerialNumber, (mismatchingNumbersArr: string[]) => {
    if (!mismatchingNumbersArr.length) {
      return;
    }
    if (!localEquipment.id) {
      // при редактировании не исключать из поля ввода
      excludeSerialNumberFromLocalEquipment(mismatchingNumbersArr);
    }
  });

  watch(getNonUniqueSerialNumber, (nonUniqueNumbersArr: string[]) => {
    if (!nonUniqueNumbersArr.length) {
      return;
    }
    if (!localEquipment.id) {
      // при редактировании не исключать из поля ввода
      excludeSerialNumberFromLocalEquipment(nonUniqueNumbersArr);
    }
  });

  function excludeSerialNumberFromLocalEquipment(excludedNumbers: string[]): void {
    const userNumbers = localEquipment.serialNumber.split('\n');
    const validNumbers = userNumbers.filter((item) => !excludedNumbers.includes(item));
    localEquipment.serialNumber = validNumbers.join('\n');
  }

  function validateForm() {
    store.dispatch(`equipment/${AT.VALIDATE_SAVE_FORM}`, localEquipment);
  }

  onMounted(() => {
    store.commit(MT.RESET_FORM_ERROR);
  });

  return {
    error,
    validateForm,
  };
}
