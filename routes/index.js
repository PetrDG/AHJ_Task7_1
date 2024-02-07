const combineRouters = require('koa-combine-routers');
const sse = require('./sse');

const nickname = require('./nickname');

const router = combineRouters(
    nickname,
    sse
  );
  
  module.exports = router;
  