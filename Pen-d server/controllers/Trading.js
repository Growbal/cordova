let DBTempate = require('./../models/DBTemplate');

let DBTemp = new DBTempate;
DBTemp.getConnection();

function process(req, res, data){
  console.log(data);
  let holder = data.split("&");
  let saname = holder[0].split("=");
  let rename = holder[1].split("=");
  let val = holder[2].split("=");

  let value = 'insert into trading(pay_id, receive_id, money, trading_date) values((select user_id from user where name = ?), (select user_id from user where name = ?), ?, now())';
  DBTemp.queryAction(value, [decodeURI(saname[1]), decodeURI(rename[1]), decodeURI(val[1])], 'trading', () => {
    let value = 'update balance set balance = balance + ? where user_id = (select user_id from user where name = ?);';
    DBTemp.queryAction(value, [decodeURI(val[1]), decodeURI(rename[1])], 'trading', () => {
      let value = 'update balance set balance = balance - ? where user_id = (select user_id from user where name = ?);';
      DBTemp.queryAction(value, [decodeURI(val[1]), decodeURI(saname[1])], 'trading', () => {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
        res.write("ok");
        res.end();
      });
    });
  });
}

exports.process = process;
