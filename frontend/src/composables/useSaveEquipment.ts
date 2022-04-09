/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint max-len: ["error", { "code": 120 }] */

import { computed, reactive, watch } from 'vue';
import { EquipmentActionTypes as AT, EquipmentObject } from '@/store/equipment/equipment_types';
import { FormErrorGetterTypes as GT } from '@/store/formError/formError_types';
import getUniqueSerialNumbers from '@/helpers/validation/equipment/getUniqueSerialNumbers';
import { useStore } from '@/store';

export default function useSaveEquipment(): object {
  const store = useStore();
  const localEquipment = reactive({
    id: 0,
    typeData: {
      typeId: 0,
      typeMask: '',
      typeName: '',
      typeRegexp: '',
    },
    serialNumbers: '',
    comment: '',
  } as EquipmentObject);

  const getMismatchingSerialNumbers = computed(() => [...store.getters[GT.GET_MISMATCHING_SERIAL_NUMBERS]]);
  const getNonUniqueSerialNumbers = computed(() => [...store.getters[GT.GET_NON_UNIQUE_SERIAL_NUMBERS]]);
  const getRepeatedSerialNumbers = computed(() => [...store.getters[GT.GET_REPEATED_SERIAL_NUMBERS]]);
  const getUserSerialNumbers = computed(() => localEquipment.serialNumbers);

  const error = reactive({
    typeId: computed(() => store.getters[GT.GET_FORM_ERROR]('typeId')),
    serialNumbers: computed(() => store.getters[GT.GET_FORM_ERROR]('serialNumbers')),
    repeatedSerialNumbers: getRepeatedSerialNumbers,
    mismatchingSerialNumbers: getMismatchingSerialNumbers,
    nonUniqueSerialNumbers: getNonUniqueSerialNumbers,
  });

  watch(getUserSerialNumbers, (value) => {
    let serialNumbers = value.replaceAll(' ', '');
    serialNumbers = serialNumbers.replaceAll(',', '\n');
    serialNumbers = serialNumbers.replaceAll('\n\n', '\n');
    localEquipment.serialNumbers = serialNumbers;
  });

  watch(getMismatchingSerialNumbers, (mismatchingNumbersArr: string[]) => {
    if (!mismatchingNumbersArr.length) {
      return;
    }
    excludeSerialNumbersFromLocalEquipment(mismatchingNumbersArr);
  });

  watch(getNonUniqueSerialNumbers, (nonUniqueNumbersArr: string[]) => {
    if (!nonUniqueNumbersArr.length) {
      return;
    }
    excludeSerialNumbersFromLocalEquipment(nonUniqueNumbersArr);
  });

  function excludeSerialNumbersFromLocalEquipment(excludedNumbers: string[]): void {
    const userNumbers = localEquipment.serialNumbers.split('\n');
    const validNumbers = userNumbers.filter((item) => !excludedNumbers.includes(item));
    localEquipment.serialNumbers = validNumbers.join('\n');
  }

  function validateForm() {
    store.dispatch(`equipment/${AT.VALIDATE_SAVE_FORM}`, localEquipment);
  }

  function saveEquipment() {
    localEquipment.serialNumbers = getUniqueSerialNumbers(localEquipment.serialNumbers);
    store.dispatch(`equipment/${AT.SAVE_EQUIPMENT}`, localEquipment);
  }

  return {
    localEquipment,
    error,
    validateForm,
    saveEquipment,
  };
}
