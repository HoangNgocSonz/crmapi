const dboperation = require('./dboperation');
const service = require('./auth/auth.service');
const express = require('express');

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
        res.status(500).send({
            error: err.message,
        })
    }
})

app.get("/",(req,res)=>{
    res.send("hello there")
})

// router.use((request, response, next) => { 
//     service.authentication(request, response, next)
// })
router.use((request, response, next) => { 
     next(); 
})



router.route("/sudox").post((request, response) => {
    let order = { ...request.body }
    dboperation.simpleInsert(order).then(result => {
        response.status(201).json(result)
    })
})
router.route("/sudox/:personID").get((request, response) => {
    dboperation.simpleReturnCusorUseID(request.params.personID).then(result => {
        console.log(result);
        response.json(result);
    })
})
router.route("/customerNoControl").get((request, response) => {
    dboperation.getCustomers().then(result => {
        response.json(result[0]);
    })
})



router.route("/GetCustomerByCode/:id").get((request, response) => {
    dboperation.getCustomer(request.params.id).then(result => {
        response.json(result);
    })
})
router.route("/CreateNewCustomer").post((request, response) => {
    let customer = { ...request.body }
    dboperation.insertCustomer(customer).then(result => {
        console.log("success")
        response.status(201).json(result)
    })
})
router.route("/CreateNewInteaction").post((request, response) => {
    let interaction = { ...request.body }
    dboperation.insertInteraction(interaction).then(result => {
        console.log("success")
        response.status(201).json(result)
    })
})

router.route("/agents").get((request, response) => {
    dboperation.getAgents().then(result => {
        response.json(result);
    })
})
router.route("/customers").get((request, response) => {
    dboperation.getAllCustomers().then(result => {
        response.json(result);
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