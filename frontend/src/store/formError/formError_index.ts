/* eslint no-shadow: ["error", { "hoist": "never" }] */

import { RootState } from '@/store/types';
import { GetterTree, Module, MutationTree } from 'vuex';
import {
  FormErrorState,
  FormErrorMutationTypes as MT,
  FormErrorGetterTypes as GT,
} from './formError_types';

const formState: FormErrorState = {
  formError: {

  },
};

const getters: GetterTree<FormErrorState, RootState> = {
  [GT.GET_FORM_ERROR]: (state) => (key: string): string => {
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

  [GT.GET_REPEATED_SERIAL_NUMBERS]: (state) => {
    const key = 'repeatedSerialNumbers';
    const errorObj = state.formError;
    if (Object.prototype.hasOwnProperty.call(errorObj, key)) {
      return errorObj[key];
    }
    return [];
  },

  [GT.GET_MISMATCHING_SERIAL_NUMBERS]: (state) => {
    const key = 'mismatchingSerialNumbers';
    const errorObj = state.formError;
    if (Object.prototype.hasOwnProperty.call(errorObj, key)) {
      return errorObj[key];
    }
    return [];
  },

  [GT.GET_NON_UNIQUE_SERIAL_NUMBERS]: (state) => {
    const key = 'nonUniqueSerialNumbers';
    const errorObj = state.formError;
    if (Object.prototype.hasOwnProperty.call(errorObj, key)) {
      return errorObj[key];
    }
    return [];
  },
};

const mutations: MutationTree<FormErrorState> = {
  [MT.SET_FORM_ERROR](state, data: typeof state.formError): void {
    state.formError = { ...data };
  },
  [MT.RESET_FORM_ERROR](state): void {
    state.formError = {};
  },
};

const formError: Module<FormErrorState, RootState> = {
  state: formState,
  getters,
  mutations,
};

export default formError;
