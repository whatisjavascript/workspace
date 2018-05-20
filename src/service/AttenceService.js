class AttenceService {
    
    static getInstance() {
        return new AttenceService();
    }

    async getAttenceRecordByDate(openId, attenceDate) {
        let attenceModel = think.model('attence');
        let attenceInfo = await attenceModel.getAttenceRecordByDate(openId, attenceDate);
        return attenceInfo;
    }

    async setAttenceStartTime(openId, location, status) {
        let attenceModel = think.model('attence');
        return await attenceModel.setAttenceStartTime(openId, location, status);
    }

    async setAttenceEndTime(id, location, status) {
        let attenceModel = think.model('attence');
        return await attenceModel.updateAttenceEndTime(id, location, status);
    }
}

module.exports = AttenceService;