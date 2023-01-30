import { GetMusicLyric } from './../request/Api';
import { defineStore } from 'pinia'
interface A {
    [PropName: string]: any
}
export const useStore = defineStore('store', {
    state: () => {
        return {
            songList: [{
                name: '玻璃之情', //歌曲名字
                id: 186436, //歌曲id 用来获取歌曲url接口的
                al: {
                    id: 18937,
                    name: "I Am What I Am",
                    picUrl: "https://p2.music.126.net/bqq6DITA5nj_yd_i6dsiTA==/109951166225429773.jpg", //歌曲封面
                    tns: [],
                    pic_str: "109951166225429773",
                    pic: 511662254297801099
                },
                ar: [
                    {
                        id: 6457,
                        name: "张国荣",
                        tns: [],
                        alias: []
                    }
                ]
            }] as A,
            songIndex: 0,//默认当前歌曲下标
            playFlag: false, //播放歌曲开关
            playBuff: false,  //播放状态 true显示播放 false显示暂停,
            details: false, //底部播放栏详情页控制器 false就是关闭 ture打开
            currentTime: 0,
            flag: false, //是否处于拖动状态，
            lyric: {} as A,//歌词,
            showTopNvaFlag: true,
        }
    },
    actions: {
        updateCurrentTime(value: number) {
            this.currentTime = value
        },
        getLyric(value: number) {
            GetMusicLyric({ id: value }).then(async (res) => {
                this.lyric = res.lrc
            })
        }
    },
    getters: {}
})