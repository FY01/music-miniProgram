import config from "./config";
export default (url,data={},method='GET') => {
    return new Promise((resolve,reject) => {
        wx.request({
            url:config.mobileHost + url,
            // url:config.baseUrl + url,
            data,
            method,
            success:(res) => {
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}