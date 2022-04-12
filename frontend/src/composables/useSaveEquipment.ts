/* eslint no-param-reassign: off */

import { useStore } from '@/store';
import {
  EquipmentActionTypes as AT,
  EquipmentObject,
} from '@/store/equipment/equipment_types';
import excludeRepeatedSerialNumber from '../helpers/validation/equipment/excludeRepeatedSerialNumber';

export default function useSaveEquipment(localEquipment: EquipmentObject): object {
  const store = useStore();

  function saveEquipment() {
    if (localEquipment.id) {
      store.dispatch(`equipment/${AT.UPDATE_EQUIPMENT}`, localEquipment);
    } else {
      localEquipment.serialNumber = excludeRepeatedSerialNumber(localEquipment.serialNumber);
      store.dispatch(`equipment/${AT.SAVE_EQUIPMENT}`, localEquipment);
    }
  }

  return {
    saveEquipment,
  };
}
