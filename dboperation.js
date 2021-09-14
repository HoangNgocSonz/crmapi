var config = require('./dbconfig');
const sql = require ('mssql');

async function getOrders(){
    try{
        let pool = await sql.connect(config);
        let products = await pool.request().query("select * from AppCustomersVIP");
        console.log(products)
        return products.recordsets;
    }
    catch (error){
        console.log("mm"+ error);
    }
}

async function simpleInsert(person){
    try{
        let pool = await sql.connect(config);
        let insertProducts = await pool.request()
        .input('PersonId',sql.Int,person.PersonId)
        .input('LastName',sql.NVarChar,person.LastName)
        .input('FirstName',sql.NVarChar,person.FirstName)
        .input('Address',sql.NVarChar,person.Address)
        .input('City',sql.NVarChar,person.City)
        .execute('sp_InsertSudox')
        return insertProducts.recordsets;
    }
    catch (error){
        console.log("mm"+ error);
    }
}
async function simpleReturnCusorUseID(sudoXid){
    try{
        let pool = await sql.connect(config);
        let sudox = await pool.request()
        .input('PersonID',sql.Int, sudoXid)
        .execute('testApi1')
        return sudox.recordsets;
    }
    catch (error){
        console.log("mm"+ error);
    }
}

async function getCustomers(){
    try{
        let pool = await sql.connect(config);
        let products = await pool.request().query("select * from AppCustomers");
        return products.recordsets;
    }
    catch (error){
        console.log("mm"+ error);
    }
}

async function getCustomer(customerID){
    try{
        let pool = await sql.connect(config);
        let customer = await pool.request()
        .input('idToFind',sql.UniqueIdentifier, customerID)
        .execute('getCustomer1')
        return customer.recordsets;
    }
    catch (error){
        console.log("mm"+ error);
    }
}

async function insertCustomer(customer){
    try{
        let pool = await sql.connect(config);
        let insertProducts = await pool.request()
        // .input('id',sql.UniqueIdentifier,customer.id)
        .input('SymRunDate',sql.DateTime2,customer.SymRunDate)
        .input('ClientNo',sql.NVarChar,customer.ClientNo)
        .input('ClientName',sql.NVarChar,customer.ClientName)
        .input('Nationnality',sql.NVarChar,customer.Nationnality)
        .input('Sex',sql.NVarChar,customer.Sex)
        .input('Salutation',sql.NVarChar,customer.Salutation)
        .input('MaritalStatus',sql.NVarChar,customer.MaritalStatus)
        .input('Address',sql.NVarChar,customer.Address)
        .input('ResidentialAddress',sql.NVarChar,customer.ResidentialAddress)//10
        .input('NationalId',sql.NVarChar,customer.NationalId)
        .input('PassportNumber',sql.NVarChar,customer.PassportNumber)
        .input('CardSsnumber',sql.NVarChar,customer.CardSsnumber)
        .input('Vip',sql.NVarChar,customer.Vip)
        .input('EmailCore',sql.NVarChar,customer.EmailCore)
        .input('MphoneCore',sql.NVarChar,customer.MphoneCore)
        .input('HphoneCore',sql.NVarChar,customer.HphoneCore)
        .input('OphoneCore',sql.NVarChar,customer.OphoneCore)
        .input('EmailIb',sql.NVarChar,customer.EmailIb)
        .input('MphoneIb',sql.NVarChar,customer.MphoneIb)//20
        .input('HphoneIb',sql.NVarChar,customer.HphoneIb)
        .input('OphoneIb',sql.NVarChar,customer.OphoneIb)
        .input('EmailCard',sql.NVarChar,customer.EmailCard)
        .input('MphoneCard',sql.NVarChar,customer.MphoneCard)
        .input('HphoneCard',sql.NVarChar,customer.HphoneCard)
        .input('OphoneCard',sql.NVarChar,customer.OphoneCard)
        .input('RegionNo',sql.NVarChar,customer.RegionNo)
        .input('RegionName',sql.NVarChar,customer.RegionName)
        .input('BranchNo',sql.NVarChar,customer.BranchNo)
        .input('BranchName',sql.NVarChar,customer.BranchName) //30
        .input('AcctExec',sql.NVarChar,customer.AcctExec)
        .input('AcctExecName',sql.NVarChar,customer.AcctExecName)
        .input('ClientType',sql.NVarChar,customer.ClientType)
        .input('CmndThephu',sql.NVarChar,customer.CmndThephu)
        .input('ClientStatus',sql.NVarChar,customer.ClientStatus)
        .input('VibStatus',sql.NVarChar,customer.VibStatus)
        .input('Type',sql.NVarChar,customer.Type)
        .input('BirthDate',sql.DateTime2,customer.BirthDate)
        .input('Note',sql.NVarChar,customer.Note)
        .input('ExtraProperties',sql.NVarChar,customer.ExtraProperties) //40
        .input('ConcurrencyStamp',sql.NVarChar,customer.ConcurrencyStamp)
        // .input('CreationTime',sql.DateTime2,customer.CreationTime)
        .input('CreatorId',sql.UniqueIdentifier,customer.CreatorId)
        .input('LastModificationTime',sql.DateTime2,customer.LastModificationTime)
        .input('LastModifierId',sql.UniqueIdentifier,customer.LastModifierId)
        .input('IsDeleted',sql.Bit,customer.IsDeleted)
        .input('DeleterId',sql.UniqueIdentifier,customer.DeleterId)
        .input('DeletionTime',sql.DateTime2,customer.DeletionTime)
        .execute('InsertCustomer')
        return insertProducts.recordsets;
    }
    catch (error){
        console.log("mm"+ error);
    }
}


