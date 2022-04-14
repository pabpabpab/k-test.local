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
import { ModuleTypes as Module } from '@/store/types';
import { EquipmentActionTypes as Action, EquipmentObject } from '@/store/equipment/equipment_types';
import {
  FormErrorGetterTypes as Getter,
  FormErrorMutationTypes as Mutation,
} from '@/store/formError/formError_types';

export default function useSaveEquipment(localEquipment: EquipmentObject): object {
  const store = useStore();

  const getMismatchingSerialNumber = computed(() => [...store.getters[Getter.GET_MISMATCHING_SERIAL_NUMBERS]]);
  const getNonUniqueSerialNumber = computed(() => [...store.getters[Getter.GET_NON_UNIQUE_SERIAL_NUMBERS]]);
  const getRepeatedSerialNumber = computed(() => [...store.getters[Getter.GET_REPEATED_SERIAL_NUMBERS]]);
  const getUserSerialNumber = computed(() => localEquipment.serialNumber);

  const error = reactive({
    typeId: computed(() => store.getters[Getter.GET_FORM_ERROR]('typeId')),
    serialNumber: computed(() => store.getters[Getter.GET_FORM_ERROR]('serialNumber')),
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
    store.dispatch(`${Module.EQUIPMENT}/${Action.VALIDATE_SAVE_FORM}`, localEquipment);
  }

  onMounted(() => {
    store.commit(Mutation.RESET_FORM_ERROR);
  });

  return {
    error,
    validateForm,
  };
}
