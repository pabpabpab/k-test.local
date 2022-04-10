<template>
  <nav class="top_menu">
    <router-link
      :to="{ name: 'AddEquipment' }"
      :class="addEquipmentLinkClass">
      Добавить оборудование
    </router-link>
    <router-link
      :to="{ name: 'EquipmentList' }"
      :class="equipmentListLinkClass">
      Список оборудования
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const addEquipmentLinkClass = computed(() => ({
  top_menu__link: true,
  top_menu__link_active: useRoute().name === 'AddEquipment',
}));
const equipmentListLinkClass = computed(() => ({
  top_menu__link: true,
  top_menu__link_active: useRoute().name === 'EquipmentList',
}));
</script>
