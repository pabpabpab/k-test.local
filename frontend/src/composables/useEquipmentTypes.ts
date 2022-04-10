import { onMounted, computed } from 'vue';
import {
  EquipmentActionTypes as AT,
  EquipmentGetterTypes as GT,
} from '@/store/equipment/equipment_types';
import { useStore } from '@/store';

export default function useEquipmentTypes(): object {
  const store = useStore();

  const equipmentTypes = computed(() => [...store.getters[`equipment/${GT.EQUIPMENT_TYPE_LIST}`]]);

  onMounted(() => {
    store.dispatch(`equipment/${AT.LOAD_EQUIPMENT_TYPES}`);
  });

  return {
    equipmentTypes,
  };
}
