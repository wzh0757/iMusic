<template>
    <div class="MusicItem">
        <itemTop :playlist="state.playlist"></itemTop>
        <itemBottom :songs="state.songs" :shareCount="state.playlist.shareCount"></itemBottom>

    </div>
</template>
 
 
 
 
<script setup lang='ts'>
import { onMounted, reactive } from 'vue';
import { GetMusicItem, GetMusicAll } from '@/request/Api'
import { useRoute } from 'vue-router';
import itemTop from '@/components/musicitem/itemTop.vue'
import itemBottom from '@/components/musicitem/item.Bottom.vue';
import { useStore } from '@/store';

const route = useRoute()
const store = useStore()
const state = reactive({
    playlist: { shareCount: '' },
    songs: {}
})
onMounted(() => {
    //获取歌单详情
    GetMusicItem({ id: route.query.id }).then((res) => {
        state.playlist = JSON.parse(JSON.stringify(res.playlist));
    }).catch(err => {
        console.log(err);
    })
    // 获取歌单的歌曲列表
    GetMusicAll({ id: route.query.id }).then((res) => {
        console.log(res);
        state.songs = JSON.parse(JSON.stringify(res.songs));
    })

})




</script>
 
<style lang = "less" scoped>
.MusicItem {
    height: 2000px;
}
</style>