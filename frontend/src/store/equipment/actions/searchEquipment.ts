import { ActionTree } from 'vuex';
import {
  EquipmentState,
  EquipmentActionTypes as EquipmentAction,
  EquipmentMutationTypes as MT,
  EquipmentGetterTypes as GT,
} from '@/store/equipment/equipment_types';
import { RootState, RootMutationTypes as RootMutation } from '@/store/types';
import { HttpActionTypes as HttpAction } from '@/store/http/http_types';

const searchEquipment: ActionTree<EquipmentState, RootState> = {
  [EquipmentAction.SEARCH_EQUIPMENT](
    {
      dispatch,
      commit,
      getters,
      state,
    },
    payload,
  ): void {
    const { searchObject, pageNumber } = payload;
    commit(RootMutation.SET_LOADING_FLAG, true, { root: true });
    const url = `${state.url.search}?page=${pageNumber}&per_page=${getters[GT.PER_PAGE]}`;

    dispatch(HttpAction.POST_JSON, { url, data: searchObject }, { root: true })
      .then((data) => {
        commit(MT.SET_EQUIPMENT, data.data);
        commit(MT.SET_TOTAL_COUNT, data.meta.total);
        commit(MT.SET_PAGE_COUNT, data.meta.last_page);
        commit(MT.SET_CURRENT_PAGE, data.meta.current_page);
      })
      .finally(() => {
        setTimeout(() => {
          commit(RootMutation.SET_LOADING_FLAG, false, { root: true });
        }, 300);
      });
  },
};

export default searchEquipment;
