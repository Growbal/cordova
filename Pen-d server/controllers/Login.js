let DBTempate = require('./../models/DBTemplate');

let DBTemp = new DBTempate;
DBTemp.getConnection();

function process(req, res, data){
  console.log(data);
  let holder = data.split("&");
  let username = holder[0].split("=");
  let password = holder[1].split("=");
  let value = 'select * from user where name = ? and password = ?';
  // let holder = data.split("=");
  // let target = decodeURI(holder[1]);
  DBTemp.queryAction(value, [username[1], password[1]], 'name', (result) => {
    console.log(result);
    res.write(JSON.stringify(result));
    res.end();
  });
}

exports.process = process;
