const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scholarshipSchema = new Schema({
    name: String,
    amount: Number,
    organization: String,
    description: String,
    dueDate: String,
    website: String
});

const scholarshipModel = mongoose.model("scholarshipModel", scholarshipSchema);
module.exports = scholarshipModel;