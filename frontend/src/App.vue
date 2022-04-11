<template>
  <el-config-provider :locale="ru">
    <TopMenu/>
    <div class="content_wrapper">
      <router-view/>
    </div>
    <LoadingScreen/>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import ru from 'element-plus/lib/locale/lang/ru';
import TopMenu from '@/components/menu/TopMenu.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
</script>

<style lang="scss">
  @import "./sass/index.sass";
</style>
