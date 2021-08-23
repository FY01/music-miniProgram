import request from "../../utils/request";

let isSend = false //函数节流使用
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholderContent:"",  //搜索框placeHolder
    hotList: []  , //热搜榜列表
    searchContent: "" , // 搜索内容
    searchList: [] , // 搜索响应列表
    historyList: [] ,  //搜索记录列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取初始化数据
    this.getInitData()
    this.getSearchHistory()
  },

  /**
   * 获取初始数据
   * @returns {Promise<void>}
   */
  async getInitData(){
    //默认搜索框
    let placeholderData = await request('/search/default');
    //热搜榜列表
    let hotListData = await request('/search/hot/detail');
    this.setData({
      placeholderContent: placeholderData.data.showKeyword,
      hotList: hotListData.data
    })
  },

  /**
   * 从本地获取搜索历史记录
   */
  getSearchHistory(){
    let historyList = wx.getStorageSync('searchHistory');
    if(historyList){
      this.setData({
        historyList
      })
    }
  },

  /**
   * 获取搜索输入框内容
   * @param event
   */
  handleInputChange(event) {
    let searchContent = event.detail.value.trim()
    this.setData({
      searchContent
    })

  //  函数节流发请求获取搜索列表
    if (isSend){
      return
    }else {
      isSend = true
      this.getSearchList()
      setTimeout(() => {
        isSend = false
      },300)
    }

  },

  /**
   * 获取搜索列表的函数
   * @param keywords
   * @returns {Promise<void>}
   */
  async getSearchList(){
    if(!this.data.searchContent){
      this.setData({
        searchList: []
      })
      return;
    }
    let {searchContent, historyList} = this.data;
    // 发请求获取关键字模糊匹配数据
    let searchListData = await request('/search', {keywords: searchContent, limit: 10});
    this.setData({
      searchList: searchListData.result.songs
    })

    // 将搜索的关键字添加到搜索历史记录中
    if(historyList.indexOf(searchContent) !== -1){
      historyList.splice(historyList.indexOf(searchContent), 1)
    }
    historyList.unshift(searchContent);
    this.setData({
      historyList
    })

    wx.setStorageSync('searchHistory', historyList)
  },

  /**
   * 清空搜索列表
   */
  clearSearchContent() {
    this.setData({
      searchContent:"",
      searchList: [],
    })
  },

  /**
   * 清空历史搜索记录
   */
  deleteSearchHistory() {
    wx.showModal({
      title:"确认删除吗？",
      success:(res) => {
        if (res.confirm){
          this.setData({
            historyList: [],
          })
          wx.removeStorageSync("searchHistory")
        }
      }
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