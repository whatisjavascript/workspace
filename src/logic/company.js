const Util = require('../util/util');
module.exports = class extends think.Logic {
    createCompanyAction() {
        const self = this;
        let rules = {
            sessionId: {
                string: true,
                required: true
            },
            companyName: {
                string: true,
                required: true,
                trim: true,
                length: {min: 1, max: 20}
            },
            companyNumber: {
                string: true,
                required: true,
                trim: true,
                length: {min: 1, max: 18}
            },
            companyPosition: {
                array: true,
                required: true
            },
            companyAddressDetail: {
                string: true,
                required: true,
                trim: true,
                length: {min: 1, max: 20}
            }
        }
        let flag = self.validate(rules);
        if(!flag) {
            self.json(Util.resultWrapper(-1, 'parameters error', null));
            return false;
        }
    }

    getCompanyInfoByNumberAction() {
        const self = this;
        let rules = {
            companyNumber: {
                string: true,
                required: true,
                trim: true
            }
        };
        let flag = self.validate(rules);
        if(!flag) {
            self.json(Util.resultWrapper(-1, 'parameters error', null));
            return false;
        }
    }
}