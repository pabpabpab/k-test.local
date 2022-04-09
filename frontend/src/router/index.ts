import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AddEquipmentView from '../views/AddEquipmentView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AddEquipment',
    component: AddEquipmentView,
  },
  {
    path: '/equipment-list',
    name: 'EquipmentList',
    component: () => import('../views/EquipmentListView.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'PageNotFound',
    component: AddEquipmentView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
