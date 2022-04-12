/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint max-len: ["error", { "code": 120 }] */

import { useStore } from '@/store';
import { useRoute } from 'vue-router';
import {
  computed,
  onMounted,
  reactive,
  watch,
} from 'vue';
import {
  EquipmentGetterTypes as EquipmentGetter,
  EquipmentActionTypes as AT,
  EquipmentObject,
} from '@/store/equipment/equipment_types';
import { FormErrorGetterTypes as GT } from '@/store/formError/formError_types';
import getUniqueSerialNumber from '../helpers/validation/equipment/getUniqueSerialNumber';

export default function useSaveEquipment(): object {
  const store = useStore();
  const localEquipment = reactive({
    id: 0,
    typeData: {
      typeId: 0,
      typeMask: '',
      typeName: '',
    },
    serialNumber: '',
    comment: '',
  } as EquipmentObject);

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
    localEquipment.serialNumber = serialNumber;
  });

  watch(getMismatchingSerialNumber, (mismatchingNumbersArr: string[]) => {
    if (!mismatchingNumbersArr.length) {
      return;
    }
    excludeSerialNumberFromLocalEquipment(mismatchingNumbersArr);
  });

  watch(getNonUniqueSerialNumber, (nonUniqueNumbersArr: string[]) => {
    if (!nonUniqueNumbersArr.length) {
      return;
    }
    excludeSerialNumberFromLocalEquipment(nonUniqueNumbersArr);
  });

  function excludeSerialNumberFromLocalEquipment(excludedNumbers: string[]): void {
    const userNumbers = localEquipment.serialNumber.split('\n');
    const validNumbers = userNumbers.filter((item) => !excludedNumbers.includes(item));
    localEquipment.serialNumber = validNumbers.join('\n');
  }

  function validateForm() {
    store.dispatch(`equipment/${AT.VALIDATE_SAVE_FORM}`, localEquipment);
  }

  function saveEquipment() {
    localEquipment.serialNumber = getUniqueSerialNumber(localEquipment.serialNumber);
    store.dispatch(`equipment/${AT.SAVE_EQUIPMENT}`, localEquipment);
  }

  // ---<при редактировании>---
  const singleEquipment = computed(() => store.getters[`equipment/${EquipmentGetter.SINGLE_EQUIPMENT}`]);
  watch(singleEquipment, (value: EquipmentObject) => {
    if (!value?.id) {
      return;
    }
    Object.assign(localEquipment, value);
  });

  const route = useRoute();
  onMounted(() => {
    if (route?.params?.id) {
      store.dispatch(`equipment/${AT.LOAD_SINGLE_EQUIPMENT}`, route.params.id);
    }
  });
  // ---</при редактировании>---

  return {
    localEquipment,
    error,
    validateForm,
    saveEquipment,
  };
}
