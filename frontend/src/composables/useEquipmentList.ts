import { onMounted, computed } from 'vue';
import { ModuleTypes as Module } from '@/store/types';
import {
  EquipmentActionTypes as Action,
  EquipmentGetterTypes as Getter,
} from '@/store/equipment/equipment_types';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';

export default function useEquipmentList(): object {
  const store = useStore();

  const equipmentList = computed(() => [...store.getters[`${Module.EQUIPMENT}/${Getter.EQUIPMENT_LIST}`]]);

  const route = useRoute();
  onMounted(() => {
    if (route?.params?.pageNumber) {
      store.dispatch(`${Module.EQUIPMENT}/${Action.LOAD_EQUIPMENT}`, route.params.pageNumber);
      return;
    }
    store.dispatch(`${Module.EQUIPMENT}/${Action.LOAD_EQUIPMENT}`, 1);
  });

  return {
    equipmentList,
  };
}
