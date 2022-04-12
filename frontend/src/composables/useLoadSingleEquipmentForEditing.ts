/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint max-len: ["error", { "code": 120 }] */

import { useStore } from '@/store';
import { useRoute } from 'vue-router';
import {
  computed,
  onMounted,
} from 'vue';
import {
  EquipmentGetterTypes as EquipmentGetter,
  EquipmentActionTypes as AT,
} from '@/store/equipment/equipment_types';

export default function useSaveEquipment(): object {
  const store = useStore();

  const singleEquipment = computed(() => store.getters[`equipment/${EquipmentGetter.SINGLE_EQUIPMENT}`]);

  const route = useRoute();
  onMounted(() => {
    if (route?.params?.id) {
      store.dispatch(`equipment/${AT.LOAD_SINGLE_EQUIPMENT}`, route.params.id);
    }
  });

  return {
    singleEquipment,
  };
}
