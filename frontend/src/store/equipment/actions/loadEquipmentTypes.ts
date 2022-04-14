import { ActionTree } from 'vuex';
import {
  EquipmentState,
  EquipmentMutationTypes as MT,
  EquipmentActionTypes as EquipmentAction,
} from '@/store/equipment/equipment_types';
import { RootState, RootMutationTypes as RootMutation } from '@/store/types';
import { HttpActionTypes } from '@/store/http/http_types';

const loadEquipmentTypes: ActionTree<EquipmentState, RootState> = {
  [EquipmentAction.LOAD_EQUIPMENT_TYPES]({ dispatch, commit, state }): void {
    const url = state.url.listOfTypes;
    commit(RootMutation.SET_LOADING_FLAG, true, { root: true });
    dispatch(HttpActionTypes.GET_JSON, url, { root: true })
      .then((data) => {
        commit(MT.SET_EQUIPMENT_TYPES, data.data);
      })
      .finally(() => {
        setTimeout(() => {
          commit(RootMutation.SET_LOADING_FLAG, false, { root: true });
        }, 500);
      });
  },
};

export default loadEquipmentTypes;
