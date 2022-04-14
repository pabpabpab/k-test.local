/* eslint no-shadow: ["error", { "hoist": "never" }] */

import { RootState } from '@/store/types';
import { GetterTree, Module, MutationTree } from 'vuex';
import {
  FormErrorState,
  FormErrorMutationTypes as Mutation,
  FormErrorGetterTypes as Getter,
} from './formError_types';

const formState: FormErrorState = {
  formError: {},
};

const getters: GetterTree<FormErrorState, RootState> = {
  [Getter.GET_FORM_ERROR]: (state) => (key: string): string => {
    const errorObj = state.formError;
    if (key) {
      if (Object.prototype.hasOwnProperty.call(errorObj, key)) {
        // eslint-disable-next-line
        // @ts-ignore
        return errorObj[key][0];
      }
    }
    return '';
  },

  [Getter.GET_REPEATED_SERIAL_NUMBERS]: (state) => {
    const key = 'repeatedSerialNumber';
    const errorObj = state.formError;
    if (Object.prototype.hasOwnProperty.call(errorObj, key)) {
      return errorObj[key];
    }
    return [];
  },

  [Getter.GET_MISMATCHING_SERIAL_NUMBERS]: (state) => {
    const key = 'mismatchingSerialNumber';
    const errorObj = state.formError;
    if (Object.prototype.hasOwnProperty.call(errorObj, key)) {
      return errorObj[key];
    }
    return [];
  },

  [Getter.GET_NON_UNIQUE_SERIAL_NUMBERS]: (state) => {
    const key = 'nonUniqueSerialNumber';
    const errorObj = state.formError;
    if (Object.prototype.hasOwnProperty.call(errorObj, key)) {
      return errorObj[key];
    }
    return [];
  },
};

const mutations: MutationTree<FormErrorState> = {
  [Mutation.SET_FORM_ERROR](state, data: typeof state.formError): void {
    state.formError = { ...data };
  },
  [Mutation.RESET_FORM_ERROR](state): void {
    state.formError = {};
  },
};

const formError: Module<FormErrorState, RootState> = {
  state: formState,
  getters,
  mutations,
};

export default formError;
