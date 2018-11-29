let DBTempate = require('./../models/DBTemplate');

function process(req, res, data){
  let DBTemp = new DBTempate;
  DBTemp.getConnection();
  console.log(data);
  let holder = data.split("&");
  let saname = holder[0].split("=");
  let rename = holder[1].split("=");
  let val = holder[2].split("=");
  let reason = holder[3].split("=");

  let value = 'insert into trading(pay_id, receive_id, money, trading_date, reason) values((select user_id from user_data where name = $1), (select user_id from user_data where name = $2), $3, now(), $4)';
  DBTemp.queryAction(value, [decodeURI(saname[1]), decodeURI(rename[1]), decodeURI(val[1]), decodeURI(reason[1])], 'trading', () => {
    let value = 'update balance set balance = balance + $1 where user_id = (select user_id from user_data where name = $2);';
    DBTemp.queryAction(value, [decodeURI(val[1]), decodeURI(rename[1])], 'trading', () => {
      let value = 'update balance set balance = balance - $1 where user_id = (select user_id from user_data where name = $2);';
      DBTemp.queryAction(value, [decodeURI(val[1]), decodeURI(saname[1])], 'trading', () => {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
        res.write("ok");
        res.end();
        return;
      });
    });
  });
}

function check(req, res, data){
  let DBTemp = new DBTempate;
  DBTemp.getConnection();
  console.log(data);
  let holder = data.split("&");
  let name = holder[0].split("=");
  let total = {};

  let value = `select * from trading where pay_id = (select user_id from user_data where name = $1) or receive_id = (select user_id from user_data where name = $2)`;
  DBTemp.queryAction(value, [decodeURI(name[1]), decodeURI(name[1])], 'trading', (result) => {
    console.log("fsd");

    if(result){
      total.trade = result.rows;
    }else{
      total.trade = [];
    }
    value = 'select user_id, name from user_data order by user_id;';
    DBTemp.queryAction(value, [], 'trading', (result) => {
      if(result){
        total.namelist = result.rows;
      }else{
        total.namelist = [];
      }
      // DBTemp.getDisconnection();
      res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
      res.write(JSON.stringify(total));
      res.end();
    });
  });
}

exports.process = process;
exports.check = check;
