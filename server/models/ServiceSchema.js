const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    name: String,
    type: String,
    location: String,
    organization: String,
    description: String,
    date: String,
    time: String,
    participants: [{type: Schema.Types.ObjectId, ref: "userModel"}]
});

const serviceModel = mongoose.model("serviceModel", serviceSchema);
module.exports = serviceModel;