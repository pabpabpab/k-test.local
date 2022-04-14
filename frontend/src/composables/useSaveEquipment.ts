/* eslint no-param-reassign: off */

import { useStore } from '@/store';
import { ModuleTypes as Module } from '@/store/types';
import {
  EquipmentActionTypes as Action,
  EquipmentObject,
} from '@/store/equipment/equipment_types';
import excludeRepeatedSerialNumber from '../helpers/validation/equipment/excludeRepeatedSerialNumber';

export default function useSaveEquipment(localEquipment: EquipmentObject): object {
  const store = useStore();

  function saveEquipment() {
    if (localEquipment.id) {
      store.dispatch(`${Module.EQUIPMENT}/${Action.UPDATE_EQUIPMENT}`, localEquipment);
    } else {
      localEquipment.serialNumber = excludeRepeatedSerialNumber(localEquipment.serialNumber);
      store.dispatch(`${Module.EQUIPMENT}/${Action.SAVE_EQUIPMENT}`, localEquipment);
    }
  }

  return {
    saveEquipment,
  };
}
