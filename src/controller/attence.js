const Util = require('../util/util');
const AttenceService = require('../service/AttenceService');
module.exports = class extends think.Controller {

    async getAttenceRecordAction() {
        const self = this;
        let sessionId = self.get('sessionId');
        let openId = await think.cache(think.config('openIdCachePrefix') + sessionId, undefined, 'redis');
        if(openId) {
            let date = self.get('attenceDate');
            let result = await AttenceService.getInstance().getAttenceRecordByDate(openId, date);
            self.json(Util.resultWrapper(0, 'reqest ok', result));
        }else {
            self.json(Util.resultWrapper(-1, 'required login', null));
        }
    }

    async setAttenceStartTimeAction() {
        const self = this;
        let sessionId = self.get('sessionId');
        let openId = await think.cache(think.config('openIdCachePrefix') + sessionId, undefined, 'redis');
        if(openId) {
            let location = self.get('location');
            let status = self.get('status');
            let result = await AttenceService.getInstance().setAttenceStartTime(openId, location, status);
            self.json(Util.resultWrapper(0, 'request ok', result));
        }else {
            self.json(Util.resultWrapper(-1, 'required login', null));
        }
    }

    async setAttenceEndTimeAction() {
        const self = this;
        let id = self.get('id');
        if(id) {
            let location = self.get('location');
            let status = self.get('status');
            let result = await AttenceService.getInstance().setAttenceEndTime(id, location, status);
            self.json(Util.resultWrapper(0, 'request ok', result));
        }else {
            self.json(Util.resultWrapper(-1, 'required attence id', null));
        }
    }
}