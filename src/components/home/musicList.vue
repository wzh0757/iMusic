<template>
    <div class="musicList">
        <div class="musicTop">
            <h3 class="title">推荐歌单></h3>
            <h3 class="more">查看更多</h3>
        </div>
        <van-swipe :loop="false" :width="120" :show-indicators="false">
            <van-swipe-item v-for="image in images" :key="image.id" @click="jumpMusicItem(image.id)">
                <img :src="image.picUrl" />
                <span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bofangsanjiaoxing"></use>
                    </svg>
                    {{ changeNum(image.playCount) }}
                </span>
                <div>{{ image.name }}</div>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
 
 
 
 
<script setup lang='ts'>
import { onMounted, reactive } from 'vue';
import { GetMusicList } from '@/request/Api'
import { useRouter } from 'vue-router';

let musicList = reactive<Array<any>>([])
let images = reactive<Array<any>>([])
const router = useRouter()
onMounted(() => {
    GetMusicList({}).then((res) => {
        images.push(...res.result)
    })
})

const changeNum = (num: number) => {
    if (num >= 100000000) return (num / 100000000).toFixed(1) + '亿'
    else if (num >= 10000) return (num / 10000).toFixed(1) + '万'
}

const jumpMusicItem = (id: number) => {
    router.push({
        path: '/musicitem',
        query: {
            id
        }
    })
}



</script>
 
<style lang = "less" scoped>
.musicList {
    width: 100%;
    height: 5rem;
    padding: 0.2rem;
    margin-top: 0.6rem;

    .musicTop {
        width: 100%;
        height: .6rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: .3rem;

        .title {
            font-size: .5rem;
            font-weight: 600;
        }

        .more {
            font-size: .4rem;
            text-align: center;
            padding: .1rem;
            border-radius: .2rem;
            border: 1px solid black;

        }
    }

    .custom-indicator {
        width: 100%;
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 2px 5px;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.4);
    }

    :deep(.van-swipe-item) {
        font-size: 14px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 0.3rem;

        div {
            position: relative;
            margin-top: .06rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        span {
            display: flex;
            align-items: center;
            position: absolute;
            top: 0;
            right: .1rem;
            color: #eee;

            .icon {
                width: .6rem;
            }
        }

        img {
            border-radius: 0.2rem;
            width: 100%;
            height: 3.3rem;
        }
    }
}
</style>