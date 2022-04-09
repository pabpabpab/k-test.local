import { ActionTree } from 'vuex';
import {
  HttpState,
  HttpMutationTypes as MT,
  HttpActionTypes as AT,
} from '@/store/http/http_types';
import { RootState } from '@/store/types';

const postJson: ActionTree<HttpState, RootState> = {
  [AT.POST_JSON]({ commit, rootState }, payload: { url: string, data: object }): Promise<any> {
    const { url, data } = payload;
    commit(MT.RESET_HTTP_ERROR);
    return fetch(rootState.apiUrlPrefix + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((result) => result.json())
      .catch((error) => {
        console.log(error);
        const msg = 'Ошибка post-запроса.';
        commit(MT.SET_HTTP_ERROR, msg);
      });
  },
};

export default postJson;
