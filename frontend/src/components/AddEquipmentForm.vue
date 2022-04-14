<template>
  <div>
    <h1>
      {{ localEquipment.id ? 'Редактировать оборудование' : 'Добавить оборудование' }}
    </h1>
    <div class="content_block content_block_of_equipment_form">

      <div class="equipment_form__input_container">
        <p class="equipment_form__property_header">Тип оборудования</p>

        <select
          v-model="localEquipment.typeData"
          @change="validateForm"
          class="equipment_form__select_input">
          <option
            v-for="type in equipmentTypes"
            :value="{
              typeId: type.id,
              typeMask: type.mask,
              typeName: type.name
            }"
            :key="type.id">
            {{ type.name }}
          </option>
        </select>

        <p v-show="error.typeId" class="equipment_form__validation_message">
          {{ error.typeId }}
        </p>
      </div>

      <div class="equipment_form__input_container">
        <p class="equipment_form__property_header">
          {{ localEquipment.id ? 'Серийный номер' : 'Серийные номера' }}
        </p>
        <!-- eslint-disable-next-line  -->
        <textarea
          v-model="localEquipment.serialNumber"
          @keyup="fitTextareaHeight($event);"
          @click="fitTextareaHeight($event);"
          @input="fitTextareaHeight($event);validateForm();"
          class="equipment_form__textarea_input">
        </textarea>

        <p
          v-show="error.serialNumber"
          v-html="error.serialNumber"
          class="equipment_form__validation_message">
        </p>

        <p
          v-show="error.repeatedSerialNumber.length"
          class="equipment_form__validation_message_black">
          Ниже указаны номера присутствующие в вашем списке более 1 раза:
          <br>
          <span
            v-html="error.repeatedSerialNumber"
            class="equipment_form__validation_message">
          </span>
          <br><br>
          <span class="equipment_form__validation_message_black_bold">
            Повторения этих номеров будут исключены из вашего списка при сохранении.
          </span>
        </p>

        <p
          v-show="!localEquipment.id && error.mismatchingSerialNumber.length"
          class="equipment_form__validation_message_black">
          Ниже указаны номера не соответствующие выбранной маске
          <span
            v-text="localEquipment.typeData.typeMask"
            class="equipment_form__validation_message">
          </span>, эти номера исключены из списка:<br>
          <span
            v-html="error.mismatchingSerialNumber.join('<br>')"
            class="equipment_form__validation_message">
          </span>
          <br><br>
          <span
            v-if="localEquipment.serialNumber.length > 0"
            class='equipment_form__validation_message_black_bold'>
            Нажмите кнопку «Сохранить» чтобы сохранить оставшийся список.
          </span>
        </p>

        <p
          v-show="localEquipment.id && error.mismatchingSerialNumber.length"
          class="equipment_form__validation_message">
          Введенный номер не соответствует выбранной маске
          <span
            v-text="localEquipment.typeData.typeMask"
            class="equipment_form__validation_message_black_bold">
          </span>
        </p>

        <p
          v-show="!localEquipment.id && error.nonUniqueSerialNumber.length"
          class="equipment_form__validation_message_black">
          Ниже указаны номера которые уже есть в базе,
          эти номера исключены из списка:<br>
          <span
            v-html="error.nonUniqueSerialNumber.join('<br>')"
            class='equipment_form__validation_message'>
          </span>
          <br><br>
          <span
            v-if="localEquipment.serialNumber.length > 0"
            class='equipment_form__validation_message_black_bold'>
            Нажмите кнопку «Сохранить» чтобы сохранить оставшийся список.
          </span>
        </p>

        <p
          v-show="localEquipment.id && error.nonUniqueSerialNumber.length"
          class="equipment_form__validation_message">
          Такой номер уже есть в базе
        </p>
      </div>

      <div class="equipment_form__input_container">
        <p class="equipment_form__property_header">Примечание</p>
        <!-- eslint-disable-next-line -->
        <textarea
          v-model="localEquipment.comment"
          @keyup="fitTextareaHeight($event);"
          @click="fitTextareaHeight($event);"
          @input="fitTextareaHeight($event);"
          class="equipment_form__textarea_input">
        </textarea>
      </div>

      <button class="equipment_form__add_button"
              @click="saveEquipment">
        Сохранить
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
import useEquipmentTypes from '@/composables/useEquipmentTypes';
import useTextareaHeightFitter from '@/composables/useTextareaHeightFitter';
import useValidEquipment from '@/composables/useValidEquipment';
import useSaveEquipment from '@/composables/useSaveEquipment';
import useLoadSingleEquipmentForEditing from '@/composables/useLoadSingleEquipmentForEditing';
import { reactive, watch } from 'vue';
import { EquipmentObject } from '@/store/equipment/equipment_types';

const localEquipment = reactive({
  id: 0,
  typeData: {
    typeId: 0,
    typeMask: '',
    typeName: '',
  },
  serialNumber: '',
  comment: '',
} as EquipmentObject);

const { equipmentTypes } = useEquipmentTypes();
const { fitTextareaHeight } = useTextareaHeightFitter();
const { error, validateForm } = useValidEquipment(localEquipment);
const { saveEquipment } = useSaveEquipment(localEquipment);
const { singleEquipment } = useLoadSingleEquipmentForEditing();

watch(singleEquipment, (value: EquipmentObject) => {
  if (!value?.id) {
    return;
  }
  Object.assign(localEquipment, value);
});
</script>
