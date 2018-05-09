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
            let openIdRedisKey = await think.config('openIdCachePrefix') + _3rdSessionId;
            let sessionIdRedisKey = await think.config('sessionIdCachePrefix') + _3rdSessionId;
            think.cache(openIdRedisKey, loginResult.openid, 'redis');
            think.cache(sessionIdRedisKey, loginResult.session_key, 'redis');
            return _3rdSessionId;
        }
        return false;
    }
}
module.exports = UserService;