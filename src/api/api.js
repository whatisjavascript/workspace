const https = require('https');
const {URL} = require('url');
module.exports = {
    // 微信登陆
    async wxLogin(appId, appSecret, code) {
        let baseUrl = 'https://api.weixin.qq.com/sns/jscode2session';
        let url = baseUrl + '?appid=' + appId + '&secret=' + appSecret + '&js_code=' + code + '&grant_type=authorization_code';
        let result = await this.sendHttpsGetRequest(url);
        return result;
    },

    async sendHttpsGetRequest(url) {
        return await new Promise((resolve, reject) => {
            https.get(url, (res) => {
                let result = '';
                res.on('data', (data) => {
                    result += data;
                });
                res.on('end', () => {
                    let jsonResult = JSON.parse(result);
                    if(jsonResult.errcode) {
                        resolve(false);
                    }else {
                        resolve(jsonResult); 
                    }
                });
            }).on('error', (e) => {
                reject('false');
            });
        });
    }
}