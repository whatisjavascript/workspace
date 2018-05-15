const Util = require('../util/util');
const UserService = require('../service/userService');
class User extends think.Controller {
    // 处理用户登陆请求
    async loginAction() {
        const self = this;
        let _3rdSessionId = await UserService.getInstance().proccessLogin(self.get('code'));
        if(_3rdSessionId) {
            self.json(Util.resultWrapper(0, 'get sessionId ok', _3rdSessionId));
        }else {
            self.json(Util.resultWrapper(-1, 'get sessionId error', null));
        }
    }

    // 获取用户个人信息
    async getUserInfoAction() {
        const self = this;
        let sessionId = self.get('sessionId');
        const openId = await think.cache(think.config('openIdCachePrefix') + sessionId, undefined, 'redis');
        if(openId) {
            let userInfo = await UserService.getInstance().getUserInfo(openId);
            self.json(Util.resultWrapper(0, 'request ok', userInfo));
        }else {
            self.json(Util.resultWrapper(-1, 'require login', null));
        }
    }

    // 提交用户信息
    async submitUserInfoAction() {
        const self = this;
        let sessionId = self.post('sessionId');
        const openId = await think.cache(think.config('openIdCachePrefix') + sessionId, undefined, 'redis');
        if(openId) {
            let userBaseInfo = {};
            userBaseInfo.nickName = self.post('nickName');
            userBaseInfo.gender = self.post('gender');
            userBaseInfo.avatar = self.post('avatar');
            await UserService.getInstance().submitUserInfo(openId,userBaseInfo);
            self.json(Util.resultWrapper(0, 'request ok', null));
        }else {
            self.json(Util.resultWrapper(-1, 'require login', null));
        }
    }

    // 加入企业
    async joinCompanyAction() {
        const self = this;
        let sessionId = self.get('sessionId');
        const openId = await think.cache(think.config('openIdCachePrefix') + sessionId, undefined, 'redis');
        if(openId) {
            let companyNumber = self.get('companyNumber');
            let result = await UserService.getInstance().joinCompany(openId, companyNumber);
            if(result === 0) {
                self.json(Util.resultWrapper(result, 'request ok', null));
            }else if(result === -5) {
                self.json(Util.resultWrapper(result, 'unkonwn companyNumber', null));
            }
        }else {
            self.json(Util.resultWrapper(-1, 'require login', null));
        }
    }
}
module.exports = User;