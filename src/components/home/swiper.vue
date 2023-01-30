<template>
    <div class="swiperTop">
        <div>
            <van-swipe :autoplay="3000" lazy-render>
                <van-swipe-item v-for="image in images" :key="image">
                    <img :src="image" />
                </van-swipe-item>
            </van-swipe>
        </div>

    </div>
</template>
 
 
 
 
<script setup lang='ts'>
import { onMounted, reactive } from 'vue';
import { BannerApi } from '@/request/Api'

const images = reactive<Array<string>>([]) //轮播图循坏图片url数组

onMounted(() => {
    //获取轮播图图片url
    BannerApi({ type: 2 }).then(res => {
        if (res.code === 200) {
            for (let item of res.banners) {
                images.push(item.imageUrl)
            }
        }
    })
})


</script>
 
<style lang = "less" scoped>
.swiperTop {
    .van-swipe {
        width: 100%;
        height: 3rem;

        .van-swipe-item {
            padding: 0 0.2rem;

            img {
                width: 100%;
                height: 100%;
                border-radius: 0.2rem;
            }
        }

        :deep(.van-swipe__indicator) {

            background-color: #ccc;
        }

        :deep(.van-swipe__indicator--active) {
            background-color: rgba(0, 0, 0, .4);
        }

    }
}
</style>