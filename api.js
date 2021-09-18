const dboperation = require('./dboperation');
const service = require('./auth/auth.service');
const express = require('express');
const sessionService = require('./service/session')

const https = require('https');
const path = require('path');
const fs = require('fs');

const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router)

router.route("/orders").get((request, response) => {
    dboperation.getOrders().then(result => {
        // console.log(result);
        response.json(result);
    })
})

router.route("/login").post(async function (req, res) {
    try {
        const data = await service.login(req.body);
          res.status(200).send(data);
    } catch (err) {
        res.status(400).send({
            ret:"400",
            data:null,
            msg: err.message,
        })
    }
})

router.route("/UpdateAgentStatusById/:agentId").get((request, response) => {
    dboperation.updateStatusAgentById(request.params.agentId).then(result => {
        // response.json(result[0][0]);\
        console.log("result: "+ result[0].length)
        if(result[0].length>0){
            response.status(200).json({
                "ret":200,
                "data": result[0][0],
                "msg":"success"
            });
        }else{
            response.status(200).json({
                "ret":200,
                "data": result,
                "msg":"not found"
            });
        }
        
    })
})

app.get("/",(req,res)=>{
    res.send("hello there")
})

router.use((request, response, next) => { 
    service.authentication(request, response, next)
})
// router.use((request, response, next) => { 
//      next(); 
// })




router.route("/GetCustomerByCode/:id").get((request, response) => {
    dboperation.getCustomer1ById(request.params.id).then(result => {
        // response.json(result);
        response.status(200).json({
            "ret":200,
            "data": result[0][0],
            "msg":"success"
        });
    })
})
router.route("/CreateNewCustomer").post((request, response) => {
    let customer = { ...request.body }
    dboperation.insertCustomer(customer).then(result => {
        // response.status(200).json(result)
        response.status(200).json({
            "ret":200,
            "data": result[0][0],
            "msg":"success"
        });
    })
})
router.route("/CreateNewInteaction").post((request, response) => {
    let interaction = { ...request.body }
    dboperation.insertInteraction(interaction).then(result => {
        // response.status(200).json(result)
        response.status(200).json({
            "ret":200,
            "data": result[0][0],
            "msg":"success"
        });
    })
})
router.route("/CreateSession").post((request, response) => {
    let session = { ...request.body }
    sessionService.insertSesion(session,response).then(result => {
        // response.status(200).json(result[0][0])
        if(result.status=="failure"){
            response.status(result.ret).json({
                "ret":result.ret,
                "data":null,
                "msg":result.msg
            });
        }
        else
        response.status(200).json({
            "ret":200,
            "data": result[0][0],
            "msg":"success"
        });
    })
})
router.route("/GetAllAgents").get((request, response) => {
    dboperation.GetAllAgents().then(result => {
        // response.json(result[0]);
        response.status(200).json({
            "ret":200,
            "data": result[0],
            "msg":"success"
        });
    })
})
router.route("/GetAllCustomers").get((request, response) => {
    dboperation.getAllCustomers().then(result => {
        // response.status(200).json(result[0][0]);
        response.status(200).json({
            "ret":200,
            "data": result[0],
            "msg":"success"
        });
    })
})

var port = process.env.PORT || 8090;
app.listen(port);
console.log(`running at port ${port}`)

// const sslServer = https.createServer({
//     key:fs.readFileSync(path.join(__dirname,'cert','key.pem')),
//     cert:fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
// },app)

// const port =process.env.PORT || 8090;
// sslServer.listen(port,()=>{
//     console.log(`rocket ${port}`)
// })  