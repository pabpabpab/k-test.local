<template>
  <div>
    <h1>Список оборудования</h1>
    <div class="content_block content_block_of_equipment_list">

      <el-table :data="equipmentList" height="85%" class="equipment_list_table">
        <el-table-column prop="id" label="ID" width="80"/>
        <el-table-column prop="typeData.typeName" label="Тип оборудования" width="220"/>
        <el-table-column prop="serialNumber" label="Серийный номер" width="220"/>
        <el-table-column prop="comment" label="Примечание" align="left"/>
        <el-table-column label="Действия" width="100" align="left">
          <template #default="scope">

            <router-link :to="{
              name: 'EditEquipment',
              params: {
                id: equipmentList[scope.$index].id,
              }
            }">
              <el-button type="text">
                <el-icon
                  :size="25" class="edit_icon_wrapper">
                  <edit class="edit_icon"/>
                </el-icon>
              </el-button>
            </router-link>

            <el-popconfirm
              confirmButtonText="Да"
              cancelButtonText="Отмена"
              confirmButtonType="primary"
              cancelButtonType="text"
              @confirm="deleteEquipment(equipmentList[scope.$index].id)"
              title="Уверены что хотите удалить это оборудование?">
              <template #reference>
                <el-button type="text">
                  <el-icon
                    :size="25">
                    <delete class="delete_icon"/>
                  </el-icon>
                </el-button>
              </template>
            </el-popconfirm>

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
import useDeleteEquipment from '@/composables/useDeleteEquipment';
import EquipmentListPaginator from '@/components/EquipmentListPaginator.vue';

const { equipmentList } = useEquipmentList();
const { deleteEquipment } = useDeleteEquipment();
</script>
