import { ActionTree } from 'vuex';
import {
  HttpState,
  HttpMutationTypes as MT,
  HttpActionTypes as AT,
} from '@/store/http/http_types';
import { RootState } from '@/store/types';

const deleteJson: ActionTree<HttpState, RootState> = {
  [AT.DELETE_JSON]({ commit, rootState }, url: string): Promise<any> {
    console.log(url);
    commit(MT.RESET_HTTP_ERROR);

    return fetch(rootState.apiUrlPrefix + url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((result) => result.json())
      .catch((error) => {
        console.log(error);
        const msg = 'Ошибка delete-запроса.';
        commit(MT.SET_HTTP_ERROR, msg);
      });
  },
};

export default deleteJson;
