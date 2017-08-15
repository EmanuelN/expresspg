const settings = require('./settings')

function createStr(obj, index){
  outputStr = `- ${index+1}: ${obj.first_name} ${obj.last_name}, born '${obj.birthdate.getFullYear()}-${obj.birthdate.getMonth()+1}-${obj.birthdate.getDate()}'`
  return outputStr;
};

console.log('Adding...');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

knex('famous_people').insert({
  first_name: process.argv[2],
  last_name: process.argv[3],
  birthdate: process.argv[4]
})
.then(function(results) {
  console.log(results);
})
.catch(function(error) {
  console.log(error);
})

knex.destroy()
