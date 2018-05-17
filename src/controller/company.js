const Util = require('../util/util');
const CompanyService = require('../service/CompanyService');
const UserService = require('../service/userService');

module.exports = class extends think.Controller {
    async createCompanyAction() {
        const self = this;
        let sessionId = self.post('sessionId');
        let openId = await think.cache(think.config('openIdCachePrefix') + sessionId, undefined, 'redis');
        if(openId) {
            let companyInfo = {};
            companyInfo.companyName = self.post('companyName');
            companyInfo.companyNumber = self.post('companyNumber');
            companyInfo.companyAddressDetail = self.post('companyAddressDetail');
            let companyPosition = self.post('companyPosition');
            companyInfo.province = companyPosition[0];
            companyInfo.city = companyPosition[1];
            companyInfo.district = companyPosition[2] ? companyPosition[2] : '';
            let result = await CompanyService.getInstance().createCompanyService(openId, companyInfo);
            if(result === -2) {
                self.json(Util.resultWrapper(-2, 'company number exist', null));
            }else {
                self.json(Util.resultWrapper(0, 'request ok', result));
            }
        }else {
            self.json(Util.resultWrapper(-1, 'require login', null));
        }
    }

    async getCompanyInfoByNumberAction() {
        const self = this;
        let companyNumber = this.get('companyNumber');
        let companyInfo = await CompanyService.getInstance().getCompanyInfoByNumber(companyNumber);
        self.json(Util.resultWrapper(0, 'request ok', companyInfo));
    }

    async getCompanyInfoByIdAction() {
        const self = this;
        let companyId = self.get('companyId');
        let companyInfo = await CompanyService.getInstance().getCompanyInfoById(companyId);
        self.json(Util.resultWrapper(0, 'request ok', companyInfo));
    }

    async setCompanyLocationAction() {
        const self = this;
        let sessionId = self.get('sessionId');
        let openId = await think.cache(think.config('openIdCachePrefix') + sessionId, undefined, 'redis');
        if(openId) {
            let userInfo = await UserService.getInstance().getUserInfo(openId);
            let companyId = userInfo.CompanyId;
            let latitude = self.get('latitude');
            let longitude = self.get('longitude');
            await CompanyService.getInstance().addCompanyLocation(companyId, latitude, longitude);
            self.json(Util.resultWrapper(0, 'request ok', null));
        }else {
            self.json(Util.resultWrapper(-1, 'require login', null));
        }
    }

    async getCompanyLocationAction() {
        const self = this;
        let companyId = self.get('companyId');
        if(companyId) {
            let result = await CompanyService.getInstance().getCompanyLocation(companyId);
            self.json(Util.resultWrapper(0, 'request ok', result));
        }else {
            self.json(Util.resultWrapper(-1, 'require parameter companyId', null));
        }
    }
}