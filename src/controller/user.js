const UserService = require('../service/userService');
class User extends think.Controller {
    // 处理用户登陆请求
    async loginAction() {
        const self = this;
        let _3rdSessionId = await UserService.getInstance().proccessLogin(self.get('code'));
        if(_3rdSessionId) {
            self.success(_3rdSessionId);
        }
    }
}
module.exports = User;