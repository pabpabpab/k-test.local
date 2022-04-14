/* eslint max-len: ["error", { "code": 120 }] */

import { ActionTree } from 'vuex';
import {
  HttpState,
  HttpMutationTypes as Mutation,
  HttpActionTypes as Action,
} from '@/store/http/http_types';
import { RootState } from '@/store/types';
import getCookie from '@/helpers/cookie/getCookie';

const putJson: ActionTree<HttpState, RootState> = {
  [Action.PUT_JSON]({ commit, rootState }, payload: { url: string, data: object }): Promise<object> {
    return fetch(rootState.tokenUrl, {
      method: 'GET',
    })
      .then(() => {
        const { url, data } = payload;
        commit(Mutation.RESET_HTTP_ERROR);
        return fetch(rootState.apiUrlPrefix + url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-XSRF-TOKEN': `${getCookie('XSRF-TOKEN')}`,
          },
          body: JSON.stringify(data),
        })
          .then((result) => result.json())
          .catch((error) => {
            console.log(error);
            const msg = 'Ошибка put-запроса.';
            commit(Mutation.SET_HTTP_ERROR, msg);
          });
      });
  },
};

export default putJson;
