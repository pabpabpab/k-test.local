export interface RootState {
  apiUrlPrefix: string,
  loadingFlag: boolean,
}

// eslint-disable-next-line
export enum RootGetterTypes {
  LOADING_FLAG = 'LOADING_FLAG',
}

// eslint-disable-next-line
export enum RootMutationTypes {
  SET_LOADING_FLAG = 'SET_LOADING_FLAG',
}
