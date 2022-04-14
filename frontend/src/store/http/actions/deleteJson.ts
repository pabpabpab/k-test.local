import { ActionTree } from 'vuex';
import {
  HttpState,
  HttpMutationTypes as Mutation,
  HttpActionTypes as Action,
} from '@/store/http/http_types';
import { RootState } from '@/store/types';
import getCookie from '@/helpers/cookie/getCookie';

const deleteJson: ActionTree<HttpState, RootState> = {
  [Action.DELETE_JSON]({ commit, rootState }, url: string): Promise<object> {
    return fetch(rootState.tokenUrl, {
      method: 'GET',
    })
      .then(() => {
        commit(Mutation.RESET_HTTP_ERROR);
        return fetch(rootState.apiUrlPrefix + url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-XSRF-TOKEN': `${getCookie('XSRF-TOKEN')}`,
          },
        })
          .then((result) => result.json())
          .catch((error) => {
            console.log(error);
            const msg = 'Ошибка delete-запроса.';
            commit(Mutation.SET_HTTP_ERROR, msg);
          });
      });
  },
};

export default deleteJson;
