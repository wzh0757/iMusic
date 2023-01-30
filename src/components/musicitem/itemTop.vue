<template>
    <div>
        <div class="itemMusicTop">
            <div class="bigimg">
                <img :src="playlist?.coverImgUrl" alt="">
            </div>
            <div class="navTop" ref="navTop">
                <div class="navTopleft">
                    <span>
                        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                            <use xlink:href="#icon-zuojiantou"></use>
                        </svg>
                    </span>
                    <span class="song">歌单</span>
                </div>
                <div class="navTopright">
                    <span class="search">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-sousuo1"></use>
                        </svg>
                    </span>
                    <span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-lvzhou_gengduo_xiangqing"></use>
                        </svg>
                    </span>
                </div>
            </div>
            <div class="navMiddle">
                <div class="leftImg">
                    <img :src="playlist?.coverImgUrl" alt="">
                    <span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-bofangsanjiaoxing"></use>
                        </svg>
                        {{ changeNum(playlist.playCount) }}
                    </span>
                </div>
                <div class="rightContent">
                    <h3 class="title">{{ playlist.name }}</h3>
                    <div class="user">
                        <img :src="playlist.creator?.avatarUrl" alt="">
                        <span>{{ playlist.creator?.nickname }}></span>
                    </div>
                    <div class="jieshao">
                        <span>{{ playlist.description }} </span>
                        <span>></span>
                    </div>
                </div>
            </div>
            <div class="navBottom">
                <ul>
                    <li>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-liuyan-"></use>
                        </svg>
                        <p>{{ playlist.commentCount }}</p>
                    </li>
                    <li>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-fenxiang-"></use>
                        </svg>
                        <p>{{ playlist.shareCount }}</p>
                    </li>
                    <li>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-xiazai-"></use>
                        </svg>
                        <p>下载</p>
                    </li>
                    <li>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-tianjiawenjian-"></use>
                        </svg>
                        <p>多选</p>
                    </li>

                </ul>
            </div>
        </div>
    </div>
</template>
 
<script setup lang='ts'>
import { url } from 'inspector';
import { onMounted, reactive, ref } from 'vue';
defineProps(['playlist'])
const changeNum = (num: number) => {
    if (num >= 100000000) return (num / 100000000).toFixed(1) + '亿'
    else if (num >= 10000) return (num / 10000).toFixed(1) + '万'
}
const navTop = ref<HTMLDivElement>()
onMounted(() => {

})
document.body.onscroll = () => {
    if (window.pageYOffset > 319) {
        navTop.value!.style.backgroundColor = '#333333'
    } else {
        navTop.value!.style.backgroundColor = 'transparent'
    }

}
</script>

<style lang = "less" scoped>
.itemMusicTop {
    width: 100%;
    background-color: #fff;
    position: relative;

    .bigimg {
        width: 100%;
        height: 8.5rem;
        z-index: -1;
        opacity: 1;
        filter: blur(.5rem);
        background-color: rgba(116, 115, 115, 0.194);

        img {
            width: 100%;
            height: 100%;
        }

    }

    .navTop {
        z-index: 1;
        top: 0;
        left: 0;
        position: fixed;
        width: 100%;
        height: 1.3rem;
        display: flex;
        justify-content: space-between;
        font-size: .5rem;
        align-items: center;
        padding: 0 .2rem;
        color: #fff;
        transition: all .3s ease;

        span {
            .icon {
                fill: #fff;
            }
        }

        .navTopleft {
            width: 50%;
            display: flex;
            align-items: center;

            .song {
                margin-left: 1rem;
            }
        }

        .navTopright {
            width: 50%;
            display: flex;
            justify-content: right;
            align-items: center;

            .search {
                margin-right: 1rem;
            }
        }
    }

    .navMiddle {
        position: absolute;
        top: 0;
        padding: 0 .3rem;
        margin-top: 1.5rem;
        display: flex;
        justify-content: space-between;

        .leftImg {
            position: relative;
            width: 45%;
            height: 4rem;

            span {
                font-size: 14px;
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
                border-radius: 8px;
                width: 100%;
                height: 100%;
            }
        }

        .rightContent {
            padding: .2rem;
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;

            .title {
                color: #fff;
                font-size: .35rem;
                font-weight: 700;

            }

            .user {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: left;
                color: #ccc;

                span {
                    font-size: .3rem;
                    margin-left: .2rem;
                }

                img {
                    border-radius: .7rem;
                    width: .8rem;
                    height: .8rem;
                }
            }
        }

        .jieshao {
            color: #ccc;
            font-size: .3rem;
            display: flex;
            justify-content: space-between;

            span:nth-child(1) {
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 1;
                display: -webkit-box;
                -webkit-box-orient: vertical;
            }
        }
    }

    .navBottom {
        top: 0;
        width: 100%;
        position: absolute;
        margin-top: 6rem;

        ul {
            display: flex;
            justify-content: space-around;

            li {
                display: flex;
                flex-direction: column;
                align-items: center;

                .icon {
                    fill: rgb(251, 244, 244, 1);
                }

                p {
                    margin-top: .2rem;
                    font-size: 0.4rem;
                    color: #fff;
                }
            }
        }
    }
}
</style>