module.exports = class extends think.Logic {
    // 检查登陆接口参数
    loginAction() {
        const self = this;
        let rules = {
            code: {
                required: true
            }
        }
        let flag = self.validate(rules);
        if(!flag) {
            return self.fail('validate error', self.validateErrors);
        }
    }
}