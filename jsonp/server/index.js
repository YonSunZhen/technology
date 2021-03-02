const http = require('http');
const urllib = require('url');

const server = http.createServer();

server.listen(8080, function() {
  console.log('启动成功');
});

server.on('request', function(req,res) {
  const params = urllib.parse(req.url,true);
  if(params.query.callback){
    console.log('debug1');
    console.log(params.query.callback);
    //jsonp
    const data = {'data':'world'};
    const str = params.query.callback + '(' + JSON.stringify(data) + ')'; // 这是必要的
    res.end(str);
  } else {
    console.log('debug2');
    res.end('haha');
  }
})