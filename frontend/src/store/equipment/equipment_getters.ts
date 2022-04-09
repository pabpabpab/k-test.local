import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { EquipmentState, EquipmentGetterTypes as GT } from '@/store/equipment/equipment_types';

const getters: GetterTree<EquipmentState, RootState> = {
  [GT.EQUIPMENT_LIST]: (state): object[] => state.equipment,
  [GT.EQUIPMENT_TYPE_LIST]: (state): object[] => state.equipmentTypes,
  [GT.SINGLE_EQUIPMENT]: (state): object => state.singleEquipment,
};

export default getters;
