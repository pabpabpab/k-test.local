import { EquipmentObject } from '@/store/equipment/equipment_types';

interface ErrorObject {
  typeId?: string[],
  serialNumber?: string[],
  repeatedSerialNumber?: string[],
}

// eslint-disable-next-line
export default function getSavingFormValidationErrors(equipment: EquipmentObject): ErrorObject | null {
  const error: ErrorObject | null = {};

  const serialNumber = equipment.serialNumber.replaceAll(' ', '');

  if (equipment.typeData.typeId === 0) {
    error.typeId = error?.typeId ? error.typeId : [];
    error.typeId.push('Укажите тип оборудования');
  }

  if (serialNumber.length === 0) {
    error.serialNumber = error?.serialNumber ? error.serialNumber : [];
    const text = equipment.id ? 'Введите серийный номер' : 'Введите серийные номера';
    error.serialNumber.push(text);
  }

  if (serialNumber.length > 0) {
    const userNumbersArr = equipment.serialNumber.split('\n');
    // eslint-disable-next-line
    const repeatedValues = userNumbersArr.filter((item, index, arr) => arr.lastIndexOf(item) !== index);
    if (repeatedValues.length > 0) {
      error.repeatedSerialNumber = error?.repeatedSerialNumber ? error.repeatedSerialNumber : [];
      error.repeatedSerialNumber.push(repeatedValues.join('<br>'));
    }
  }

  if (Object.keys(error).length > 0) {
    return error;
  }

  return null;
}
