class UserModel extends think.Model {
    get tableName() {
        return 'userinfo';
    }
    async isExistUser(openId) {
        const self = this;
        let count = await self.select({
            table: 'userinfo',
            where: 'OpenId = ' + JSON.stringify(openId)
        });
        return count.length;
    }

    async insertUser(openId) {
        const SQL = 'INSERT INTO userinfo (OpenId) VALUES ("%s")';
        const self = this;
        await self.execute(self.parseSql(SQL, openId));
    }

    async getUserInfo(openId) {
        const self = this;
        let userInfo = await self.select({
            table: 'userInfo',
            where: 'OpenId = ' + JSON.stringify(openId)
        });
        return userInfo;
    }

    async updateUserInfo(openId, userInfo) {
        const self = this;
        let rows = await self.where({OpenId: openId}).update({
            NickName: userInfo.nickName,
            Gender: JSON.stringify(userInfo.gender),
            Avatar: userInfo.avatar
        });
        return;
    }

    async updateCompanyId(openId, companyId) {
        const self = this;
        await self.where({OpenId: openId}).update({
            CompanyId: companyId
        });
        return;
    }
}
module.exports = UserModel;