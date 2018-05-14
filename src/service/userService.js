const Api = require('../api/api');
const Util = require('../util/util');
class UserService {
    static getInstance() {
        return new UserService();
    }
    // 处理登陆逻辑
    async proccessLogin(code) {
        let appId = think.config('appId');
        let appSecret = think.config('appSecret');
        let loginResult = await Api.wxLogin(appId, appSecret, code);
        if(loginResult) {
            let userModel = think.model('user');
            let count = await userModel.isExistUser(loginResult.openid);
            if(count <= 0) {
                userModel.insertUser(loginResult.openid);
            }
            let _3rdSessionId = Util.create3rdSessionId();
            let openIdRedisKey = think.config('openIdCachePrefix') + _3rdSessionId;
            let sessionIdRedisKey = think.config('sessionIdCachePrefix') + _3rdSessionId;
            think.cache(openIdRedisKey, loginResult.openid, {
                type: 'redis',
                redis: {
                    timeout: 2 * 60 * 60 * 1000
                }
            });
            think.cache(sessionIdRedisKey, loginResult.session_key, {
                type: 'redis',
                redis: {
                    timeout: 2 * 60 * 60 * 1000
                }
            });
            return _3rdSessionId;
        }
        return false;
    }

    // 获取用户个人信息
    async getUserInfo(openId) {
        let userModel = think.model('user');
        let userInfos = await userModel.getUserInfo(openId);
        if(userInfos.length) {
            let userInfo = userInfos[0];
            delete userInfo['OpenId'];
            return userInfo;
        }
        return null;
    }

    // 提交用户信息
    async submitUserInfo(openId, userBaseInfo) {
        let userModel = think.model('user');
        await userModel.updateUserInfo(openId, userBaseInfo);
        return;
    }
}
module.exports = UserService;