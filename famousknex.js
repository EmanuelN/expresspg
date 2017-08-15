const settings = require('./settings')

function createStr(obj, index){
  outputStr = `- ${index+1}: ${obj.first_name} ${obj.last_name}, born '${obj.birthdate.getFullYear()}-${obj.birthdate.getMonth()+1}-${obj.birthdate.getDate()}'`
  return outputStr;
};

console.log('Searching...');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

knex.select('*').from('famous_people').where({first_name: process.argv[2]})
  .orWhere({last_name: process.argv[2]})
  .asCallback((err, rows) => {
    console.log(`Found ${rows.length} person(s) by the name of ${process.argv[2]}:`)
    for (let i in rows){
      console.log(createStr(rows[i], i));
    }
    return knex.destroy();
});