import { ActionTree } from 'vuex';
import {
  EquipmentState,
  EquipmentMutationTypes as MT,
  EquipmentActionTypes as EquipmentAction,
} from '@/store/equipment/equipment_types';
import { RootState, RootMutationTypes as RootMutation } from '@/store/types';
import { HttpActionTypes } from '@/store/http/http_types';

const loadSingleEquipment: ActionTree<EquipmentState, RootState> = {
  [EquipmentAction.LOAD_SINGLE_EQUIPMENT](
    {
      dispatch,
      commit,
      state,
    },
    // eslint-disable-next-line
    id: number
  ): void {
    const url = `${state.url.single}/${id}`;
    commit(RootMutation.SET_LOADING_FLAG, true, { root: true });
    dispatch(HttpActionTypes.GET_JSON, url, { root: true })
      .then((data) => {
        // console.log(data);
        commit(MT.SET_SINGLE_EQUIPMENT, data);
      })
      .finally(() => {
        setTimeout(() => {
          commit(RootMutation.SET_LOADING_FLAG, false, { root: true });
        }, 500);
      });
  },
};

export default loadSingleEquipment;
