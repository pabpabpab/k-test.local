import { EquipmentObject } from '@/store/equipment/equipment_types';

interface ErrorObject {
  typeId?: string[],
  serialNumbers?: string[],
  repeatedSerialNumbers?: string[],
}

// eslint-disable-next-line
export default function getSavingFormValidationErrors(equipment: EquipmentObject): ErrorObject | null {
  const error: ErrorObject | null = {};

  const serialNumbers = equipment.serialNumbers.replaceAll(' ', '');

  if (equipment.typeData.typeId === 0) {
    error.typeId = error?.typeId ? error.typeId : [];
    error.typeId.push('Укажите тип оборудования');
  }

  if (serialNumbers.length === 0) {
    error.serialNumbers = error?.serialNumbers ? error.serialNumbers : [];
    error.serialNumbers.push('Введите серийные номера');
  }

  if (serialNumbers.length > 0) {
    const userNumbersArr = equipment.serialNumbers.split('\n');
    // eslint-disable-next-line
    const repeatedValues = userNumbersArr.filter((item, index, arr) => arr.lastIndexOf(item) !== index);
    if (repeatedValues.length > 0) {
      error.repeatedSerialNumbers = error?.repeatedSerialNumbers ? error.repeatedSerialNumbers : [];
      error.repeatedSerialNumbers.push(repeatedValues.join('<br>'));
    }
  }

  if (Object.keys(error).length > 0) {
    return error;
  }

  return null;
}
