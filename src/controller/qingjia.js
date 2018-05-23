const Util = require('../util/util');
const Api = require('../api/api');
class Qingjia extends think.Controller {
    async qingjiaAction() {
        const self = this;
        let sessionId = self.get('sessionId');
        const openId = await think.cache(think.config('openIdCachePrefix') + sessionId, undefined, 'redis');
        if(openId) {
            let type = self.get('type');
            let startTime = self.get('startTime');
            let endTime = self.get('endTime');
            let reason = self.get('reason');
            await think.model('qingjia').insertQingjia(openId, type, startTime, endTime, reason);
            self.json(Util.resultWrapper(0, 'request ok', null));
        }else {
            self.json(Util.resultWrapper(-1, 'require login', null));
        }
    }
}
module.exports = Qingjia;