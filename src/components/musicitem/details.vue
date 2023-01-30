<template>
    <div class="details">
        <!-- <img class="bigimg" alt="" :src="$state.songList[$state.songIndex].al.picUrl"> -->
        <div class="bigimg" :style="{ backgroundImage: `url(${$state.songList[$state.songIndex].al.picUrl})` }"></div>
        <div class="top">
            <svg-icon name="xiajiantou" @click="$state.details = false"></svg-icon>
            <div class="title" ref="title">
                <span id="box" :class="{ scroll: scrollFlag }" ref="scroll">{{
                    $state.songList[$state.songIndex].name
                }}</span>
                <span class="singer"> <span v-for="item, index in $state.songList[$state.songIndex].ar" :key="index">
                        {{ index+ 1 !== $state.songList[$state.songIndex].ar.length ? item.name + '/' : item.name}}
                    </span></span>
            </div>
            <svg-icon name="fenxiang" @click="$state.details = false"></svg-icon>
        </div>
        <div class="middle" ref="middle">
            <div class="img" v-show="isshowLyric" @touchstart.stop="isshowLyric = !isshowLyric">
                <img src="../../../public/img/needle-ab.png" alt=""
                    :class="$state.playFlag ? 'needle needle-active' : 'needle'">
                <img :src="$state.songList[$state.songIndex].al.picUrl" alt=""
                    :class="$state.playFlag ? 'pic-active pic' : 'pic'">
                <img src='../../../public/img/pan.png' alt="" class="cd">
            </div>
            <div @touchstart.stop="isshowLyric = !isshowLyric" v-show="!isshowLyric" class="lyric1" ref="musicLyric">
                <p v-for="item, index in lyricA" :key="index"
                    :class="currentTime >= item.allSec && currentTime < lyricA[index + 1].allSec ? 'active' : ''"> {{
                        item.ric
                    }}</p>
            </div>
        </div>
        <div class="bottom">
            <div class="Acomp">
                <svg-icon name="aixin"></svg-icon>
                <svg-icon name="xiazai"></svg-icon>
                <svg-icon name="liuyan1"></svg-icon>
                <svg-icon name="diandiandianshu"></svg-icon>
            </div>
            <div class="Bcomp">
                <span>{{ formatSeconds(currentTime) }}</span>
                <div class="middles">
                    <input type="range" ref="ipt" min="0" :max="anTime" v-model="currentTime" step="1"
                        @touchstart="jumpMusic($event)"
                        :style="{ backgroundSize: `${currentTime / anTime * 100}% 100%` }" class="iptMusic">
                </div>
                <span>{{ mTime }}:{{ sTime }}</span>
            </div>
            <div class="Ccomp">
                <svg-icon name="repeatzhongfu"></svg-icon>
                <svg-icon name="shangyishoushangyige" @click="goIndex(1)"></svg-icon>
                <div class="span">
                    <svg-icon name="bofang" class="icon1" @click="playMusic(true)" v-if="!$state.playFlag"></svg-icon>
                    <svg-icon name="zanting" class="icon1" @click="playMusic(false)" v-if="$state.playFlag"></svg-icon>
                </div>

                <svg-icon name="xiayigexiayishou" @click="goIndex(1)"></svg-icon>
                <svg-icon name="xiangmuxiangqing" class="icon2"></svg-icon>
            </div>
        </div>
    </div>
</template>
 
 
 
 
<script setup lang='ts'>
import { useStore } from '@/store';
import { url } from 'inspector';
import { storeToRefs } from 'pinia';
import { URL } from 'url';
import { computed, onMounted, onUpdated, reactive, ref, watch } from 'vue';
const store = useStore()
const { lyric, currentTime, playFlag, songIndex } = storeToRefs(store)
const { $state } = useStore()
let scrollFlag = ref(false)
const scroll = ref<HTMLSpanElement>()
const title = ref<HTMLDivElement>()
const ipt = ref<HTMLInputElement>()  //进度条dom元素
const musicLyric = ref<HTMLUListElement>()
const middle = ref<HTMLDivElement>()
const isshowLyric = ref(true) //点击图片显示歌词 true显示磁盘 false显示歌词

