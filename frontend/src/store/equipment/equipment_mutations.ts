import { MutationTree } from 'vuex';
import {
  EquipmentState,
  EquipmentMutationTypes as Mutation,
  EquipmentTypeItem,
  EquipmentObject,
  SearchObject,
} from '@/store/equipment/equipment_types';

const mutations: MutationTree<EquipmentState> = {
  [Mutation.SET_EQUIPMENT](state, data: EquipmentObject[]): void {
    state.equipment = [...data];
  },
  [Mutation.SET_TOTAL_COUNT](state, value: number): void {
    state.totalCount = value;
  },
  [Mutation.SET_PAGE_COUNT](state, value: number): void {
    state.pageCount = value;
  },
  [Mutation.SET_CURRENT_PAGE](state, value: number): void {
    state.currentPage = value;
  },
  [Mutation.SET_PER_PAGE](state, value: number): void {
    state.perPage = value;
  },
  [Mutation.SET_SINGLE_EQUIPMENT](state, data: EquipmentObject): void {
    state.singleEquipment = { ...data };
  },
  [Mutation.SET_SEARCH_OBJECT](state, data: SearchObject): void {
    state.searchObject = { ...data };
  },
  [Mutation.SET_EQUIPMENT_TYPES](state, data: EquipmentTypeItem[]): void {
    state.equipmentTypes = [...data];
  },
};

export default mutations;
