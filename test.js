
const config = require('./auth/config');
const bcrypt = require('bcrypt');
async function getbc(){
    var a = await bcrypt.hash("pass", config.saltRound)
    console.log(a)
}
getbc();

