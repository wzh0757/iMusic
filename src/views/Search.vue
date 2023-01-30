<template>

    <div class="searchTop">
        <svg-icon name="zuojiantou" @click="goBack"></svg-icon>
        <input ref="search" type="text" placeholder="陈奕迅" @keyup.enter="enterSearch" v-model="searchVal">
    </div>
    <div class="searchHistory">
        <span class="text">历史</span>
        <div class="hist"><span class="history" v-for="item, index in searchhistory" :key="index"
                @click="searchSpan(item)">{{ item }}</span>
        </div>
        <svg-icon name="lajitong" @click="deleteHistory"></svg-icon>
    </div>
    <div class="list">
        <ul>
            <li :class="activeFlag === index ? 'active' : ''" v-for="item, index in searchList" :key="item.id"
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
</template>
 
 
 
 
<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
import { nextTick, onMounted, reactive, ref } from 'vue';
import { GetSearch } from '@/request/Api';
const router = useRouter()
const store = useStore()
const { songIndex } = storeToRefs(store)
const { showTopNvaFlag } = storeToRefs(store)
const search = ref() //搜索框dom
const searchVal = ref<string>('')
//每一次回车都将历史记录添加进去数组
let aa = JSON.parse(localStorage.getItem('searchHistory') as string) || []
let searchhistory = ref(aa)
/////////////////////////////////////////////
const searchList = ref<Array<any>>([]) //搜索返回列表song
const activeFlag = ref() //点击是否选中歌曲的样式显示
onMounted(() => {


})

//点击左箭头返回
const goBack = () => {
    showTopNvaFlag.value = true
    router.go(-1)

}
//按回车搜索
const enterSearch = async () => {
    if (searchVal.value.trim() !== '') {
        searchhistory.value.unshift(searchVal.value)
        searchhistory.value = [...new Set(searchhistory.value)]
        localStorage.setItem('searchHistory', JSON.stringify(searchhistory.value))
        //调用搜索接口
        await GetSearch({ keywords: searchVal.value }).then((res) => {
            console.log(res);
            searchList.value = JSON.parse(JSON.stringify(res.result.songs))
            console.log(searchList.value);

        })
    }

}
//点击历史记录搜索
const searchSpan = async (item: string) => {
    await GetSearch({ keywords: item.trim() }).then((res) => {
        searchList.value = JSON.parse(JSON.stringify(res.result.songs))
        console.log(searchList.value);

    })
}
//删除历史记录
const deleteHistory = () => {
    localStorage.removeItem('searchHistory')
    searchhistory.value.splice(0)
}


const clickSong = (index: number) => {
    store.$state.songList = searchList.value
    store.$state.playBuff = true//切换为暂停
    activeFlag.value = index
    store.$state.songIndex = index
    store.$state.playFlag = false //关闭播放器
    store.$state.playFlag = true
}



</script>
 
<style lang = "less" scoped>
.searchTop {
    padding: .25rem .1rem;
    width: 100%;
    display: flex;


    .icon {
        width: 20%;
    }

    input {
        margin-left: .4rem;
        border: none;
        border-bottom: 1px solid #ccc;
        height: .8rem;
        width: 80%;
        outline: none;
        padding: .2rem;
        font-size: .45rem;
        color: rgb(48, 47, 47);
    }
}

.searchHistory {
    height: 1rem;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .4rem;

    .text {
        margin-left: .3rem;
    }

    .svg-icon {
        height: .5rem;
    }

    .hist {
        width: 70%;
        padding: .2rem 0;
        display: flex;
        justify-content: start;
        align-items: center;
        overflow: scroll;

        .history {

            white-space: nowrap;
            margin: 0 .2rem;
            padding: .1rem;
            border: 1px solid rgba(206, 199, 199, 0.626);
            border-radius: .3rem;
        }
    }

}

.list {
    padding: .2rem;
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
</style>