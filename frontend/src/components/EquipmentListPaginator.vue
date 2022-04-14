<template>
  <div class="equipment_list__pagination_block">
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="perPage"
      :page-sizes="[3, 4, 5, 6, 9, 12, 15, 20, 30, 50, 100]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      @size-change="changePerPage"
      @current-change="showEquipmentByPageNumber"/>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { computed } from 'vue';
import { ModuleTypes as Module } from '@/store/types';
import {
  EquipmentGetterTypes as Getter,
  EquipmentMutationTypes as Mutation,
  EquipmentActionTypes as Action,
} from '../store/equipment/equipment_types';

const store = useStore();

const totalCount = computed(() => store.getters[`${Module.EQUIPMENT}/${Getter.TOTAL_COUNT}`]);
const currentPage = computed(() => store.getters[`${Module.EQUIPMENT}/${Getter.CURRENT_PAGE}`]);
const pageCount = computed(() => store.getters[`${Module.EQUIPMENT}/${Getter.PAGE_COUNT}`]);
const perPage = computed(() => store.getters[`${Module.EQUIPMENT}/${Getter.PER_PAGE}`]);
const searchObject = computed(() => ({ ...store.getters[`${Module.EQUIPMENT}/${Getter.SEARCH_OBJECT}`] }));

function changePerPage(value) {
  store.commit(`${Module.EQUIPMENT}/${Mutation.SET_PER_PAGE}`, value);
  if (searchObject.value.text.length > 0) {
    store.dispatch(`${Module.EQUIPMENT}/${Action.SEARCH_EQUIPMENT}`, {
      searchObject: searchObject.value,
      pageNumber: 1,
    });
  } else {
    store.dispatch(`${Module.EQUIPMENT}/${Action.LOAD_EQUIPMENT}`, 1);
  }
}

function showEquipmentByPageNumber(pageNumber) {
  if (searchObject.value.text.length > 0) {
    store.dispatch(`${Module.EQUIPMENT}/${Action.SEARCH_EQUIPMENT}`, {
      searchObject: searchObject.value,
      pageNumber,
    });
  } else {
    store.dispatch(`${Module.EQUIPMENT}/${Action.LOAD_EQUIPMENT}`, pageNumber);
  }
}
</script>
