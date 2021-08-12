import request from "../../utils/request";

let startY = 0
let moveY = 0
let moveDistance = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform:"",
    coveTransition:"",
    userInfo:{},
    recentPlayList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从本地拿到userInfo
    let userInfo = wx.getStorageSync("userInfo")
    if (userInfo){
      this.setData({
        userInfo:JSON.parse(userInfo)
      })
    }
    //发请求拿到最近播放列表
    this.getRecentPlayList(this.data.userInfo.userId)
  },

  /**
   * //发请求拿到最近播放列表函数
   * @param userId
   * @returns {Promise<void>}
   */
  async getRecentPlayList(userId){
    /*todo
      没有权限获取数据？？？
     */
    let result = await request('/user/record', {uid: userId, type: 0});
    console.log(result)
    // if (result.code === 200){
      let list = [
        {
          "playCount": 393,
          "score": 100,
          "song": {
            "name": "他不懂",
            "id": 28059417,
            "pst": 0,
            "t": 0,
            "ar": [
              {
                "id": 6472,
                "name": "张杰",
                "tns": [],
                "alias": []
              }
            ],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": "600907000002790687",
            "fee": 8,
            "v": 250,
            "crbt": null,
            "cf": "",
            "al": {
              "id": 2643348,
              "name": "爱，不解释",
              "picUrl": "http://p4.music.126.net/mW53BkMgGy37I7yVrUg-aQ==/109951163117902077.jpg",
              "tns": [],
              "pic_str": "109951163117902077",
              "pic": 109951163117902080
            },
            "dt": 232213,
            "h": {
              "br": 320000,
              "fid": 0,
              "size": 9291276,
              "vd": 10082
            },
            "m": {
              "br": 192000,
              "fid": 0,
              "size": 5574783,
              "vd": 13795
            },
            "l": {
              "br": 128000,
              "fid": 0,
              "size": 3716537,
              "vd": 14770
            },
            "a": null,
            "cd": "1",
            "no": 1,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 0,
            "s_id": 0,
            "mark": 8704,
            "originCoverType": 1,
            "originSongSimpleData": null,
            "single": 0,
            "noCopyrightRcmd": null,
            "mst": 9,
            "cp": 636011,
            "mv": 5779657,
            "rtype": 0,
            "rurl": null,
            "publishTime": 1387468800007,
            "privilege": {
              "id": 28059417,
              "fee": 8,
              "payed": 0,
              "st": 0,
              "pl": 128000,
              "dl": 0,
              "sp": 7,
              "cp": 1,
              "subp": 1,
              "cs": false,
              "maxbr": 999000,
              "fl": 128000,
              "toast": false,
              "flag": 68,
              "preSell": false
            }
          }
        },
        {
          "playCount": 219,
          "score": 55,
          "song": {
            "name": "玛丽",
            "id": 447925058,
            "pst": 0,
            "t": 0,
            "ar": [
              {
                "id": 6731,
                "name": "赵雷",
                "tns": [],
                "alias": []
              }
            ],
            "alia": [
              "Mary"
            ],
            "pop": 100,
            "st": 0,
            "rt": null,
            "fee": 8,
            "v": 38,
            "crbt": null,
            "cf": "",
            "al": {
              "id": 35069014,
              "name": "无法长大",
              "picUrl": "http://p4.music.126.net/BJgUd9aD9gpougZFASRTTw==/18548761162235571.jpg",
              "tns": [],
              "pic_str": "18548761162235571",
              "pic": 18548761162235572
            },
            "dt": 281984,
            "h": {
              "br": 320000,
              "fid": 0,
              "size": 11281807,
              "vd": -2
            },
            "m": {
              "br": 192000,
              "fid": 0,
              "size": 6769102,
              "vd": -2
            },
            "l": {
              "br": 128000,
              "fid": 0,
              "size": 4512749,
              "vd": -2
            },
            "a": null,
            "cd": "1",
            "no": 2,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 2,
            "s_id": 0,
            "mark": 8192,
            "originCoverType": 1,
            "originSongSimpleData": null,
            "single": 0,
            "noCopyrightRcmd": null,
            "mst": 9,
            "cp": 1400821,
            "mv": 0,
            "rtype": 0,
            "rurl": null,
            "publishTime": 1482249600007,
            "tns": [
              "Mary"
            ],
            "privilege": {
              "id": 447925058,
              "fee": 8,
              "payed": 0,
              "st": 0,
              "pl": 128000,
              "dl": 0,
              "sp": 7,
              "cp": 1,
              "subp": 1,
              "cs": false,
              "maxbr": 999000,
              "fl": 128000,
              "toast": false,
              "flag": 260,
              "preSell": false
            }
          }
        },
        {
          "playCount": 154,
          "score": 39,
          "song": {
            "name": "刚好遇见你",
            "id": 486188225,
            "pst": 0,
            "t": 0,
            "ar": [
              {
                "id": 4130,
                "name": "李玉刚",
                "tns": [],
                "alias": []
              },
              {
                "id": 12475601,
                "name": "徐天意",
                "tns": [],
                "alias": []
              }
            ],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": null,
            "fee": 8,
            "v": 18,
            "crbt": null,
            "cf": "",
            "al": {
              "id": 35661178,
              "name": "我想和你唱 第二季 第9期",
              "picUrl": "http://p4.music.126.net/DSGvdBaVhj1gwgh18Z9d3Q==/18812643953229012.jpg",
              "tns": [],
              "pic_str": "18812643953229012",
              "pic": 18812643953229012
            },
            "dt": 165058,
            "h": {
              "br": 320000,
              "fid": 0,
              "size": 6604844,
              "vd": -28900
            },
            "m": {
              "br": 192000,
              "fid": 0,
              "size": 3962924,
              "vd": -26300
            },
            "l": {
              "br": 128000,
              "fid": 0,
              "size": 2641964,
              "vd": -24400
            },
            "a": null,
            "cd": "1",
            "no": 5,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 2,
            "s_id": 0,
            "mark": 0,
            "originCoverType": 0,
            "originSongSimpleData": null,
            "single": 0,
            "noCopyrightRcmd": null,
            "mst": 9,
            "cp": 404023,
            "mv": 0,
            "rtype": 0,
            "rurl": null,
            "publishTime": 1498233600007,
            "privilege": {
              "id": 486188225,
              "fee": 8,
              "payed": 0,
              "st": 0,
              "pl": 128000,
              "dl": 0,
              "sp": 7,
              "cp": 1,
              "subp": 1,
              "cs": false,
              "maxbr": 999000,
              "fl": 128000,
              "toast": false,
              "flag": 256,
              "preSell": false
            }
          }
        },
        {
          "playCount": 134,
          "score": 34,
          "song": {
            "name": "世间美好与你环环相扣",
            "id": 1363948882,
            "pst": 0,
            "t": 0,
            "ar": [
              {
                "id": 31876221,
                "name": "柏松",
                "tns": [],
                "alias": []
              }
            ],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": "",
            "fee": 8,
            "v": 19,
            "crbt": null,
            "cf": "",
            "al": {
              "id": 78938226,
              "name": "听闻余生",
              "picUrl": "http://p3.music.126.net/DK1_4sP_339o5rowMdPXdw==/109951164071024476.jpg",
              "tns": [],
              "pic_str": "109951164071024476",
              "pic": 109951164071024480
            },
            "dt": 191960,
            "h": {
              "br": 320000,
              "fid": 0,
              "size": 7681089,
              "vd": -37574
            },
            "m": {
              "br": 192000,
              "fid": 0,
              "size": 4608671,
              "vd": -34959
            },
            "l": {
              "br": 128000,
              "fid": 0,
              "size": 3072462,
              "vd": -33277
            },
            "a": null,
            "cd": "01",
            "no": 1,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 0,
            "s_id": 0,
            "mark": 0,
            "originCoverType": 1,
            "originSongSimpleData": null,
            "single": 0,
            "noCopyrightRcmd": null,
            "mst": 9,
            "cp": 0,
            "mv": 10909947,
            "rtype": 0,
            "rurl": null,
            "publishTime": 0,
            "privilege": {
              "id": 1363948882,
              "fee": 8,
              "payed": 0,
              "st": 0,
              "pl": 128000,
              "dl": 0,
              "sp": 7,
              "cp": 1,
              "subp": 1,
              "cs": false,
              "maxbr": 999000,
              "fl": 128000,
              "toast": false,
              "flag": 64,
              "preSell": false
            }
          }
        },
        {
          "playCount": 131,
          "score": 33,
          "song": {
            "name": "当我唱起这首歌",
            "id": 1440221873,
            "pst": 0,
            "t": 0,
            "ar": [
              {
                "id": 34779264,
                "name": "隔壁老纪",
                "tns": [],
                "alias": []
              }
            ],
            "alia": [],
            "pop": 75,
            "st": 0,
            "rt": "",
            "fee": 0,
            "v": 8,
            "crbt": null,
            "cf": "",
            "al": {
              "id": 87694511,
              "name": "隔 壁",
              "picUrl": "http://p4.music.126.net/9BN93vzT__XDF3Aj1tWgAA==/109951164880967273.jpg",
              "tns": [],
              "pic_str": "109951164880967273",
              "pic": 109951164880967280
            },
            "dt": 234380,
            "h": {
              "br": 320000,
              "fid": 0,
              "size": 9378003,
              "vd": -10130
            },
            "m": {
              "br": 192000,
              "fid": 0,
              "size": 5626819,
              "vd": -7542
            },
            "l": {
              "br": 128000,
              "fid": 0,
              "size": 3751227,
              "vd": -5864
            },
            "a": null,
            "cd": "01",
            "no": 1,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 0,
            "s_id": 0,
            "mark": 0,
            "originCoverType": 2,
            "originSongSimpleData": {
              "songId": 175206,
              "name": "当我唱起这首歌",
              "artists": [
                {
                  "id": 5951,
                  "name": "小贱"
                }
              ],
              "albumMeta": {
                "id": 17650,
                "name": "我是小贱"
              }
            },
            "single": 0,
            "noCopyrightRcmd": null,
            "mst": 9,
            "cp": 0,
            "mv": 0,
            "rtype": 0,
            "rurl": null,
            "publishTime": 0,
            "privilege": {
              "id": 1440221873,
              "fee": 0,
              "payed": 0,
              "st": 0,
              "pl": 320000,
              "dl": 999000,
              "sp": 7,
              "cp": 1,
              "subp": 1,
              "cs": false,
              "maxbr": 999000,
              "fl": 320000,
              "toast": false,
              "flag": 128,
              "preSell": false
            }
          }
        },
        {
          "playCount": 127,
          "score": 32,
          "song": {
            "name": "国际歌",
            "id": 381962,
            "pst": 0,
            "t": 0,
            "ar": [
              {
                "id": 12972,
                "name": "唐朝乐队",
                "tns": [],
                "alias": []
              }
            ],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": "",
            "fee": 8,
            "v": 39,
            "crbt": null,
            "cf": "",
            "al": {
              "id": 37806,
              "name": "唐朝 同名专辑",
              "picUrl": "http://p4.music.126.net/M6I9g1EkDxbgl2j5Ygi-lQ==/130841883720226.jpg",
              "tns": [],
              "pic": 130841883720226
            },
            "dt": 266733,
            "h": {
              "br": 320000,
              "fid": 0,
              "size": 10671587,
              "vd": -25918
            },
            "m": {
              "br": 192000,
              "fid": 0,
              "size": 6402969,
              "vd": -23425
            },
            "l": {
              "br": 128000,
              "fid": 0,
              "size": 4268661,
              "vd": -22152
            },
            "a": null,
            "cd": "1",
            "no": 11,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 2,
            "s_id": 0,
            "mark": 1125899907113472,
            "originCoverType": 1,
            "originSongSimpleData": null,
            "single": 0,
            "noCopyrightRcmd": null,
            "mst": 9,
            "cp": 684010,
            "mv": 0,
            "rtype": 0,
            "rurl": null,
            "publishTime": 1465295561094,
            "eq": "rock",
            "privilege": {
              "id": 381962,
              "fee": 8,
              "payed": 0,
              "st": 0,
              "pl": 128000,
              "dl": 0,
              "sp": 7,
              "cp": 1,
              "subp": 1,
              "cs": false,
              "maxbr": 999000,
              "fl": 128000,
              "toast": false,
              "flag": 68,
              "preSell": false
            }
          }
        },
        {
          "playCount": 89,
          "score": 22,
          "song": {
            "name": "消愁",
            "id": 569200213,
            "pst": 0,
            "t": 0,
            "ar": [
              {
                "id": 12138269,
                "name": "毛不易",
                "tns": [],
                "alias": []
              }
            ],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": null,
            "fee": 8,
            "v": 97,
            "crbt": null,
            "cf": "",
            "al": {
              "id": 39483040,
              "name": "平凡的一天",
              "picUrl": "http://p3.music.126.net/vmCcDvD1H04e9gm97xsCqg==/109951163350929740.jpg",
              "tns": [],
              "pic_str": "109951163350929740",
              "pic": 109951163350929740
            },
            "dt": 261346,
            "h": {
              "br": 320000,
              "fid": 0,
              "size": 10456338,
              "vd": -2
            },
            "m": {
              "br": 192000,
              "fid": 0,
              "size": 6273820,
              "vd": 0
            },
            "l": {
              "br": 128000,
              "fid": 0,
              "size": 4182561,
              "vd": -2
            },
            "a": null,
            "cd": "2",
            "no": 4,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 2,
            "s_id": 0,
            "mark": 8192,
            "originCoverType": 1,
            "originSongSimpleData": null,
            "single": 0,
            "noCopyrightRcmd": null,
            "mst": 9,
            "cp": 2708402,
            "mv": 5958062,
            "rtype": 0,
            "rurl": null,
            "publishTime": 1530547200007,
            "privilege": {
              "id": 569200213,
              "fee": 8,
              "payed": 0,
              "st": 0,
              "pl": 128000,
              "dl": 0,
              "sp": 7,
              "cp": 1,
              "subp": 1,
              "cs": false,
              "maxbr": 999000,
              "fl": 128000,
              "toast": false,
              "flag": 68,
              "preSell": false
            }
          }
        },
        {
          "playCount": 85,
          "score": 21,
          "song": {
            "name": "写给黄淮",
            "id": 1334295185,
            "pst": 0,
            "t": 0,
            "ar": [
              {
                "id": 29392693,
                "name": "邵帅",
                "tns": [],
                "alias": []
              }
            ],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": null,
            "fee": 8,
            "v": 25,
            "crbt": null,
            "cf": "",
            "al": {
              "id": 74935701,
              "name": "写给黄淮",
              "picUrl": "http://p4.music.126.net/CG8hLG4To_TZum0rIGk7WA==/109951163764772334.jpg",
              "tns": [],
              "pic_str": "109951163764772334",
              "pic": 109951163764772340
            },
            "dt": 241848,
            "h": {
              "br": 320000,
              "fid": 0,
              "size": 9676844,
              "vd": -2
            },
            "m": {
              "br": 192000,
              "fid": 0,
              "size": 5806124,
              "vd": -1
            },
            "l": {
              "br": 128000,
              "fid": 0,
              "size": 3870764,
              "vd": -1
            },
            "a": null,
            "cd": "01",
            "no": 0,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 0,
            "s_id": 0,
            "mark": 64,
            "originCoverType": 1,
            "originSongSimpleData": null,
            "single": 0,
            "noCopyrightRcmd": null,
            "mst": 9,
            "cp": 1372820,
            "mv": 10846238,
            "rtype": 0,
            "rurl": null,
            "publishTime": 1546444800007,
            "privilege": {
              "id": 1334295185,
              "fee": 8,
              "payed": 0,
              "st": 0,
              "pl": 128000,
              "dl": 0,
              "sp": 7,
              "cp": 1,
              "subp": 1,
              "cs": false,
              "maxbr": 999000,
              "fl": 128000,
              "toast": false,
              "flag": 66,
              "preSell": false
            }
          }
        },
        {
          "playCount": 83,
          "score": 21,
          "song": {
            "name": "远走高飞",
            "id": 474567580,
            "pst": 0,
            "t": 0,
            "ar": [
              {
                "id": 166014,
                "name": "金志文",
                "tns": [],
                "alias": []
              }
            ],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": null,
            "fee": 8,
            "v": 51,
            "crbt": null,
            "cf": "",
            "al": {
              "id": 35450132,
              "name": "Hello 1",
              "picUrl": "http://p3.music.126.net/elfqBKIdad0KYCCeKQpDSA==/18700493767108166.jpg",
              "tns": [],
              "pic_str": "18700493767108166",
              "pic": 18700493767108170
            },
            "dt": 241951,
            "h": {
              "br": 320000,
              "fid": 0,
              "size": 9680685,
              "vd": -49960
            },
            "m": {
              "br": 192000,
              "fid": 0,
              "size": 5808429,
              "vd": -47346
            },
            "l": {
              "br": 128000,
              "fid": 0,
              "size": 3872301,
              "vd": -45631
            },
            "a": null,
            "cd": "1",
            "no": 1,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 2,
            "s_id": 0,
            "mark": 73728,
            "originCoverType": 0,
            "originSongSimpleData": null,
            "single": 0,
            "noCopyrightRcmd": null,
            "mst": 9,
            "cp": 1416528,
            "mv": 5500070,
            "rtype": 0,
            "rurl": null,
            "publishTime": 1492963200007,
            "privilege": {
              "id": 474567580,
              "fee": 8,
              "payed": 0,
              "st": 0,
              "pl": 128000,
              "dl": 0,
              "sp": 7,
              "cp": 1,
              "subp": 1,
              "cs": false,
              "maxbr": 999000,
              "fl": 128000,
              "toast": false,
              "flag": 4,
              "preSell": false
            }
          }
        },
        {
          "playCount": 83,
          "score": 21,
          "song": {
            "name": "画 (Live Piano Session II)",
            "id": 412911436,
            "pst": 0,
            "t": 0,
            "ar": [
              {
                "id": 7763,
                "name": "G.E.M.邓紫棋",
                "tns": [],
                "alias": []
              }
            ],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": null,
            "fee": 8,
            "v": 26,
            "crbt": null,
            "cf": "",
            "al": {
              "id": 34678769,
              "name": "再见",
              "picUrl": "http://p3.music.126.net/fouKnh_hQKyyaCZ2PIQUEA==/1410673427960641.jpg",
              "tns": [],
              "pic": 1410673427960641
            },
            "dt": 168739,
            "h": {
              "br": 320000,
              "fid": 0,
              "size": 6752173,
              "vd": 1042
            },
            "m": {
              "br": 192000,
              "fid": 0,
              "size": 4051321,
              "vd": 3097
            },
            "l": {
              "br": 128000,
              "fid": 0,
              "size": 2700895,
              "vd": 5286
            },
            "a": null,
            "cd": "1",
            "no": 2,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 2,
            "s_id": 0,
            "mark": 8192,
            "originCoverType": 1,
            "originSongSimpleData": null,
            "single": 0,
            "noCopyrightRcmd": null,
            "mst": 9,
            "cp": 1415926,
            "mv": 5323472,
            "rtype": 0,
            "rurl": null,
            "publishTime": 1463932800007,
            "privilege": {
              "id": 412911436,
              "fee": 8,
              "payed": 0,
              "st": 0,
              "pl": 128000,
              "dl": 0,
              "sp": 7,
              "cp": 1,
              "subp": 1,
              "cs": false,
              "maxbr": 999000,
              "fl": 128000,
              "toast": false,
              "flag": 4,
              "preSell": false
            }
          }
        }
      ]
      let index = 0
      let recentPlayList =  list.slice(0,10).map(item => {
        item.id = index ++
        return item
      })
      this.setData({
        recentPlayList
      })
    // }
  },


  /**
   * 控制拖动效果
   * @param event
   */
  handleTouchStart(event) {
    startY = event.touches[0].clientY
  },
  handleTouchMove(event) {
    moveY = event.touches[0].clientY
    moveDistance =  moveY - startY
    if (moveDistance <= 0) return
    if (moveDistance > 80) moveDistance = 80
    this.setData({
      coverTransform:`translateY(${moveDistance}rpx)`,
      coveTransition:``
    })
  },
  handleTouchEnd() {
    if (moveDistance < 0){
      return
    }
    this.setData({
      coverTransform:`translateY(0rpx)`,
      coveTransition:`transform 1s linear`
    })
  },

  /**
   * 跳转到login
   */
  toLogin() {
    wx.navigateTo({
      url:"/pages/login/login"
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