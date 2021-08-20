// pages/recommendSong/recommendSong.js

import PubSub from "pubsub-js"
import request from "../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:"", // 天
    month:"", //月
    recommendList: [] ,  //每日推荐歌曲列表
    index:0    //当前歌曲在数组中的下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断是否登录
    let userInfo = wx.getStorageSync('userInfo')
    if(!userInfo){
      wx.showToast({
        title:'请先登录',
        icon:"none",
        success:() => {
          wx.reLaunch({
            url:"/pages/login/login"
          })
        }
      })
    }

    //获取日期
    this.setData({
      day:new Date().getDate(),
      month:new Date().getMonth() + 1
    })

    // 发请求获取每日推荐歌曲
    this.getRecommendSongs()

    //  订阅songDetail切换歌曲消息
    PubSub.subscribe("switchType",(msg,data) => {
      let {recommendList,index} = this.data

      if (data === "pre"){
        index === 0 ? index = recommendList.length-1 : index -= 1
      }else if (data === "next" || data === "listLoop"){
        index === recommendList.length-1 ? index = 0 : index += 1
      }else if (data === "random"){
          let newIndex = Math.floor(recommendList.length * Math.random())
          while (newIndex === index){
            newIndex = Math.floor(recommendList.length * Math.random())
          }
          index = newIndex
      }
      this.setData({
        index
      })
      let musicId = recommendList[index].id
      //发布消息给songDetail 页面
      PubSub.publish("musicId",musicId)
    })


  },

  // 发请求获取每日推荐歌曲
  async getRecommendSongs(){
    let result = await request("/personalized/newsong")
    if (result.code === 200) {
      let recommendList = result.result
      this.setData({
        recommendList
      })
    }
  },
  //跳转到歌曲详情页
  toSongDetail(event){
    let {song,index} = event.currentTarget.dataset

    this.setData({
      index
    })

    //通过query参数传参,不能直接传对对象，参数长度有限制，太长会自动截取，
    wx.navigateTo({
      // url:"/pages/songDetail/songDetail?song=" + JSON.stringify(song)
      url:"/pages/songDetail/songDetail?musicId=" + song.id
    })
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