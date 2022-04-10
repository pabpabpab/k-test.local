<template>
<div v-show="loadingFlag" class="loading_screen">
  <img :src="loadingIcon"
       alt="loading"
       class="loading_screen__loading_icon">
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RootGetterTypes as GT } from '@/store/types';
import loadingIcon from '@/assets/spinner.gif';

import { useStore } from '@/store';

const store = useStore();
const loadingFlag = computed(() => store.getters[GT.LOADING_FLAG]);
</script>
