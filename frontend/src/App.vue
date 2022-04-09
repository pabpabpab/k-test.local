<template>
  <TopMenu/>
  <div class="content_wrapper">
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import TopMenu from '@/components/menu/TopMenu.vue';
import { ref, onMounted } from 'vue';
import { HttpActionTypes as AT } from '@/store/http/http_types';
import { useStore } from './store';

const store = useStore();

const msg = ref('Hello!');

// console.log(AT); <div @click="log" @keyDown="log">{{ msg }}</div>

/*
function log() {
  msg.value = 'Hellooooooo!';
  store.dispatch('GET_JSON', '/api/equipment_types')
    .then((data) => {
      console.log(data);
    });
}
*/

onMounted(() => {
  // msg.value = 'Hellaaaaaaa!';
  // store.dispatch(AT.GET_JSON, '/api/equipment-types');
  /*
    .then((data) => {
      console.log(data);
    });
   */
});
</script>

<style lang="scss">
  @import "./sass/index.sass";
</style>
