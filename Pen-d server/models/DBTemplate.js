let mysql = require('mysql');
const config = {
  "db": {
    "username": "root",
    "password": null,
    "database": "pen_d_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false
  },
  "session": {
    "name": "name",
    "secret": "secret"
  },
  "ssl": {
    "enabled": false,
    "key": "",
    "cert": ""
  }
}


class DBTemp {
	//DBにコネクション
	getConnection () {
		this.con = mysql.createConnection({
			host: config.db.host,
			user: config.db.username,
			password: config.db.password,
			database: config.db.database
		});
		this.con.connect();
	}

	getDisconnection () {
		this.con.end();
	}

  queryAction(values, holder, key, call){
    this.con.query(values, holder, function (error, results, fields) {
      call(results);
    });
  }
}

module.exports = DBTemp;