async function insertInteraction(interaction){
    try{
        let pool = await sql.connect(config);
        let interactionConnect= await pool.request()
        // .input('id',sql.UniqueIdentifier,interaction.id)
        .input('CustomerId',sql.UniqueIdentifier,interaction.CustomerId)
        .input('IncidentId',sql.UniqueIdentifier,interaction.IncidentId)
        .input('WorkcodeLevel2Id',sql.UniqueIdentifier,interaction.WorkcodeLevel2Id)
        .input('UCID',sql.NVarChar,interaction.UCID)
        .input('CustomerRequest',sql.NVarChar,interaction.CustomerRequest)
        .input('ReceiverChannel',sql.Int,interaction.ReceiverChannel)
        .input('ExtraProperties',sql.NVarChar,interaction.ExtraProperties)
        .input('ConcurrencyStamp',sql.NVarChar,interaction.ConcurrencyStamp)
        // .input('CreationTime',sql.DateTime2,interaction.CreationTime)
        .input('CreatorId',sql.UniqueIdentifier,interaction.CreatorId)
        .input('LastModificationTime',sql.DateTime2,interaction.LastModificationTime)
        .input('LastModifierId',sql.UniqueIdentifier,interaction.LastModifierId)
        .input('IsDeleted',sql.Bit,interaction.IsDeleted)
        .input('DeleterId',sql.UniqueIdentifier,interaction.DeleterId)
        .input('DeletionTime',sql.DateTime2,interaction.DeletionTime)
        .input('ClientNo',sql.NVarChar,interaction.ClientNo)
        .input('IVRLogin',sql.Bit,interaction.IVRLogin)
        .input('IVROption',sql.NVarChar,interaction.IVROption)
        .input('Name',sql.NVarChar,interaction.Name)
        .input('Note',sql.NVarChar,interaction.Note)
        .input('ProcessingTime',sql.Int,interaction.ProcessingTime)
        .input('IsCms',sql.Bit,interaction.IsCms)
        .input('Talktime',sql.Int,interaction.Talktime)
        .execute('addNewInteraction')
        console.log(interactionConnect)
        return interactionConnect.recordsets;
    }
    catch (error){
        console.log("mm"+ error);
    }
}


async function getAgents(){
    try{
        let pool = await sql.connect(config);
        let customer = await pool.request().query("select * from AppAgentSelecteds")
        // .execute('getAppAgentSelecteds')
        return customer.recordsets;
    }
    catch (error){
        console.log("mm"+ error);
    }
}

async function getAllCustomers(){
    try{
        let pool = await sql.connect(config);
        let customer = await pool.request()
        .execute('getAllCustomer')
        return customer.recordsets;
    }
    catch (error){
        console.log("mm"+ error);
    }
}

async function updateStatusAgentById(agentId){
    try{
        let pool = await sql.connect(config);
        let customer = await pool.request()
        .input('id',sql.UniqueIdentifier, agentId)
        .execute('updateStatusAgentById')
        return customer.recordsets;
    }
    catch (error){
        console.log("mm"+ error);
    }
}

module.exports={
    getOrders:getOrders,

    getCustomer: getCustomer,
    getCustomers:getCustomers,
    simpleInsert:simpleInsert,

    simpleReturnCusorUseID:simpleReturnCusorUseID,
    insertCustomer:insertCustomer,
    insertInteraction:insertInteraction,
    getAgents:getAgents,
    getAllCustomers:getAllCustomers,
    updateStatusAgentById:updateStatusAgentById
}