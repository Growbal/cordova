let DBTempate = require('./../models/DBTemplate');

let DBTemp = new DBTempate;
DBTemp.getConnection();

function process(req, res, data){
  let value = 'SELECT balance FROM balance WHERE user_id = ?';
  let holder = data.split("=");
  DBTemp.queryAction(value, [holder[1]], 'balance', (result) => {
    console.log(result);
    res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
    res.write(result.toString());
    res.end();
  });
}

exports.process = process;
