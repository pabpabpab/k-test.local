import { EquipmentState } from './equipment_types';

const state: EquipmentState = {
  url: {
    list: '/equipment', // /api/equipment
    single: '/equipment', // /api/equipment/{id}
    add: '/equipment', // /api/equipment/{id}
    update: '/equipment', // /api/equipment/{id}
    delete: '/equipment', // /api/equipment/{id}
    listOfTypes: '/equipment-types', // /api/equipment-types
  },

  equipment: [],
  totalCount: 0,
  pageCount: 0,
  currentPage: 0,
  perPage: 5,

  equipmentTypes: [],
  singleEquipment: {},
};

export default state;
