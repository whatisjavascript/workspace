module.exports = class extends think.Model {

    async addCompany(openId, companyInfo) {
        let companyId = await this.add({
            table: 'company',
            Number: companyInfo.companyNumber,
            Name: companyInfo.companyName,
            Province: companyInfo.province,
            City: companyInfo.city,
            District: companyInfo.district,
            AddressDetail: companyInfo.companyAddressDetail,
            OwnerOpenId: openId,
            RegistryTime: ['exp', 'NOW()']
        });
        return companyId;
    }

    async isExistCompany(companyNumber) {
        let result = await this.select({
            table: 'company',
            where: 'Number = ' + JSON.stringify(companyNumber)
        });
        return result.length > 0;
    }

    async selectCompanyInfo(companyNumber) {
        let result = await this.select({
            table: 'company',
            where: 'Number = ' + JSON.stringify(companyNumber)
        });
        return result.length > 0 ? result.pop() : null;
    }
}