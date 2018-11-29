const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://svmhlnzrgswizv:14d5e13982584e462bab99f9d732dfe26c9fe2548bfc0f9c40da69806ac3ec88@ec2-54-83-8-246.compute-1.amazonaws.com:5432/d9rskraf37qf6i",
  ssl: true,
});

class DBTemp {
	//DBにコネクション
	getConnection () {
    client.connect();
	}

	getDisconnection () {
		client.end();
	}

  queryAction(values, holder, key, call){
    client.query(values, holder, (err, res) => {
      console.log(err);
      call(res);
    });
  }
}

module.exports = DBTemp;
