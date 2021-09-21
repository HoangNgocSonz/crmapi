var config = require('../dbconfig');
const sql = require('mssql');
const axios = require('axios');


async function insertSesion(session) {
    let pool = await sql.connect(config);
    if (!session.CustomerId || !session.AgentId) {
        return ({
            ret: 400,
            status: "failure",
            msg: "miss customerId or AgentId"
        })
    }
    //check Agent Exist
    let agentExist = await pool.request()
        .input('AgentId', sql.UniqueIdentifier, session.AgentId)
        .execute('checkAgentExist')
    if (agentExist.recordsets[0].length == 0) {
        return ({
            ret: 400,
            status: "failure",
            msg: "agent does not exist"
        })
    }
    //check session exists
    let SessionExist = await pool.request()
        // .input('AgentId', sql.UniqueIdentifier, session.AgentId)
        .input('CustomerId', sql.NVarChar, session.CustomerId)
        .execute('checkExistingSession')

    //if session not exists then create session
    if (SessionExist.recordsets[0].length == 0) {
        try {
            //update status agent from free to busy
            axios.get(`http://10.1.5.68:8091/api/UpdateAgentStatusById/${session.AgentId}`)
            .then(function (response) {
              // handle success
              //console.log("mmm: "+response);
            })
            .catch(function (error) {
              // handle error
              console.log("errrr:" + error);
            })
            .then(function () {
              // always executed
            });
            //create new session
            let sesionConnect = await pool.request()
                .input('AgentId', sql.UniqueIdentifier, session.AgentId)
                .input('CustomerId', sql.NVarChar, session.CustomerId)
                .execute('createSession')
            return (sesionConnect.recordsets);
        }
        catch (error) {
            console.log("mm" + error);
        }
    }
    else {
        // return("Session already exists")
        return ({
            ret: 400,
            status: "failure",
            msg: "Session already exists"
        })
    }
}

async function checkExistingSession(data) {
    try {
        let pool = await sql.connect(config);
        let insertProducts = await pool.request()
            .input('CustomerId', sql.NVarChar, data.CustomerId)
            .execute('checkExistingSession')
       
        return insertProducts.recordsets;
    }
    catch (error) {
        console.log("mm" + error);
        return error
    }
}


module.exports = {
    insertSesion: insertSesion,
    checkExistingSession:checkExistingSession
}