<template>
    <div class="footerMusic" @click="$state.details = true">
        <div class="leftFooter">
            <div class="pic"><img :src="$state.songList[$state.songIndex].al.picUrl" alt=""></div>
            <div class="songName">{{ $state.songList[$state.songIndex].name }}-
                <div class="singer" v-for="item, index in $state.songList[$state.songIndex].ar" :key="index">
                    {{ index+ 1 !== $state.songList[$state.songIndex].ar.length ? item.name + '/' : item.name}}</div>
            </div>
        </div>
        <div class="rightFooter">
            <div class="play">
                <svg class="icon icon1" aria-hidden="true" @click.stop="play()" v-if="$state.playBuff === false">
                    <use xlink:href="#icon-xiayishou-"></use>
                </svg>
                <svg class="icon icon1" aria-hidden="true" @click.stop="play()" v-if="$state.playBuff === true">
                    <use xlink:href="#icon-bofang-"></use>
                </svg>
                <svg-icon name="yinleliebiao-"></svg-icon>

            </div>
        </div>
        <audio ref="player"
            :src="`https://music.163.com/song/media/outer/url?id=${$state.songList[$state.songIndex].id}.mp3`"></audio>
    </div>

    <!-- 底部弹出 -->
    <van-popup v-model:show="$state.details" position="bottom" :style="{ height: '100%' }">
        <Details :player="player" :getTime="getTime" :timer="timer"></Details>
    </van-popup>

</template>
 
 
 
 
<script setup lang='ts'>
import { useStore } from '@/store';
import { mapStores, storeToRefs } from 'pinia';
import { computed, onMounted, onUpdated, ref, watch } from 'vue';
import Details from './details.vue';

const store = useStore()  //引入仓库
const { playFlag, flag } = storeToRefs(store)  //结构出来
const { $state, $patch } = store

const player = ref<HTMLAudioElement>()
let timer: number
const getTime = () => {
    timer = window.setInterval(function () {
        store.updateCurrentTime(player.value!.currentTime)
    }, 50)
}

onMounted(() => {
    store.getLyric($state.songList[$state.songIndex].id)//获取歌词
})
onUpdated(() => {
    store.getLyric($state.songList[$state.songIndex].id)//获取歌词
})

watch(() => playFlag, async () => {
    console.log($state.playFlag);
    await $state.playFlag ? player.value?.play() : player.value?.pause()
    await $state.playFlag ? getTime() : clearInterval(timer)
}, { deep: true })
watch(() => flag, async () => {
    console.log(flag);
    await $state.flag ? clearInterval(timer) : getTime()
})
watch(() => $state.songIndex, (newVal, oldVal) => {
    console.log(newVal);
    player.value!.src = `https://music.163.com/song/media/outer/url?id=${$state.songList[newVal].id}.mp3`
    playFlag.value = false
    playFlag.value = true
    console.log(playFlag.value);

})
//点击播放
const play = () => {
    $state.playFlag ? getTime() : clearInterval(timer)
    $state.playBuff = !$state.playBuff
    $state.playFlag = !$state.playFlag
    $state.playFlag ? player.value?.play() : player.value?.pause()
}


</script>
 
<style lang = "less" scoped>
.footerMusic {
    border-top: 1px solid #ccc;
    background-color: #333333;
    height: 1.4rem;
    width: 100%;
    bottom: 0;
    left: 0;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(251, 251, 251);

    .leftFooter {
        width: 70%;
        padding: 0 .2rem;
        display: flex;
        align-items: center;

        .pic {
            margin-right: .2rem;
            height: 70%;
            width: 1rem;

            img {
                border: .2rem solid black;
                border-radius: 1rem;
                width: 100%;
                height: 100%;
            }
        }

        .songName {
            display: flex;
            font-weight: 500;
            font-size: .40rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            .singer {
                display: flex;
            }
        }
    }

    .rightFooter {
        .play {
            padding: 0 .2rem;

            .icon1 {
                margin-right: .3rem;
            }
        }
    }
}
</style>