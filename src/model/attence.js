module.exports = class extends think.Model {

    async getAttenceRecordByDate(openId, attenceDate) {
        let rangeStart = attenceDate + ' 00:00:00';
        let rangeEnd = attenceDate + ' 23:59:59';
        let result = await this.where({StartTime: ['BETWEEN', rangeStart, rangeEnd]}).select({table: 'attence'});
        return result.pop();
    }

    async getAttenceRecordById(id) {
        return (await this.where({Id: id}).select({table: 'attence'})).pop();
    }

    async setAttenceStartTime(openId) {
        let result = await this.add({
            table: 'attence',
            OpenId: openId,
            StartTime: ['exp', 'NOW()']
        });
        let afterResult = await this.getAttenceRecordById(result);
        return afterResult;
    }

    async updateAttenceEndTime(id) {
        await this.thenUpdate({EndTime: ['exp', 'NOW()']}, {Id: id});
        return await this.getAttenceRecordById(id);
    }
}