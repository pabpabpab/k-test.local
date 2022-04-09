import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import {
  RootState,
  RootGetterTypes as RootGetter,
  RootMutationTypes as RootMutation,
} from '@/store/types';
import http from './http/http_index';
import equipment from './equipment/equipment_index';
import formError from './formError/formError_index';

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol('storeKey');

export function useStore() {
  return baseUseStore(key);
}

export const store = createStore<RootState>({
  state: {
    apiUrlPrefix: '/api',
    loadingFlag: false,
  },
  getters: {
    [RootGetter.LOADING_FLAG]: (state): boolean => state.loadingFlag,
  },
  mutations: {
    [RootMutation.SET_LOADING_FLAG](state, value: boolean): void {
      state.loadingFlag = value;
    },
  },
  actions: {
  },
  modules: {
    http,
    equipment,
    formError,
  },
});
