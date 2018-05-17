class AttenceService {
    
    static getInstance() {
        return new AttenceService();
    }

    async getAttenceRecordByDate(openId, attenceDate) {
        let attenceModel = think.model('attence');
        let attenceInfo = await attenceModel.getAttenceRecordByDate(openId, attenceDate);
        return attenceInfo;
    }

    async setAttenceStartTime(openId) {
        let attenceModel = think.model('attence');
        return await attenceModel.setAttenceStartTime(openId);
    }

    async setAttenceEndTime(id) {
        let attenceModel = think.model('attence');
        return await attenceModel.updateAttenceEndTime(id);
    }
}

module.exports = AttenceService;