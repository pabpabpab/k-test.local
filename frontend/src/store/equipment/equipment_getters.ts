import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import {
  EquipmentState,
  EquipmentGetterTypes as Getter,
  EquipmentObject,
  EquipmentTypeItem,
  SearchObject,
} from '@/store/equipment/equipment_types';

const getters: GetterTree<EquipmentState, RootState> = {
  [Getter.EQUIPMENT_LIST]: (state): EquipmentObject[] => state.equipment,
  [Getter.ACTUAL_EQUIPMENT_COUNT_ON_CURRENT_PAGE]: (state): number => state.equipment.length,
  [Getter.TOTAL_COUNT]: (state): number => state.totalCount,
  [Getter.PAGE_COUNT]: (state): number => state.pageCount,
  [Getter.CURRENT_PAGE]: (state): number => state.currentPage,
  [Getter.PER_PAGE]: (state): number => state.perPage,
  [Getter.EQUIPMENT_TYPE_LIST]: (state): EquipmentTypeItem[] => state.equipmentTypes,
  [Getter.SINGLE_EQUIPMENT]: (state): EquipmentObject => ({ ...state.singleEquipment }),
  [Getter.SEARCH_OBJECT]: (state): SearchObject => ({ ...state.searchObject }),
};

export default getters;
