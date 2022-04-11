<template>
  <div>
    <h1>Список оборудования</h1>
    <div class="content_block content_block_of_equipment_list">

      <el-table :data="equipmentList" height="85%" class="equipment_list_table">
        <el-table-column prop="id" label="ID" width="80"/>
        <el-table-column prop="type_name" label="Тип оборудования" width="220"/>
        <el-table-column prop="serial_number" label="Серийный номер" width="220"/>
        <el-table-column prop="comment" label="Примечание" align="left"/>
        <el-table-column label="Действия" width="100" align="left">
          <template #default="scope">
            <el-icon
              @click="handleEdit(equipmentList[scope.$index].id)"
              :size="25" class="edit_icon_wrapper">
              <edit class="edit_icon"/>
            </el-icon>
            <el-icon
              @click="handleDelete(equipmentList[scope.$index].id)"
              :size="25">
              <delete class="delete_icon"/>
            </el-icon>
          </template>
        </el-table-column>
      </el-table>

      <EquipmentListPaginator />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit, Delete } from '@element-plus/icons-vue';
import useEquipmentList from '@/composables/useEquipmentList';
import EquipmentListPaginator from '@/components/EquipmentListPaginator.vue';

const { equipmentList } = useEquipmentList();

function handleEdit(id) {
  console.log(id);
}
function handleDelete(id) {
  console.log(id);
}
</script>
