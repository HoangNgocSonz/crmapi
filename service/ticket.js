var config = require('../dbconfig');
const sql = require('mssql');


async function SearchTicketByCusId(data) {
    try {
        let pool = await sql.connect(config);
        let ticket = await pool.request()
        .input('CustomerId', sql.UniqueIdentifier, data.CustomerId)
        .execute('searchTicketByCusId')
    console.log("length" + ticket.recordsets[0].length)
    //if customerId does not exist 
    if (ticket.recordsets[0].length == '0') {
        return ({
            ret: 400,
            status: "failure",
            msg: "CustomerId does not exist"
        })
    }
    else
    // console.log(ticket.recordsets)
    return ticket.recordsets;
    }
    catch (error) {
        console.log("mm" + error);
    }
}


module.exports = {
    SearchTicketByCusId:SearchTicketByCusId
}