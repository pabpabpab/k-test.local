import { MutationTree } from 'vuex';
import { HttpState, HttpMutationTypes as Mutation } from '@/store/http/http_types';

const mutations: MutationTree<HttpState> = {
  [Mutation.SET_HTTP_ERROR](state, text: string): void {
    state.httpError = text;
  },
  [Mutation.RESET_HTTP_ERROR](state): void {
    state.httpError = '';
  },
};

export default mutations;
