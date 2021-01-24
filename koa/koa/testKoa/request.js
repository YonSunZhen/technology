let url = require('url');

module.exports = {
  // 读取http请求的query参数
  get query() {
    return url.parse(this.req.url, true).query;
  }
};