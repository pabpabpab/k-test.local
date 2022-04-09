import { GetterTree } from 'vuex';
import { HttpState } from '@/store/http/http_types';
import { RootState } from '@/store/types';

const getters: GetterTree<HttpState, RootState> = {
  httpError: (state): string => state.httpError,
};

export default getters;
