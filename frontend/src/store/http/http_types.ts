export interface HttpState {
  httpError: string;
}

// eslint-disable-next-line
export enum HttpMutationTypes {
  SET_HTTP_ERROR = 'SET_HTTP_ERROR',
  RESET_HTTP_ERROR = 'RESET_HTTP_ERROR',
}

// eslint-disable-next-line
export enum HttpActionTypes {
  GET_JSON = 'GET_JSON',
  POST_JSON = 'POST_JSON',
  DELETE_JSON = 'DELETE_JSON',
  PUT_JSON = 'PUT_JSON',
}
