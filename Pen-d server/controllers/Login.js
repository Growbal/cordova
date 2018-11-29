let DBTempate = require('./../models/DBTemplate');

function process(req, res, data){
  console.log(data);
  let DBTemp = new DBTempate;
  DBTemp.getConnection();
  let holder = data.split("&");
  let username = holder[0].split("=");
  let password = holder[1].split("=");
  console.log(username[1]);
  let value = 'select * from user_data where name like $1 and password = $2';
  // let holder = data.split("=");
  // let target = decodeURI(holder[1]);
  DBTemp.queryAction(value, ["%" + decodeURI(username[1]) + "%", password[1]], 'name', (result) => {
    if(result){
      res.write(JSON.stringify(result.rows));
      res.end();
      let value = 'insert into login_data(login_date, login_id) values(now(), (select user_id from user_data where name = $1))';
      DBTemp.queryAction(value, [username[1]], 'name', (result) => {});
    }else{
      res.write(null);
      res.end();
    }
  });
}

exports.process = process;
