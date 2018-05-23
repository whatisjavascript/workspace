module.exports = class extends think.Model {
    get tableName() {
        return 'qingjia';
    }

    async insertQingjia(openId, type, startTime, endTime, reason) {
        await this.add({
            OpenId: openId,
            Type: type,
            StartTime: startTime,
            EndTime: endTime,
            Reason: reason
        });
        return;
    }
}