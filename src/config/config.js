// default config
module.exports = {
  workers: 1,
  jsonContentType: 'application/json',
  errnoField: 'resultCode',
  errmsgField: 'resultMsg',
  defaultErrno: 1000,
  validateDefaultErrno: 1001,
  appId: 'wx866cbe9ada1ab20e',
  appSecret: '5d9500cd14b52591a32825b4290bf70f',
  openIdCachePrefix: 'redisOpenId',
  sessionIdCachePrefix: 'redisSessionId'
};
