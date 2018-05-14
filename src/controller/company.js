const Util = require('../util/util');
const CompanySerivce = require('../service/CompanyService');
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
            companyInfo.district = companyPosition[2] ? companyPosition[1] : '';
            let result = await CompanySerivce.getInstance().createCompanyService(openId, companyInfo);
            if(result === -2) {
                self.json(Util.resultWrapper(-2, 'company number exist', null));
            }else {
                self.json(Util.resultWrapper(0, 'request ok', result));
            }
        }else {
            self.json(Util.resultWrapper(-1, 'require login', null));
        }
        
    }
}