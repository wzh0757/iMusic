<template>
    <div class="topNav" v-if="showTopNvaFlag">
        <div class="topleft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yinleliebiao-"></use>
            </svg>
        </div>
        <div class="nav">
            <span :class="flag === 1 ? 'active' : ''" @click="changeflag(1, '/home')">我的</span>
            <span :class="flag === 2 ? 'active' : ''" @click="changeflag(2, '/find')">发现</span>
            <span :class="flag === 3 ? 'active' : ''" @click="changeflag(3, '/cloud')">云村</span>
            <span :class="flag === 4 ? 'active' : ''" @click="changeflag(4, '/video')">视频</span>
        </div>
        <div class="topright" @click="jump">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>

    </div>
</template>
 
 
 
 
<script setup lang='ts'>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useStore } from '@/store';

const store = useStore()
const { showTopNvaFlag } = storeToRefs(store)
const router = useRouter()
const flag = ref(0)
const changeflag = (num: number, path: string): void => {
    flag.value = num
    router.push({
        path,
    })
}
//点解跳转搜索页面
const jump = () => {
    showTopNvaFlag.value = false
    router.push('/search')
}


</script>
 
<style lang = "less" scoped>
.topNav {
    width: 100%;
    height: 1rem;
    padding: .2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .nav {
        width: 70%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: .5rem;

        .active {
            font-weight: 700;
        }
    }

    .topright {}
}
</style>