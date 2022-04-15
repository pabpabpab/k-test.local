import { ActionTree } from 'vuex';
import {
  EquipmentState,
  EquipmentMutationTypes as Mutation,
  EquipmentActionTypes as Action,
} from '@/store/equipment/equipment_types';
import { RootState, RootMutationTypes as RootMutation } from '@/store/types';
import { HttpActionTypes as HttpAction } from '@/store/http/http_types';

const loadEquipmentTypes: ActionTree<EquipmentState, RootState> = {
  [Action.LOAD_EQUIPMENT_TYPES]({ dispatch, commit, state }): void {
    const url = state.url.listOfTypes;
    commit(RootMutation.SET_LOADING_FLAG, true, { root: true });
    dispatch(HttpAction.GET_JSON, url, { root: true })
      .then((data) => {
        commit(Mutation.SET_EQUIPMENT_TYPES, data.data);
      })
      .finally(() => {
        setTimeout(() => {
          commit(RootMutation.SET_LOADING_FLAG, false, { root: true });
        }, 500);
      });
  },
};

export default loadEquipmentTypes;
