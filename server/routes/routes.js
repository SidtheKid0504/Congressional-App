const express = require('express');
const router = express.Router();
const userModel = require("../models/UserSchema");
const serviceModel = require("../models/ServiceSchema");

//Adds User to MongoDB Database
router.post('/addUser', async(req, res) => {
    const userData = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        address: req.body.address,
        zipCode: req.body.zipCode,
        currServices: [],
        maximumDist: req.body.maximumDist
    }

    const user = new userModel(userData).save();
    res.status(200).send("Added to DB:" + user.name);
});

//Adds Service to User's Account
router.post('/addService/', async(req, res) => {
    let addService = await serviceModel.find({"name": req.body.service});
    console.log(addService);
    const user = await userModel.findOneAndUpdate({"email": req.body.email}, {$push:{ "currServices":addService}}).then(
        res.status(200).send("Updated Services")
    );
});

//Gets All User's Services
router.get('/getAllServices', async(req, res) => {
    try {
        const user = await userModel.find({"email": req.body.email});
        let services = [];
        for(let i = 0; i < user[0].currServices.length; i++) {
            let service = await serviceModel.findById(user[0].currServices[i])
            services.push(service);
        }
        res.json(services);
    } catch(e) {
        res.send("Error: " + e.message);
    }
});

//Add User to Service
router.post('/addUserToService', async(req, res) => {
    let findUser = await userModel.find({"email": req.body.email});
    const service = await serviceModel.findOneAndUpdate({"name": req.body.serviceName}, {$push:{ "participants":findUser}}).then(
        res.status(200).send("Updated Participants")
    );
});

//Gets Individual User
router.get('/getUser', async(req, res) => {
    try {
        const findUser = await userModel.find({"email": req.body.email});
        res.json(findUser);
    } catch(e) {
        res.send("Error: " + e.message);
    }
});

//Gets All Users Volunteering to Service/Program
router.get('/getAllParticipants', async(req, res) => {
    try {
        const service = await serviceModel.find({"name": req.body.serviceName});
        let users = [];
        for(let i = 0; i < service[0].participants.length; i++) {
            let user = await userModel.findById(service[0].participants[i])
            users.push(user);
        }
        res.json(users);
    } catch(e) {
        res.send("Error: " + e.message);
    }
});

module.exports = router;