const reg = /\[\d+:\d+\.\d+\]/g
const lyricA = computed(() => {
    let arr = []
    if (lyric.value.lyric) {
        arr = lyric.value.lyric.split(/[(\r\n)\r\n]+/).map((item: string, i: number) => {
            let min = item.slice(1, 3)
            let sec = item.slice(4, 6)
            let msec = item.slice(7, item.indexOf(']'))
            let ric = item.slice(item.indexOf(']') + 1)
            let allSec = (parseInt(min) * 60) + parseInt(sec) + (parseInt(msec) / 100)
            if (allSec === NaN) allSec = 10000
            // console.log(min, sec, allSec);
            return { min, sec, msec, ric, allSec }

        })

        console.log(arr, lyric.value.lyric);

    }
    return arr
})


//监听audio当前播放的 时间
watch(currentTime, () => {
    const pJump = document.querySelector('p.active') as HTMLParagraphElement
    if (pJump) {
        if (pJump.offsetTop > 210) {
            middle.value!.scrollTo({ top: pJump.offsetTop - 210, behavior: 'smooth' })
        }
    }

})

const goIndex = (num: number) => {
    if (songIndex.value >= 0) songIndex.value += num
}


const { player, getTime, timer } = defineProps(['player', 'getTime', 'timer']) //audio dom元素
let mTime = ref<any>()
// 设置歌曲时间
mTime.value = parseInt($state.songList[$state.songIndex].dt % (1000 * 60 * 60) / (1000 * 60) + '')
mTime.value > 10 ? mTime.value : mTime.value = '0' + mTime.value
let sTime = ref<any>()
sTime.value = parseInt($state.songList[$state.songIndex].dt % (1000 * 60) / 1000 + '')
//设置点击播放/暂停功能 还有开启进度条动画
const anTime = $state.songList[$state.songIndex].dt / 1000  //歌曲秒数
const playMusic = (flag: boolean) => {
    $state.playFlag = flag //播放/暂停
}

//点击进度条 音乐跳转
const jumpMusic = (e: any) => {
    const iptobj = ipt.value?.getBoundingClientRect()
    const iptWidth = iptobj!.width
    const clicktime = (e.touches['0'].clientX - iptobj!.left) / iptWidth
    player.currentTime = clicktime * anTime

}
document.body.addEventListener('touchmove', function dd(e) {
    const iptobj = ipt.value?.getBoundingClientRect()
    const iptWidth = iptobj!.width
    $state.flag = true
    document.body.addEventListener('touchend', function cc() {
        getTime()
        $state.flag = false
        const iptWidth = iptobj!.width
        const clicktime = (e.touches['0'].clientX - iptobj!.left) / iptWidth
        player.currentTime = clicktime * anTime
    })
})


onMounted(() => {
    if (parseInt((scroll.value!.clientWidth as any)) > 216) {
        scrollFlag.value = true
        title.value!.style.overflow = 'hidden'
    }
})
//秒数转换
function formatSeconds(value: any) {
    var theTime = parseInt(value);// 秒
    var middle = 0;// 分
    var hour = 0;// 小时
    if (theTime > 60) {
        middle = parseInt(theTime / 60 + '');
        theTime = parseInt(theTime % 60 + '');
        if (middle > 60) {
            hour = parseInt(middle / 60 + '');
            middle = parseInt(middle % 60 + '');
        }

    }
    var result = ''
    if (parseInt(theTime + '') >= 10) {
        result = "0" + ":" + parseInt(theTime + '');
    } else {
        result = "0" + ":" + "0" + parseInt(theTime + '');
    }
    if (middle >= 0 && parseInt(theTime + '') >= 10) {
        result = parseInt(middle + '') + ":" + parseInt(theTime + '');
    } else {
        result = parseInt(middle + '') + ":" + "0" + parseInt(theTime + '');

    }
    /* if(hour> 0) {
    
        result = ""+parseInt(hour)+":"+result;
    
    } */
    return result;
}


</script>
 
<style lang = "less" scoped>
@keyframes scroll {
    0% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(-100%);
    }
}

