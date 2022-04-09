export interface FormErrorState {
  formError: {
    typeId?: string[],
    serialNumbers?: string[],
    repeatedSerialNumbers?: string[],
    mismatchingSerialNumbers?: string[],
    nonUniqueSerialNumbers?: string[],
    // [index in string]?: string[]
  }, // ключ - имя input'а, значение - массив ошибок
}

// eslint-disable-next-line
export enum FormErrorGetterTypes {
  GET_FORM_ERROR = 'GET_FORM_ERROR',
  GET_REPEATED_SERIAL_NUMBERS = 'GET_REPEATED_SERIAL_NUMBERS',
  GET_MISMATCHING_SERIAL_NUMBERS = 'GET_MISMATCHING_SERIAL_NUMBERS',
  GET_NON_UNIQUE_SERIAL_NUMBERS = 'GET_NON_UNIQUE_SERIAL_NUMBERS',
}

// eslint-disable-next-line
export enum FormErrorMutationTypes {
  SET_FORM_ERROR = 'SET_FORM_ERROR',
  RESET_FORM_ERROR = 'RESET_FORM_ERROR',
}
