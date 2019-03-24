var http = require('http')
var fs = require('fs')
http.createServer(function(req,res){          //调用函数，返回sever对象
  switch (req.url){
    case '/getWeather':                      //如果用户发送的是getWeather
      res.end(JSON.stringify({a:1,b:2}))      //res.end(内容)就是res.write(内容)加上res.end()
      break;
    case '/user/123':                         //如果用户发送的是user/123
      res.end( fs.readFileSync(__dirname + '/sample/user'))     //那么就去读这个文件，当前目录下+/static/text
      break;
    default:                                 //如果用户希望得到一个静态文件，则执行下面这个
      res.end( fs.readFileSync(__dirname + '/sample' + req.url))
  }
}).listen(8080)
