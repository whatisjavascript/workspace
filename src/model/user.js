class UserModel extends think.Model {
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
        console.log(self.parseSql(SQL, openId));
        await self.execute(self.parseSql(SQL, openId));
    }
}
module.exports = UserModel;