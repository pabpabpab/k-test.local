import { onMounted, computed } from 'vue';
import {
  EquipmentActionTypes as AT,
  EquipmentGetterTypes as GT,
} from '@/store/equipment/equipment_types';
import { useStore } from '@/store';

export default function useEquipmentList(): object {
  const store = useStore();

  const equipmentList = computed(() => [...store.getters[`equipment/${GT.EQUIPMENT_LIST}`]]);

  onMounted(() => {
    store.dispatch(`equipment/${AT.LOAD_EQUIPMENT}`, 1);
  });

  return {
    equipmentList,
  };
}
