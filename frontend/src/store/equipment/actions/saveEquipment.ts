import { ActionTree } from 'vuex';
import {
  EquipmentState,
  EquipmentActionTypes as EquipmentAction,
  EquipmentObject,
} from '@/store/equipment/equipment_types';
import { RootState, RootMutationTypes as RootMutation } from '@/store/types';
import { HttpActionTypes as HttpAction } from '@/store/http/http_types';
import { FormErrorMutationTypes as ErrorMutation } from '@/store/formError/formError_types';
import getSavingFormValidationErrors from '@/helpers/validation/equipment/getSavingFormValidationErrors';
import getRegExpForMask from '@/helpers/getRegExpForMask';
import getRegExpMismatches from '@/helpers/validation/equipment/getRegExpMismatches';
import router from '@/router';

const saveEquipment: ActionTree<EquipmentState, RootState> = {
  [EquipmentAction.SAVE_EQUIPMENT](
    {
      dispatch,
      commit,
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
    const mismatchingArr = getRegExpMismatches(equipment.serialNumbers, regexpValue);
    if (mismatchingArr.length > 0) {
      const errorObj = { mismatchingSerialNumbers: mismatchingArr };
      commit(ErrorMutation.SET_FORM_ERROR, errorObj, { root: true });
      return;
    }

    // если все ок, то post-запрос
    commit(RootMutation.SET_LOADING_FLAG, true, { root: true });
    const url = state.url.add;

    dispatch(HttpAction.POST_JSON, { url, data: equipment }, { root: true })
      .then((data) => {
        if (data?.backValidatorErrors?.serialNumbers) {
          const nonUniqueNumbersArr = data.backValidatorErrors.serialNumbers[0].split(',');
          const errorObj = { nonUniqueSerialNumbers: nonUniqueNumbersArr };
          commit(ErrorMutation.SET_FORM_ERROR, errorObj, { root: true });
          return;
        }

        if (data.saveSuccess) {
          router.push({ name: 'EquipmentList' });
        }
      })
      .finally(() => {
        setTimeout(() => {
          commit(RootMutation.SET_LOADING_FLAG, false, { root: true });
        }, 800);
      });
  },
};

export default saveEquipment;
