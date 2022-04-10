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

        <p v-show="error.typeId" class="equipment_form__validation_message">
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
          v-show="error.serialNumbers"
          v-html="error.serialNumbers"
          class="equipment_form__validation_message">
        </p>

        <p
          v-show="error.repeatedSerialNumbers.length"
          class="equipment_form__validation_message_black">
          Ниже указаны номера присутствующие в вашем списке более 1 раза:
          <br>
          <span
            v-html="error.repeatedSerialNumbers"
            class="equipment_form__validation_message">
          </span>
          <br><br>
          <span class="equipment_form__validation_message_black_bold">
            Повторения этих номеров будут исключены из вашего списка при сохранении.
          </span>
        </p>

        <p
          v-show="error.mismatchingSerialNumbers.length"
          class="equipment_form__validation_message_black">
          Ниже указаны номера не соответствующие выбранной маске
          <span
            v-text="localEquipment.typeData.typeMask"
            class="equipment_form__validation_message">
          </span>, эти номера исключены из списка:<br>
          <span
            v-html="error.mismatchingSerialNumbers.join('<br>')"
            class="equipment_form__validation_message">
          </span>
          <br><br>
          <span
            v-if="localEquipment.serialNumbers.length > 0"
            class='equipment_form__validation_message_black_bold'>
            Нажмите кнопку «Сохранить» чтобы сохранить оставшийся список.
          </span>
        </p>

        <p
          v-show="error.nonUniqueSerialNumbers.length"
          class="equipment_form__validation_message_black">
          Ниже указаны номера которые уже есть в базе,
          эти номера исключены из списка:<br>
          <span
            v-html="error.nonUniqueSerialNumbers.join('<br>')"
            class='equipment_form__validation_message'>
          </span>
          <br><br>
          <span
            v-if="localEquipment.serialNumbers.length > 0"
            class='equipment_form__validation_message_black_bold'>
            Нажмите кнопку «Сохранить» чтобы сохранить оставшийся список.
          </span>
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
