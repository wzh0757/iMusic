<template>
  <div class="app1">
    <topNav v-show="route.path !== '/musicitem'" />
    <router-view></router-view>
    <footerMusic></footerMusic>
  </div>

</template>
 
 
 
 
<script setup lang='ts'>
import topNav from '@/components/home/topNav.vue';
import footerMusic from './components/musicitem/footerMusic.vue';
import { useRoute } from 'vue-router';
const route = useRoute()






</script>
 
<style lang = "less" >
.app1 {
  font-size: 1rem;
  // background: url('@/assets/blob-scene-haikei.svg') no-repeat;
}

* {
  box-sizing: border-box
}

.icon {
  width: .7rem;
  height: .7rem;
  fill: currentColor;
}
</style>