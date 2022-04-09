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
  equipmentTypes: [],
  singleEquipment: {},
};

export default state;