.details {
    background-color: rgb(241 238 238 / 50%);
    position: relative;
    width: 100%;
    height: 100%;

    .bigimg {
        width: 100%;
        height: 100%;
        z-index: -300;
        filter: blur(.8rem);
        background-color: rgba(54, 54, 54, 0.741);

        &::before {
            content: " ";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            background-color: rgb(241 238 238 / 50%);
        }

        img {
            width: 100%;
            height: 100%;
        }
    }

    .top {
        padding: .8rem .2rem;
        display: flex;
        position: fixed;
        justify-content: space-around;
        align-items: center;
        top: 0;
        left: 0;
        width: 100%;
        height: 1rem;
        z-index: 1;
        color: #fff;

        .title {
            width: 60%;
            font-size: .4rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            #box {
                white-space: nowrap;

                &.scroll {
                    animation-delay: 1.5s;
                    animation: 6s scroll linear infinite;
                }
            }


            .singer {
                margin-top: .1rem;
                font-size: .35rem;
                color: #ccc;
                display: flex;

            }
        }

        .svg-icon {
            fill: #fff;
        }
    }

    .middle {
        height: 60%;
        position: relative;
        top: -15rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: auto;
        scrollbar-width: none;
        /* Firefox */
        -ms-overflow-style: none;

        /* IE10+ */
        &::-webkit-scrollbar {
            display: none;
            /* ChromeSafari */
        }


        .lyric1 {
            color: rgba(238, 237, 237, 0.731);
            height: 100%;
            font-size: .45rem;
            margin-top: 1rem;
            width: 100%;
            display: flex;
            flex-direction: column;

            p {
                font-size: .45rem;
                text-align: center;
                margin-top: .6rem;

            }

            .active {
                color: #fff;
                font-size: .5rem;
            }







        }

        .img {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 75%;
            height: 70%;

            .needle {
                width: 2.4rem;
                height: 3rem;
                position: absolute;
                top: -.3rem;
                left: 46%;
                z-index: 10;
                transform-origin: 0 0;
                transform: rotate(-10deg);
                transition: all 1.5s;
            }

            .needle-active {
                transform-origin: 0 0;
                transform: rotate(4deg);
                transition: all 2s;
            }

            @keyframes rotates {
                0% {
                    transform: rotate(0);
                }

                100% {
                    transform: rotate(360deg);
                }
            }

            .pic {

                position: absolute;
                border-radius: 50%;
                width: 6rem;
                height: 6rem;
            }

            .pic-active {
                animation: 20s rotates linear infinite;
            }

            .cd {
                width: 8rem;
                height: 8rem;
                position: absolute;
            }
        }
    }

    .bottom {
        font-size: .32rem;
        height: 3rem;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .Acomp {
            width: 100%;
            display: flex;
            justify-content: space-around;

        }

        .Bcomp {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            color: rgba(244, 243, 243, 0.756);

            span {
                padding-top: .2rem;
            }

            .middles {
                position: relative;
                width: 70%;
                display: flex;
                align-items: center;

                input[type=range] {
                    // appearance: none;
                    // width: 100%;
                    // height: 0.15rem;
                    // // background-color: rgba(228, 225, 225, 0.714);
                    // // background: linear-gradient(red, rgba(228, 225, 225, 0.714)) no-repeat, white;
                    margin-top: 8px;
                    /*上部分的填充值*/
                    outline: none;
                    -webkit-appearance: none;
                    /*清除系统默认样式*/
                    width: 100% !important;
                    background: -webkit-linear-gradient(red, rgba(228, 225, 225, 0.714)) no-repeat, #ddd;
                    /*背景颜色，俩个颜色分别对应上下，自己尝试下就知道了嗯*/
                    // background-size: 33% 100%;
                    /*设置左右宽度比例*/
                    height: 3px;
                    /*横条的高度，细的真的比较好看嗯*/

                    &::-webkit-slider-thumb {
                        appearance: none;
                        height: .3rem;
                        width: .3rem;
                        /*设置边框*/
                        border-radius: .25rem;
                        background-color: #ffffff;

                    }



                }
            }
        }

        .Ccomp {
            display: flex;
            justify-content: space-around;
            align-items: center;

            .icon1 {
                width: 1.3rem;
                height: 1.3rem;
            }

            .icon2 {
                width: .6rem;
                height: .6rem;
            }
        }
    }

}
</style>