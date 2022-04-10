<template>
  <TopMenu/>
  <div class="content_wrapper">
    <router-view/>
  </div>
  <LoadingScreen/>
</template>

<script setup lang="ts">
import TopMenu from '@/components/menu/TopMenu.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
</script>

<style lang="scss">
  @import "./sass/index.sass";
</style>
