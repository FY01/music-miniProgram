// pages/index/index.js

import request from "../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],  //轮播图
    recommendList:[], //推荐列表
    topList:[], //排行榜
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // get banners pic
    let getBanners = await request('/banner',{type : 2})
    if (getBanners.code === 200){
      this.setData({bannerList:getBanners.banners})
    }
    // get recommend song
    let getRecommend = await request('/personalized',{limit : 10})
    if (getRecommend.code === 200){
      this.setData({recommendList:getRecommend.result})
    }
    // get topList
    let songList = []
    let topListIndex = 0
    while(topListIndex < 5){
      let getTopList = await request('/top/list',{idx : topListIndex++})
      if (getTopList.code === 200){
        let topListItem = {
          name:getTopList.playlist.name,
          list:getTopList.playlist.tracks.slice(0,3),
          listId:getTopList.playlist.tracks.id}
        songList.push(topListItem)
      }
      this.setData({topList:songList})
    }


  },

  toRecommendSong() {
    wx.navigateTo({
      url:"/pages/recommendSong/recommendSong"
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