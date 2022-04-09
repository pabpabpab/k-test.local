import { MutationTree } from 'vuex';
import { HttpState, HttpMutationTypes as MT } from '@/store/http/http_types';

const mutations: MutationTree<HttpState> = {
  [MT.SET_HTTP_ERROR](state, text: string): void {
    state.httpError = text;
  },
  [MT.RESET_HTTP_ERROR](state): void {
    state.httpError = '';
  },
};

export default mutations;
