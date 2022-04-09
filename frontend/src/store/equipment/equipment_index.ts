import { Module } from 'vuex';
import { RootState } from '@/store/types';
import { EquipmentState } from './equipment_types';
import state from './equipment_state';
import getters from './equipment_getters';
import mutations from './equipment_mutations';

// actions
import loadEquipmentTypes from './actions/loadEquipmentTypes';
import saveEquipment from './actions/saveEquipment';
import validateSaveForm from './actions/validateSaveForm';

const equipment: Module<EquipmentState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions: {
    ...loadEquipmentTypes,
    ...saveEquipment,
    ...validateSaveForm,
  },
};

export default equipment;