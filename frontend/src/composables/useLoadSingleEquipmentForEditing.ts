/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint max-len: ["error", { "code": 120 }] */

import { useStore } from '@/store';
import { useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';
import { ModuleTypes as Module } from '@/store/types';
import {
  EquipmentGetterTypes as Getter,
  EquipmentActionTypes as Action,
} from '@/store/equipment/equipment_types';

export default function useSaveEquipment(): object {
  const store = useStore();

  const singleEquipment = computed(() => store.getters[`${Module.EQUIPMENT}/${Getter.SINGLE_EQUIPMENT}`]);

  const route = useRoute();
  onMounted(() => {
    if (route?.params?.id) {
      store.dispatch(`${Module.EQUIPMENT}/${Action.LOAD_SINGLE_EQUIPMENT}`, route.params.id);
    }
  });

  return {
    singleEquipment,
  };
}
