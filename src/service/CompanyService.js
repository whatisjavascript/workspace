class CompanyService {
    static getInstance() {
        return new CompanyService();
    }

    async createCompanyService(openId, companyBaseInfo) {
        let companyModel = think.model('company');
        let isExistCompany = await companyModel.isExistCompany(companyBaseInfo.companyNumber);
        if(!isExistCompany) {
            let companyId = await companyModel.addCompany(openId, companyBaseInfo);
            let userModel = think.model('user');
            await userModel.updateCompanyId(openId, companyId);
            return companyId;
        }else{
            return -2;
        }
    }

    async getCompanyInfoByNumber(companyNumber) {
        let companyModel = think.model('company');
        let companyInfo = await companyModel.selectCompanyInfo(companyNumber);
        return companyInfo;
    }
}

module.exports = CompanyService;