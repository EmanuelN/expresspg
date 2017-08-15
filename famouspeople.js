const pg = require('pg');
const settings = require('./settings')

const client = new pg.Client({
  user      : settings.user,
  password  : settings.password,
  database  : settings.database,
  host      : settings.hostname,
  port      : settings.port,
  ssl       : settings.ssl
});

function createStr(obj){
  outputStr = `- ${obj.count}: ${obj.first_name} ${obj.last_name}, born '${obj.birthdate.getFullYear()}-${obj.birthdate.getMonth()+1}-${obj.birthdate.getDate()}'`
  return outputStr;
};

client.connect((err) => {
  if (err){
    return console.error('Connection error', err);
  }
  console.log('Searching...')
  client.query(`SELECT *, COUNT(*) FROM famous_people
    WHERE first_name = $1 OR last_name = $1
    GROUP BY famous_people.id`,
    [process.argv[2]], (err, result) =>{
    if (err){
      return console.error('error running query', err);
    }

    console.log(`Found ${result.rows[result.rows.length - 1].count} person(s) by the name of ${process.argv[2]}:`);
    for (let i in result.rows) {
      console.log(createStr(result.rows[i]));
    } client.end();
  });
});