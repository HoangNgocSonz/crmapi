var config = require('../dbconfig');
const sql = require('mssql');


async function SearchTicketByCusId(data) {
    try {
        let pool = await sql.connect(config);
        let ticket = await pool.request()
        .input('CustomerId', sql.UniqueIdentifier, data.CustomerId)
        .execute('searchTicketByCusId')
    return ticket.recordsets;
    }
    catch (error) {
        console.log("mm" + error);
    }
}


module.exports = {
    SearchTicketByCusId:SearchTicketByCusId
}