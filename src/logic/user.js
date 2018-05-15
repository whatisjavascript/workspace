const Util = require('../util/util');
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
            return self.json(Util.resultWrapper(-1, 'need parameter "code"', null));
        }
    }

    // 获取用户信息，检查是否有sessionId参数
    getUserInfoAction() {
        const self = this;
        let rules = {
            sessionId: {
                required: true
            }
        }
        let flag = self.validate(rules);
        if(!flag) {
            return self.json(Util.resultWrapper(-1, 'need paraeter "sessionId"', null));
        }
    }

    // 提交用户信息
    submitUserInfoAction() {
        const self = this;
        let rules = {
            sessionId: {
                required: true
            },
            nickName: {
                string: true,
                required: true
            },
            gender: {
                int: true,
                required: true
            },
            avatar: {
                string: true,
                required: true
            }
        };
        let flag = self.validate(rules);
        if(!flag) {
            return self.json(Util.resultWrapper(-1, 'parameters error', null));
        }
    }

    joinCompanyAction() {
        let rules = {
            sessionId: {
                string: true,
                required: true
            },
            companyNumber: {
                string: true,
                required: true,
                trim: true
            }
        };
        let flag = self.validate(rules);
        if(!flag) {
            return self.json(Util.resultWrapper(-1, 'parameters error', null));
        }
    }
}