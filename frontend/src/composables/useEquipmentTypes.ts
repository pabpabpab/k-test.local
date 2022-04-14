import { onMounted, computed } from 'vue';
import { ModuleTypes as Module } from '@/store/types';
import {
  EquipmentActionTypes as Action,
  EquipmentGetterTypes as Getter,
} from '@/store/equipment/equipment_types';
import { useStore } from '@/store';

export default function useEquipmentTypes(): object {
  const store = useStore();

  const equipmentTypes = computed(() => [...store.getters[`${Module.EQUIPMENT}/${Getter.EQUIPMENT_TYPE_LIST}`]]);

  onMounted(() => {
    store.dispatch(`${Module.EQUIPMENT}/${Action.LOAD_EQUIPMENT_TYPES}`);
  });

  return {
    equipmentTypes,
  };
}
