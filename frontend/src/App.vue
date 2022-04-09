<template>
  <TopMenu/>
  <div class="content_wrapper">
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import TopMenu from '@/components/menu/TopMenu.vue';
</script>

<style lang="scss">
  @import "./sass/index.sass";
</style>
