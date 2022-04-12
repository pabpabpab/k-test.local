import { MutationTree } from 'vuex';
import {
  EquipmentState,
  EquipmentMutationTypes as MT,
  EquipmentTypeItem,
  EquipmentObject,
} from '@/store/equipment/equipment_types';

const mutations: MutationTree<EquipmentState> = {
  [MT.SET_EQUIPMENT](state, data: EquipmentObject[]): void {
    state.equipment = [...data];
  },
  [MT.SET_TOTAL_COUNT](state, value: number): void {
    state.totalCount = value;
  },
  [MT.SET_PAGE_COUNT](state, value: number): void {
    state.pageCount = value;
  },
  [MT.SET_CURRENT_PAGE](state, value: number): void {
    state.currentPage = value;
  },
  [MT.SET_PER_PAGE](state, value: number): void {
    state.perPage = value;
  },
  [MT.SET_SINGLE_EQUIPMENT](state, data: EquipmentObject): void {
    state.singleEquipment = { ...data };
  },
  [MT.SET_EQUIPMENT_TYPES](state, data: EquipmentTypeItem[]): void {
    state.equipmentTypes = [...data];
  },
};

export default mutations;
