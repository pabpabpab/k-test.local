import { ElMessage } from 'element-plus';
import { computed } from 'vue';
import {
  EquipmentActionTypes as AT,
  EquipmentGetterTypes as GT,
} from '@/store/equipment/equipment_types';
import { useStore } from '@/store';

export default function useDeleteEquipment(): object {
  const store = useStore();

  const actualItemCount = computed(() => store.getters[`equipment/${GT.ACTUAL_EQUIPMENT_COUNT_ON_CURRENT_PAGE}`]);
  const currentPageNumber = computed(() => store.getters[`equipment/${GT.CURRENT_PAGE}`]);

  function deleteEquipment(id: number) {
    store.dispatch(`equipment/${AT.DELETE_EQUIPMENT}`, id)
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

        store.dispatch(`equipment/${AT.LOAD_EQUIPMENT}`, newPageNumber);
      });
  }

  return {
    deleteEquipment,
  };
}
