let DBTempate = require('./../models/DBTemplate');

function process(req, res, data){
  let DBTemp = new DBTempate;
  DBTemp.getConnection();
  let value = 'SELECT name FROM user_data WHERE name like $1';
  let holder = data.split("=");
  let target = decodeURI(holder[1]);
  DBTemp.queryAction(value, ["%"+ decodeURI(target) +"%"], 'name', (result) => {
    console.log(result);

    res.write(JSON.stringify(result.rows));
    res.end();
    return;
  });
}

exports.process = process;
