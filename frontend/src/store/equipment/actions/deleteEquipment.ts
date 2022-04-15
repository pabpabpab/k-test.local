import { ActionTree } from 'vuex';
import {
  EquipmentState,
  EquipmentActionTypes as Action,
} from '@/store/equipment/equipment_types';
import { RootState, RootMutationTypes as RootMutation } from '@/store/types';
import { HttpActionTypes as HttpAction } from '@/store/http/http_types';

const deleteEquipment: ActionTree<EquipmentState, RootState> = {
  [Action.DELETE_EQUIPMENT](
    {
      dispatch,
      commit,
      state,
    },
    id: number,
  ): Promise<boolean> {
    commit(RootMutation.SET_LOADING_FLAG, true, { root: true });
    const url = `${state.url.delete}/${id}`;
    return dispatch(HttpAction.DELETE_JSON, url, { root: true })
      .then((data) => data.success)
      .catch(() => false)
      .finally(() => {
        setTimeout(() => {
          commit(RootMutation.SET_LOADING_FLAG, false, { root: true });
        }, 500);
      });
  },
};

export default deleteEquipment;
