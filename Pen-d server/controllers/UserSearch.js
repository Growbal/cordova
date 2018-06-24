let DBTempate = require('./../models/DBTemplate');

let DBTemp = new DBTempate;
DBTemp.getConnection();

function process(req, res, data){
  let value = 'SELECT name FROM user WHERE name like ?';
  let holder = data.split("=");
  let target = decodeURI(holder[1]);
  DBTemp.queryAction(value, ["%"+target+"%"], 'name', (result) => {
    res.write(JSON.stringify(result));
    res.end();
  });
}

exports.process = process;
