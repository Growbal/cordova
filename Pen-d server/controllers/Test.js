function test(req, res){
  console.log("fsdfs");
  res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
  res.end('TEST');
}

exports.test = test;
