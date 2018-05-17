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

    async getCompanyInfoById(companyId) {
        let result =  await this.select({
            table: 'company',
            where: 'Id = ' + JSON.stringify(companyId)
        });
        return result.pop();
    }

    async addCompanyLocation(companyId, latitude, longitude) {
        let latitudeToInt = latitude * 100000;
        let longitudeToInt = longitude * 100000;
        const SQL = "INSERT INTO `company_location` VALUES("+ companyId +","+ parseFloat(latitudeToInt) +","+ parseFloat(longitudeToInt) +")";
        await this.execute(SQL);
        return;
    }

    async selectCompanyLocation(companyId) {
        let result = await this.where({CompanyId: companyId}).select({
            table: 'company_location',
        });
        return result.pop();
    }
}