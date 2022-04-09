import { MutationTree } from 'vuex';
import {
  EquipmentState,
  EquipmentMutationTypes as MT,
  EquipmentTypeItem,
} from '@/store/equipment/equipment_types';

const mutations: MutationTree<EquipmentState> = {
  [MT.SET_EQUIPMENT](state, data: object[]): void {
    state.equipment = [...data];
  },
  [MT.SET_SINGLE_EQUIPMENT](state, data: object): void {
    state.singleEquipment = { ...data };
  },
  [MT.SET_EQUIPMENT_TYPES](state, data: EquipmentTypeItem[]): void {
    state.equipmentTypes = [...data];
  },
};

export default mutations;
