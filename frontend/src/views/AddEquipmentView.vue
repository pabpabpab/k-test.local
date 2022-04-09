<template>
  <div>
    <h1>Добавить оборудование</h1>
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
        <p class="equipment_form__validation_message">
          {{ error.typeId }}
        </p>
      </div>

      <div class="equipment_form__input_container">
        <p class="equipment_form__property_header">Серийные номера</p>
        <!-- eslint-disable-next-line  -->
        <textarea
          v-model="localEquipment.serialNumbers"
          @keyup="fitTextareaHeight($event);"
          @click="fitTextareaHeight($event);"
          @input="fitTextareaHeight($event);validateForm();"
          class="equipment_form__textarea_input">
        </textarea>
        <p
          v-html="error.serialNumbers"
          class="equipment_form__validation_message">
        </p>
        <p
          v-show="error.repeatedSerialNumbers.length"
          v-html="`Ниже указаны номера присутствующие в вашем списке более 1 раза:
                   <br>${error.repeatedSerialNumbers}<br><br>
                   <span class='equipment_form__validation_message_black'>
                   Повторения этих номеров будут исключены из вашего списка при сохранении.
                   </span>`"
          class="equipment_form__validation_message">
        </p>
        <p
          v-show="error.mismatchingSerialNumbers.length"
          v-html="`Ниже указаны номера не соответствующие выбранной маске
                   ${localEquipment.typeData.typeMask}, эти номера исключены из списка:
                   <br>${error.mismatchingSerialNumbers.join('<br>')}
                   <br><br><span class='equipment_form__validation_message_black'>
                   Нажмите кнопку «Сохранить» чтобы сохранить оставшийся список.</span>`"
          class="equipment_form__validation_message">
        </p>
        <p
          v-show="error.nonUniqueSerialNumbers.length"
          v-html="`Ниже указаны номера которые уже есть в базе,
                   эти номера исключены из списка:
                   <br>
                   <span class='equipment_form__validation_message'>
                   ${error.nonUniqueSerialNumbers.join('<br>')}
                   </span>
                   <br><br><span class='equipment_form__validation_message_black'>
                   Нажмите кнопку «Сохранить» чтобы сохранить оставшийся список.</span>`"
          class="equipment_form__validation_message">
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
/* eslint-disable */
import useEquipmentTypes from '@/composables/useEquipmentTypes';
import useTextareaHeightFitter from '@/composables/useTextareaHeightFitter';
import useSaveEquipment from '@/composables/useSaveEquipment';

const { equipmentTypes } = useEquipmentTypes();
const { fitTextareaHeight } = useTextareaHeightFitter();
const {
  localEquipment,
  error,
  validateForm,
  saveEquipment,
} = useSaveEquipment();
</script>
