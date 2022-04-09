import { ActionTree } from 'vuex';
import {
  HttpState,
  HttpMutationTypes as MT,
  HttpActionTypes as AT,
} from '@/store/http/http_types';
import { RootState } from '@/store/types';

const getJson: ActionTree<HttpState, RootState> = {
  [AT.GET_JSON]({ commit, rootState }, url: string): Promise<any> {
    // console.log(url);
    commit(MT.RESET_HTTP_ERROR);

    return fetch(rootState.apiUrlPrefix + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((result) => result.json())
      .catch((error) => {
        console.log(error);
        const msg = 'Ошибка get-запроса.';
        commit(MT.SET_HTTP_ERROR, msg);
      });
  },
};

export default getJson;
