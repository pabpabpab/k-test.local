export interface EquipmentTypeItem {
  id: number,
  name: string,
  mask: string,
}

export interface EquipmentObject {
  id: number,
  typeData: {
    typeId: number,
    typeMask: string,
    typeName: string,
  },
  serialNumber: string,
  comment: string,
}

export interface EquipmentState {
  url: {
    list: string,
    single: string,
    add: string,
    update: string,
    delete: string,
    listOfTypes: string,
  },

  equipment: EquipmentObject[],
  totalCount: number,
  pageCount: number,
  currentPage: number,
  perPage: number,
  equipmentTypes: EquipmentTypeItem[],
  singleEquipment: EquipmentObject,
}

// eslint-disable-next-line
export enum EquipmentGetterTypes {
  EQUIPMENT_LIST = 'EQUIPMENT_LIST',
  TOTAL_COUNT = 'TOTAL_COUNT',
  PAGE_COUNT = 'PAGE_COUNT',
  CURRENT_PAGE = 'CURRENT_PAGE',
  PER_PAGE = 'PER_PAGE',
  ACTUAL_EQUIPMENT_COUNT_ON_CURRENT_PAGE = 'ACTUAL_EQUIPMENT_COUNT_ON_CURRENT_PAGE',
  EQUIPMENT_TYPE_LIST = 'EQUIPMENT_TYPE_LIST',
  SINGLE_EQUIPMENT = 'SINGLE_EQUIPMENT',
}

// eslint-disable-next-line
export enum EquipmentMutationTypes {
  SET_EQUIPMENT = 'SET_EQUIPMENT',
  SET_TOTAL_COUNT = 'SET_TOTAL_COUNT',
  SET_PAGE_COUNT = 'SET_PAGE_COUNT',
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
  SET_PER_PAGE = 'SET_PER_PAGE',
  SET_SINGLE_EQUIPMENT = 'SET_SINGLE_EQUIPMENT',
  SET_EQUIPMENT_TYPES = 'SET_EQUIPMENT_TYPES',
}

// eslint-disable-next-line
export enum EquipmentActionTypes {
  LOAD_EQUIPMENT = 'LOAD_EQUIPMENT',
  LOAD_SINGLE_EQUIPMENT = 'LOAD_SINGLE_EQUIPMENT',
  LOAD_EQUIPMENT_TYPES = 'LOAD_EQUIPMENT_TYPES',
  SAVE_EQUIPMENT = 'SAVE_EQUIPMENT',
  UPDATE_EQUIPMENT = 'UPDATE_EQUIPMENT',
  DELETE_EQUIPMENT = 'DELETE_EQUIPMENT',
  VALIDATE_SAVE_FORM = 'VALIDATE_SAVE_FORM',
}
