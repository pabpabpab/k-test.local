import { ActionTree } from 'vuex';
import {
  EquipmentState,
  EquipmentGetterTypes as Getter,
  EquipmentActionTypes as Action,
  EquipmentObject,
} from '@/store/equipment/equipment_types';
import { RootState, RootMutationTypes as RootMutation } from '@/store/types';
import { HttpActionTypes as HttpAction } from '@/store/http/http_types';
import { FormErrorMutationTypes as ErrorMutation } from '@/store/formError/formError_types';
import getSavingFormValidationErrors from '@/helpers/validation/equipment/getSavingFormValidationErrors';
import getRegExpForMask from '@/helpers/getRegExpForMask';
import getRegExpMismatches from '@/helpers/validation/equipment/getRegExpMismatches';
import { ElMessage } from 'element-plus';
import router from '@/router';

const updateEquipment: ActionTree<EquipmentState, RootState> = {
  [Action.UPDATE_EQUIPMENT](
    {
      dispatch,
      commit,
      getters,
      state,
    },
    equipment: EquipmentObject,
  ): void {
    commit(ErrorMutation.RESET_FORM_ERROR, null, { root: true });

    // первая фронт-валидация
    const formErrorObject = getSavingFormValidationErrors(equipment);
    if (formErrorObject) {
      commit(ErrorMutation.SET_FORM_ERROR, formErrorObject, { root: true });
      return;
    }

    // проверка серийных номеров на соответствие маске
    const regexpValue = getRegExpForMask(equipment.typeData.typeMask);
    const mismatchingNumbersArr = getRegExpMismatches(equipment.serialNumber, regexpValue);
    if (mismatchingNumbersArr.length > 0) {
      const errorObj = { mismatchingSerialNumber: mismatchingNumbersArr };
      commit(ErrorMutation.SET_FORM_ERROR, errorObj, { root: true });
      return;
    }

    // если все ок, то post-запрос
    commit(RootMutation.SET_LOADING_FLAG, true, { root: true });
    const url = `${state.url.update}/${equipment.id}`;
    dispatch(HttpAction.PUT_JSON, { url, data: equipment }, { root: true })
      .then((data) => {
        if (data?.backValidatorErrors?.serialNumber) {
          const nonUniqueNumbersArr = data.backValidatorErrors.serialNumber[0].split(',');
          const errorObj = { nonUniqueSerialNumber: nonUniqueNumbersArr };
          commit(ErrorMutation.SET_FORM_ERROR, errorObj, { root: true });
          return;
        }

        if (data.saveSuccess) {
          ElMessage({
            message: 'Оборудование отредактировано.',
            type: 'success',
            duration: 1500,
            offset: 300,
            customClass: 'el-message_custom',
          });
          router.push({ name: 'EquipmentList', params: { pageNumber: getters[Getter.CURRENT_PAGE] } });
        }
      })
      .finally(() => {
        setTimeout(() => {
          commit(RootMutation.SET_LOADING_FLAG, false, { root: true });
        }, 300);
      });
  },
};

export default updateEquipment;
