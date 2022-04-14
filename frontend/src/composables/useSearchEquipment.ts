/* eslint no-use-before-define: ["error", { "functions": false }] */

import { reactive } from 'vue';
import { useStore } from '@/store';
import { ModuleTypes as Module } from '@/store/types';
import {
  EquipmentMutationTypes as Mutation,
  EquipmentActionTypes as Action,
  SearchObject,
} from '@/store/equipment/equipment_types';

export default function useSearchEquipment(): object {
  const store = useStore();

  const searchText = reactive({
    serial_number: '',
    comment: '',
  });

  let timeWhenSearchTextWasChanged = 0;
  let timerId: NodeJS.Timeout;
  let timeWhenLastRequestWasSent = 0;

  function doSearch(field: string): void {
    resetAnotherSearchTextExcludingCurrentOne(field);
    timeWhenSearchTextWasChanged = new Date().getTime();
    doRequestWithDelay(field);
  }

  function doRequestWithDelay(field: string): void {
    const currentTime = new Date().getTime();
    const searchWasChangedAgo = currentTime - timeWhenSearchTextWasChanged;
    const requestWasSentAgo = currentTime - timeWhenLastRequestWasSent;

    if (searchWasChangedAgo < 1000 || requestWasSentAgo < 2000) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        doRequestWithDelay(field);
      }, 1000);
      return;
    }

    doRequest(field);
  }

  function doRequest(field: string): void {
    timeWhenLastRequestWasSent = new Date().getTime();

    const searchObject = {
      field,
      text: searchText[field as keyof typeof searchText],
    } as SearchObject;

    store.commit(`${Module.EQUIPMENT}/${Mutation.SET_SEARCH_OBJECT}`, searchObject);
    store.dispatch(`${Module.EQUIPMENT}/${Action.SEARCH_EQUIPMENT}`, { searchObject, pageNumber: 1 });
  }

  function resetAnotherSearchTextExcludingCurrentOne(field: string) {
    Object.keys(searchText).forEach((key) => {
      if (key === field) {
        return;
      }
      searchText[key as keyof typeof searchText] = '';
    });
  }

  return {
    searchText,
    doSearch,
  };
}
