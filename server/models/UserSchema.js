const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    age: Number,
    email: String,
    address: String,
    zipCode: String,
    maximumDist: Number,
    currServices: [{type: Schema.Types.ObjectId, ref: "serviceModel"}]
});

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;