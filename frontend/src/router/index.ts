import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AddEquipmentView from '../views/AddEquipmentView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'AddEquipment' },
  },
  {
    path: '/add-equipment',
    name: 'AddEquipment',
    component: () => import('../views/AddEquipmentView.vue'),
  },
  {
    path: '/edit-equipment/:id',
    name: 'EditEquipment',
    component: () => import('../views/AddEquipmentView.vue'),
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
