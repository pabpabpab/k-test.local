import { ActionTree } from 'vuex';
import {
  EquipmentState,
  EquipmentActionTypes as Action,
  EquipmentObject,
} from '@/store/equipment/equipment_types';
import { RootState } from '@/store/types';
import { FormErrorMutationTypes as ErrorMutation } from '@/store/formError/formError_types';
import getSavingFormValidationErrors from '@/helpers/validation/equipment/getSavingFormValidationErrors';

const validateSaveForm: ActionTree<EquipmentState, RootState> = {
  [Action.VALIDATE_SAVE_FORM](
    {
      commit,
    },
    equipment: EquipmentObject,
  ): void {
    commit(ErrorMutation.RESET_FORM_ERROR, null, { root: true });
    const errorObject = getSavingFormValidationErrors(equipment);
    commit(ErrorMutation.SET_FORM_ERROR, errorObject, { root: true });
  },
};

export default validateSaveForm;
