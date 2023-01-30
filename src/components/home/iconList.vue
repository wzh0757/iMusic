<template>
    <div class="iconList">
        <ul>
            <li>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-dianzan-"></use>
                </svg>
                <span>每日推荐</span>
            </li>
            <li>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xinhao-"></use>
                </svg>
                <span>FM电台</span>
            </li>
            <li>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yinlegedan-"></use>
                </svg>
                <span>歌单</span>
            </li>
            <li>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-paihangbang-"></use>
                </svg>
                <span>排行榜</span>
            </li>
        </ul>
    </div>
</template>
 
 
 
 
<script setup lang='ts'>






</script>
 
<style lang = "less" scoped>
.iconList {
    margin-top: .2rem;
    width: 100%;
    height: 1.5rem;

    .icon {
        width: 1rem;
        height: 1rem;
    }

    ul {
        display: flex;
        justify-content: space-around;

        li {
            display: flex;
            flex-direction: column;
            font-size: .4rem;
            align-items: center;
        }
    }
}
</style>