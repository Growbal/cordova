let DBTempate = require('./../models/DBTemplate');

let DBTemp = new DBTempate;
DBTemp.getConnection();

function process(req, res, data){
  let value = 'SELECT balance FROM balance WHERE user_id = (select user_id from user where name = ?)';
  let holder = data.split("=");
  DBTemp.queryAction(value, [holder[1]], 'balance', (result) => {
    console.log(result);
    res.write(JSON.stringify(result));
    res.end();
  });
}

exports.process = process;
