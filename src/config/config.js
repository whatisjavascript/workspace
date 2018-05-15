// default config
module.exports = {
  workers: 1,
  jsonContentType: 'application/json',
  errnoField: 'resultCode',
  errmsgField: 'resultMsg',
  defaultErrno: 1000,
  validateDefaultErrno: 1001,
  appId: 'wx866cbe9ada1ab20e',
  appSecret: '5611a19c23a420ad7f597fbc1dc66dfb',
  openIdCachePrefix: 'redisOpenId',
  sessionIdCachePrefix: 'redisSessionId'
};
