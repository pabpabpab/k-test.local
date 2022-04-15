import { ActionTree } from 'vuex';
import {
  EquipmentState,
  EquipmentMutationTypes as Mutation,
  EquipmentActionTypes as Action,
} from '@/store/equipment/equipment_types';
import { RootState, RootMutationTypes as RootMutation } from '@/store/types';
import { HttpActionTypes as HttpAction } from '@/store/http/http_types';

const loadSingleEquipment: ActionTree<EquipmentState, RootState> = {
  [Action.LOAD_SINGLE_EQUIPMENT](
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
    dispatch(HttpAction.GET_JSON, url, { root: true })
      .then((data) => {
        // console.log(data);
        commit(Mutation.SET_SINGLE_EQUIPMENT, data);
      })
      .finally(() => {
        setTimeout(() => {
          commit(RootMutation.SET_LOADING_FLAG, false, { root: true });
        }, 500);
      });
  },
};

export default loadSingleEquipment;
