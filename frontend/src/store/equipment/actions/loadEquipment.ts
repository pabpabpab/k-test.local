import { ActionTree } from 'vuex';
import {
  EquipmentState,
  EquipmentGetterTypes as Getter,
  EquipmentMutationTypes as Mutation,
  EquipmentActionTypes as Action,
} from '@/store/equipment/equipment_types';
import { RootState, RootMutationTypes as RootMutation } from '@/store/types';
import { HttpActionTypes as HttpAction } from '@/store/http/http_types';

const loadEquipment: ActionTree<EquipmentState, RootState> = {
  [Action.LOAD_EQUIPMENT](
    {
      dispatch,
      commit,
      getters,
      state,
    },
    pageNumber = 1,
  ): void {
    const url = `${state.url.list}?page=${pageNumber}&per_page=${getters[Getter.PER_PAGE]}`;
    commit(RootMutation.SET_LOADING_FLAG, true, { root: true });
    dispatch(HttpAction.GET_JSON, url, { root: true })
      .then((data) => {
        commit(Mutation.SET_EQUIPMENT, data.data);
        commit(Mutation.SET_TOTAL_COUNT, data.meta.total);
        commit(Mutation.SET_PAGE_COUNT, data.meta.last_page);
        commit(Mutation.SET_CURRENT_PAGE, data.meta.current_page);
      })
      .finally(() => {
        setTimeout(() => {
          commit(RootMutation.SET_LOADING_FLAG, false, { root: true });
        }, 300);
      });
  },
};

export default loadEquipment;
