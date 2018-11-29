let DBTempate = require('./../models/DBTemplate');

function process(req, res, data){
  let DBTemp = new DBTempate;
  DBTemp.getConnection();
  let value = 'SELECT balance FROM balance WHERE user_id = (select user_id from user_data where name = $1)';
  let holder = data.split("=");
  DBTemp.queryAction(value, [decodeURI(holder[1])], 'balance', (result) => {
    res.write(JSON.stringify(result.rows));
    res.end();
    return;
  });
}

exports.process = process;
