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
import { computed, watch } from 'vue';
import {
  EquipmentGetterTypes as GT,
  EquipmentMutationTypes as MT,
  EquipmentActionTypes as AT, SearchObject,
} from '../store/equipment/equipment_types';

const store = useStore();

const totalCount = computed(() => store.getters[`equipment/${GT.TOTAL_COUNT}`]);
const currentPage = computed(() => store.getters[`equipment/${GT.CURRENT_PAGE}`]);
const pageCount = computed(() => store.getters[`equipment/${GT.PAGE_COUNT}`]);
const perPage = computed(() => store.getters[`equipment/${GT.PER_PAGE}`]);
const searchObject = computed(() => ({ ...store.getters[`equipment/${GT.SEARCH_OBJECT}`] }));

function changePerPage(value) {
  store.commit(`equipment/${MT.SET_PER_PAGE}`, value);
  if (searchObject.value.text.length > 0) {
    store.dispatch(`equipment/${AT.SEARCH_EQUIPMENT}`, { searchObject: searchObject.value, pageNumber: 1 });
  } else {
    store.dispatch(`equipment/${AT.LOAD_EQUIPMENT}`, 1);
  }
}

function showEquipmentByPageNumber(pageNumber) {
  if (searchObject.value.text.length > 0) {
    store.dispatch(`equipment/${AT.SEARCH_EQUIPMENT}`, { searchObject: searchObject.value, pageNumber });
  } else {
    store.dispatch(`equipment/${AT.LOAD_EQUIPMENT}`, pageNumber);
  }
}
</script>
