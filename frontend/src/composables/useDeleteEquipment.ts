import { ElMessage } from 'element-plus';
import { computed } from 'vue';
import { ModuleTypes as Module } from '@/store/types';
import {
  EquipmentActionTypes as Action,
  EquipmentGetterTypes as Getter,
} from '@/store/equipment/equipment_types';
import { useStore } from '@/store';

export default function useDeleteEquipment(): object {
  const store = useStore();

  const actualItemCount = computed(() => store.getters[`equipment/${Getter.ACTUAL_EQUIPMENT_COUNT_ON_CURRENT_PAGE}`]);
  const currentPageNumber = computed(() => store.getters[`equipment/${Getter.CURRENT_PAGE}`]);

  function deleteEquipment(id: number) {
    store.dispatch(`${Module.EQUIPMENT}/${Action.DELETE_EQUIPMENT}`, id)
      .then((success) => {
        if (!success) {
          ElMessage({
            message: 'Не удалось удалить оборудование.',
            type: 'warning',
          });
          return;
        }

        ElMessage({
          message: 'Оборудование удалено.',
          type: 'success',
          duration: 1500,
          offset: 300,
          customClass: 'el-message_custom',
        });

        let newPageNumber = actualItemCount.value > 1
          ? currentPageNumber.value
          : currentPageNumber.value - 1;

        newPageNumber = newPageNumber < 1 ? 1 : newPageNumber;

        store.dispatch(`${Module.EQUIPMENT}/${Action.LOAD_EQUIPMENT}`, newPageNumber);
      });
  }

  return {
    deleteEquipment,
  };
}
