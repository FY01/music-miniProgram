// pages/video/video.js

import request from "../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[],  // 视频组列表
    navId: "", //被选中的导航条id
    videoList:[] , //视频列表
    videoId:'',  //视频id标识
    videoUpdateTime:[],   //存储播放时间的数组
    isTriggered:false,   //标识下拉刷新是否完成
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取视频导航列表
    this.getVideoGroupList()
  },
  /**
   * 获取视频导航列表的函数
   * @returns {Promise<void>}
   */
  async getVideoGroupList(){
    let result = await request("/video/group/list")
    if (result.code === 200 ) {
      let videoGroupList = result.data.slice(0,14)
      this.setData({
        videoGroupList,
        navId:videoGroupList[0].id
      })
      // 获取视频列表
      this.getVideoList(this.data.navId)
    }
  },
  /**
   * 获取视频列表的函数
   * @returns {Promise<void>}
   */
  async getVideoList(navId){
    let result = await request("/video/group/",{id:navId})
    //隐藏加载提示框
    wx.hideLoading()

    let index = 0
    let videoList = result.datas.map(item => {
      item.id = index ++
      return item
    })
    if (result.code === 200 ) {
      this.setData({
        videoList,
        isTriggered: false // 关闭下拉刷新
      })
    }
  },

  /**
   * 点击视频导航列表
   * @param e
   */
  changeNav(e){
    //更新选中下边框样式
    let navId = e.currentTarget.id * 1
    this.setData({
      navId,
      //清除原来已加载的视频数据
      videoList:[]
    })
    //显示加载提示框
    wx.showLoading({
      title:"视频正在加载"
    })
    // 更新视频列表
    this.getVideoList(this.data.navId)
  },

  /***
   * 点击播放、暂停、继续的函数
   * 需求：播放下一个视频，则前一个视频被停止
   */
  handlePlay(event){
    let vid = event.currentTarget.id;
    // 关闭上一个播放的视频
    // this.vid !== vid && this.videoContext && this.videoContext.stop();
    // if(this.vid !== vid){
    //   if(this.videoContext){
    //     this.videoContext.stop()
    //   }
    // }
    // this.vid = vid;

    // 更新data中videoId的状态数据
    this.setData({
      videoId: vid
    })
    // 创建控制video标签的实例对象
    this.videoContext = wx.createVideoContext(vid);
    // 判断当前的视频之前是否播放过，是否有播放记录, 如果有，跳转至指定的播放位置
    let {videoUpdateTime} = this.data;
    let videoItem = videoUpdateTime.find(item => item.vid === vid);
    if(videoItem){
      this.videoContext.seek(videoItem.currentTime);
    }
    this.videoContext.play();
    // this.videoContext.stop();
  },

  /**
   *  记录播放时间的函数
   * @param event
   */
  handleTimeUpdate(event) {
    let videoTimeObj = {videoId:event.currentTarget.id,currentTime:event.detail.currentTime}
    let {videoUpdateTime} = this.data

    let videoItem = videoUpdateTime.find(item => item.videoId === event.currentTarget.id)
    if (videoItem) {
      videoItem.currentTime = event.detail.currentTime
    }else {
      videoUpdateTime.push(videoTimeObj)
    }
    this.setData({
      videoUpdateTime
    })
  },
  /**
   * 播放结束的回调
   * @param event
   */
  handleEnded(event) {
    //移除记录播放时间的对象
    let  {videoUpdateTime} = this.data
    let index = videoUpdateTime.findIndex(item => item.videoId === event.currentTarget.id)
    videoUpdateTime.splice(index,1)
    this.setData({
      videoUpdateTime
    })
  },
  /**
   * 下拉刷新的回调
   */
  handleRefresher(){
    // 更新视频列表
    this.getVideoList(this.data.navId)
  },
  /**
   * 上拉加载数据
   */
  handleToLower(){
    let {videoList} = this.data
    //网易云音乐接口不支持后台分页，手动添加数据
    let newList = [
      {
        "type": 1,
        "displayed": true,
        "alg": "",
        "extAlg": null,
        "data": {
          "alg": "",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_76FB0C7D4487A564FEA0FF68450958C3",
          "coverUrl": "https://p2.music.126.net/UxroAYjVgC7ydkqpCT6E7A==/109951163573870148.jpg",
          "height": 720,
          "width": 1280,
          "title": "21 savage--Bank Account",
          "description": null,
          "commentCount": 417,
          "shareCount": 308,
          "resolutions": [
            {
              "resolution": 240,
              "size": 34317548
            },
            {
              "resolution": 480,
              "size": 58813331
            },
            {
              "resolution": 720,
              "size": 72430707
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 440000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/yY1-AFIiAKHKqJP-Vhaegg==/109951164678905622.jpg",
            "accountStatus": 0,
            "gender": 2,
            "city": 440300,
            "birthday": 1034611200000,
            "userId": 364887044,
            "userType": 0,
            "nickname": "KFCkclcl",
            "signature": "?",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951164678905620,
            "backgroundImgId": 109951165596149940,
            "backgroundUrl": "http://p1.music.126.net/kw1BOmbq1qs4fXvRzirLBw==/109951165596149936.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": null,
            "djStatus": 0,
            "vipType": 10,
            "remarkName": null,
            "backgroundImgIdStr": "109951165596149936",
            "avatarImgIdStr": "109951164678905622"
          },
          "urlInfo": {
            "id": "76FB0C7D4487A564FEA0FF68450958C3",
            "url": "http://vodkgeyttp9c.vod.126.net/cloudmusic/yAzT0eNO_1727767143_shd.mp4?ts=1629000579&rid=051D83E760458F7A1DBE59D3F53DB9DC&rl=3&rs=ZSPscNBwYHYuckBqnrPYhAMMgxxbGQzE&sign=eaa44ec98c48ea9b7a61cded1a8b71da&ext=X9HnYx1ajs%2BC0kL1pd7cm7DcshbDean%2BbEZ1A%2BxtRZViRBhYnCiiQt9czxrxuW9VHDxqEUnbOSGqcx%2Bfqz2uowyLWTz8JFhiwoxFLoa3XpVhyhCmRuOZTxVS3xu6X3kJsda0dtTUFsk%2Bio8jDK5Cg0S2yh3CFfvNBYa4C9R9unO8BLnOJnMsdVIN%2F%2BAjXdVReBObPlYZFatMVLiv8v%2FoqqtRzppUqJQkX9cYtqeT0cOPyx4AjrncPcqDYUrNgKJP",
            "size": 72430707,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 57106,
              "name": "欧美现场",
              "alg": null
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": null
            },
            {
              "id": 59108,
              "name": "巡演现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [
            {
              "name": "Bank Account",
              "id": 489037214,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 12062134,
                  "name": "21 Savage",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 100,
              "st": 0,
              "rt": null,
              "fee": 8,
              "v": 283,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 35670987,
                "name": "Issa Album",
                "picUrl": "http://p3.music.126.net/f6pCFqXwexyA6VEOmznItA==/109951165981973465.jpg",
                "tns": [],
                "pic_str": "109951165981973465",
                "pic": 109951165981973470
              },
              "dt": 220368,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 8814803,
                "vd": -26521
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 5288899,
                "vd": -23938
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 3525947,
                "vd": -22209
              },
              "a": null,
              "cd": "1",
              "no": 2,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 1,
              "s_id": 0,
              "rtype": 0,
              "rurl": null,
              "mst": 9,
              "cp": 7001,
              "mv": 0,
              "publishTime": 1499356800000,
              "privilege": {
                "id": 489037214,
                "fee": 8,
                "payed": 0,
                "st": 0,
                "pl": 128000,
                "dl": 0,
                "sp": 7,
                "cp": 1,
                "subp": 1,
                "cs": false,
                "maxbr": 320000,
                "fl": 128000,
                "toast": false,
                "flag": 4,
                "preSell": false
              }
            }
          ],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "76FB0C7D4487A564FEA0FF68450958C3",
          "durationms": 280589,
          "playTime": 514440,
          "praisedCount": 2641,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": true,
        "alg": "",
        "extAlg": null,
        "data": {
          "alg": "",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_D8D7A2535EF79EC286FB2014CDB6D131",
          "coverUrl": "https://p2.music.126.net/D4A0zRVNG9IDRHCqJzSyHQ==/109951163574330759.jpg",
          "height": 1280,
          "width": 720,
          "title": "余超颖小姐姐",
          "description": null,
          "commentCount": 33,
          "shareCount": 159,
          "resolutions": [
            {
              "resolution": 240,
              "size": 7178516
            },
            {
              "resolution": 480,
              "size": 12467476
            },
            {
              "resolution": 720,
              "size": 16247681
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 110000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/fttD2AwbGmqlzAP1W0oNBQ==/109951163616502691.jpg",
            "accountStatus": 0,
            "gender": 0,
            "city": 110101,
            "birthday": 883584000000,
            "userId": 1508251630,
            "userType": 201,
            "nickname": "热门音乐推荐馆",
            "signature": "所以歌曲都生成mp3了.公众号：欢乐资源库",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951163616502690,
            "backgroundImgId": 109951164460205250,
            "backgroundUrl": "http://p1.music.126.net/m6YJsMgVasTNi9WodIWtnQ==/109951164460205256.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "音乐视频达人"
            },
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "backgroundImgIdStr": "109951164460205256",
            "avatarImgIdStr": "109951163616502691"
          },
          "urlInfo": {
            "id": "D8D7A2535EF79EC286FB2014CDB6D131",
            "url": "http://vodkgeyttp9c.vod.126.net/cloudmusic/rtwVz1Z4_1979070845_shd.mp4?ts=1629000579&rid=051D83E760458F7A1DBE59D3F53DB9DC&rl=3&rs=zNMJnsbfHxSwxHdVQNxVNoZUwMslWFLR&sign=0ef0ee458efb0df582e66b7021362d68&ext=X9HnYx1ajs%2BC0kL1pd7cm7DcshbDean%2BbEZ1A%2BxtRZViRBhYnCiiQt9czxrxuW9VHDxqEUnbOSGqcx%2Bfqz2uowyLWTz8JFhiwoxFLoa3XpVhyhCmRuOZTxVS3xu6X3kJsda0dtTUFsk%2Bio8jDK5Cg0S2yh3CFfvNBYa4C9R9unO8BLnOJnMsdVIN%2F%2BAjXdVReBObPlYZFatMVLiv8v%2FoqqtRzppUqJQkX9cYtqeT0cM6AT3ECwQO4AvXX3cIHUKB",
            "size": 16247681,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 59101,
              "name": "华语现场",
              "alg": null
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": null
            },
            {
              "id": 57110,
              "name": "饭拍现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": [
            109
          ],
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "D8D7A2535EF79EC286FB2014CDB6D131",
          "durationms": 59049,
          "playTime": 297084,
          "praisedCount": 719,
          "praised": false,
          "subscribed": false
        }
      }
    ]
    videoList.push(...newList)
    this.setData({
      videoList
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