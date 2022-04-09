export interface EquipmentState {
  url: {
    list: string,
    single: string,
    add: string,
    update: string,
    delete: string,
    listOfTypes: string,
  },
  equipment: object[],
  equipmentTypes: object[],
  singleEquipment: object,
}

// eslint-disable-next-line
export enum EquipmentGetterTypes {
  EQUIPMENT_TYPE_LIST = 'EQUIPMENT_TYPE_LIST',
  EQUIPMENT_LIST = 'EQUIPMENT_LIST',
  SINGLE_EQUIPMENT = 'SINGLE_EQUIPMENT',
}

// eslint-disable-next-line
export enum EquipmentMutationTypes {
  SET_EQUIPMENT = 'SET_EQUIPMENT',
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
    typeRegexp: string,
  },
  serialNumbers: string,
  comment: string,
}
