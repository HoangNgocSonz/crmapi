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




router.route("/GetCustomerByCode/:id").get((request, response) => {
    dboperation.getCustomer1ById(request.params.id).then(result => {
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

router.route("/GetAllAgents").get((request, response) => {
    dboperation.GetAllAgents().then(result => {
        response.json(result[0]);
    })
})
router.route("/GetAllCustomers").get((request, response) => {
    dboperation.getAllCustomers().then(result => {
        response.json(result);
    })
})
router.route("/UpdateAgentStatusById/:agentId").get((request, response) => {
    dboperation.updateStatusAgentById(request.params.agentId).then(result => {
        response.json(result);
    })
})

var port = process.env.PORT || 8091;
app.listen(port);
console.log(`running at port ${port}`)