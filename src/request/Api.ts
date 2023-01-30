import request from './index'
import { AxiosRequestConfig } from 'axios'
//轮播图图片
export const BannerApi = (params: any) => request.get(`/banner?type=${params.type}`, { params })
//推荐歌单
export const GetMusicList = (params: any) => request.get(`/personalized?limit=10`, { params })
//歌单详情
export const GetMusicItem = (params: { id: any }) => request.get(`/playlist/detail`, { params })
//获取歌单所有歌曲
export const GetMusicAll = (params: { id: any }) => request.get(`/playlist/track/all`, { params })
//获取歌词
export const GetMusicLyric = (params: { id: number }) => request.get(`/lyric`, { params })
//搜索
export const GetSearch = (params: { keywords: string }) => request.get(`/cloudsearch`, { params })