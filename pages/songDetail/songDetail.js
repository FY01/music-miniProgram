// pages/songDetail/songDetail.js

import PubSub from "pubsub-js"
import moment from "moment"

import request from "../../utils/request";
//获取全局实例
const appInstance = getApp()
const iconList = ["listLoop","songLoop","random"]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:false,    //是否正在播放的标识
    song: {},       //歌曲详情
    musicId: "" ,    //歌曲id
    musicLink:"" ,     //播放链接
    currentTime:"00:00", //实时时间
    durationTime:"00:00", //总时长
    currentWidth: 0 ,   //进度条宽度
    module:iconList[0] ,  //播放模式
    iconIndex:0 ,    //播放模式列表下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //options: 从跳转页面携带过来的数据
    let musicId = options.musicId
    let {isPlay} = this.data

  //  获取歌曲详情
  //   musicId = "33894312"
    this.getMusicInfo(musicId)
    this.setData({
      musicId
    })
//订阅播放完自动播放下一首
    PubSub.subscribe("musicId",(msg,musicId) => {
      //重新获取歌曲详情
      this.getMusicInfo(musicId)
      //处于播放状态
      this.musicControl(true,musicId)
    })

    //从其他页面切回来是否维持播放状态
    if (appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === musicId){
      this.setData({
        isPlay:true
      })
    }

    //控制音乐播放的实例
    this.BackgroundAudioManager = wx.getBackgroundAudioManager()
    //实现背景音乐和页面播放统一
    this.BackgroundAudioManager.onPlay(() => {
      this.changePlayState(true)
      //修改全局音乐播放的状态
      appInstance.globalData.musicId = musicId
    })
    this.BackgroundAudioManager.onPause(() => {
      this.changePlayState(false)
    })
    this.BackgroundAudioManager.onStop(() => {
      this.changePlayState(false)
      })
  //  监听播放时长的回调
    this.BackgroundAudioManager.onTimeUpdate(() => {
      //moment接收的数据格式为毫秒
      let currentTime = moment(this.BackgroundAudioManager.currentTime * 1000).format("mm:ss")
      // 进度条长度
      let currentWidth = this.BackgroundAudioManager.currentTime / this.BackgroundAudioManager.duration* 450
      this.setData({
        currentTime,
        currentWidth,
      })
    })
  //  监听自然播放结束的监听
    this.BackgroundAudioManager.onEnded( () => {

    let {module} = this.data
    //  实时进度条长度调为0
      this.setData({
        currentWidth:0,
        currentTime:"00:00",
        musicLink:''
      })
      //  切到下一首  ["listLoop","songLoop","random"]
      PubSub.publish("switchType",module)
    })

  },

  /**
   * 改变播放模式的回调
   * @param event
   */
  changeModule(event) {
    console.log(event.currentTarget.dataset.module)
    let {iconIndex} = this.data
    if (iconIndex === iconList.length - 1) {
      iconIndex = 0
    }else {
      iconIndex ++
    }
    this.setData({
      iconIndex,
      module:iconList[iconIndex]
    })
  },
  /**
   * 改变播放状体的功能函数
   * @param isPlay
   */
  changePlayState(isPlay){
    this.setData({
      isPlay
    })
    //修改全局音乐播放的状态
    appInstance.globalData.isMusicPlay = isPlay
  },

  /**
   * 获取歌曲详情
   * @param musicId
   * @returns {Promise<void>}
   */
  async getMusicInfo(musicId){
    let result = await request("/song/detail",{ids : musicId})
    if (result.code === 200){
      let song = result.songs[0]
      //拿到格式化后的歌曲时长
      let durationTime = moment(song.dt).format("mm:ss")
      this.setData({
        song,
        durationTime
      })
      //动态修改窗口标题
      wx.setNavigationBarTitle({
        title:song.name
      })
    }
  },

  /**
   * 修改播放状态的回调函数
   */
  handleMusicPlay(){
    //修改播放状态
    let {musicId,isPlay,musicLink} = this.data
    isPlay = !isPlay
    // this.setData({
    //   isPlay
    // })

    this.musicControl(isPlay,musicId,musicLink)
  },
  /**
   * 控制页面音乐播放
   * @param isPlay
   * @param musicId
   * @returns {Promise<void>}
   */
  async musicControl(isPlay,musicId,musicLink){
    if (isPlay) {    //播放状态
      if (!musicLink){
        let result = await request("/song/url",{id:musicId})
        if (result.code === 200){
          let musicLink = result.data[0].url
          this.setData({musicLink})
          this.BackgroundAudioManager.src = musicLink
          this.BackgroundAudioManager.title = this.data.song.name
        }
      }else{
        this.BackgroundAudioManager.src = musicLink
        this.BackgroundAudioManager.title = this.data.song.name
      }
    }else {
      this.BackgroundAudioManager.pause()
    }
  },
  /**
   * 上一首下一首的回调
   * @param event
   */
  handleSwitch(event){
    //切歌首先要把上一首播放的歌暂停
    this.BackgroundAudioManager.pause()
    let {isPlay} = this.data
    let type = event.currentTarget.id
    //订阅recommendSong的切换歌曲id消息
    PubSub.subscribe("musicId",(msg,musicId) => {
      //重新获取歌曲详情
      this.getMusicInfo(musicId)
      //取消订阅
      PubSub.unsubscribe("musicId")
      //播放状态跟随前一首歌
      this.musicControl(isPlay,musicId)
    })
    //发布消息给recommendSong 页面
    PubSub.publish("switchType",type)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})