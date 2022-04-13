import { EquipmentState, SearchObject } from './equipment_types';

const state: EquipmentState = {
  url: {
    list: '/equipment', // /api/equipment
    single: '/equipment', // /api/equipment/{id}
    add: '/equipment', // /api/equipment/{id}
    update: '/equipment', // /api/equipment/{id}
    delete: '/equipment', // /api/equipment/{id}
    search: '/search-equipment', // /api/search-equipment
    listOfTypes: '/equipment-types', // /api/equipment-types
  },

  equipment: [],
  totalCount: 0,
  pageCount: 0,
  currentPage: 0,
  perPage: 5,

  equipmentTypes: [],

  singleEquipment: {
    id: 0,
    typeData: {
      typeId: 0,
      typeMask: '',
      typeName: '',
    },
    serialNumber: '',
    comment: '',
  },

  searchObject: {
    field: '',
    text: '',
  },
};

export default state;
