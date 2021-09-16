var config = require('../dbconfig');
const sql = require('mssql');


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
        .input('AgentId', sql.UniqueIdentifier, session.AgentId)
        .input('CustomerId', sql.UniqueIdentifier, session.CustomerId)
        .execute('checkAgentAndCustomerIdBusy')

    //if session not exists then create session
    if (SessionExist.recordsets[0].length == 0) {
        try {
            let sesionConnect = await pool.request()
                .input('AgentId', sql.UniqueIdentifier, session.AgentId)
                .input('CustomerId', sql.UniqueIdentifier, session.CustomerId)
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


module.exports = {
    insertSesion: insertSesion
}