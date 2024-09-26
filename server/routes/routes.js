const express = require('express');
const router = express.Router();
const userModel = require("../models/UserSchema");
const serviceModel = require("../models/ServiceSchema");


//User Routes

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
        const user = await userModel.findById(req.body._id);
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
    let findUser = await userModel.findById(req.body._id);
    const service = await serviceModel.findOneAndUpdate({"name": req.body.serviceName}, {$push:{ "participants":findUser}}).then(
        res.status(200).send("Updated Participants")
    );
});

//Gets Individual User
router.get('/getUser', async(req, res) => {
    try {
        const findUser = await userModel.findById(req.body._id);
        res.json(findUser);
    } catch(e) {
        res.send("Error: " + e.message);
    }
});

//Delete User
router.get('/deleteUser', async(req, res) => {
    try {
        const deleteUser = await userModel.deleteOne({"_id": req.body._id});
        res.status(200).send("User deleted");
    } catch(e) {
        res.send("Error: " + e.message);
    }
})

//Edit User
router.post('/editUser', async(req, res) => {
    try {
        const updateUser = await userModel.findOneAndUpdate({"id": req.body._id}, {$set:{ "name": req.body.name, "age": req.body.age, "email": req.body.email, "address": req.body.address, "zipCode": req.body.zipCode, "maximumDist": req.body.maximumDist}});
        res.status(200).send("User updated");
    } catch(e) {
        res.send("Error: " + e.message);
    }
});

//Business Routes

//Adds a business account
//Adds a scholarship
//Creates a service
//Edit service information
//Delete Business Account
//Edit Business

router.post('/addOrganization', async(req, res) => {
    try{
        const organizationData = {
            name: req.body.name,
            description: req.body.description,
            services: []
        }
    
        const user = new organizationModel(organizationData).save();
        res.status(200).send("Added to DB:" + organizationData.name);
    } catch(e) {
        res.send("Error: " + e.message);
    }
});

router.post('/createService/', async(req, res) => {
    try{
        const serviceData = {
            name: req.body.name,
            type: req.body.type,
            location: req.body.location,
            organization: req.body.name,
            description: req.body.description,
            date: req.body.date,
            participants: []
        }
    
        const user = new organizationModel(organizationData).save();
        res.status(200).send("Added to DB:" + organizationData.name);
    } catch(e) {
        res.send("Error: " + e.message);
    }
});

router.post('/createScholarship', async(req, res) => {
    try {
        const scholarshipData = {
            name: req.body.name,
            amount: req.body.amount,
            organization: req.body.name,
            description: req.body.description,
            dueDate: req.body.dueDate,
            website: req.body.website
        }
    } catch(e) {
        res.send("Error: " + e.message);
    }
});

router.post('/editService', async(req, res) => {
    try {
        const service = await serviceModel.findOneAndUpdate({"name": req.body.serviceName}, {$set:{
             "description": req.body.description,
             "amount": req.body.amount,
             "date": req.body.date,
             "time": req.body.time,
             "location": req.body.location,
             "type": req.body.type
        }});
        res.status(200).send("Updated Service");
    } catch(e) {
        res.send("Error: " + e.message);
    }
});

router.post('/deleteService', async(req, res) => {
    try {
        const service = await serviceModel.findOneAndDelete({"name": req.body.serviceName});
    } catch(e) {
        res.send("Error: " + e.message);
    }
});

router.post('/editOrganization', async(req, res) => {
    try {
        const organization = await organizationModel.findOneAndUpdate({"_id": req.body._id}, {$set:{
            "name": req.body.name,
            "description": req.body.description,
        }});
        res.status(200).send("Updated Organization");
    } catch(e) {
        res.send("Error: " + e.message);
    }
});


//Data Routes

//Gets All Users Volunteering to Service/Program
router.get('/getAllParticipants', async(req, res) => {
    try {
        const service = await serviceModel.find({"name": req.body.serviceName});
        let users = [];
        for(let i = 0; i < service[0].participants.length; i++) {
            let user = await userModel.findById(service[0].participants[i]._id);
            users.push(user);
        }
        res.json(users);
    } catch(e) {
        res.send("Error: " + e.message);
    }
});



module.exports = router;

