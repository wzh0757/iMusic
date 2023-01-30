<template>
    <div class="itemBottom">
        <div class="nav">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiayishou-"></use>
            </svg>
            <h3 class="title">播放全部<p>(共{{ songs.length }}首)</p>
            </h3>
            <span class="collect"><span>+</span>
                <p>收藏({{ shareCount }})</p>
            </span>
        </div>
        <div class="list">
            <ul>
                <li :class="activeFlag === index ? 'active' : ''" v-for="item, index in songs" :key="item.id"
                    @touchstart="clickSong(index)">
                    <div class="left">
                        <p>{{ index+ 1}}</p>
                        <div class="songname">
                            <div class="top">{{ item.name }}</div>

                            <div class="bottom">
                                <div v-for="i, n in item.ar">{{ i.name }}{{ n+ 1 == item.ar.length ? '' : '/' }}</div>
                            </div>
                        </div>

                    </div>
                    <div class="right">
                        <svg class="icon icon1" aria-hidden="true" v-if="item.mv !== 0">
                            <use xlink:href="#icon-xiayishou-"></use>
                        </svg>
                        <svg class="icon icon2" aria-hidden="true">
                            <use xlink:href="#icon-yinleliebiao-"></use>
                        </svg>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
 
<script setup lang='ts'>
import { GetMusicAll } from '@/request/Api';
import { useStore } from '@/store';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';


const activeFlag = ref()
const route = useRoute()

const props = defineProps(['songs', 'shareCount'])

const clickSong = (index: number) => {
    const store = useStore()
    store.$state.songList = props.songs
    store.$state.playBuff = true//切换为暂停
    activeFlag.value = index
    store.$state.songIndex = index
    store.$state.playFlag = false //关闭播放器
    store.$state.playFlag = true
}






</script>
 
<style lang = "less" scoped>
.itemBottom {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    padding: 0 0.2rem;
    margin-top: -.5rem;
    border-top-left-radius: .4rem;
    border-top-right-radius: .4rem;

    .nav {
        height: 1rem;
        margin-top: .3rem;
        font-size: .4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
            margin-left: -1.5rem;
            display: flex;
            align-items: center;
            font-size: .45rem;
            font-weight: 600;

            p {
                font-size: .1rem;
                font-weight: 300;
            }
        }

        .collect {
            width: 3rem;
            color: #fff;
            display: flex;
            line-height: 1rem;
            justify-content: space-around;
            height: 100%;
            background-color: red;
            border-radius: .5rem;

            span {
                font-weight: 100;
                font-size: .8rem;

            }
        }
    }

    .list {
        width: 100%;

        .active {

            border-radius: 10px;
            background-color: #ccc;
        }

        ul li {
            padding: .3rem .1rem;
            width: 100%;
            font-size: .4rem;
            display: flex;
            justify-content: space-between;

            .left {
                width: 80%;
                display: flex;
                align-items: center;
                justify-content: left;

                p {
                    width: 8%;
                }

                .songname {
                    flex: 1;
                    margin-left: .5rem;
                    display: flex;
                    flex-direction: column;

                    .top {
                        font-weight: 600;
                    }

                    .bottom {
                        display: flex;
                        font-size: .2rem;
                        margin-top: .2rem;
                        color: rgb(164, 162, 162);
                    }
                }
            }

            .right {
                display: flex;

                .icon1 {
                    margin-right: .3rem;
                }

            }
        }
    }
}
</style>