import { ActionTree } from 'vuex';
import {
  EquipmentState,
  EquipmentGetterTypes as GT,
  EquipmentMutationTypes as MT,
  EquipmentActionTypes as EquipmentAction,
} from '@/store/equipment/equipment_types';
import { RootState, RootMutationTypes as RootMutation } from '@/store/types';
import { HttpActionTypes } from '@/store/http/http_types';

const loadEquipment: ActionTree<EquipmentState, RootState> = {
  [EquipmentAction.LOAD_EQUIPMENT](
    {
      dispatch,
      commit,
      getters,
      state,
    },
    // eslint-disable-next-line
    pageNumber = 1
  ): void {
    const url = `${state.url.list}?page=${pageNumber}&per_page=${getters[GT.PER_PAGE]}`;
    commit(RootMutation.SET_LOADING_FLAG, true, { root: true });
    dispatch(HttpActionTypes.GET_JSON, url, { root: true })
      .then((data) => {
        // console.log(data);
        commit(MT.SET_EQUIPMENT, data.data);
        commit(MT.SET_TOTAL_COUNT, data.meta.total);
        commit(MT.SET_PAGE_COUNT, data.meta.last_page);
        commit(MT.SET_CURRENT_PAGE, data.meta.current_page);
      })
      .finally(() => {
        setTimeout(() => {
          commit(RootMutation.SET_LOADING_FLAG, false, { root: true });
        }, 500);
      });
  },
};

export default loadEquipment;
