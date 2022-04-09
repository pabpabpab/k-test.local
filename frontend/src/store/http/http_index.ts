import { Module } from 'vuex';
import { RootState } from '@/store/types';
import { HttpState } from './http_types';
import state from './http_state';
import getters from './http_getters';
import mutations from './http_mutations';

// actions
import getJson from './actions/getJson';
import postJson from './actions/postJson';
import putJson from './actions/putJson';
import deleteJson from './actions/deleteJson';

const http: Module<HttpState, RootState> = {
  state,
  getters,
  mutations,
  actions: {
    ...getJson,
    ...postJson,
    ...putJson,
    ...deleteJson,
  },
};

export default http;
