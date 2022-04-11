import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { EquipmentState, EquipmentGetterTypes as GT } from '@/store/equipment/equipment_types';

const getters: GetterTree<EquipmentState, RootState> = {
  [GT.EQUIPMENT_LIST]: (state): object[] => state.equipment,
  [GT.ACTUAL_EQUIPMENT_COUNT_ON_CURRENT_PAGE]: (state): number => state.equipment.length,
  [GT.TOTAL_COUNT]: (state): number => state.totalCount,
  [GT.PAGE_COUNT]: (state): number => state.pageCount,
  [GT.CURRENT_PAGE]: (state): number => state.currentPage,
  [GT.PER_PAGE]: (state): number => state.perPage,
  [GT.EQUIPMENT_TYPE_LIST]: (state): object[] => state.equipmentTypes,
  [GT.SINGLE_EQUIPMENT]: (state): object => state.singleEquipment,
};

export default getters;
